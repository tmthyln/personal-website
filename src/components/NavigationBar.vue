<script setup lang="ts">
import {ref} from "vue";

const expandMenu = ref(false);

const placeLinks = [
    {
        text: 'GitHub',
        link: 'https://github.com/tmthyln/',
        icon: '<i class="fab fa-fw fa-github-square" aria-hidden="true">',
    }, {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/in/tmthyln/',
        icon: '<i class="fab fa-fw fa-linkedin" style="color: #0077B5" aria-hidden="true"></i>',
    }, {
        text: 'Polywork',
        link: 'https://work.timothylin.me/',
        icon: '<i class="fas fa-fw fa-pen-nib" aria-hidden="true"></i>',
    },
];
</script>

<template>
  <nav class="navbar is-primary is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/" @click="expandMenu = false">
        <img class="mr-2" src="../assets/images/personal.svg" width="30" height="30" alt="Timothy Lin's logo">
        <span>Timothy Lin</span>
      </RouterLink>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="expandMenu = !expandMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active': expandMenu}">
      <div class="navbar-start">

        <RouterLink class="navbar-item" to="/posts" @click="expandMenu = false">
          Blog
        </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <p class="navbar-link">
            Places
          </p>

          <div class="navbar-dropdown">
            <a v-for="place in placeLinks" :key="place.link" class="navbar-item" :href="place.link">
              <div class="is-flex is-align-items-center">
                <span class="icon" v-html="place.icon"></span>
                <span>{{ place.text }}</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>