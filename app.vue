<script setup lang="ts">
const { players, addPlayer } = usePlayersStore()
</script>

<template>
  <div>
    <ul>
      <li v-for="item in players" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>
    <button @click="addPlayer({ id: Date.now(), name: 'xxx' })">Add Data</button>
    <!-- <button @click="removePlayer(1)">Remove Data</button> -->
  </div>
</template>