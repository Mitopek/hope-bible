import {$ref, $$, $, $computed} from "@vue-macros/reactivity-transform/macros";
import {BooksList} from "../constants/BooksList.ts";
import {useBibleApi} from "./api/useBibleApi.ts";
import {IBibleResponseEntity} from "../types/responseEntities/IBibleResponseEntity.ts";
import {watch} from "vue";

export function useBible() {
  let availableBibles = $ref<IBibleResponseEntity[]>([])

  let selectedBibleId = $ref<string|null>(null)
  let selectedBook = $ref(BooksList[0])
  let selectedChapter = $ref(1)

  let currentVerses = $ref<{
    verse: string,
    text: string
  }[]>([])

  const {
    getBibles,
    getChapter,
  } = $(useBibleApi())

  const selectedBible = $computed(() => {
    return availableBibles.find(bible => bible.id === selectedBibleId)
  })

  const fetchBibles = async () => {
    availableBibles = await getBibles()
    selectedBibleId = availableBibles[0].id
  }

  const nextChapter = () => {
    if(selectedChapter < selectedBook.numberOfChapters) {
      selectedChapter++
    } else {
      const nextBookIndex = BooksList.findIndex(book => book.value === selectedBook.value) + 1
      selectedChapter = 1
      if(nextBookIndex < BooksList.length) {
        selectedBook = BooksList[nextBookIndex]
        return
      }
      selectedBook = BooksList[0]
    }
  }

  const previousChapter = () => {
    if(selectedChapter > 1) {
      selectedChapter--
    } else {
      const previousBookIndex = BooksList.findIndex(book => book.value === selectedBook.value) - 1
      if(previousBookIndex >= 0) {
        selectedBook = BooksList[previousBookIndex]
        selectedChapter = selectedBook.numberOfChapters
        return
      }
      selectedBook = BooksList[BooksList.length - 1]
      selectedChapter = selectedBook.numberOfChapters
    }
  }

  watch([$$(selectedBibleId), $$(selectedBook), $$(selectedChapter)], async () => {
    if (selectedBibleId && selectedBook && selectedChapter) {
      const {verses} = await getChapter(selectedBible.abbreviation, selectedBook.value, selectedChapter)
      currentVerses = verses
    }
  }, {immediate: true})

  return $$({
    availableBibles,
    selectedBibleId,
    fetchBibles,
    selectedBook,
    selectedChapter,
    nextChapter,
    previousChapter,
    currentVerses,
  })
}