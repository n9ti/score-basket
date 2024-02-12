<script setup lang="ts">
const { addPlayer } = useGamesStore()
const router = useRouter()
const newPlayerName = defineModel({ default: '' })

const addNewPlayer = () => {
  addPlayer({ id: Date.now(), name: newPlayerName.value });
  router.back();
}

const cancel = () => {
  router.back();
}
</script>

<template>
  <div>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Name</span>
      </div>
      <input type="text" placeholder="Luka" class="input input-bordered w-full max-w-xs" v-model="newPlayerName" />
    </label>
    <button class="btn btn-secondary mt-4" @click="addNewPlayer">Add Player</button>
    <button class="btn btn-ghost" @click="cancel">Cancel</button>
  </div>
</template>