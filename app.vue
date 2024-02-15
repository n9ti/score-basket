<script setup>
// --------------
// Disable Pinch Zoom on Mobile Web (iOS)
// https://stackoverflow.com/questions/11689353/disable-pinch-zoom-on-mobile-web/52201924#52201924
// --------------
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
  // special hack to prevent zoom-to-tabs gesture in safari
  document.body.style.zoom = 0.99;
});
document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
  // special hack to prevent zoom-to-tabs gesture in safari
  document.body.style.zoom = 0.99;
});
document.addEventListener('gestureend', function (e) {
  e.preventDefault();
  // special hack to prevent zoom-to-tabs gesture in safari
  document.body.style.zoom = 0.99;
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  touch-action: manipulation;
}
</style>