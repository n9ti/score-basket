<script setup lang="ts">
const { resetAllGames, players, activitys, currentTeamA, currentTeamB, gamesStat, playesrStat, addSaturdayHooper, removeAllPlayers } = useGamesStore()
const colorMode = useColorMode()
const lightTheme = ref(colorMode.preference === 'retro')
watch(lightTheme, (newValue) => {
  if (newValue) {
    colorMode.preference = "retro"
  } else {
    colorMode.preference = "dim"
  }
})

const getStoreSize = (s: any) => {
  return new Intl.NumberFormat().format(JSON.stringify(s).length)
}
</script>

<template>
  <div>
    <h1 class="text-3xl">Setting</h1>
    <div class="mx-6">
      <!--  -->
      <h1 class="mt-4 text-2xl">Theme</h1>
      <label class="mt-4 swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" class="theme-controller" v-model="lightTheme" />
        <!-- sun icon -->
        <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <!-- moon icon -->
        <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
      <!--  -->
      <div class="divider"></div>
      <!--  -->
      <h1 class="mt-4 text-2xl">Storage Size</h1>
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr>
              <th>Players ({{ players.length }})</th>
              <td class="text-right">{{ getStoreSize(players) }}</td>
            </tr>
            <tr>
              <th>activitys ({{ activitys.length }})</th>
              <td class="text-right">{{ getStoreSize(activitys) }}</td>
            </tr>
            <tr>
              <th>currentTeamA ({{ currentTeamA.length }})</th>
              <td class="text-right"> {{ getStoreSize(currentTeamA) }}
              </td>
            </tr>
            <tr>
              <th>currentTeamB ({{ currentTeamB.length }})</th>
              <td class="text-right"> {{ getStoreSize(currentTeamB) }}
              </td>
            </tr>
            <tr>
              <th>gamesStat ({{ gamesStat.length }})</th>
              <td class="text-right"> {{ getStoreSize(gamesStat) }}
              </td>
            </tr>
            <tr>
              <th>playesrStat ({{ playesrStat.length }})</th>
              <td class="text-right"> {{ getStoreSize(playesrStat) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <!--  -->
      <div class="divider"></div>
      <!--  -->
      <h1 class="mt-4 text-2xl">Players</h1>
      <button class="mt-4 btn rounded-full btn-sm btn-accent" @click="addSaturdayHooper()">Load Saturday Hooper</button>
      <!--  -->


      <!--  -->
      <div class="divider"></div>
      <!--  -->
      <h1 class="mt-4 text-2xl">Reset</h1>
      <div class="dropdown dropdown-right">
        <div tabindex="0" role="button" class="mt-4 btn rounded-full btn-sm btn-error">Reset All Stat</div>
        <ul tabindex="0" class="ml-4 dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
          <li><a @click="resetAllGames()">❌&nbsp;&nbsp;Yes! Reset All Stat.</a></li>
        </ul>
      </div>

      <br>

      <div class="dropdown dropdown-right">
        <div tabindex="0" role="button" class="mt-4 btn rounded-full btn-sm btn-error">Remove All Players</div>
        <ul tabindex="0" class="ml-4 dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-64">
          <li><a @click="removeAllPlayers()">❌&nbsp;&nbsp;Yes! Remove All Players.</a></li>
        </ul>
      </div>


    </div>
  </div>
</template>
