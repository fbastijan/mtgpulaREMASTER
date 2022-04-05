<template>
  <div class="row">
    <div class="col">Column</div>
    <div class="col-3">
      <apex-chart
        width="380"
        type="radialBar"
        :options="options"
        :series="series"
      ></apex-chart>
    </div>
    <div class="col-3">
      <apex-chart
        width="380"
        type="radialBar"
        :options="options"
        :series="series"
      ></apex-chart>
    </div>

    <div class="col">Column</div>
  </div>
</template>

<script>
export default {
  data: function () {
    const s = 45;
    return {
      series: [s],
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
