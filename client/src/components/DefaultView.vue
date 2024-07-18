<script setup lang="ts">

</script>

<template>
<div class="default-view">
  <div class="header">
    <img src="/logo.png" alt="logo"/>
    Hope Bible
  </div>
  <slot/>
</div>
</template>

<style scoped lang="scss">
@use "../variables.scss" as variables;
.default-view{
  max-height: 100vh;
}

.header{
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  padding: 0 60px ;
  align-items: center;
  background: map-get(variables.$colors, surfaceContainer);
  gap: 20px;
  font-size: 40px;
  font-family: fantasy;
}

img{
  height: 95%;
  object-fit: contain;
}
</style>