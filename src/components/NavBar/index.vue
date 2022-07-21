<template>
  <b-navbar class="justify-content-between px-5" toggleable="lg" type="dark" variant="info">
    <div class="navBar-left">
      <router-link to="/">
        <b-navbar-brand>
          Logo
        </b-navbar-brand>
      </router-link>
    </div>
    <div class="navBar-right">
      <b-collapse v-if="user" id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Hi {{user.name}}</em>
            </template>
            <b-dropdown-item>
              <router-link to="/index/dashboard" class="text-dark">Dashboard</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click.native="handleLogout">{{$t('header.logout')}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <router-link v-else class="text-white" to="/login">
        Sign In
      </router-link>
    </div>
  </b-navbar>
</template>
<script>
import { mapState } from 'vuex'
export default {
    components: {
    },
    computed: {
      ...mapState('login', {
          user: state => state.user
      })
    },
    methods: {
      handleLogout(val) {
        this.$store.dispatch('login/logout')
      }
    }
}
</script>
