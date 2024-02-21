<script setup lang="ts">
const { removePlayer, playesrStat } = useGamesStore()

defineProps<{
  player: Player
}>()

const getPlayerWinStat = (playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId && a.result === "WIN"
  )
    .reduce((accumulator, object) => {
      return accumulator + 1;
    }, 0)
}

const getPlayerLoseStat = (playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId && a.result === "LOSE"
  )
    .reduce((accumulator, object) => {
      return accumulator + 1;
    }, 0)
}

const getPlayerScoreStat = (playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId
  )
    .reduce((accumulator, object) => {
      return accumulator + object.score;
    }, 0)
}

const getPlayer3PtStat = (playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId
  )
    .reduce((accumulator, object) => {
      return accumulator + object.treePoint;
    }, 0)
}

const getPlayerAssistStat = (playerId: number) => {
  return playesrStat.filter(
    (a) =>
      a.playerId === playerId
  )
    .reduce((accumulator, object) => {
      return accumulator + object.assit;
    }, 0)
}
</script>

<template>
  <li class="mt-4 flex content-center">
    <div class="avatar">
      <div class="w-12 mask mask-hexagon bg-neutral">
        <img v-if="player.img" :src="player.img" />
      </div>
    </div>

    <div class="ml-2 grow">
      <div class="text-sm font-bold">{{ player.name }}</div>
      <div class="flex w-11/12 justify-between items-center">
        <div class="badge badge-success badge-outline font-bold">W:{{ getPlayerWinStat(player.id) }}</div>
        <div class="badge badge-error badge-outline font-bold">L:{{ getPlayerLoseStat(player.id) }}</div>
        <div class="font-medium">🏀 : {{ getPlayerScoreStat(player.id) }}</div>
        <div class="font-medium">③ : {{ getPlayer3PtStat(player.id) }}</div>
        <div class="font-medium">➡️ : {{ getPlayerAssistStat(player.id) }}</div>
      </div>
    </div>

    <div class="dropdown dropdown-left">
      <div tabindex="0" role="button" class="btn btn-xs m-1">:</div>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
        <li><a @click="removePlayer(player.id)">❌&nbsp;&nbsp;Remove</a></li>
      </ul>
    </div>
  </li>
</template>