<script setup lang="ts">
import {$, $computed, $ref} from "@vue-macros/reactivity-transform/macros";

interface Props {
  isOldTestament: boolean
}

interface Emits {
  (e: 'update:isOldTestament', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

</script>

<template>
  <div class="toggle-testament" @click="emit('update:isOldTestament', !props.isOldTestament)">
    {{props.isOldTestament ? 'Stary Testament' : 'Nowy Testament'}}
    <i class="fas fa-exchange icon"/>
  </div>
</template>

<style scoped lang="scss">
@use '../variables.scss' as variables;

.toggle-testament{
  padding: 12px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  font-size: 22px;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}

.icon{
  font-size: 20px;
}
</style>