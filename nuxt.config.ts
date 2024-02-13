// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  colorMode: {
    preference: "retro", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  ssr: false,
});
