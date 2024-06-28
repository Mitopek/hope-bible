<script setup lang="ts">
import BooksList from "../components/BooksList.vue";
import ChaptersChooser from "../components/ChaptersChooser.vue";
import {useProvideBibleFacade} from "../composables/useBibleFacade.ts";
import {$} from "@vue-macros/reactivity-transform/macros";
import HistoryList from "../components/HistoryList.vue";
import DefaultView from "../components/DefaultView.vue";

const {
  selectedBook,
  selectedChapter,
  previousChapter,
  nextChapter,
} = $(useProvideBibleFacade());
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
          <div class="bible-text-container">
            xD
          </div>
      </div>
      <HistoryList/>
    </div>
  </DefaultView>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;

.bible-view {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
}

.content{
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bible-text-container{
  padding: 20px;
  background: map-get(variables.$colors, surfaceContainerLow);
  border-radius: 20px;

}
</style>