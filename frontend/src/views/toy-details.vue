<template>
  <section v-if="toy" class="toy-detalis">
    <toy-preview :toy="toy">
      <section class="py-3 flex flex-col gap-1">
        <div class="flex flex-col gap-1">
          <h3 class="uppercase">{{ toy.name }}</h3>
          <p class="clr-teal fw-bold">Price: ${{ toy.price }}</p>
          <p><span class="fw-bold">In Stock:</span> {{ toy.inStock }}</p>
          <p>
            <span class="fw-bold">Created At:</span> {{ $filters.formatTime(toy.createdAt) }}
          </p>
        </div>
        <div class="labels flex flex-wrap items-center gap-1">
          <custom-label v-for="label in toy.labels" :key="label" :label="label" />
        </div>
      </section>
    </toy-preview>

    <h2 class="clr-teal">Reviews</h2>

    <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
      <div class="flex">
      <div class="form-control my-1">
        <label for="txt" class="form-label fw-600">Your review</label>
        <textarea name="txt" id="txt" rows="3" class="form-input" v-model="reviewToAdd.content" required></textarea>
        <div class="form-control my-1">
          <label for="rate" class="form-label">Rate</label>
          <input id="rate" type="number" class="form-input rate" min="0" max="5" v-model.number="reviewToAdd.rate" />
        </div>
      </div>
      <div><img v-if="toy.imgUrl" class="img-details" :src="toy.imgUrl" alt=""></div>
    </div>
      <button class="btn btn-info">Add Review</button>
    </form>

    <div v-if="reviews?.length" class="my-1 flex flex-col gap-1">
      <article class="review flex flex-col gap-1 items-start p-3" v-for="review in reviews" :key="review._id">
        <p class="fw-600">{{ review.content }}</p>
        <p>Rate: {{ review.rate }}⭐</p>
        <p>By: {{ review.user?.username }}</p>
        <button v-if="user?.isAdmin" class="btn btn-danger" @click="removeReview(review._id)">
          Delete review
        </button>
      </article>
    </div>
    <div class="p-2 flex flex-col gap-1" v-else>
      <h4>No reviews yet.</h4>
      <p>Be the first...</p>
    </div>

    <div v-if="user?.isAdmin" class="btn-group gap-1">
      <button @click="$router.push(`/toy/edit/${toy._id}`)" class="btn btn-primary">
        edit toy
      </button>
      <button @click="removeToy" class="btn btn-danger">delete toy</button>
      <button @click="$router.push('/toy')" class="btn btn-secondary">go back</button>
    </div>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service'
import { reviewService } from '../services/review-service'
import CustomLabel from '../components/custom-label.vue'
import toyPreview from '../components/toy-preview.vue'

export default {
  components: { toyPreview, CustomLabel },
  name: 'toy-detail',
  data() {
    return {
      toy: null,
      reviewToAdd: null,
    }
  },
  async created() {
    const { id } = this.$route.params
    this.toy = await toyService.getById(id)
    const user = this.$store.getters.user
    console.log(user);


    // review-store
    await this.$store.dispatch({ type: 'getReviews', filterBy: { toyId: this.toy._id } })

    if (user) {
      this.reviewToAdd = await reviewService.getEmptyReview()
      this.reviewToAdd.userId = user._id
      this.reviewToAdd.toyId = this.toy._id
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    reviews() {
      return this.$store.getters.reviews
    },
  },
  methods: {
    removeToy() {
      this.$store.dispatch({ type: 'removeToy', toyId: this.toy._id }).then(() => {
        this.$router.push('/toy')
      })
    },
    async addReview() {
      if (!this.reviewToAdd.content) return
      await this.$store.dispatch({ type: 'addReview', review: this.reviewToAdd })
      await this.$store.dispatch({ type: 'getReviews', filterBy: { toyId: this.toy._id } })
    },
    async removeReview(reviewId) {
      await this.$store.dispatch({ type: 'removeReview', reviewId })
      await this.$store.dispatch({ type: 'getReviews', filterBy: { toyId: this.toy._id } })
    },
  },
}
</script>
<style>
.img-details{
  margin: 2em;
}
</style>
