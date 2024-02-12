<script setup lang="ts">
const { currentGame, activitys, removeActivity } = useGamesStore()

const currentScore = computed(() => {
  return {
    teamA: activitys
      .filter(
        (a) =>
          a.gameId === currentGame.gameId &&
          a.team === "A" &&
          a.action === "score"
      )
      .reduce((accumulator, object) => {
        return accumulator + object.score;
      }, 0),
    teamB: activitys
      .filter(
        (a) =>
          a.gameId === currentGame.gameId &&
          a.team === "B" &&
          a.action === "score"
      )
      .reduce((accumulator, object) => {
        return accumulator + object.score;
      }, 0)
  }
})

const currentGameActivitys = () => {
  return activitys
    .filter(
      (a) =>
        a.gameId === currentGame.gameId
    )
}
</script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink> &nbsp;
    <hr>
    <h1>Game {{ currentGame.gameId }}</h1>
    <h2>{{ currentScore }}</h2>
    <ul>
      <li v-for="item in currentGameActivitys()" :key="item.id">
        {{ item.id }} - {{ item.gameId }} - {{ item.team }} - {{ item.player }} - {{ item.action }} - {{ item.score
        }}
        <button @click="removeActivity(item.id)">[Remove]</button>
      </li>
    </ul>
  </div>
</template>