<script setup lang="ts">
const { gamesStat, playesrStat, getPlayerImg, getPlayerName } = useGamesStore()

const getGamePlayerScoreStat = (gameId: number, playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId &&
      a.gameId === gameId
  )
    .reduce((accumulator, object) => {
      return accumulator + object.score;
    }, 0)
}

const getGamePlayer3PtStat = (gameId: number, playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId &&
      a.gameId === gameId
  )
    .reduce((accumulator, object) => {
      return accumulator + object.treePoint;
    }, 0)
}

const getGamePlayerAssistStat = (gameId: number, playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId &&
      a.gameId === gameId
  )
    .reduce((accumulator, object) => {
      return accumulator + object.assist;
    }, 0)
}
</script>

<template>
  <div>
    <ul>
      <li class="" v-for="item in gamesStat" :key="item.gameId">
        <h1 class="mt-4 w-full text-center text-sm font-medium">Game {{ item.gameId + 1 }}</h1>
        <!-- <div class="mt-2 w-full flex justify-center">
          <NuxtLink class="btn rounded-full btn-xs" to="/game-history">Game History</NuxtLink>
        </div> -->
        <!--  -->
        <div class="mt-1 flex w-full">
          <div class="grid flex-grow content-start w-1/2">
            <div class="w-full grid justify-items-end">
              <div class="py-1 px-3 w-16 bg-base-300 rounded-box align-middle text-center text-2xl font-mono"
                :class="{ 'text-success': item.score.teamA > item.score.teamB, 'text-error': item.score.teamA < item.score.teamB }">
                {{
                  item.score.teamA
                }}</div>
            </div>
            <div class="mt-1 w-full grid justify-items-end">
              <div v-for="playerId in item.players.teamA" :key="playerId"
                class="mt-1 w-full flex justify-between items-center">
                <div class="font-medium">🏀 : {{ getGamePlayerScoreStat(item.gameId, playerId) }}</div>
                <div class="font-medium">③ : {{ getGamePlayer3PtStat(item.gameId, playerId) }}</div>
                <div class="font-medium">➡️ : {{ getGamePlayerAssistStat(item.gameId, playerId) }}</div>
                <div class="avatar">
                  <div class="w-8 mask mask-hexagon bg-neutral">
                    <img v-if="getPlayerImg(playerId)" :src="getPlayerImg(playerId)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="divider divider-horizontal"></div>
          <!--  -->
          <div class="grid flex-grow content-start w-1/2">
            <div class="w-full grid justify-items-start">
              <div class="py-1 px-3 w-16 bg-base-300 rounded-box align-middle text-center text-2xl font-mono"
                :class="{ 'text-success': item.score.teamA < item.score.teamB, 'text-error': item.score.teamA > item.score.teamB }">
                {{
                  item.score.teamB
                }}</div>
            </div>
            <div class="mt-1 w-full grid justify-items-start">
              <div v-for="playerId in item.players.teamB" :key="playerId"
                class="mt-1 w-full flex justify-between items-center">
                <div class="avatar">
                  <div class="w-8 mask mask-hexagon bg-neutral">
                    <img v-if="getPlayerImg(playerId)" :src="getPlayerImg(playerId)" />
                  </div>
                </div>
                <div class="font-medium">🏀 : {{ getGamePlayerScoreStat(item.gameId, playerId) }}</div>
                <div class="font-medium">③ : {{ getGamePlayer3PtStat(item.gameId, playerId) }}</div>
                <div class="font-medium">➡️ : {{ getGamePlayerAssistStat(item.gameId, playerId) }}</div>

              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </li>
    </ul>
    <br><br><br>
  </div>
</template>