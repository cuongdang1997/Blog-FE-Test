<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          placeholder="Title"
          v-model="form.title"
          v-validate="{ required: true }"
          :state="validateState('title')"
          aria-describedby="input-title-live-feedback"
          data-vv-as="Title"
        />
        <b-form-invalid-feedback id="input-title-live-feedback">{{ veeErrors.first('title') }}</b-form-invalid-feedback>
      </div>
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea
          class="form-control"
          id="content"
          name="content"
          rows="6"
          v-model="form.content"
          v-validate="{ required: true }"
          :state="validateState('content')"
          aria-describedby="input-content-live-feedback"
          data-vv-as="Content"
        ></textarea>
        <b-form-invalid-feedback id="input-content-live-feedback">{{ veeErrors.first('content') }}</b-form-invalid-feedback>
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
          @change="onFileChange"
          accept="image/*">
      </div>
      <button type="submit" class="btn btn-primary my-1"><b-spinner small v-show="isLoading" variant="primary" label="Spinning"></b-spinner> {{ postId ? 'Update' : 'Add'}}</button>
    </form>
  </div>
</template>
<script>
import { createOrUpdate, getDetail } from '@/api/post'
export default {
  name: 'post-update-dashboard',
  data() {
    return {
      isLoading: false,
      thumbnail_id: null,
      previewImageUrl: '',
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
     validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    fetchData(id) {
      getDetail(id).then(res => {
        this.form = res.data
        this.previewImageUrl = res.data.image.url || ''
      })
    },
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return
        }
        const _params = {
          'blog[title]': this.form.title,
          'blog[content]': this.form.content,
          id: this.postId
        }
        if (this.thumbnail_id) {
          _params['blog[image]'] = this.thumbnail_id
        }
        this.isLoading = true
        createOrUpdate(_params).then(res => {
          this.$router.push('/index/post')
          const mess = this.postId ? 'Post updated successfully!' : 'Post created successfully!'
          this.$message.success(mess)
        }).catch(() => {
          const mess = this.postId ? 'Post update failed, please try again!' : 'Post create failed, please try again!'
          this.$message.error(mess)
        }).finally(() => {
          this.isLoading = false
        })
      })
    },
    async onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      const ext = file.name.split('.').pop().toLowerCase()
      if (!['jpg', 'jpeg', 'png', 'gif', '.webp'].includes(ext)) {
        this.$message.error('Only support jpg, jpeg, png, gif file')
        return
      }
      if (file.size > 1024 * 1024 * 2) {
        this.$message.error('File size should less than 2MB')
        return
      }
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
