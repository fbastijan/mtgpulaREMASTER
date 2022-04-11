<template>
  <div>
    <h2>Runda: {{ matchup.tekucaRunda }}</h2>
    <ul class="list-group">
      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col">
            <label class="fw-bold fs-4">player 1</label>
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
                {{ value }}
              </button>
              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                role="menu"
              >
                <li v-for="option in options" :key="option">
                  <a
                    class="dropdown-item"
                    @click="value = option"
                    href="javascript:void(0)"
                    >{{ option }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col">
            <label class="fw-bold fs-4">player 1</label>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "matchupIgraci",
  props: ["info"],

  data() {
    return {
      options: ["2-0", "2-1", "1-1", "1-2", "0-2"],
      value: "2-0",
    };
  },
};
</script>
