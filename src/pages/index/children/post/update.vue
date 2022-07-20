<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleFormControlInput1">Title:</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Title"
          v-model="form.title"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Content:</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="6"
          v-model="form.content"
        ></textarea>
      </div>
      <div v-if="previewImageUrl" class="image-preview mb-3" id="preview">
        <img :src="previewImageUrl" />
      </div>
      <div class="form-group">
        <label for="thumbnail_id">Image:</label>
        <input
          type="file"
          id="thumbnail_id"
          name="thumbnail_id"
          @change="onFileChange">
      </div>
      <button type="submit" class="btn btn-primary my-1">{{ postId ? 'Update' : 'Add'}}</button>
    </form>
  </div>
</template>
<script>
import { createOrUpdate, getDetail } from '@/api/post'
export default {
  name: 'post-update-dashboard',
  data() {
    return {
      thumbnail_id: null,
      previewImageUrl: '',
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    fetchData(id) {
      getDetail(id).then(res => {
        this.form = res.data
        this.previewImageUrl = res.data.image.url || ''
      })
    },
    handleSubmit() {
      const _params = {
        'blog[title]': this.form.title,
        'blog[content]': this.form.content,
        'blog[image]': this.thumbnail_id,
        id: this.postId
      }
      createOrUpdate(_params).then(res => {
        this.$router.push('/index/post')
        const mess = this.postId ? 'Post updated successfully!' : 'Post created successfully!'
        this.$message.success(mess)
      }).catch(() => {
        const mess = this.postId ? 'Post update failed, please try again!' : 'Post create failed, please try again!'
        this.$message.error(mess)
      })
    },
    async onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      this.thumbnail_id = file
      this.previewImageUrl = URL.createObjectURL(file)
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    }
  },
  mounted() {
    if (this.postId) {
      this.fetchData(this.postId)
    }
  }
}
</script>
<style scoped>
.image-preview {
  width: 375px;
  height: 250px;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
