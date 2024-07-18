<script setup lang="ts">
import DropdownComponent from "./DropdownComponent.vue";
import {$computed, $ref} from "@vue-macros/reactivity-transform/macros";
import ScrollbarComponent from "./ScrollbarComponent.vue";

interface Props {
  options: {
    value: string | number
    text: string
  }[]
  modelValue: string | number
  width?: number
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  width: 200
})
const emit = defineEmits<Emits>()

let isOpen = $ref(false)

const modelText = $computed(() => {
  if(!props.modelValue) {
    return ''
  }
  return props.options.find(option => option.value === props.modelValue)?.text
})

const additionalStyles = $computed(() => {
  return {
    width: `${props.width}px`
  }
})
</script>

<template>
  <DropdownComponent :isOpen="isOpen" @hide="isOpen = false" placement-strategy="flip">
    <template #default>
      <div class="header" @click="isOpen = !isOpen" :style="additionalStyles">
        <div/>
        {{modelText}}
        <i :class="['fas fa-angle-down', 'arrow-icon', {'is-toggled': isOpen}]"/>
      </div>
    </template>
    <template #dropdown>
      <ScrollbarComponent>
        <div class="options" :style="additionalStyles">
          <div v-for="option in props.options" :key="option.value" @click="emit('update:modelValue', option.value)" class="option">
            {{option.text}}
          </div>
        </div>
      </ScrollbarComponent>
    </template>
  </DropdownComponent>

</template>

<style scoped lang="scss">
@use "../../variables.scss" as variables;
.header{
  padding: 6px;
  background: map-get(variables.$colors, surfaceContainerLow);
  border: 1px solid map-get(variables.$colors, surfaceContainerHighest);
  cursor: pointer;
  border-radius: 8px;
  gap: 8px;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow-icon{
  transition: transform 0.3s;
  &.is-toggled {
    transform: rotate(-180deg);
  }
}

.options{
  background: map-get(variables.$colors, surfaceContainer);
  max-height: 70vh;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.option{
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 4px 8px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover{
    background: map-get(variables.$colors, surfaceContainerLow);
  }
}
</style>