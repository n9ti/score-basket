<script setup lang="ts">
const { gamesStat } = useGamesStore()
</script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink> &nbsp;
    <hr>
    <ul>
      <li v-for="item in gamesStat" :key="item.gameId">
        <h2>Game {{ item.gameId }}</h2>
        <h2>TeamA {{ item.score.teamA }} : {{ item.score.teamB }} TeamB</h2>
        <h3>Team A</h3>
        <ul>
          <li v-for="player in item.players.teamA" :key="player.id">
            {{ player.name }}
          </li>
        </ul>
        <!--  -->
        <h3>Team B</h3>
        <ul>
          <li v-for="player in item.players.teamB" :key="player.id">
            {{ player.name }}
          </li>
        </ul>
        <hr>
      </li>
    </ul>
  </div>
</template>