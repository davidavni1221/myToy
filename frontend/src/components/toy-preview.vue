<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
import customLabel from './custom-label.vue'

export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
  components: {
    customLabel,
  },
}
</script>
