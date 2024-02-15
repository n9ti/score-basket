<script setup lang="ts">
const { addPlayerToTeam, getAvailablePlayers } = useGamesStore()

const router = useRouter()
const route = useRoute()

const addPlayer = (item: Player) => {
  addPlayerToTeam(route.params.team[0], item);
  router.back();
}
const cancel = () => {
  router.back();
}
</script>

<template>
  <div>
    <h1 class="text-3xl">Add Player to team-{{ $route.params.team }}</h1>

    <ul>
      <li class="mt-4 flex content-center" v-for="item in getAvailablePlayers().sort(function (a, b) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        })" :key="item.id">
        <div class="avatar">
          <div class="w-12 mask mask-hexagon bg-neutral">
            <img v-if="item.img" :src="item.img" />
          </div>
        </div>
        <span class="ml-2 grow text-2xl">{{ item.name }}</span>

        <button class="btn" @click="addPlayer(item)">Add to team
          {{ $route.params.team
          }}</button>
      </li>
    </ul>

    <NuxtLink class="mt-8 w-full btn btn-secondary mt-4" to="/players/create">+ New Player</NuxtLink>
    <button class="btn w-full btn-ghost" @click="cancel">Cancel</button>
  </div>
</template>