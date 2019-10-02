<template>
  <v-card outlined class="d-flex px-7 pa-3" width="972">
    <div id="detail-card-left" class="d-flex">
      <div id="vote" class="d-flex flex-column justify-center align-center">
        <span>
          {{ question.up_votes.length - question.down_votes.length }}
        </span>
        <span>votes</span>
      </div>
      <div id="answer" class="d-flex flex-column justify-center align-center">
        <span>{{ question.answers.length }}</span>
        <span>answer</span>
      </div>
    </div>
    <div id="detail-card-right" class="mx-12">
      <v-card-title class="font-weight-medium pa-0 subtitle-1">
        <router-link :to="'/question/'+question._id">{{ question.title }}</router-link>
      </v-card-title>
      <v-chip-group multiple column
        active-class="primary--text">
        <v-chip class="ma-0" v-for="tag in question.tags" :key="tag" :to="'/tag/'+tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['question'],
  data: () => ({
    
  }),
}
</script>

<style scoped>
  #vote, #answer {
    width: 70px;
    height: 100%;
  }

  .v-card__title a {
    text-decoration: none;
  }

  .v-chip--clickable {
    height: 20px;
    display: flex;
    align-items: center;
  }
</style>