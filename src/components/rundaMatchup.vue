<template>
  <li class="list-group-item" v-if="info.round === igraci.turnir.currentRound">
    <div class="row align-items-center">
      <div class="col">
        {{ getPlayer1 }}
      </div>
      <div class="col-md">
        <div class="dropdown">
          <button
            :disabled="!info.playerTwo"
            class="btn btn-primary dropdown-toggle"
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
        {{ getPlayer2 }}
      </div>
    </div>
  </li>
</template>
<script>
import igraci from "@/igraci";

export default {
  name: "matchupRunda",
  props: ["info"],

  data() {
    return {
      options: ["2-0", "2-1", "1-1", "1-2", "0-2", "1-0", "0-1"],
      rezultat: " --- ",
      igraci,
      byeCheck: false,
    };
  },
  methods: {
    setRezultat() {
      switch (this.rezultat) {
        case "2-0":
          igraci.turnir.enterResult(this.info.id, [2, 0]);
          igraci.standingsIgraci = igraci.turnir.standings();
          break;
        case "1-0":
          igraci.turnir.enterResult(this.info.id, [1, 0]);
          igraci.standingsIgraci = igraci.turnir.standings();
          break;
        case "0-1":
          igraci.turnir.enterResult(this.info.id, [0, 1]);
          igraci.standingsIgraci = igraci.turnir.standings();
          break;
        case "2-1":
          igraci.turnir.enterResult(this.info.id, [2, 1]);
          igraci.standingsIgraci = igraci.turnir.standings();
          break;
        case "1-1":
          igraci.turnir.enterResult(this.info.id, [0, 0, 1]);
          igraci.standingsIgraci = igraci.turnir.standings();
          break;
        case "1-2":
          igraci.turnir.enterResult(this.info.id, [1, 2]);
          igraci.standingsIgraci = igraci.turnir.standings();
          break;
        case "0-2":
          igraci.turnir.enterResult(this.info.id, [0, 2]);

          break;
      }
    },
  },
  computed: {
    getPlayer1() {
      let playerIndex = igraci.listaIgraca.findIndex(
        (obj) => obj.id == this.info.playerOne
      );
      return igraci.listaIgraca[playerIndex].username;
    },
    getPlayer2() {
      if (!this.info.playerTwo) {
        return "bye";
      } else {
        let playerIndex = igraci.listaIgraca.findIndex(
          (obj) => obj.id == this.info.playerTwo
        );
        return igraci.listaIgraca[playerIndex].username;
      }
    },
  },
  mounted() {
    igraci.standingsIgraci = igraci.turnir.standings();
  },
};
</script>
