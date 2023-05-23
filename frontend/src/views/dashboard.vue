<template>
  <section class="dashboard py-2">
    <div>
      <DoughnutChart :chartData="testDataDoughnut" :options="options" />
    </div>
    <div>
      <PieChart :chartData="testDataPie" :options="options" />
    </div>
  </section>
</template>

<script>
import { DoughnutChart, PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'dashboard',
  data() {
    return {
      dataDoughnut: [],
      dataPie: [],
      labelsPie: [],
    }
  },
  created() {
    this.getPrices()
    this.getPrecentage()
  },
  computed: {
    testDataDoughnut() {
      return {
        labels: this.$store.getters.labels,
        datasets: [
          {
            data: [...this.dataDoughnut],
            backgroundColor: [
              '#f87171',
              '#fbbf24',
              '#34d399',
              '#2dd4bf',
              '#60a5fa',
              '#818cf8',
              '#f472b6',
            ],
          },
        ],
      }
    },
    testDataPie() {
      return {
        labels: [...this.labelsPie],
        datasets: [
          {
            data: [...this.dataPie],
            backgroundColor: [
              '#f87171',
              '#fbbf24',
              '#34d399',
              '#2dd4bf',
              '#60a5fa',
              '#818cf8',
              '#f472b6',
            ],
          },
        ],
      }
    },
    options() {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Prices by labels',
          },
        },
      }
    },
  },
  methods: {
    getPrices() {
      const lables = this.$store.getters.labels
      const toys = this.$store.getters.toys
      lables.forEach((label) => {
        let sumPrice = toys.reduce((acc, toy) => {
          if (toy.labels.includes(label)) acc += toy.price
          return acc
        }, 0)
        this.dataDoughnut.push(sumPrice)
      })
    },
    getPrecentage() {
      const toys = this.$store.getters.toys
      const labelCountMap = {}
      toys.forEach((toy) => {
        toy.labels.forEach((label) => {
          labelCountMap[label] = labelCountMap[label] ? labelCountMap[label] + 1 : 1
        })
      })
      for (const key in labelCountMap) {
        this.labelsPie.push(key)
        this.dataPie.push((labelCountMap[key] / toys.length) * 100)
      }
    },
  },
  components: { DoughnutChart, PieChart },
}
</script>
