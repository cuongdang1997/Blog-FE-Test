<template>
    <b-media class='post mb-3' tag="li">
      <template #aside>
        <router-link :to="'/post/' + post.id">
          <b-img-lazy blank blank-color="#abc" width="64" :alt="post.title" :src="post.image.url"></b-img-lazy>
        </router-link>
      </template>
      <router-link :to="'/post/' + post.id">
        <h5 class="mt-0 mb-1">{{post.title}}</h5>
      </router-link>
      <p class="mb-0" v-html="post.content" />
  </b-media>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>
