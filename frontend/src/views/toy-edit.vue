<template>
  <section v-if="toyToEdit" class="toy-edit py-2">
    <h1 class="py-2">{{ pageTitle }}</h1>
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="name" class="form-label">Name</label>
        <input id="name" type="text" class="form-input" v-model="toyToEdit.name" />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">Price</label>
        <input id="price" type="text" class="form-input" v-model.number="toyToEdit.price" />
      </div>
      <div class="form-control flex flex-col">
        <label for="labels" class="form-label">Labels</label>

        <el-select
          multiple
          v-model="toyToEdit.labels"
          collapse-tags-tooltip
          id="labels"
          size="large"
        >
          <el-option v-for="label in labels" :key="label" :value="label" :label="label" />
        </el-select>
      </div>
      <div class="form-control flex ">
        <label for="stock" class="form-label">In Stock</label>
        <input id="stock" type="checkbox" v-model="toyToEdit.inStock" />
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-success">save</button>
        <button @click="$router.push('/toy')" class="btn btn-danger-text">go back</button>
      </div>
      <section v-if="!this.toyToEdit.imgUrl" 
       @dragover.prevent="isDragOver=true" 
       @dragleave="isDragOver=false"
      :class="{drag:isDragOver}"
      @drop.prevent="handleFile">
       <label v-if="!isLoading" class="hover"> 
        <uploadIcon :class="{drag:isDragOver}"/>
        <p>Click here to select from computer, or drag any</p>
       <input type="file" @change="handleFile" hidden>
       </label>
     <img v-else src="../assets/loader.gif" alt="">   
   </section>
   <section v-else class="img-edit">
    <img  :src="toyToEdit.imgUrl" alt="">
    <button class="btn btn-danger" @click="toyToEdit.imgUrl=null">discard</button>
    </section>
    </form>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service'
import uploadIcon from '../components/upload-icon.vue'
import {uploadImg} from '../services/img-upload.service'
export default {
  name: 'toy-edit',
  components:{
    uploadIcon
  },
  data() {
    return {
      toyToEdit: null,
      pageTitle: 'Add Toy',
      isLoading:false,
      isDragOver:false,
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      toyService.getById(id).then((toy) => (this.toyToEdit = toy))
      this.pageTitle = 'Edit Toy'
    } else {
      toyService.getEmptyToy().then((toy) => (this.toyToEdit = toy))
      this.pageTitle = 'Add Toy'
    }
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  methods: {
     handleFile(ev){
      var file
       if(ev.type ==="change") file= ev.target.files[0] 
       else if(ev.type ==="drop") file= ev.dataTransfer.files[0]

      this.onUploadFile(file)
    },
    async onUploadFile(file){
      this.isLoading=true
    const res= await uploadImg(file)
    this.isLoading=false
    this.isDragOver=false
    this.toyToEdit.imgUrl=res.url
    },
    saveToy() {
     const str= this.toyToEdit.name
     const str2 = str.charAt(0).toUpperCase() + str.slice(1);
     console.log(str2);
      this.toyToEdit.name=str2
      this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit }).then(() => {
        this.$router.push('/toy')
      })
    },
  },
}
</script>

<style>
.drag{
  color: #6cb1ed;
}
.hover{
  cursor: pointer;
}
.img-edit{
width: 20em;
}
#stock{
  width: 2em;
  margin-left:1em ;
}
</style>
