<template>
  <div class="label px-2" :class="label">{{ label }}</div>
</template>

<script>
import { utilService } from '../services/util-service'
export default {
  props: {
    label: String,
  },
  data() {
    return {
      color: utilService.getRandomColor(),
    }
  },
}
</script>

<style>
.label {
  border: 2px solid #333;
  border-radius: 2em;
  color: #fff;
  border-color: v-bind(color);
  background-color: v-bind(color);
}
</style>
