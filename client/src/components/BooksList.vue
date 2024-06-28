<script setup lang="ts">
import {$computed, $ref, $} from "@vue-macros/reactivity-transform/macros";
import {BooksList} from "../constants/BooksList.ts";
import ToggleTestament from "./ToggleTestament.vue";
import {useBibleFacade} from "../composables/useBibleFacade.ts";

const books = $ref(BooksList)
let isOldTestament = $ref(false)

const filteredBooks = $computed(() => {
  return books.filter(book => book.isOldTestament === isOldTestament)
})

let {selectedBook, selectedChapter} = $(useBibleFacade())

const onBookSelect = (book) => {
  selectedBook = book
  selectedChapter = 1
}

</script>

<template>
  <div class="book-list">
    <ToggleTestament v-model:isOldTestament="isOldTestament"/>
    <div v-for="book in filteredBooks" :key="book.title" class="book-item">
      <div @click="onBookSelect(book)" :class="['book-title', {'is-selected': book === selectedBook}]">
        {{book.title}}
      </div>
      <div class="step-container" v-if="book.isStepAfter"/>
    </div>
  </div>

</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;
.book-list{
  background: map-get(variables.$colors, surfaceContainerLow);
}

.step-container{
  width: 100%;
  height: 1px;
  padding: 8px;
  color: map-get(variables.$colors, onSurface);
}

.book-item{
  padding: 4px 12px;
  box-sizing: border-box;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: column;
  width: 100%;
}

.book-title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
  box-sizing: border-box;
  width: 100%;
  &.is-selected{
    color: map-get(variables.$colors, primary);
    font-weight: 500;
  }
  &:hover {
    background: map-get(variables.$colors, surfaceContainer);
  }
}
</style>