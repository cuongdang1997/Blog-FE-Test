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
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item>
              <router-link to="/index/dashboard">Dashboard</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>
<script>
export default {
    components: {
    }
}
</script>
