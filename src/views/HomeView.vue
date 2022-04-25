<template>
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <apex-chart
        width="380"
        type="radialBar"
        :options="options"
        :series="series"
      ></apex-chart>
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
          <tr v-for="(poredan, index) in leaders" :key="index" :info="poredan">
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
    <div class="col"></div>
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
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase.js";
import store from "@/store";
import igraci from "@/igraci";
export default {
  methods: {
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
    getDataFromCurrent() {
      console.log("firebase dohvat...");
      const docRef = doc(db, "users", store.currentUid);
      getDoc(docRef).then((doc) => {
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
  },
  data() {
    return {
      series: [0],
      igraci,
      store,
      leaders: [],
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
