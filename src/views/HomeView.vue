<template>
  <div>
    <apex-chart
      width="380"
      type="radialBar"
      :options="options"
      :series="series"
    ></apex-chart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      series: [78],
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
