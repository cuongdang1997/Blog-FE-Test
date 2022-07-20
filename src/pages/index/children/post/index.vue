<template>
  <div>
    <div class="d-flex justify-content-end">
      <router-link class="btn btn-primary mb-3" :to="'/index/post/update'"><b-icon icon="plus"></b-icon> Add post</router-link>
    </div>
    <b-table striped hover :items="data.data.items" :fields="fields">
      <template #cell(image)="row">
        <b-img-lazy blank blank-color="#abc" width="64" :alt="row.item.title" :src="row.value.url"></b-img-lazy>
      </template>

      <template #cell(created_at)="row">
        {{row.value | formatTime('{y}-{m}-{d} {h}:{i}')}}
      </template>

      <template #cell(updated_at)="row">
        {{row.value | formatTime('{y}-{m}-{d} {h}:{i}')}}
      </template>

      <template #cell(actions)="row">
        <router-link :to="`/index/post/update/${row.item.id}`" class="mr-3 btn btn-warning sm">
          <b-icon icon="pencil"></b-icon> Edit
        </router-link>
        <b-button size="sm" @click="row.toggleDetails" class="btn btn-danger">
          <b-icon icon="trash"></b-icon> Delete
        </b-button>
      </template>
    </b-table>
    <div class="d-flex justify-content-end">
      <b-pagination
        v-model="data.pagination.page"
        :total-rows="data.pagination.count"
        :per-page="data.pagination.offset"
        aria-controls="my-table"
        @change="pageChanged"
        :hide-goto-end-buttons="data.pagination.count <= data.pagination.offset"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/post'
export default {
    name: 'post-dashboard',
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
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          { key: 'title', label: 'Title', sortable: true, class: 'text-center' },
          {
            key: 'content',
            label: 'Content',
            sortable: true
          },
          { key: 'image', label: 'Image', sortable: true, class: 'text-center' },
          { key: 'created_at', label: 'Created At', sortable: true, class: 'text-center' },
          { key: 'updated_at', label: 'Updated At', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions', sortable: false, class: 'text-center' }
        ]
      }
    },
    methods: {
      fetchData(params) {
        getList(params).then(res => {
          this.data = res
        })
      },
      pageChanged(page) {
        this.fetchData({
          page: page,
          offset: this.data.pagination.offset
        })
      }
    },
    mounted() {
      this.fetchData()
    }
}
</script>
