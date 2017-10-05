<template>
  <v-app>
    <v-navigation-drawer app>
      <v-toolbar class="primary" dark>
        <v-flex>
          <v-btn href="https://stackoverflow.com/users/6646558/caleb-anthony" icon>
            <v-icon style="font-size:24px">fa-stack-overflow</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn href="http://github.com/calebanthony" icon>
            <v-icon style="font-size:24px">fa-github</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn href="https://www.linkedin.com/in/calebanthony/" icon>
            <v-icon style="font-size:24px">fa-linkedin</v-icon>
          </v-btn>
        </v-flex>
      </v-toolbar>
      <v-list>
        <v-list-tile @click="" nuxt to="/" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group v-for="item in items" :key="item.title">
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="post in item.items" :key="post.title" @click="" nuxt :to="post.permalink">
            <v-list-tile-content>
              <v-list-tile-title>{{ post.title }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="post.subtitle">{{ post.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <main>
      <v-content>
          <nuxt/>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  props: [
    'blogs'
  ],
  data: () => ({
    items: [
      {
        icon: 'message',
        title: 'Blog',
        href: '/blog',
        items: [
          {title: 'Client/Server Communication', permalink: '/blog/client-server-communication-socket-io'},
          {title: 'Building a Component Library', permalink: '/blog/building-component-library'},
          {title: 'Laravel Mix with Bootstrap 4', permalink: '/blog/laravel-mix-and-bootstrap4'},
          {title: 'Modular Pages in Laravel 5', permalink: '/blog/building-pages-with-modularized-controllers'},
          {title: 'Bootstrap 4 with Laravel 5', permalink: '/blog/bootstrap-with-laravel'}
        ]
      },
      // {
      //   icon: 'assignment',
      //   title: 'Essays',
      //   href: '/essays',
      //   items: [
      //     {title: 'Hello World', permalink: '/essays/hello-world'}
      //   ]
      // },
      {
        icon: 'lightbulb_outline',
        title: 'Projects',
        href: '/projects',
        items: [
          {title: 'Sanctum Falls', permalink: '/projects/sanctum-falls', subtitle: 'Fansite for guides for Gigantic'},
          {title: 'Spook', permalink: '/projects/spook', subtitle: 'Base theme template for Ghost'},
          {title: 'Town of Salem Assistant', permalink: '/projects/town-of-salem-assistant', subtitle: 'Helper tool for Town of Salem'}
        ]
      }
    ]
  })
}
</script>
