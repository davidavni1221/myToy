<template>
  <section>
  <button v-if="user" @click="$router.push('/toy/edit')" class="btn btn-secondary">add a new toy</button>
  <ul class="toy-list py-1 clean-list grid gap-2">
    <toy-preview v-for="toy in toys" :key="toy._id" :toy="toy">
      <li @click="$router.push(`/toy/${toy._id}`)" class="toy-preview p-2 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <h3 class="uppercase">{{ toy.name }}</h3>
          <p class="clr-teal fw-bold">${{ toy.price }}</p>
        </div>
        <img v-if="toy.imgUrl" :src="toy.imgUrl" alt="">
        <div class="labels flex flex-wrap items-center gap-1">
          <custom-label v-for="label in toy.labels" :key="label" :label="label" />
        </div>
      </li>
    </toy-preview>
  </ul>
</section>
</template>

<script>
import CustomLabel from './custom-label.vue'
import toyPreview from './toy-preview.vue'

export default {
  name: 'toy-list',
  props: {
    toys: Array,
  },
  data(){
    return{
      user:null
    }
  },
  components: {
    toyPreview,
    CustomLabel,
  },
  created() {
    this.user = this.$store.getters.user
    console.log(this.user);
  }
}
</script>

<style></style>
