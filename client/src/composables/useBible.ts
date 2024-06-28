import {$ref, $$} from "@vue-macros/reactivity-transform/macros";
import {BooksList} from "../constants/BooksList.ts";

export function useBible() {
  let selectedBook = $ref(BooksList[0])
  let selectedChapter = $ref(1)

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

  return $$({
    selectedBook,
    selectedChapter,
    nextChapter,
    previousChapter,
  })
}