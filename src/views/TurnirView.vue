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
        @click="turnirEnd()"
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
              <input
                type="text"
                id="pretraga"
                class="form-control"
                placeholder="Ime playera"
                v-model="pretraga"
                @input="getPlayers()"
              />

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
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  updateDoc,
  increment,
  query,
  where,
} from "firebase/firestore";
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
      pretraga: "",
    };
  },

  components: {
    Playeriturnir,
    odabraniIgraci,
    matchupComp,
  },
  methods: {
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
      }
    },
    turnirEnd() {
      let standings = [];
      let raw = igraci.turnir.standings();
      raw.forEach((el) => {
        standings.push({
          id: el.id,
          alias: el.alias,
          matchPoints: el.matchPoints,
          tiebreakers: el.tiebreakers,
        });
      });
      console.log(igraci.turnir.startTime.toString());
      setDoc(doc(collection(db, "turniri")), {
        date: igraci.turnir.startTime.toString(),
        name: igraci.turnir.name,
        standings,
      }).then(() => {
        this.updateBodovi(raw);
        this.updateWin(raw);
        this.updateTop3(raw);
        this.inicijalizirajTurnir();
      });
      this.$router.push({ path: "/" });
    },
    inicijalizirajTurnir() {
      igraci.turnir = [];
      igraci.statusTurnir = "";
      igraci.listaIgraca = [];
      igraci.imeTurnira = "";
      igraci.brojRundi = null;
    },
    updateWin(polje) {
      updateDoc(doc(collection(db, "users"), polje[0].id), {
        ukPobjede: increment(1),
      });
    },
    updateTop3(polje) {
      for (let i = 0; i <= 2; i++) {
        updateDoc(doc(collection(db, "users"), polje[i].id), {
          ukTop3: increment(1),
        });
      }
    },
    updateBodovi(polje) {
      polje.forEach((el) => {
        updateDoc(doc(collection(db, "users"), el.id), {
          ukBodovi: increment(el.matchPoints),
          moguciBodovi: increment(igraci.brojRundi * 3),
        });
      });
    },
    getPlayers() {
      if (this.pretraga !== "") {
        if (this.pretraga === "all") this.pretraga = "";
        console.log("firebase dohvat...");
        const docRef = collection(db, "users");
        const q = query(
          docRef,
          where("username", ">=", this.pretraga),
          where("username", "<=", this.pretraga + "\uf8ff")
        );
        onSnapshot(q, (snapshot) => {
          this.playeri = [];
          snapshot.docs.forEach((doc) => {
            this.playeri.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
      }
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
