<template>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">
        <label>{{ info.username }}</label>
      </div>
      <label class=""> DCI: {{ info.DCI }}</label>
    </div>
    <button type="" class="btn-close mt-2" @click="deletePlayers()"></button>
  </li>
</template>
<script>
import igraci from "@/igraci";
export default {
  name: "odabrani-igraci",
  props: ["info"],
  methods: {
    deletePlayers() {
      for (var i = 0; i < igraci.listaIgraca.length; i++) {
        if (igraci.listaIgraca[i].username === this.info.username) {
          igraci.listaIgraca.splice(i, 1);
          i--;
        }
      }
    },
  },
};
</script>
