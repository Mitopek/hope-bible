<script setup lang="ts">
interface Props {
  numberOfChapters: number
  value: number
}

interface Emits {
  (e: 'update:value', value: number): void
  (e: 'next'): void
  (e: 'previous'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

</script>

<template>
  <div class="chapter-chooser">
    <div class="icon-wrapper left-icon">
      <i class="fas fa-angle-left icon" @click="emit('previous')"/>
    </div>
    <div class="items-container">
      <div/>
      <div v-for="i in props.numberOfChapters" :key="i" :class="['chapter-item', {'is-selected': i === props.value}]" @click="emit('update:value', i)">
        <span>{{i}}</span>
      </div>
    </div>
    <div class="icon-wrapper right-icon">
      <i class="fas fa-angle-right icon" @click="emit('next')"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;

.chapter-chooser{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.items-container{
  padding: 2px 8px 3px 8px;
  display: grid;
  grid-template-columns: repeat(10, 44px);
  font-size: 20px;
  border-radius: 2px;
  flex-wrap: wrap;
  border: 1px solid map-get(variables.$colors, content-dark);
}

.chapter-item {
  cursor: pointer;
  padding: 4px;
  box-sizing: border-box;
  &.is-selected {
    color: map-get(variables.$colors, primaryDark);
    font-weight: 500;
  }
  &:hover {
    background: map-get(variables.$colors, primary);
  }
}

.icon{
  cursor: pointer;
  font-size: 40px;
}

.icon-wrapper{
  padding: 3px 8px;
}

.left-icon{
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.right-icon{
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>