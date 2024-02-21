<script setup lang="ts">
const { players } = useGamesStore()


</script>

<template>
  <div>
    <h1 class="text-3xl">All Players</h1>
    <ul>
      <template v-for="item in players.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      })" :key="item.id">
        <PlayerStat :player="item"></PlayerStat>
      </template>
    </ul>
    <NuxtLink class="mt-8 w-full btn btn-secondary mt-4" to="/players/create">+ New Player</NuxtLink>
    <br><br>
    <textarea class="p-2 w-full" name="" id="" cols="30" rows="10">{{ players }}</textarea>
  </div>
</template>