<template>
  <li class="list-group-item">
    <div class="row align-items-center">
      <div class="col">
        <label class="">{{ getPlayer1 }}</label>
      </div>
      <div class="col-6">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ rezultat }}
          </button>
          <ul
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            role="menu"
          >
            <li v-for="option in options" :key="option">
              <a
                class="dropdown-item"
                @click="
                  rezultat = option;
                  setRezultat();
                "
                href="javascript:void(0)"
                >{{ option }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col">
        <label>{{ getPlayer2 }}</label>
      </div>
    </div>
  </li>
</template>
<script>
import igraci from "@/igraci";
import matchup from "@/matchupi";
export default {
  name: "matchupRunda",
  props: ["info"],

  data() {
    return {
      options: ["2-0", "2-1", "1-1", "1-2", "0-2"],
      rezultat: "2-0",
      igraci,
      matchup,
    };
  },
  methods: {
    setRezultat() {
      let matchupIndex = matchup.listaMatchupa[
        matchup.tekucaRunda - 1
      ].findIndex((obj) => obj.id == this.info.id);
      matchup.listaMatchupa[matchup.tekucaRunda - 1][matchupIndex].rez =
        this.rezultat;
    },
  },
  computed: {
    getPlayer1() {
      let playerIndex = igraci.listaIgraca.findIndex(
        (obj) => obj.id == this.info.player1
      );
      return igraci.listaIgraca[playerIndex].username;
    },
    getPlayer2() {
      let playerIndex = igraci.listaIgraca.findIndex(
        (obj) => obj.id == this.info.player2
      );
      return igraci.listaIgraca[playerIndex].username;
    },
  },
  mounted() {
    this.setRezultat();
  },
};
</script>
