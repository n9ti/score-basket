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
    <h1 class="w-full text-center text-3xl font-semibold">Game {{ currentGame.gameId + 1 }}</h1>
    <div class="mt-2 w-full flex justify-center">
      <NuxtLink class="btn rounded-full btn-xs" to="/">Back</NuxtLink>
    </div>
    <!--  -->

    <ul class="mt-4 mb-8 timeline timeline-vertical">
      <li v-for="item in currentGameActivitys()" :key="item.id">
        <template v-if="item.team === 'A'">
          <hr />
          <div class="timeline-start timeline-box"><span class="font-bold">{{ item.player.name }}</span>
            <span v-if="item.action === 'score'">&nbsp;🏀&nbsp;{{ item.score
            }}Pt</span>
            <span v-else>&nbsp;ִ➡️&nbsp;Assist</span>
            <br>
            <button class="btn btn-xs btn-accent" @click="removeActivity(item.id)">Remove</button>
          </div>
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <hr />
        </template>
        <template v-else-if="item.team === 'B'">
          <hr />
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="timeline-end timeline-box"><span class="font-bold">{{ item.player.name }}</span>
            <span v-if="item.action === 'score'">&nbsp;🏀&nbsp;{{ item.score
            }}Pt</span>
            <span v-else>&nbsp;ִ➡️&nbsp;Assist</span>
            <br>
            <button class="btn btn-xs btn-accent" @click="removeActivity(item.id)">Remove</button>
          </div>
          <hr />
        </template>
      </li>
    </ul>


    <!--  -->
    <!-- <ul>
      <li v-for="item in currentGameActivitys()" :key="item.id">
        {{ item.id }} - {{ item.gameId }} - {{ item.team }} - {{ item.player }} - {{ item.action }} - {{ item.score
        }}
        <button @click="removeActivity(item.id)">[Remove]</button>
      </li>
    </ul> -->
  </div>
</template>