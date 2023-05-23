<template>
  <section class="about flex flex-col gap-2 py-2">
    <h1 class="clr-teal uppercase py-2">Our Branches</h1>
    <GMapMap :center="center" :zoom="8" map-type-id="terrain">
      <GMapCluster>
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>

    <div class="btn-group">
      <button @click="panToBranch({ lat: 32.0853, lng: 34.781769 })" class="btn btn-info">
        Tel Aviv
      </button>
      <button @click="panToBranch({ lat: 31.768318, lng: 35.213711 })" class="btn btn-info">
        Jerusalem
      </button>
      <button @click="panToBranch({ lat: 29.557669, lng: 34.951923 })" class="btn btn-info">
        Eilat
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      center: { lat: 32.0853, lng: 34.781769 },
      markers: [
        {
          position: {
            lat: 32.0853,
            lng: 34.781769,
          },
        }, // Along list of clusters
        {
          position: {
            lat: 31.768318,
            lng: 35.213711,
          },
        }, // Along list of clusters
        {
          position: {
            lat: 29.557669,
            lng: 34.951923,
          },
        }, // Along list of clusters
      ],
    }
  },
  methods: {
    panToBranch(position) {
      this.center = position
    },
  },
}
</script>

<style>
.vue-map-container {
  height: 600px;
}
.vue-map {
  width: 100%;
}

.about .btn-group {
  align-self: center;
}
</style>
