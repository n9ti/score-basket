<template>
  <div class="p-4">
    <div class="mb-8">
      <NuxtLink class="btn btn-sm" to="/">Home</NuxtLink> &nbsp;
      <NuxtLink class="btn btn-sm" to="/players">Players</NuxtLink> &nbsp;
      <NuxtLink class="btn btn-sm" to="/games-stat">Stat</NuxtLink> &nbsp;
      <NuxtLink class="btn btn-sm" to="/setting">Setting</NuxtLink> &nbsp;
    </div>
    <slot />
  </div>
</template>