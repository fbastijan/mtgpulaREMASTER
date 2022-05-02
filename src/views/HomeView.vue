<template>
  <div>
    <h1 class="mt-5">Dobrodošao, {{ currentUsername }}!</h1>
    <div class="row">
      <div class="col"></div>

      <div class="col-6">
        <div class="my-3 card">
          <div class="card-header bg-dark h3 text-white bg-gradient">
            Tvoji rezultati
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <label class="h5">Tvoj winrate</label>
                <apex-chart
                  width="100%"
                  type="radialBar"
                  :options="options"
                  :series="series"
                ></apex-chart>
              </div>
              <div class="col-1">
                <div class="vr" style="height: 100%"></div>
              </div>
              <div class="col my-auto">
                <label class="d-flex h5"
                  >Pobjede ukupno: {{ currentPobjede }}</label
                >

                <label class="my-3 d-flex h5"
                  >Top 3 finish: {{ currentTop3 }}</label
                >

                <label class="h5 d-flex justify-content-between"
                  >Tvoji bodovi ukupno: {{ currentBodovi }}</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="my-3">
          <table class="table">
            <thead class="bg-dark bg-gradient text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ime igrača</th>
                <th scope="col">Pobjede</th>
                <th scope="col">Top3</th>
                <th scope="col">Ukupno Bodova</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(poredan, index) in leaders"
                :key="index"
                :info="poredan"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ poredan.username }}</td>
                <td>{{ poredan.ukPobjede }}</td>
                <td>
                  {{ poredan.ukTop3 }}
                </td>
                <td>
                  {{ poredan.ukBodovi }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col">
        <div class="my-3 card mt-3">
          <div class="card-header bg-dark h3 text-white bg-gradient">
            Završeni turniri
          </div>
          <div class="card-body">
            <ul
              class="list-group list-group-flush"
              v-for="(poredan, index) in turniri"
              :key="index"
              :info="poredan"
            >
              <li class="list-group-item">
                <div class="row">
                  <div class="col">
                    <h5>{{ poredan.name }}</h5>
                  </div>
                  <div class="col-6">
                    <label class="mx-auto">{{
                      preracunajDatum(Date.parse(poredan.date))
                    }}</label>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-link btn-sm ms-auto"
                      data-bs-toggle="modal"
                      :data-bs-target="'#myModal' + index"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          d="M12 3.5c-3.432 0-6.125 1.534-8.054 3.24C2.02 8.445.814 10.352.33 11.202a1.6 1.6 0 000 1.598c.484.85 1.69 2.758 3.616 4.46C5.876 18.966 8.568 20.5 12 20.5c3.432 0 6.125-1.534 8.054-3.24 1.926-1.704 3.132-3.611 3.616-4.461a1.6 1.6 0 000-1.598c-.484-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5zM1.633 11.945c.441-.774 1.551-2.528 3.307-4.08C6.69 6.314 9.045 5 12 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.111.111 0 01.017.056.111.111 0 01-.017.056c-.441.774-1.551 2.527-3.307 4.08C17.31 17.685 14.955 19 12 19c-2.955 0-5.309-1.315-7.06-2.864-1.756-1.553-2.866-3.306-3.307-4.08A.11.11 0 011.616 12a.11.11 0 01.017-.055z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  class="modal fade"
                  :id="'myModal' + index"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          {{ poredan.name }}
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="container-fluid">
                          <table class="table">
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
                                v-for="(igraci, a) in poredan.standings"
                                :key="a"
                              >
                                <th scope="row">{{ a + 1 }}</th>
                                <td>{{ igraci.alias }}</td>
                                <td>{{ igraci.matchPoints }}</td>
                                <td>
                                  {{
                                    Number.parseFloat(
                                      igraci.tiebreakers.oppMatchWinPct * 100
                                    ).toFixed(2)
                                  }}%
                                </td>
                                <td>
                                  {{
                                    Number.parseFloat(
                                      igraci.tiebreakers.gameWinPct * 100
                                    ).toFixed(2)
                                  }}%
                                </td>
                                <td>
                                  {{
                                    Number.parseFloat(
                                      igraci.tiebreakers.oppGameWinPct * 100
                                    ).toFixed(2)
                                  }}%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase.js";
import store from "@/store";
import igraci from "@/igraci";
import moment from "moment";
export default {
  methods: {
    preracunajDatum(datum) {
      return moment(datum).fromNow();
    },
    getLeaderboard() {
      console.log("firebase dohvat...");
      const docRef = collection(db, "users");
      const q = query(
        docRef,
        orderBy("ukPobjede", "desc"),
        orderBy("ukTop3", "desc"),
        orderBy("ukBodovi", "desc"),

        limit(10)
      );
      onSnapshot(q, (snapshot) => {
        this.leaders = [];
        snapshot.docs.forEach((doc) => {
          this.leaders.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });
    },
    getTurniri() {
      const docRef = collection(db, "turniri");
      const q = query(docRef, limit(15), orderBy("date", "desc"));
      onSnapshot(q, (snapshot) => {
        this.turniri = [];
        snapshot.docs.forEach((doc) => {
          this.turniri.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });
    },
    getDataFromCurrent() {
      console.log("firebase dohvat...");
      const docRef = doc(db, "users", store.currentUid);
      onSnapshot(docRef, (doc) => {
        this.currentUsername = doc.data().username;
        this.store.prava = doc.data().prava;
        this.currentPobjede = doc.data().ukPobjede;
        this.currentBodovi = doc.data().ukBodovi;
        this.currentTop3 = doc.data().ukTop3;
        this.series = [];
        this.series.push(
          Math.round((doc.data().ukBodovi / doc.data().moguciBodovi) * 100)
        );
      });
    },
  },

  mounted() {
    this.getDataFromCurrent();
    this.getLeaderboard();
    this.getTurniri();
  },
  data() {
    return {
      prava: false,
      series: [0],
      igraci,
      store,
      datum: Date.parse(
        "Mon Apr 25 2022 19:11:15 GMT+0200 (Central European Summer Time)"
      ),
      currentUsername: "",
      currentTop3: 0,
      currentPobjede: 0,
      currentBodovi: 0,
      leaders: [],
      turniri: [],
      options: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },

        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          colors: "#ffa500",
          gradient: {
            shade: "light",
          },
        },
        labels: ["Average Results"],
      },
    };
  },
};
</script>
<style scoped>
.row {
  margin-right: auto;
  margin-left: auto;
}
</style>
