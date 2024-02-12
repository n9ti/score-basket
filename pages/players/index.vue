<script setup lang="ts">
const { removePlayer, addPlayerToTeam, players } = useGamesStore()

</script>

<template>
  <div>
    <h1 class="text-3xl">All Players</h1>
    <ul>
      <li class="mt-4 flex content-center" v-for="item in players" :key="item.id">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <span class="ml-2 grow text-2xl">{{ item.name }}</span>
        <button class="btn btn-sm btn-circle btn-outline" @click="removePlayer(item.id)"><svg
            xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg></button>
      </li>
    </ul>

    <NuxtLink class="mt-8 w-full btn btn-secondary mt-4" to="/players/create">+ New Player</NuxtLink>
  </div>
</template>