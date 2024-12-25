<script setup lang="ts">
import DefaultView from "../components/DefaultView.vue";
import ViewItemsContainer from "../components/ViewItemsContainer.vue";

</script>

<template>
    <DefaultView>
      <div class="home-page">
        <ViewItemsContainer/>
        <RouterView/>
      </div>
    </DefaultView>
</template>

<style scoped lang="scss">
@use "../variables" as variables;

.home-page {
  width: 100%;
  display: flex;
}

</style>