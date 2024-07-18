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
  })
})

export {useProvideBibleFacade, useBibleFacade}