<template>
  <v-container v-if="dataReady" fluid class="d-flex flex-column align-center">
    <Question v-for="question in popularTags" :key="question._id" :question="question"/>
    <v-snackbar
      v-model="snackbar"
      :top="true"
      :right="true"
      :timeout="3000"
      color="green lighten-1">
      theText
      <v-btn color="white"
      text @click="snackbar = false">
        <v-icon right>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Question from '@/components/Question.vue';
// import { mapState } from 'vuex';

export default {
  // computed: mapState(['questionBundle']),
  components: {
    Question,
  },
  data: () => ({
    snackbar: false,
    popularTags: [],
    dataReady: false,
  }),
  created() {
    this.$store.dispatch('getPopular')
      .then(data => {
        this.popularTags = data;
        this.dataReady = true;
      })
  }
};
</script>

<style scoped>

</style>