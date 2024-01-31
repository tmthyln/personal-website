<script setup lang="ts">
import {ref} from "vue";

const expandMenu = ref(false);
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
            <a class="navbar-item" href="https://github.com/tmthyln/">
              <i class="fab fa-fw fa-github-square" aria-hidden="true"></i> GitHub
            </a>
            <a class="navbar-item" href="https://www.linkedin.com/in/tmthyln/">
              <i class="fab fa-fw fa-linkedin" style="color: #0077B5" aria-hidden="true"></i> LinkedIn
            </a>
            <a class="navbar-item" href="https://work.timothylin.me/">
              <i class="fas fa-fw fa-pen-nib" aria-hidden="true"></i> Polywork
            </a>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>