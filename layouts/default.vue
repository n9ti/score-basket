<template>
  <div class="p-4">
    <div class="mb-8 w-full flex justify-between">
      <NuxtLink class="btn btn-sm" to="/">HOME</NuxtLink>
      <NuxtLink class="btn btn-sm" to="/players">PLAYERS</NuxtLink>
      <NuxtLink class="btn btn-sm" to="/games-stat">STAT</NuxtLink>
      <NuxtLink class="btn btn-sm" to="/setting">SETTING</NuxtLink>
    </div>
    <slot />
  </div>
</template>