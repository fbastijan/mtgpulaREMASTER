<template>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">
        <label>{{ info.username }}</label>
      </div>
      <label class=""> DCI: {{ info.DCI }}</label>
    </div>

    <button type="submit" class="btn btn-primary" @click="getPlayers()">
      Dodaj
    </button>
  </li>
</template>
<script>
import igraci from "@/igraci";
export default {
  name: "playeri-turnir",
  props: ["info"],
  data() {
    return {
      igraci,
    };
  },
  methods: {
    getPlayers() {
      let provjeri = igraci.listaIgraca.filter((el) => this.info.id === el.id);
      if (provjeri.length === 0) {
        igraci.listaIgraca.push(this.info);
        console.log(this.info.id);
      } else {
        alert("Vec si dodao tog igrača");
      }
    },
  },
};
</script>
