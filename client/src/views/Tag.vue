<template>
  <v-container fluid class="d-flex flex-column align-center">
    <Question v-for="question in oneTag" :key="question._id" :question="question"/>
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
import { mapState } from 'vuex';

export default {
  computed: mapState(['oneTag']),
  components: {
    Question,
  },
  data: () => ({
    snackbar: false,
  }),
  created() {
    this.$store.dispatch('getTags', this.$route.params.tag);
    
    this.$store.dispatch('getId')
      .then(id => {
        this.idUser = id;
      })
  },
  watch: {
    $route() {
      this.$store.dispatch('getTags', this.$route.params.tag);
    }
  }
};
</script>

<style scoped>

</style>