<script setup lang="ts">
const { currentGame, endGame, resetAllGames, activitys, addActivity, currentTeamA, currentTeamB, removePlayerFromTeam } = useGamesStore()

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

const currentPlayerScore = (playerId: number) => {
  return activitys
    .filter(
      (a) =>
        a.gameId === currentGame.gameId &&
        a.player.id === playerId &&
        a.action === 'score'
    )
    .reduce((accumulator, object) => {
      return accumulator + object.score;
    }, 0)
}

const currentPlayerAsset = (playerId: number) => {
  return activitys
    .filter(
      (a) =>
        a.gameId === currentGame.gameId &&
        a.player.id === playerId &&
        a.action === 'assit'
    ).length
}

</script>

<template>
  <div>
    <NuxtLink to="/games-stat">Games Stat</NuxtLink> &nbsp;
    <NuxtLink to="/game-history">Game History</NuxtLink> &nbsp;
    <NuxtLink to="/players">Players</NuxtLink> &nbsp;
    <hr>
    <h1>Game {{ currentGame.gameId }}</h1>
    <h2>{{ currentScore }}</h2>
    <h1>Team A</h1>
    <ul>
      <li v-for="item in currentTeamA" :key="item.id">
        {{ item.name }} score({{ currentPlayerScore(item.id) }}) asset({{ currentPlayerAsset(item.id) }})
        <button @click="removePlayerFromTeam('A', item.id)">[Remove]</button>&nbsp;
        <!--  -->
        <button @click="addActivity({
          id: Date.now(),
          gameId: currentGame.gameId,
          team: 'A',
          player: item,
          action: 'score',
          score: 2
        })">[2 Point]</button>&nbsp;
        <!--  -->
        <button @click="addActivity({
          id: Date.now(),
          gameId: currentGame.gameId,
          team: 'A',
          player: item,
          action: 'score',
          score: 3
        })">[3 Point]</button>&nbsp;
        <!--  -->
        <button @click="addActivity({
          id: Date.now(),
          gameId: currentGame.gameId,
          team: 'A',
          player: item,
          action: 'assit',
          score: 0
        })">[Assit]</button>
      </li>
    </ul>
    <NuxtLink to="/players/add-to-team-A">Add Player</NuxtLink>
    <!--  -->
    <hr>
    <!--  -->
    <h1>Team B</h1>
    <ul>
      <li v-for="item in currentTeamB" :key="item.id">
        {{ item.name }} score({{ currentPlayerScore(item.id) }}) asset({{ currentPlayerAsset(item.id) }})
        <button @click="removePlayerFromTeam('B', item.id)">[Remove]</button>&nbsp;
        <!--  -->
        <button @click="addActivity({
          id: Date.now(),
          gameId: currentGame.gameId,
          team: 'B',
          player: item,
          action: 'score',
          score: 2
        })">[2 Point]</button>&nbsp;
        <!--  -->
        <button @click="addActivity({
          id: Date.now(),
          gameId: currentGame.gameId,
          team: 'B',
          player: item,
          action: 'score',
          score: 3
        })">[3 Point]</button>&nbsp;
        <!--  -->
        <button @click="addActivity({
          id: Date.now(),
          gameId: currentGame.gameId,
          team: 'B',
          player: item,
          action: 'assit',
          score: 0
        })">[Assit]</button>
      </li>
    </ul>
    <NuxtLink to="/players/add-to-team-B">Add Player</NuxtLink>

    <hr>
    <!--  -->
    <button @click="endGame()">[End Game]</button>&nbsp;
    <button @click="resetAllGames()">[Reset All Games]</button>
    <hr>
  </div>
</template>