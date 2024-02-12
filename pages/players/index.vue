<script setup lang="ts">
const { removePlayer, addPlayerToTeam, players } = useGamesStore()

</script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink> &nbsp;
    <NuxtLink to="/players/create">New Player</NuxtLink>
    <hr>
    <h1>All Players</h1>
    <ul>
      <li v-for="item in players" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="removePlayer(item.id)">[Remove]</button>
        <!-- <button @click="addPlayerToTeam('A', item)">[Add to team A]</button> -->
        <!-- <button @click="addPlayerToTeam('B', item)">[Add to team B]</button> -->
      </li>
    </ul>
  </div>
</template>