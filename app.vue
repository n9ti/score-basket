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

// 

const { $pwa } = useNuxtApp()
onMounted(() => {
  if ($pwa.offlineReady)
    alert('App ready to work offline')
})
</script>

<template>
  <NuxtPwaManifest />
  <div class="p-4" v-show="$pwa.needRefresh">
    <span>
      New version available, click on reload button to update.
    </span>

    <button class="btn btn-accent btn-xs" @click="$pwa.updateServiceWorker()">
      Reload
    </button>
  </div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  touch-action: manipulation;
}
</style>