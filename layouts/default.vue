<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :href="item.href"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fill-height class="align-content-start">
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-newspaper',
          title: 'Notes',
          to: '/notes',
        },
        {
          icon: 'mdi-sitemap',
          title: 'Viewer',
          to: '/view',
        },
        {
          icon: 'mdi-vector-polyline-edit',
          title: 'Modeller',
          to: '/modeller',
        },
        {
          icon: 'mdi-github',
          title: 'Repository',
          href: 'https://github.com/joeczar/nuxt2-js-bpmn',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'BPMN Test',
    }
  },
}
</script>
