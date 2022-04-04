<template>
  <div id="app" class="bg-light">
    <nav class="nav navbar navbar-expand-lg navbar-light bg-dark bg-gradient">
      <div class="container-fluid">
        <a class="navbar-brand text-white me-auto" href="#"
          ><img src="@/assets/magic.png" width="30" height="50" class="mx-2" />
          <a>Mtg Pula</a>
        </a>

        <button
          class="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-auto" id="navbarTogglerDemo02">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link text-white">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link text-white"
                >Signup</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
    <div id="footer" class="text-center mt-5">
      Ovo je footer. (c) 2019 mi svi skupa.
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #f8f9fa;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ffa500 !important;
    }
  }
}
</style>
