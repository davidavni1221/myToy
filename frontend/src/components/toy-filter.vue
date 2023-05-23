<template>
  <section class="toy-filter py-2">
    <button @click="isOpen = !isOpen" class="btn btn-info">
      {{ isOpen ? 'Close' : 'Open' }} options
    </button>
    <form @submit.prevent="" v-if="isOpen" class="form items-center gap-1 py-1">
      <div class="form-control">
        <label for="name" class="form-label">Name</label>
        <el-input @input="setFilter" v-model="filterBy.name" id="name" class="w-50" size="large"
          placeholder="Search by toy name..." />
      </div>

      <div class="form-control flex flex-col">
        <label for="stock" class="form-label">In Stock</label>
        <el-select @change="setFilter" v-model="filterBy.inStock" id="stock" size="large">
          <el-option label="All" value="" />
          <el-option label="In Stock" value="true" />
          <el-option label="Not in stock" value="false" />
        </el-select>
      </div>

      <div class="form-control flex flex-col">
        <label for="labels" class="form-label">By labels</label>
        <el-select multiple @change="setFilter" v-model="filterBy.labels" collapse-tags collapse-tags-tooltip
          id="labels" size="large">
          <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
        </el-select>
      </div>

      <div class="form-control flex flex-col">
        <label for="sort" class="form-label">Sort by</label>
        <el-select @change="setFilter" v-model="filterBy.sortBy" id="sort" size="large">
          <el-option label="Time" value="time" />
          <el-option label="Name" value="name" />
          <el-option label="Price" value="price" />
        </el-select>
      </div>
    </form>
  </section>
</template>

<script>
import { utilService } from '../services/util-service'

export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: {
        name: '',
        labels: [],
        inStock: '',
        sortBy: '',
      },
      isOpen: true,
      price: 50,
    }
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 500)
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  methods: {
    setFilter() {
      this.$emit('set-filter', { ...this.filterBy })
    },
  },
}
</script>
