<template>
  <b-container fluid="sm" class="pb50">
    <app-navbar />
    <div class="row mt-3">
      <b-skeleton-wrapper class="col-md-9 mb40" :loading="loading">
        <template #loading>
          <b-card img-top>
            <b-skeleton-img card-img="top"></b-skeleton-img>
            <b-card-body>
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </b-card-body>
          </b-card>
        </template>
        <div class="col-md-9 mb40" v-if="data">
          <article>
            <img
              :src="data.image.url"
              :alt="data.title"
              class="img-fluid mb30"
            />
            <div class="post-content">
              <h3>{{data.title}}</h3>
              <ul class="post-meta list-inline">
                <li class="list-inline-item">
                  <i class="fa fa-user-circle-o"></i> <a href="#">John Doe</a>
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-calendar-o"></i> <a href="#">{{data.created_at | formatTime('{y}-{m}-{d} {h}:{i}')}}</a>
                </li>
              </ul>
              <p v-html="data.content"></p>
              <ul class="list-inline share-buttons">
                <li class="list-inline-item">Share Post:</li>
                <li class="list-inline-item">
                  <a
                    href="#"
                    class="social-icon-sm si-dark si-colored-facebook si-gray-round"
                  >
                    <i class="fa fa-facebook"></i>
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="#"
                    class="social-icon-sm si-dark si-colored-twitter si-gray-round"
                  >
                    <i class="fa fa-twitter"></i>
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="#"
                    class="social-icon-sm si-dark si-colored-linkedin si-gray-round"
                  >
                    <i class="fa fa-linkedin"></i>
                    <i class="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
              <hr class="mb40" />
              <h4 class="mb40 text-uppercase font500">About Author</h4>
              <div class="media mb40">
                <i class="d-flex mr-3 fa fa-user-circle fa-5x text-primary"></i>
                <div class="media-body">
                  <h5 class="mt-0 font700">Jane Doe</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                  vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                  nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </div>
              </div>
              <hr class="mb40" />
              <h4 class="mb40 text-uppercase font500">Comments</h4>
              <div class="media mb40">
                <i class="d-flex mr-3 fa fa-user-circle-o fa-3x"></i>
                <div class="media-body">
                  <h5 class="mt-0 font400 clearfix">
                    <a href="#" class="float-right">Reply</a>
                    Jane Doe
                  </h5>
                  Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </div>
              </div>
              <div class="media mb40">
                <i class="d-flex mr-3 fa fa-user-circle-o fa-3x"></i>
                <div class="media-body">
                  <h5 class="mt-0 font400 clearfix">
                    <a href="#" class="float-right">Reply</a>
                    Jane Doe
                  </h5>
                  Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </div>
              </div>
              <div class="media mb40">
                <i class="d-flex mr-3 fa fa-user-circle-o fa-3x"></i>
                <div class="media-body">
                  <h5 class="mt-0 font400 clearfix">
                    <a href="#" class="float-right">Reply</a>
                    Jane Doe
                  </h5>
                  Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </div>
              </div>
              <hr class="mb40" />
              <h4 class="mb40 text-uppercase font500">Post a comment</h4>
              <form role="form">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="John Doe"
                  />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="john@doe.com"
                  />
                </div>
                <div class="form-group">
                  <label>Comment</label>
                  <textarea
                    class="form-control"
                    rows="5"
                    placeholder="Comment"
                  ></textarea>
                </div>
                <div class="clearfix float-right">
                  <button type="button" class="btn btn-primary btn-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </article>
          <!-- post article-->
        </div>
      </b-skeleton-wrapper>
      <div class="col-md-3 mb40">
        <!-- <div class="mb40">
          <form>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                aria-describedby="basic-addon2"
              />
              <button class="input-group-addon" id="basic-addon2">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div> -->
        <!--/col-->
        <div class="mb40">
          <h4 class="sidebar-title">Categories</h4>
          <ul class="list-unstyled categories">
            <li><a href="#">Rent</a></li>
            <li><a href="#">Sale</a></li>
            <li class="active">
              <a href="#">Apartment</a>
              <ul class="list-unstyled">
                <li><a href="#">Office</a></li>
                <li><a href="#">Godown</a></li>
                <li><a href="#">Gerage</a></li>
              </ul>
            </li>
            <li><a href="#">Top Rating</a></li>
            <li><a href="#">Trending</a></li>
            <li><a href="#">Newest Properties</a></li>
          </ul>
        </div>
        <!--/col-->
        <div>
          <h4 class="sidebar-title">Latest News</h4>
          <ul class="list-unstyled">
            <li class="media">
              <img
                class="d-flex mr-3 img-fluid"
                width="64"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="Generic placeholder image"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-1">
                  <a href="#">Lorem ipsum dolor sit amet</a>
                </h5>
                April 05, 2017
              </div>
            </li>
            <li class="media my-4">
              <img
                class="d-flex mr-3 img-fluid"
                width="64"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                alt="Generic placeholder image"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-1">
                  <a href="#">Lorem ipsum dolor sit amet</a>
                </h5>
                Jan 05, 2017
              </div>
            </li>
            <li class="media">
              <img
                class="d-flex mr-3 img-fluid"
                width="64"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt="Generic placeholder image"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-1">
                  <a href="#">Lorem ipsum dolor sit amet</a>
                </h5>
                March 15, 2017
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import { getDetail } from '@/api/post'
import NavBar from '@/components/NavBar'

export default {
  name: 'post-detail',
  data() {
    return {
      loading: true,
      data: null
    }
  },
  components: {
    'app-navbar': NavBar
  },
  methods: {
    fetchData(id) {
      this.loading = true
      getDetail(id).then((res) => {
        this.data = res.data
      }).finally(() => {
        this.loading = false
      })
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
.post {
  cursor: pointer;
}
</style>
