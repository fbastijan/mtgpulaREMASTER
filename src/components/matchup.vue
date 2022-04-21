<template>
  <div>
    <h2>Runda: {{ igraci.turnir.currentRound }}</h2>
    <ul class="list-group">
      <rundaMatchup
        v-for="matchups in igraci.turnir.matches"
        :key="matchups.id"
        :info="matchups"
      />
    </ul>
    <button type="button" class="btn mt-2 btn-primary" @click="sljRunda()">
      Sljedeća runda
    </button>
  </div>
</template>
<script>
import igraci from "@/igraci";

import rundaMatchup from "@/components/rundaMatchup.vue";

export default {
  name: "matchupIgraci",
  props: ["info"],
  components: {
    rundaMatchup,
  },
  data() {
    return {
      igraci,
    };
  },
  methods: {
    sljRunda() {
      if (igraci.turnir.currentRound === igraci.turnir.rounds) {
        igraci.statusTurnir = "finished";
      }
      igraci.turnir.nextRound();

      let poredak = [];
      console.log(igraci.turnir.standings(false));
      poredak.push(...igraci.turnir.standings(false));

      poredak.forEach((element) => {
        console.log(
          element.alias,
          " broj bodova:",
          element.matchPoints,
          " tiebreakeri ",
          element.tiebreakers
        );
      });
    },
  },
};
</script>
