<template>
  <div>
    <div v-for="project in this.projects">
      <v-divider></v-divider>
      <v-list-tile :key="project.title" @click="" nuxt :to="project.permalink">
        <v-list-tile-content>
          <v-list-tile-title>{{ project.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ project.blurb }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </div>
  </div>
</template>

<script>
export default {
  props: ['projects']
}
</script>
