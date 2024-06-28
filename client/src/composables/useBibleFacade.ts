import {createInjectionState} from "@vueuse/core";
import {useBible} from "./useBible.ts";
import {$, $$} from "@vue-macros/reactivity-transform/macros";

const [useProvideBibleFacade, useBibleFacade] = createInjectionState(() => {
  const {
    selectedBook,
    selectedChapter,
    previousChapter,
    nextChapter,
  } = $(useBible())

  return $$({
    selectedChapter,
    selectedBook,
    previousChapter,
    nextChapter,
  })
})

export {useProvideBibleFacade, useBibleFacade}