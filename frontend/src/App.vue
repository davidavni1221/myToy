<template>
  <section class="app-container container flex flex-col">
    <app-header />
    <router-view class="flex-1" />
    <app-footer />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'

export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  components: {
    appHeader,
    appFooter,
  },
}
</script>

<style></style>
