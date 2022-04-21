<template>
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <h1
        v-if="
          igraci.turnir.status === 'active' ||
          igraci.turnir.status === 'finished'
        "
      >
        {{ igraci.turnir.name }} turnir
      </h1>

      <div
        v-if="
          igraci.turnir.status !== 'active' &&
          igraci.turnir.status !== 'finished'
        "
      >
        <h1>Generator turnira</h1>
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
      <table
        class="table"
        v-if="
          igraci.turnir.status === 'active' ||
          igraci.turnir.status === 'finished'
        "
      >
        <thead class="bg-dark bg-gradient text-white">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ime igrača</th>
            <th scope="col">Bodovi</th>
            <th scope="col">OMP</th>
            <th scope="col">GWP</th>
            <th scope="col">OGP</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(poredan, index) in igraci.standingsIgraci"
            :key="poredan.id"
            :info="poredan"
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ poredan.alias }}</td>
            <td>{{ poredan.matchPoints }}</td>
            <td>
              {{
                Number.parseFloat(
                  poredan.tiebreakers.oppMatchWinPct * 100
                ).toFixed(2)
              }}%
            </td>
            <td>
              {{
                Number.parseFloat(poredan.tiebreakers.gameWinPct * 100).toFixed(
                  2
                )
              }}%
            </td>
            <td>
              {{
                Number.parseFloat(
                  poredan.tiebreakers.oppGameWinPct * 100
                ).toFixed(2)
              }}%
            </td>
          </tr>
        </tbody>
      </table>

      <matchupComp v-if="igraci.turnir.status === 'active'" />
      <button
        type="button"
        class="btn mt-2 btn-primary"
        v-if="igraci.turnir.status === 'finished'"
      >
        Završi turnir
      </button>
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
        rounds: this.brRundi,
        pointsForDraw: 1,
        pointsForWin: 3,
        sorting: "descending",
        name: this.ime,
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
          rounds: igraci.brojRundi,
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
        igraci.standingsIgraci = igraci.turnir.standings();
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
