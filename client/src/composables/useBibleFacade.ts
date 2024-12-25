import {createInjectionState} from "@vueuse/core";
import {useBible} from "./useBible.ts";
import {$, $$} from "@vue-macros/reactivity-transform/macros";

const [useProvideBibleFacade, useBibleFacade] = createInjectionState(() => {
  const {
    selectedBook,
    selectedChapter,
    previousChapter,
    nextChapter,
    availableBibles,
    selectedBibleId,
    fetchBibles,
    currentVerses,
    isFetchingVerses,
    readHistory,
  } = $(useBible())

  return $$({
    selectedBibleId,
    availableBibles,
    selectedChapter,
    selectedBook,
    previousChapter,
    currentVerses,
    nextChapter,
    fetchBibles,
    isFetchingVerses,
    readHistory,
  })
})

export {useProvideBibleFacade, useBibleFacade}