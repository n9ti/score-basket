<script setup lang="ts">
const { players, addPlayer, removePlayer } = usePlayersStore()
</script>

<template>
  <div>
    <button @click="addPlayer({ id: Date.now(), name: 'xxx' })">Add Data</button>
    <ul>
      <li v-for="item in players" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="removePlayer(item.id)">[Remove Data]</button>
      </li>
    </ul>
  </div>
</template>