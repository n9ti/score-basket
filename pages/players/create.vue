<script setup lang="ts">
const { addPlayer } = useGamesStore()
const router = useRouter()
const newPlayerName = defineModel({ default: '' })

const addNewPlayer = () => {
  console.log(newPlayerName)
  addPlayer({ id: Date.now(), name: newPlayerName.value });
  router.back();
}
</script>

<template>
  <div>
    <input type="text" v-model="newPlayerName">
    <button @click="addNewPlayer">Add Data</button>
  </div>
</template>