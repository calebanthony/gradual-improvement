<template>
  <article>
    <v-flex xs12 md8 offset-md1>
      <h2 class="grey--text text--darken-3"> {{ essay.title }} </h2>
      <h3 class="grey--text text--darken-1"> Published {{ essay.date }} </h3>
      <nuxtent-body :body="essay.body" />
    </v-flex>
  </article>
</template>

<script>
export default {
  asyncData: async ({ app, route, payload }) => ({
    essay: await app.$content('/essays').get(route.path) || payload
  })
}
</script>
