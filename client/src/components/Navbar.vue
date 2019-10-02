<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Hacky Overflow</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="isLogin">
        <template v-slot:activator="{ on }">
          <v-avatar size="36px" v-on="on">
            <img src="https://res.cloudinary.com/dxkkt5pzu/image/upload/v1566793505/my_dafault/no-profile-picture.png" alt="avatar">
          </v-avatar>
        </template>
        <v-list class="py-0">
          <v-list-item link class="px-7" router :to="'/profile'">
            <v-icon left>account_circle</v-icon>
            <v-list-item-content>Profile</v-list-item-content>
          </v-list-item>
          <v-list-item link class="px-7 text-right" @click="logout">
            <v-icon left>exit_to_app</v-icon>
            <v-list-item-content>
              Logout
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Hacky Overflow</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item dense nav link v-for="leftMenu in leftMenus" :key="leftMenu.route" :to="leftMenu.route">
          <v-list-item-icon>
            <v-icon>{{ leftMenu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ leftMenu.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    leftMenus: [
      {
        route: '/',
        text: 'Home',
        icon: 'home',
      },
      {
        route: '/popular',
        text: 'Popular Tag',
        icon: 'star',
      },
    ],
    isLogin: false,
  }),
  methods: {
    logout() {
      this.$swal.fire({
        title: 'Are you sure wanna logout?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true,
        confirmButtonText: 'Sure!'
      })
        .then((result) => {
          if (result.value) {
            this.isLogin = false;
            localStorage.clear();
            this.$router.push('/login');
            this.$swal.fire('See yaa!');
          }
        })
    }
  },
  watch: {
    $route() {
      if (localStorage.getItem('token')) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
  }
}
</script>

<style>
  .v-avatar:hover {
    cursor: pointer;
  }
</style>
