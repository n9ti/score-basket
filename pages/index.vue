<script setup lang="ts">
const colorMode = useColorMode()
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

const substitute = (team: string, playerId: number) => {
  removePlayerFromTeam(team, playerId)
  navigateTo(`/players/add-to-team-${team}`)
}
</script>

<template>
  <div>
    {{ colorMode.preference }}
    <h1 class="w-full text-center text-3xl font-semibold">Game {{ currentGame.gameId + 1 }}</h1>
    <div class="mt-2 w-full flex justify-center">
      <NuxtLink class="btn rounded-full btn-xs" to="/game-history">Game History</NuxtLink>
    </div>

    <div class="mt-4 flex w-full">
      <div class="grid flex-grow content-start w-1/2">
        <h1 class="font-bold text-right">Team A</h1>
        <div class="p-6 w-full bg-base-300 rounded-box align-middle text-center text-6xl font-mono">{{ currentScore.teamA
        }}</div>
        <ul>
          <li class="mt-8" v-for="item in currentTeamA" :key="item.id">
            <!--  -->
            <div class="flex">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-hexagon">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div class="ml-2 grow">
                <div class="font-bold">{{ item.name }}</div>
                <div>S({{ currentPlayerScore(item.id) }}) A({{ currentPlayerAsset(item.id) }})</div>
              </div>

              <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-xs m-1">:</div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a @click="substitute('A', item.id)">Substitute</a></li>
                  <li><a @click="removePlayerFromTeam('A', item.id)">Remove</a></li>
                </ul>
              </div>
            </div>
            <!--  -->
            <div class="mt-2 flex justify-between">
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
            </div>

          </li>
        </ul>
        <div class="mt-12">
          <NuxtLink class="w-full btn rounded-full btn-sm" to="/players/add-to-team-A">+ Player</NuxtLink>
          <button v-if="currentTeamA.length > 0" class="mt-2 w-full btn btn-ghost"
            @click="removeAllPlayerFromTeam('A')">Clear</button>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="grid flex-grow content-start w-1/2">
        <h1 class="font-bold">Team B</h1>
        <div class="p-6 w-full bg-base-300 rounded-box align-middle text-center text-6xl font-mono">{{ currentScore.teamB
        }}</div>
        <ul>
          <li class="mt-8" v-for="item in currentTeamB" :key="item.id">
            <!--  -->
            <div class="flex">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-hexagon">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div class="ml-2 grow">
                <div class="font-bold">{{ item.name }}</div>
                <div>S({{ currentPlayerScore(item.id) }}) A({{ currentPlayerAsset(item.id) }})</div>
              </div>
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-xs m-1">:</div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a @click="substitute('B', item.id)">Substitute</a></li>
                  <li><a @click="removePlayerFromTeam('B', item.id)">Remove</a></li>
                </ul>
              </div>
            </div>
            <!--  -->
            <div class="mt-2 flex justify-between">
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
            </div>
          </li>
        </ul>
        <div class="mt-12">
          <NuxtLink class="w-full btn rounded-full btn-sm" to="/players/add-to-team-B">+ Player</NuxtLink>
          <button v-if="currentTeamB.length > 0" class="mt-2 w-full btn btn-ghost"
            @click="removeAllPlayerFromTeam('B')">Clear</button>
        </div>
      </div>
    </div>
    <!--  -->
    <button v-if="currentActivitys.length > 0" class="mt-64 btn w-full btn-accent" @click="endGame()">End Game</button>
  </div>
</template>