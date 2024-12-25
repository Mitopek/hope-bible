<script setup lang="ts">

import {useBibleFacade, useProvideBibleFacade} from "../composables/useBibleFacade.ts";
import {$} from "@vue-macros/reactivity-transform/macros";
import {BooksList} from "../constants/BooksList.ts";
const {
  readHistory
} = $(useBibleFacade());

const getBookTitle = (book: string) => {
  console.info(BooksList.find(b => b.value === book)?.title)
  return BooksList.find(b => b.value === book)?.title || book;
}
</script>

<template>
  <div class="history-list">
    <div class="header">
      <i class="fa-solid fa-shoe-prints icon"/> Historia
    </div>
    <div class="history-items">
      <div v-for="history in readHistory" :key="history.timestamp" class="history-item">
        <span>{{getBookTitle(history.book)}} {{history.chapter}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;

.history-list{
  padding: 8px;
  font-size: 22px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: map-get(variables.$colors, onSurface);
}

.history-items{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  font-size: 20px;
}

.history-item{
  display: flex;
  justify-content: flex-start;
}

.header{
  gap: 8px;
  box-sizing: border-box;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.icon{
  transform: rotate(270deg);
}
</style>