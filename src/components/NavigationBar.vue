<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark border-bottom border-1 border-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <img src="../assets/images/personal.svg" alt="Timothy Lin's logo" width="30" height="30"
             class="d-inline-block align-text-top me-1">
        Timothy Lin
      </RouterLink>

      <button
          class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarItems"
          aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarItems">
        <div class="navbar-nav">
          <RouterLink to="/posts" class="nav-link">Blog</RouterLink>

          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Places
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="https://github.com/tmthyln/">
                <i class="fab fa-fw fa-github-square" aria-hidden="true"></i> GitHub
              </a></li>
              <li><a class="dropdown-item" href="https://www.linkedin.com/in/tmthyln/">
                <i class="fab fa-fw fa-linkedin" style="color: #0077B5" aria-hidden="true"></i> LinkedIn
              </a></li>
              <li><a class="dropdown-item" href="https://work.timothylin.me/">
                <i class="fas fa-fw fa-pen-nib" aria-hidden="true"></i> Polywork
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>