<script setup lang="ts">
import BooksList from "../components/BooksList.vue";
import ChaptersChooser from "../components/ChaptersChooser.vue";
import {useProvideBibleFacade} from "../composables/useBibleFacade.ts";
import {$, $computed} from "@vue-macros/reactivity-transform/macros";
import HistoryList from "../components/HistoryList.vue";
import DefaultView from "../components/DefaultView.vue";
import {useBibleApi} from "../composables/api/useBibleApi.ts";
import {onMounted} from "vue";
import ScrollbarComponent from "../components/ui/ScrollbarComponent.vue";
import SelectComponent from "../components/ui/SelectComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";

const {
  selectedBook,
  selectedChapter,
  previousChapter,
  nextChapter,
  fetchBibles,
  currentVerses,
  selectedBibleId,
  availableBibles,
    isFetchingVerses,
} = $(useProvideBibleFacade());

onMounted(async () => {
  await fetchBibles()
  // getChapter('bt', 'Iz', 1)
})

const selectValues = $computed(() => {
  return availableBibles.map(bible => ({
    value: bible.id,
    text: bible.name
  }))
})


</script>

<template>
    <DefaultView>
        <div class="bible-view">
          <BooksList/>
          <div class="content">
            <ChaptersChooser
              :number-of-chapters="selectedBook.numberOfChapters"
              :value="selectedChapter"
              @update:value="selectedChapter = $event"
              @next="nextChapter"
              @previous="previousChapter"
            />
              <SelectComponent :options="selectValues" v-model="selectedBibleId" :width="360"/>
            <div class="loading-wrapper" v-if="isFetchingVerses">
              <LoadingComponent/>
            </div>
              <div class="bible-text-container" v-else>
                <span :class="['verse-container', {'is-loading': isFetchingVerses}]" v-for="verse in currentVerses" :key="verse.verse">
                  <span class="verse-number">({{verse.verse}})</span> <span class="verse-text">{{verse.text}}</span>
                </span>
            </div>
          </div>
          <HistoryList/>
        </div>
    </DefaultView>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;

.loading-wrapper{
 padding: 20px;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
}

.bible-view {
  width: 100%;
  display: grid;
  grid-template-columns: 240px 1fr 240px;
}

.select-wrapper{
  width: 360px;
}

.verse-text{
  padding: 0 2px 0 2px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover{
    background: map-get(variables.$colors, primary);
  }
}

.content{
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  width: 100%;
}

.verse-number{
  font-weight: bold;
  color: map-get(variables.$colors, primaryDark);
  margin-left: 4px;
}

.verse-container{
  &.is-loading {
    opacity: 0.3;
  }
}

.bible-text-container{
  padding: 20px;
  //border: 1px solid map-get(variables.$colors, content-light);
  text-align: justify;
  position: relative;
  font-size: 1.2rem;
}
</style>