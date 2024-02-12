<script setup lang="ts">
const { gamesStat } = useGamesStore()
</script>

<template>
  <div>
    <ul>
      <li class="mt-8" v-for="item in gamesStat" :key="item.gameId">
        <h1 class="w-full text-center text-3xl font-semibold">Game {{ item.gameId + 1 }}</h1>
        <div class="mt-2 w-full flex justify-center">
          <NuxtLink class="btn rounded-full btn-xs" to="/game-history">Game History</NuxtLink>
        </div>
        <!--  -->
        <div class="mt-4 flex w-full">
          <div class="grid flex-grow content-start w-1/2">
            <h1 class="font-bold text-right">Team A</h1>
            <div class="w-full grid justify-items-end">
              <div class="p-6 w-1/2 bg-base-300 rounded-box align-middle text-center text-3xl font-mono">{{
                item.score.teamA
              }}</div>
            </div>
            <div class="mt-2 w-full grid justify-items-end">
              <div class="avatar-group -space-x-2 rtl:space-x-reverse">
                <div v-for="player in item.players.teamA" :key="player.id" class="avatar">
                  <div class="w-6 mask mask-hexagon">
                    <img :alt="player.name" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="divider divider-horizontal"></div>
          <!--  -->
          <div class="grid flex-grow content-start w-1/2">
            <h1 class="font-bold">Team B</h1>
            <div class="w-full grid justify-items-start">
              <div class="p-6 w-1/2 bg-base-300 rounded-box align-middle text-center text-3xl font-mono">{{
                item.score.teamB
              }}</div>
            </div>
            <div class="mt-2 w-full grid justify-items-start">
              <div class="avatar-group -space-x-2 rtl:space-x-reverse">
                <div v-for="player in item.players.teamB" :key="player.id" class="avatar mask mask-hexagon">
                  <div class="w-6 mask mask-hexagon">
                    <img :alt="player.name" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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