<template>
  <div class="p-4">
    <div class="mb-8 w-full flex justify-between">
      <NuxtLink class="btn btn-sm" to="/">Home</NuxtLink>
      <NuxtLink class="btn btn-sm" to="/players">Players</NuxtLink>
      <NuxtLink class="btn btn-sm" to="/games-stat">Stat</NuxtLink>
      <NuxtLink class="btn btn-sm" to="/setting">Setting</NuxtLink>
    </div>
    <slot />
  </div>
</template>