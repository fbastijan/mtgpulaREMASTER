<template>
  <div class="login mt-5 mb-auto pt-5">
    <h1>Prijava</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group mt-4">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="userEmail"
                class="form-control mt-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Upiši Email"
              />
            </div>
            <div class="form-group mt-4">
              <label for="exampleInputPassword1">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control mt-2"
                id="exampleInputPassword1"
                placeholder="Upiši lozinku"
              />
            </div>
            <button type="button" class="btn btn-primary mt-4" @click="login()">
              Submit
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      userEmail: "",
      password: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.userEmail, this.password)
        .then((result) => {
          console.log("prijava za", result);
        })
        .catch((e) => {
          console.error("greška", e);
          alert("Pogrešan Password ili e-mail!");
        });
    },
  },
};
</script>
<style>
.btn-primary {
  background-color: #ffa500 !important;
  border-color: white !important;
}
</style>
