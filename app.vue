<script setup lang="ts">
const { players, addPlayer, removePlayer, currentTeamA, currentTeamB, addPlayerToTeam, removePlayerFromTeam, getAvailablePlayers } = usePlayersStore()
const newPlayerName = ''
</script>

<template>
  <div>
    <input type="text" v-model="newPlayerName">
    <button @click="addPlayer({ id: Date.now(), name: newPlayerName }); newPlayerName = ''">Add Data</button>
    <ul>
      <li v-for="item in getAvailablePlayers()" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="removePlayer(item.id)">[Remove]</button>
        <button @click="addPlayerToTeam('A', item)">[Add to team A]</button>
        <button @click="addPlayerToTeam('B', item)">[Add to team B]</button>
      </li>
    </ul>
    <hr>
    <h1>Team A</h1>
    <ul>
      <li v-for="item in currentTeamA" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="removePlayerFromTeam('A', item.id)">[Remove Data]</button>
      </li>
    </ul>
    <h1>Team B</h1>
    <ul>
      <li v-for="item in currentTeamB" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="removePlayerFromTeam('B', item.id)">[Remove Data]</button>
      </li>
    </ul>
  </div>
</template>