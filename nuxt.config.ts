// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  ssr: false,
});
