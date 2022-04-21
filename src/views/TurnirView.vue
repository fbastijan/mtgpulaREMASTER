<template>
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <h1>Generator turnira</h1>
      <div
        v-if="
          igraci.statusTurnir !== 'active' && igraci.statusTurnir !== 'finished'
        "
      >
        <div>
          <div class="row">
            <div class="col">
              <input
                type="text"
                id="imeturnira"
                class="form-control"
                placeholder="Ime turnira"
                v-model="igraci.imeTurnira"
              />
            </div>
            <div class="col-3">
              <input
                type="number"
                id="brojRundi"
                class="form-control"
                placeholder="Br rundi"
                v-model.number="igraci.brojRundi"
              />
            </div>
          </div>

          <button
            type="button"
            class="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Izaberi igrače
          </button>
        </div>
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
      <matchupComp v-if="igraci.statusTurnir === 'active'" />
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

import { organizator } from "@/organizator";
import matchupComp from "@/components/matchup.vue";

/*let playeri = [
  { DCI: "1234122", usern,ame: "Markić" },
  { DCI: "1234152", username: "Darkić" },
  { DCI: "5234152", username: "Farkić" }
];*/
export default {
  data() {
    return {
      playeri: [],
      igraci,
      Odabrani: [],
    };
  },

  components: {
    Playeriturnir,
    odabraniIgraci,
    matchupComp,
  },
  methods: {
    proba() {
      igraci.turnir = organizator.newTournament({
        format: "swiss",
        bestOf: 3,
        rounds: this.igraci.brojRundi,
        pointsForDraw: 1,
        pointsForWin: 3,
        sorting: "descending",
        tiebreakers: [
          "opponent match win percentage",
          "game win percentage",
          "opponent game win percentage",
        ],
      });
      console.log(igraci.turnir);
    },
    spariIgrace() {
      console.log("tuje");
    },
    turnirStart() {
      if (igraci.brojRundi === null) {
        alert("Prvo izaberi broj rundi pa možeš pokrenuti turnir");
      } else {
        igraci.turnir = organizator.newTournament({
          format: "swiss",
          bestOf: 3,
          name: igraci.imeTurnira,
          rounds: this.igraci.brojRundi,
          pointsForDraw: 1,
          pointsForWin: 3,
          sorting: "descending",
          tiebreakers: [
            "opponent match win percentage",
            "game win percentage",
            "opponent game win percentage",
          ],
        });
        igraci.listaIgraca.forEach((el) => {
          igraci.turnir.addPlayer({ alias: el.username, id: el.id });
        });
        igraci.turnir.startEvent();
        igraci.statusTurnir = igraci.turnir.status;
        console.log(igraci.turnir);
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
<style scoped>
.row {
  margin: auto;
}
</style>
