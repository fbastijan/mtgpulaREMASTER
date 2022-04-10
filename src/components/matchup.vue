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
export default {
  name: "matchupIgraci",
  props: ["info"],
};
</script>
