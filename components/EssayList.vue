<template>
  <div>
    <div v-for="essay in this.essays">
      <v-divider></v-divider>
      <v-list-tile :key="essay.title" @click="" nuxt :to="essay.permalink">
        <v-list-tile-content>
          <v-list-tile-title>{{ essay.title }}</v-list-tile-title>
          <v-list-tile-sub-title>Published {{ essay.date }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </div>
  </div>
</template>

<script>
export default {
  props: ['essays']
}
</script>
