<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 md4>
        <v-card>
          <v-card-media
            height="400px"
            src="/profile.jpg"
          ></v-card-media>
          <v-card-title class="title white--text dark-primary">About Me</v-card-title>
          <v-card-text>
              <v-chip class="dark-primary white--text">
                <v-avatar class="grey darken-3">
                  <v-icon>code</v-icon>
                </v-avatar>
                Web Developer
              </v-chip>
              <v-chip class="purple white--text">
                <v-avatar class="grey darken-3">
                  <v-icon>work</v-icon>
                </v-avatar>
                Working at DataJoe
              </v-chip>
              <v-chip class="teal white--text">
                <v-avatar class="grey darken-3">
                  <v-icon>school</v-icon>
                </v-avatar>
                Graduated from UNC
              </v-chip>
              <v-chip class="green white--text">
                <v-avatar class="grey darken-3">
                  <v-icon>book</v-icon>
                </v-avatar>
                Reading: {{ this.currentBook }}
              </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md4>
        <v-layout wrap>
          <v-flex d-flex xs12>
            <v-card>
              <v-card-title class="title white--text primary">Projects</v-card-title>
              <v-card-text>
                <v-list three-line>
                  <v-subheader>Independent work</v-subheader>
                  <ProjectList :projects="projects"></ProjectList>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
          <!-- <v-flex d-flex xs12>
            <v-card>
              <v-card-title class="title white--text red darken-2">Essays</v-card-title>
              <v-card-text>
                <v-list three-line>
                  <v-subheader>Longer thought pieces</v-subheader>
                  <EssayList :essays="essays"></EssayList>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex> -->
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 md4>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card>
              <v-card-title class="title white--text green dark-1">Blog</v-card-title>
              <v-card-text>
                <v-list three-line>
                  <v-subheader>Most recent thoughts and tutorials</v-subheader>
                  <BlogList :blogs="blogs"></BlogList>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BlogList from '~/components/BlogList.vue'
import EssayList from '~/components/EssayList.vue'
import ProjectList from '~/components/ProjectList.vue'

export default {
  data () {
    return {
      currentBook: 'Eat Yourself Smart'
    }
  },
  asyncData: async ({ app }) => ({
    essays: (await app.$content('/essays').getAll()).slice(0, 1),
    blogs: (await app.$content('/blog').getAll()).slice(0, 6),
    projects: (await app.$content('/projects').getAll()).slice(0, 3)
  }),
  components: {
    BlogList,
    EssayList,
    ProjectList
  }
}
</script>
