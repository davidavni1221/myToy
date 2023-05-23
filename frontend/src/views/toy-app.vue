<template>
  <section class="toy-app">
    <toy-filter @setFilter="setFilter" />
    <toy-list :toys="toys" />
  </section>
</template>

<script>
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'
export default {
  name: 'toy-app',
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  computed: {
    toys() {
      return this.$store.getters.toysToShow
    },
  },
  methods: {
    setFilter(filterBy) {
      const copyfilter = JSON.parse(JSON.stringify(filterBy))
      this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    },
  },
  components: {
    toyList,
    toyFilter,
  },
}
</script>

<style>
</style>
