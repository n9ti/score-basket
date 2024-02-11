<script setup lang="ts">
const { currentGame, gamesStat, playesrStat, endGame, resetAllGames, activitys, addActivity, removeActivity, addPlayer, removePlayer, currentTeamA, currentTeamB, addPlayerToTeam, removePlayerFromTeam, getAvailablePlayers } = useGamesStore()
const newPlayerName = ''

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
    <input type="text" v-model="newPlayerName">
    <button @click="addPlayer({ id: Date.now(), name: newPlayerName }); newPlayerName = ''">Add Data</button>
    <ul>
      <li v-for="item in getAvailablePlayers()" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="removePlayer(item.id)">[Remove]</button>
        <button @click="addPlayerToTeam('A', item)">[Add to team A]</button>
        <button @click="addPlayerToTeam('B', item)">[Add to team B]</button>
      </li>
    </ul>
    <hr>
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
    <!--  -->
    <button @click="endGame()">[End Game]</button>&nbsp;
    <button @click="resetAllGames()">[Reset All Games]</button>
    <hr>
    <h1>Game {{ currentGame.gameId }}</h1>
    <h2>{{ currentScore }}</h2>
    <ul>
      <li v-for="item in activitys" :key="item.id">
        {{ item.id }} - {{ item.gameId }} - {{ item.team }} - {{ item.player }} - {{ item.action }} - {{ item.score }}
        <button @click="removeActivity(item.id)">[Remove]</button>
      </li>
    </ul>
    <!--  -->
    <hr>
    <!--  -->
    <ul>
      <li v-for="item in gamesStat" :key="item.gameId">
        <h2>Game {{ item.gameId }}</h2>
        <h2>TeamA {{ item.score.teamA }} : {{ item.score.teamB }} TeamB</h2>
        <h3>Team A</h3>
        <ul>
          <li v-for="player in item.players.teamA" :key="player.id">
            {{ player.name }}
          </li>
        </ul>
        <!--  -->
        <h3>Team B</h3>
        <ul>
          <li v-for="player in item.players.teamB" :key="player.id">
            {{ player.name }}
          </li>
        </ul>
        <hr>
      </li>
    </ul>
    <!--  -->
    {{ playesrStat }}
  </div>
</template>