<template>
  <v-col cols="12">
    <v-card-text>
      <v-card class="pa-5">
        <v-row>
          <v-col id="left" cols="1" class="pa-0 d-flex flex-column">
          <v-icon large color="blue-grey lighten-3" @click="upVote">expand_less</v-icon>
            <h2 class="text-center">{{ oneData.up_votes.length - oneData.down_votes.length }}</h2>
            <v-icon large color="blue-grey lighten-3" @click="downVote">expand_more</v-icon>
          </v-col>
          <v-col cols="9">
            <v-card-text class="pt-0 subtitle-1">{{ oneData.text }}</v-card-text>
          </v-col>
          <v-col cols="2" v-if="idUser === oneData.user_id" class="d-flex justify-end">
            <v-menu bottom right offset-y offset-x>
              <template v-slot:activator="{ on }" >
                <v-btn icon v-on="on">
                  <v-icon>more_horiz</v-icon>
                </v-btn>
              </template>
              <v-list class="py-0">
                <v-list-item link class="px-7">
                  <v-list-item-content 
                  @click="answerEdit = true">
                    Edit
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link class="px-7 text-right">
                  <v-list-item-content @click="deleteOne">
                    Delete
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-expand-transition>
            <v-card-text v-show="answerEdit">
              <v-textarea relative v-model="editText">
                <template v-slot:label>
                  <div>
                    Edit your answer
                  </div>
                </template>
              </v-textarea>
              <v-card-actions class="d-flex justify-end">
                <v-btn depressed color="primary" class="align-self-end" @click="editAnswer">Edit</v-btn>
                <v-btn depressed color="error" class="align-self-end" @click="answerEdit = false">Cancel</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-expand-transition>
        </v-row>
      </v-card>
    </v-card-text>
  </v-col>
</template>

<script>
export default {
  props: ['answer'],
  data: () => ({
    idUser: '',
    oneData: {},
    answerEdit: false,
    editText: '',
  }),
  created() {
    this.$store.dispatch('getId')
      .then(id => {
        this.idUser = id;
      })
    this.oneData = this.answer;
    this.editText = this.answer.text;
  },
  methods: {
    upVote() {
      this.$store.dispatch('upVoteAnswer', this.answer._id)
        .then(_ => {
          return this.$store.dispatch('getOneAnswer', this.answer._id)
        })
        .then(data => {
          this.oneData = data;
        })
        .catch(msg => {
          this.$swal(msg);
        })
    },
    downVote() {
      this.$store.dispatch('downVoteAnswer', this.answer._id)
        .then(_ => {
          return this.$store.dispatch('getOneAnswer', this.answer._id);
        })
        .then(data => {
          this.oneData = data;
        })
        .catch(msg => {
          this.$swal(msg);
        })
    },
    deleteOne() {
      this.$swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true,
      })
        .then(result => {
          if (result.value) {
            return this.$store.dispatch('deleteAnswer', this.oneData._id)
          } else {
            return false;
          }
        })
        .then(msg => {
          if (msg) {
            this.$emit('fetchAgain');
            this.$swal.fire({
              type: 'success',
              title: msg
            });
          }
        })
        .catch(_ => {
          this.$swal.fire({
            type: 'warning',
            title: 'Something wrong!',
          })
        })
    },
    editAnswer() {
      let payload = {
        id: this.oneData._id,
        text: this.editText,
      }
      this.$store.dispatch('editAnswer', payload)
        .then(_=> {
          this.$swal.fire({
            type: 'success',
            title: 'Berhasil update answer!'
          })
          this.$store.dispatch('getOneAnswer', this.oneData._id)
            .then(data => {
              this.oneData = data;
            })
          this.answerEdit = false;
          this.editText = '';
        })
    }
  }
}
</script>

<style scoped>
  #left .v-icon:nth-child(1):hover, 
  #left .v-icon:nth-child(3):hover {
    cursor: pointer;
    color: rgb(46, 46, 46) !important;
  }
</style>
