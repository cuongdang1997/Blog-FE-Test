<template>
  <b-container class="home-page">
    <app-navbar />
    <!-- filter -->
    <b-row class="my-3">
      <b-col>
        <b-form-group label="Search:" label-for="input-1">
          <b-input-group >
            <template #append>
              <b-input-group-text><b-icon icon="search"></b-icon></b-input-group-text>
            </template>
            <b-form-input id="input-1" v-model="filter.keyword" placeholder="Keyword"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="auto">
        <b-form-group id="input-group-2" label="Sort by:" label-for="input-2">
          <b-form-select id="input-2" v-model="filter.sortBy" :options="sortbyOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col col lg="2">
        <b-form-group id="input-group-2" label="Sort direction:" label-for="input-2">
          <b-form-select id="input-2" v-model="filter.sortDirection" :options="sortdirectionOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <div>
      <ul class="list-unstyled">
        <b-media class='post mb-3' v-for="(post, index) in data.data.items" :key="index" tag="li">
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
      </ul>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="filter.page"
        :total-rows="data.pagination.count"
        :per-page="filter.offset"
        aria-controls="my-table"
        @change="pageChanged"
        :hide-goto-end-buttons="data.pagination.count <= filter.offset"
      ></b-pagination>
    </div>
  </b-container>
</template>
<script>
import _ from 'lodash'
import { getList } from '@/api/post'
import NavBar from '@/components/NavBar'

export default {
  name: 'homepage',
  data() {
    return {
      data: {
        data: {
          items: []
        },
        pagination: {
          count: 0,
          next: null,
          offset: 20,
          page: 1,
          prev: null,
          total: 0
        }
      },
      filter: {
        page: 1,
        offset: 20,
        keyword: '',
        sortBy: null,
        sortDirection: null
      },
      // id, title, content, created_at, updated_at
      sortbyOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'id', text: 'ID' },
        { value: 'title', text: 'Title' },
        { value: 'content', text: 'Contente' },
        { value: 'created_at', text: 'Created at' },
        { value: 'updated_at', text: 'Updated at' }
      ],
      sortdirectionOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'asc', text: 'Ascending' },
        { value: 'desc', text: 'Descending' }
      ]
    }
  },
  components: {
    'app-navbar': NavBar
  },
  methods: {
    pageChanged(page) {
      this.filter.page = page
    },
    fetchData(params) {
      getList(params).then(res => {
        this.data = res
      })
    },
    handleFilter: _.debounce(function(filter) {
      this.fetchData(filter)
    }, 500)
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    filter: {
      handler(newVal, oldVal) {
        const params = {
          page: newVal.page,
          offset: newVal.offset,
          search: newVal.keyword,
          sort_by: newVal.sortBy,
          sort_direction: newVal.sortDirection
        }
        this.handleFilter(params)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.post {
  cursor: pointer;
}
</style>
