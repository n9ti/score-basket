<script setup lang="ts">
const { addPlayerToTeam, getAvailablePlayers } = useGamesStore()
const router = useRouter()
const route = useRoute()
const addPlayer = (item: Player) => {
  addPlayerToTeam(route.params.team[0], item);
  router.back();
}
</script>

<template>
  <div>
    <NuxtLink to="/players/create">New Player</NuxtLink>
    <hr>
    <h1>Add Player to team-{{ $route.params.team }}</h1>
    <ul>
      <li v-for="item in getAvailablePlayers()" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="addPlayer(item)">[Add to team
          {{ $route.params.team
          }}]</button>
      </li>
    </ul>
  </div>
</template>