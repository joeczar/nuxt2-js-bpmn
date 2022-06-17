<template>
  <v-card class="mx-auto" max-width="800" elevation="2">
    <v-card-title>
      {{ page.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ page.description }}
    </v-card-subtitle>
    <v-card-text>
      <nuxt-content :document="page" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const page = await $content(slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found', err })
      })

    return {
      page,
    }
  },
}
</script>
