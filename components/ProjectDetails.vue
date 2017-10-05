<template>
  <v-layout row wrap>
    <v-flex xs12 md4>
      <v-btn @click="" :href="github" class="dark-primary white--text">
        <v-icon left medium>fa-github</v-icon>
        View on GitHub
      </v-btn>
    </v-flex>
    <v-flex xs12 md4 v-if="source !== '/#/'">
      <v-btn @click="" :href="source" class="dark-primary white--text">
        <v-icon left medium>web</v-icon>
        View Live Project
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'github',
    'source'
  ]
}
</script>
