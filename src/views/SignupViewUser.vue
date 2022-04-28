<template>
  <div class="login mt-5 mb-auto pt-5">
    <h1>Registracija</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group mt-4">
              <label for="Email">Email adresa</label>
              <input
                v-model="userEmail"
                type="email"
                class="form-control mt-2"
                id="Email"
                aria-describedby="emailHelp"
                placeholder="Upiši Email"
              />
            </div>
            <div class="form-group mt-4">
              <label for="Username">Username</label>
              <input
                type="text"
                class="form-control mt-2"
                id="Username"
                v-model="username"
                aria-describedby="Username"
                placeholder="Upiši Username"
              />
            </div>
            <div class="form-group mt-4">
              <label for="Username">DCI</label>
              <input
                type="text"
                class="form-control mt-2"
                id="DCI"
                v-model="DCI"
                aria-describedby="DCI"
                placeholder="Upiši svoj DCI broj"
              />
            </div>
            <div class="form-group mt-4">
              <label for="lozinka">Lozinka</label>
              <input
                v-model="password"
                type="password"
                class="form-control mt-2"
                id="Lozinka"
                placeholder="Upiši lozinku"
              />
            </div>
            <div class="form-group mt-4">
              <label for="ponovilozinku">Ponovi lozinku</label>
              <input
                v-model="repeatPassword"
                type="password"
                class="form-control mt-2"
                id="ponovilozinku"
                placeholder="Ponovi lozinku"
              />
            </div>
            <button
              type="button"
              class="btn btn-primary mt-4"
              @click="signup()"
            >
              Registriraj se!
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.js";

export default {
  data() {
    return {
      userEmail: "",
      username: "",
      password: "",
      repeatPassword: "",
      DCI: "",
    };
  },
  methods: {
    async signup() {
      if (this.username === "" || this.DCI === "") {
        alert("Ispunite sva prazna polja");
      } else if (this.password.length < 6) {
        alert("Lozinka mora sadržavati barem 6 znakova");
      } else if (this.password != this.repeatPassword) {
        alert("Lozinke se ne podudaraju!");
      } else {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, this.userEmail, this.password)
          .then((cred) => {
            console.log("uspješna registracija");
            return setDoc(doc(collection(db, "users"), cred.user.uid), {
              username: this.username,
              DCI: this.DCI,
              ukPobjede: 0,
              ukTop3: 0,
              ukBodovi: 0,
              moguciBodovi: 0,
            });
          })
          .catch(function (e) {
            console.error("Greška", e);
            alert("Pogrešan email ili prekratak password");
          });
      }
    },
  },
};
</script>
<style>
.btn-primary {
  background-color: #ffa500 !important;
}
</style>
