<template>
  <v-container fluid class="d-flex flex-column align-center">
    <v-btn class="my-7" large depressed color="primary" :to="'/ask-question'">Ask new question</v-btn>
    <Question v-for="question in questionBundle" :key="question._id" :question="question"/>
    <v-snackbar
      v-model="snackbar"
      :top="true"
      :right="true"
      :timeout="3000"
      color="green lighten-1">
      {{ theText }}
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
  computed: mapState(['questionBundle', 'snackMessage']),
  components: {
    Question,
  },
  data: () => ({
    theText: '',
    snackbar: false,
  }),
  created() {
    this.$store.dispatch('fetchQuestion');
    
    this.$store.dispatch('getId')
      .then(id => {
        this.idUser = id;
      })

    if (this.snackMessage.length > 1) {
      this.theText = this.snackMessage;
      this.snackbar = true;
      this.$store.commit('SNACK_MESSAGE', '');
    }
  },
};
</script>

<style scoped>

</style>