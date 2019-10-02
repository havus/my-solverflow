<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
  beforeCreate() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch('fetchQuestion');
    }
  }
};
</script>

<style>
  * {
    font-family: 'Livvic', sans-serif;
  }
</style>
