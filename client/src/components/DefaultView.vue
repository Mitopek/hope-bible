<script setup lang="ts">
import { MaybeElementRef, useScroll} from "@vueuse/core";
import ScrollbarComponent from "./ui/ScrollbarComponent.vue";
import {$,$$, $computed, $ref} from "@vue-macros/reactivity-transform/macros";
import {watch} from "vue";

let scrollY = $ref(0)
let isScrollingTop = $ref(false)
const onScroll = ({y}) => {
  scrollY = y
}

const additionalHeaderStyle = $computed(() => {
  if(scrollY > 100 && !isScrollingTop) {
    return {
      top: '-100px',
    }
  }
})

watch($$(scrollY), (value, oldValue) => {
  isScrollingTop = value < oldValue
})

</script>

<template>
  <ScrollbarComponent @scroll="onScroll">
    <div class="default-view">
        <div class="header" :style="additionalHeaderStyle">
          <img src="/logo-light.png" alt="logo"/>
          <div class="title">
            hop<span class="secondary-title">e-bible</span>.com
          </div>
        </div>
        <div class="content">
          <slot/>
        </div>
    </div>
  </ScrollbarComponent>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;
.default-view{
  max-height: 100vh;
}

.header{
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  padding: 0 60px ;
  align-items: center;
  background: map-get(variables.$colors, surfaceContainerLowest);
  color: white;
  gap: 20px;
  top: 0;
  z-index: 100;
  font-family: fantasy;
  transition: all 0.3s ease-in-out;
  position: fixed;
  box-shadow: -5px 10px 18px #4b4a4a;
}

.content {
  padding-top: 100px;
}

.title{
  position: relative;
  top: 10px;
  font-size: 48px;
}
.secondary-title{
  color: #5c6385;
}

.content{
  max-height: calc(100vh - 100px);
}

img{
  height: 85%;
  object-fit: contain;
}
</style>