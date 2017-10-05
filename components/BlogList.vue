<template>
  <div>
    <div v-for="blog in this.blogs">
      <v-divider></v-divider>
      <v-list-tile :key="blog.title" @click="" nuxt :to="blog.permalink">
        <v-list-tile-content>
          <v-list-tile-title>{{ blog.title }}</v-list-tile-title>
          <v-list-tile-sub-title>Published {{ blog.date }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blogs']
}
</script>
