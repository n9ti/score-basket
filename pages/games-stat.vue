<script setup lang="ts">
const { gamesStat, getPlayerImg, getPlayerName } = useGamesStore()
</script>

<template>
  <div>
    <ul>
      <li class="" v-for="item in gamesStat" :key="item.gameId">
        <h1 class="w-full text-center text-sm font-medium">Game {{ item.gameId + 1 }}</h1>
        <!-- <div class="mt-2 w-full flex justify-center">
          <NuxtLink class="btn rounded-full btn-xs" to="/game-history">Game History</NuxtLink>
        </div> -->
        <!--  -->
        <div class="mt-1 flex w-full">
          <div class="grid flex-grow content-start w-1/2">
            <!-- <h1 class="text-xs font-bold text-right">Team A</h1> -->
            <div class="w-full grid justify-items-end">
              <div class="py-1 px-3 w-16 bg-base-300 rounded-box align-middle text-center text-2xl font-mono"
                :class="{ 'text-success': item.score.teamA > item.score.teamB, 'text-error': item.score.teamA < item.score.teamB }">
                {{
                  item.score.teamA
                }}</div>
            </div>
            <div class="mt-1 w-full grid justify-items-end">
              <div class="avatar-group -space-x-1 rtl:space-x-reverse">
                <div v-for="playerId in item.players.teamA" :key="playerId" class="avatar">
                  <div class="w-6 mask mask-hexagon bg-neutral">
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
            <!-- <h1 class="text-xs font-bold">Team B</h1> -->
            <div class="w-full grid justify-items-start">
              <div class="py-1 px-3 w-16 bg-base-300 rounded-box align-middle text-center text-2xl font-mono"
                :class="{ 'text-success': item.score.teamA < item.score.teamB, 'text-error': item.score.teamA > item.score.teamB }">
                {{
                  item.score.teamB
                }}</div>
            </div>
            <div class="mt-1 w-full grid justify-items-start">
              <div class="avatar-group -space-x-1 rtl:space-x-reverse">
                <div v-for="playerId in item.players.teamB" :key="playerId" class="avatar mask mask-hexagon">
                  <div class="w-6 mask mask-hexagon bg-neutral">
                    <img v-if="getPlayerImg(playerId)" :src="getPlayerImg(playerId)" />
                  </div>
                </div>
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