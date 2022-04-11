<template>
  <div class="row mt-5">
    <div class="col"></div>
    <div class="col-6">
      <h1>Generator turnira</h1>
      <div v-if="igraci.zapoceoTurnir === false">
        <label for="brojRundi" class="form-label">Upiši broj rundi</label>
        <input
          type="number"
          id="brojRundi"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="matchup.brojRundi"
        />
        <button
          type="button"
          class="btn btn-primary my-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Izaberi igrače
        </button>

        <ol class="list-group list-group-numbered">
          <odabraniIgraci
            v-for="igrac in Odabrani"
            :key="igrac.id"
            :info="igrac"
          />
        </ol>

        <button
          type="button"
          class="btn mt-2 btn-primary"
          v-if="igraci.listaIgraca.length !== 0"
          @click="turnirStart()"
        >
          Započni turnir
        </button>
      </div>
      <matchupComp v-if="igraci.zapoceoTurnir === true" />
    </div>
    <div class="col"></div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Izaberi igrače</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <ul class="list-group">
                <Playeriturnir
                  v-for="player in playeri"
                  :key="player.id"
                  :info="player"
                />
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Playeriturnir from "@/components/playeriturnir.vue";
import odabraniIgraci from "@/components/odabraniigraci.vue";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase.js";
import igraci from "@/igraci";
import matchup from "@/matchupi";
import matchupComp from "@/components/matchup.vue";

/*let playeri = [
  { DCI: "1234122", usern,ame: "Markić" },
  { DCI: "1234152", username: "Darkić" },
  { DCI: "5234152", username: "Farkić" }
];*/
export default {
  data() {
    return {
      options: ["2-0", "2-1", "1-1", "1-2", "0-2"],
      value: "2-0",
      playeri: [],
      igraci,
      Odabrani: [],
      matchup,
    };
  },

  components: {
    Playeriturnir,
    odabraniIgraci,
    matchupComp,
  },
  methods: {
    compare(a, b) {
      if (a.player1 < b.player1) {
        return -1;
      }
      if (a.player1 > b.player1) {
        return 1;
      }
      return 0;
    },
    spariIgrace() {
      let runda = [];
      for (var i = 0; i < igraci.listaIgraca.length; i += 2) {
        runda.push({
          id: i,
          player1: igraci.listaIgraca[i].id,
          player2: igraci.listaIgraca[i + 1].id,
          rez: undefined,
        });
      }
      matchup.listaMatchupa.push(runda);
    },
    turnirStart() {
      if (matchup.brojRundi === null) {
        alert("Prvo izaberi broj rundi pa možeš pokrenuti turnir");
      } else {
        if (igraci.listaIgraca.length % 2 !== 0) {
          igraci.listaIgraca.push({
            id: 0,
            username: "bye",
            DCI: "",
            omw: 0,
            odigrano: [],
            gwp: 0,
            ogw: 0,
            points: 0,
          });
        }

        this.spariIgrace();
        matchup.listaMatchupa[0].forEach((el) => {
          console.log("matchup:", el.player1, " ", el.player2);
        });
        console.log("broj rundi:", matchup.brojRundi);
        this.spariIgrace();
        this.igraci.zapoceoTurnir = true;
        matchup.listaMatchupa[1].sort(this.compare);
        console.log(
          "sada si u rundi:",
          matchup.tekucaRunda,
          "   ",
          matchup.listaMatchupa[1][0].player1
        );
      }
    },

    getPlayers() {
      console.log("firebase dohvat...");
      const docRef = collection(db, "users");
      onSnapshot(docRef, (snapshot) => {
        this.playeri = [];
        snapshot.docs.forEach((doc) => {
          this.playeri.push({
            ...doc.data(),
            id: doc.id,
            odigrano: [],
            wins: 0,
            loses: 0,
            omw: 0,
            gwp: 0,
            ogw: 0,
            points: 0,
          });
        });
      });
    },
  },
  mounted() {
    this.getPlayers();
    this.Odabrani = igraci.listaIgraca;
  },
  created() {
    window.addEventListener("beforeunload", function (event) {
      event.returnValue = "Write something";
    });
  },
};
</script>
