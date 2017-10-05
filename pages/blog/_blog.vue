<template>
<article>
  <v-layout wrap>
    <v-flex xs12 md11 offset-md1>
      <h2 class="grey--text text--darken-3"> {{ post.title }} </h2>
      <h3 class="grey--text text--darken-1"> Published {{ post.date }} </h3>
    </v-flex>
    <v-flex xs12 md8 offset-md1>
      <nuxtent-body :body="post.body" />
    </v-flex>
  </v-layout>
</article>
</template>

<script>
export default {
  asyncData: async ({ app, route, payload }) => ({
    post: await app.$content('/blog').get(route.path) || payload
  })
}
</script>
