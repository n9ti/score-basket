<script setup lang="ts">
const { currentGame, endGame, activitys, addActivity, currentTeamA, currentTeamB, removePlayerFromTeam, removeAllPlayerFromTeam } = useGamesStore()

const currentActivitys = computed(() => {
  return activitys
    .filter(
      (a) =>
        a.gameId === currentGame.gameId
    )
})
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
    <h1 class="w-full text-center text-3xl font-semibold">Game {{ currentGame.gameId + 1 }}</h1>
    <div class="mt-2 w-full flex justify-center">
      <NuxtLink class="btn rounded-full btn-xs" to="/game-history">Game History</NuxtLink>
    </div>

    <div class="mt-4 flex w-full">
      <div class="grid flex-grow content-start w-1/2">
        <h1 class="text-right">Team A</h1>
        <div class="p-6 w-full bg-base-300 rounded-box align-middle text-center text-6xl">{{ currentScore.teamA }}</div>
        <ul>
          <li class="mt-4" v-for="item in currentTeamA" :key="item.id">
            <div>{{ item.name }} S({{ currentPlayerScore(item.id) }}) A({{ currentPlayerAsset(item.id) }})</div>
            <!-- <button @click="removePlayerFromTeam('A', item.id)">-</button>&nbsp; -->
            <!--  -->
            <button class="btn btn-xs btn-secondary" @click="addActivity({
              id: Date.now(),
              gameId: currentGame.gameId,
              team: 'A',
              player: item,
              action: 'score',
              score: 2
            })">2Pt</button>&nbsp;
            <!--  -->
            <button class="btn btn-xs btn-secondary" @click="addActivity({
              id: Date.now(),
              gameId: currentGame.gameId,
              team: 'A',
              player: item,
              action: 'score',
              score: 3
            })">3Pt</button>&nbsp;
            <!--  -->
            <button class="btn btn-xs btn-secondary" @click="addActivity({
              id: Date.now(),
              gameId: currentGame.gameId,
              team: 'A',
              player: item,
              action: 'assit',
              score: 0
            })">Assit</button>
          </li>
        </ul>
        <div class="mt-8">
          <NuxtLink class="w-full btn rounded-full btn-sm" to="/players/add-to-team-A">+ Player</NuxtLink>
          <button v-if="currentTeamA.length > 0" class="mt-2 w-full btn btn-ghost"
            @click="removeAllPlayerFromTeam('A')">Clear</button>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="grid flex-grow content-start w-1/2">
        <h1>Team B</h1>
        <div class="p-6 w-full bg-base-300 rounded-box align-middle text-center text-6xl">{{ currentScore.teamB }}</div>
        <ul>
          <li class="mt-4" v-for="item in currentTeamB" :key="item.id">
            <div>{{ item.name }} S({{ currentPlayerScore(item.id) }}) A({{ currentPlayerAsset(item.id) }})</div>
            <!-- <button @click="removePlayerFromTeam('B', item.id)">[Remove]</button>&nbsp; -->
            <!--  -->
            <button class="btn btn-xs btn-secondary" @click="addActivity({
              id: Date.now(),
              gameId: currentGame.gameId,
              team: 'B',
              player: item,
              action: 'score',
              score: 2
            })">2Pt</button>&nbsp;
            <!--  -->
            <button class="btn btn-xs btn-secondary" @click="addActivity({
              id: Date.now(),
              gameId: currentGame.gameId,
              team: 'B',
              player: item,
              action: 'score',
              score: 3
            })">3Pt</button>&nbsp;
            <!--  -->
            <button class="btn btn-xs btn-secondary" @click="addActivity({
              id: Date.now(),
              gameId: currentGame.gameId,
              team: 'B',
              player: item,
              action: 'assit',
              score: 0
            })">Assit</button>
          </li>
        </ul>
        <div class="mt-8">
          <NuxtLink class="w-full btn rounded-full btn-sm" to="/players/add-to-team-B">+ Player</NuxtLink>
          <button v-if="currentTeamB.length > 0" class="mt-2 w-full btn btn-ghost"
            @click="removeAllPlayerFromTeam('B')">Clear</button>
        </div>
      </div>
    </div>
    <!--  -->
    <br><br><br><br><br><br><br><br><br><br><br><br>
    <button v-if="currentActivitys.length > 0" class="btn w-full btn-accent" @click="endGame()">End Game</button>
  </div>
</template>