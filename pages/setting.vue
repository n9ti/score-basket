<script setup lang="ts">
const { resetAllGames } = useGamesStore()
</script>

<template>
  <div>
    <h1 class="text-3xl">Setting</h1>
    <button class="mt-4 btn rounded-full btn-sm btn-accent" @click="resetAllGames()">Reset All Games</button>
  </div>
</template>