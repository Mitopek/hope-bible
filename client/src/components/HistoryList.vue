<script setup lang="ts">
</script>

<template>
  <div class="history-list">
    <div class="header">
      <i class="fa-solid fa-shoe-prints icon"/> Ostatnio przeglądane
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;

.history-list{
  background: map-get(variables.$colors, surfaceContainerLow);
  padding: 8px;
  font-size: 22px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: map-get(variables.$colors, onSurface);
}

.header{
  gap: 8px;
  padding: 0 4px;
  box-sizing: border-box;
  font-weight: 500;
}

.icon{
  transform: rotate(270deg);
}
</style>