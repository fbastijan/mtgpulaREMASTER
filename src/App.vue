<template>
  <div id="app" class="bg-light">
    <nav class="nav navbar navbar-expand-lg navbar-light bg-dark bg-gradient">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-white me-auto" href="#"
          ><img src="@/assets/magic.png" width="30" height="50" class="mx-2" />
          <a>Mtg Pula</a>
        </router-link>

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
            <li class="nav-item" v-if="!store.currentUser">
              <router-link to="/login" class="nav-link text-white"
                >Login</router-link
              >
            </li>
            <li class="nav-item" v-if="!store.currentUser">
              <router-link to="/signup" class="nav-link text-white"
                >Signup</router-link
              >
            </li>
            <li class="nav-item" v-if="store.currentUser">
              <a class="nav-link text-white" href="#" @click="signout()"
                >Signout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
    <div id="footer" class="text-center mt-auto">
      Ovo je footer. (c) 2019 mi svi skupa.
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import store from "@/store";
import router from "@/router";

onAuthStateChanged(auth, (user) => {
  const currentRoute = router.currentRoute;
  if (user) {
    console.log("*** User", store.currentUser);
    store.currentUser = user.email;
    if (!currentRoute.meta.needsUser) {
      router.push({ name: "home" });
    }
  } else {
    console.log("*** User", store.currentUser);
    store.currentUser = null;
    if (currentRoute.meta.needsUser) {
      router.push({ name: "login" });
    }
  }
});

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    signout() {
      signOut(auth)
        .then(() => {
          store.currentUser = null;
        })
        .catch((e) => {
          console.error("Greška", e);
        });
    },
  },
};
</script>
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
