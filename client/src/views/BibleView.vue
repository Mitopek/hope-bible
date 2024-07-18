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
  <ScrollbarComponent>
    <DefaultView>
        <div class="bible-view">
          <BooksList/>
          <LoadingComponent/>
          <div class="content">
            <ChaptersChooser
              :number-of-chapters="selectedBook.numberOfChapters"
              :value="selectedChapter"
              @update:value="selectedChapter = $event"
              @next="nextChapter"
              @previous="previousChapter"
            />
              <SelectComponent :options="selectValues" v-model="selectedBibleId" :width="360"/>
              <div class="bible-text-container">
                <span class="verse-container" v-for="verse in currentVerses" :key="verse.verse">
                  <span class="verse-number">({{verse.verse}})</span> <span class="verse-text">{{verse.text}}</span>
                </span>
            </div>
          </div>
          <HistoryList/>
        </div>
    </DefaultView>
  </ScrollbarComponent>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;

.bible-view {
  width: 100%;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
}

.select-wrapper{
  width: 360px;
}

.verse-text{
  padding: 0 2px 0 2px;
  cursor: pointer;
  &:hover{
    color: map-get(variables.$colors, primary);
  }
}

.content{
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.verse-number{
  font-weight: bold;
  color: map-get(variables.$colors, primary);
  margin-left: 4px;
}

.bible-text-container{
  padding: 20px;
  background: map-get(variables.$colors, surfaceContainerLow);
  border-radius: 20px;
  text-align: justify;
  font-size: 1.2rem;
}
</style>