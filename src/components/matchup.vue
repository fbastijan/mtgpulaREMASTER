<template>
  <div>
    <h2>Runda: {{ matchup.tekucaRunda }}</h2>
    <ul class="list-group">
      <rundaMatchup
        v-for="matchup in matchup.listaMatchupa[matchup.tekucaRunda - 1]"
        :key="matchup.id"
        :info="matchup"
      />
    </ul>
    <button type="button" class="btn mt-2 btn-primary" @click="sljRunda()">
      Sljedeća runda
    </button>
  </div>
</template>
<script>
import igraci from "@/igraci";
import matchup from "@/matchupi";
import rundaMatchup from "@/components/rundaMatchup.vue";

export default {
  name: "matchupIgraci",
  props: ["info"],
  components: {
    rundaMatchup,
  },
  data() {
    return {
      options: ["2-0", "2-1", "1-1", "1-2", "0-2"],
      value: "2-0",
      igraci,
      matchup,
    };
  },
  methods: {
    sljRunda() {
      matchup.tekucaRunda += 1;
    },
  },
};
</script>
