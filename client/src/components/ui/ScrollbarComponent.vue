<script setup lang="ts">
import {$, $$, $computed, $ref} from "@vue-macros/reactivity-transform/macros";
import {onMounted, watchEffect} from "vue";

interface Emits {
  (e: 'scroll', payload: {
    scrollHeight: number,
    scrollWidth: number,
    x: number,
    y: number,
  }): void
}

const emit = defineEmits<Emits>()

const scrollAreaRef = $ref(null)


const onScrollUpdate = () => {
  emit('scroll', {
    scrollHeight: scrollAreaRef.scrollHeight,
    scrollWidth: scrollAreaRef.scrollWidth,
    x: scrollAreaRef.scrollLeft,
    y: scrollAreaRef.scrollTop,
  })

}


</script>

<template>
  <div ref="scrollAreaRef" class="scroll-area" @scroll="onScrollUpdate">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.scroll-area {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>