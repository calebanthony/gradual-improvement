<template>
  <article>
    <v-layout>
      <v-flex xs12 md8 offset-md1>
        <h2 class="grey--text text--darken-3">{{ project.title }}</h2>
        <nuxtent-body :body="project.body" />
      </v-flex>
    </v-layout>
  </article>
</template>

<script>
export default {
  asyncData: async ({ app, route, payload }) => ({
    project: await app.$content('/projects').get(route.path) || payload
  })
}
</script>
