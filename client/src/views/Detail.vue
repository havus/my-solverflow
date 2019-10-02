<template>
  <v-container v-if="dataReady" fluid class="d-flex justify-center">
    <v-card width="920" class="pa-5 mt-12" flat>
      <v-row>
        <v-col id="left" cols="1" class="pa-0 d-flex flex-column">
          <v-icon large color="blue-grey lighten-3"
          @click="upVote">expand_less</v-icon>
            <h2 class="text-center">
              {{ oneData.up_votes.length - oneData.down_votes.length }}
            </h2>
          <v-icon large color="blue-grey lighten-3"
          @click="downVote">expand_more</v-icon>
          <v-icon color="blue-grey lighten-2" class="mt-9">star</v-icon>
        </v-col>
        <v-col cols="11">
          <v-card-title class="pt-0 display-1 d=flex justify-space-between">
            {{ oneData.title }}
          <v-menu bottom right offset-y offset-x v-if="oneData.user_id === idUser">
              <template v-slot:activator="{ on }" class="d-flex justify-end">
                <v-btn icon v-on="on">
                  <v-icon>more_horiz</v-icon>
                </v-btn>
              </template>
              <v-list class="py-0">
                <v-list-item link class="px-7">
                  <v-list-item-content 
                  @click="editField = true">
                    Edit
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link class="px-7 text-right" @click="deleteQuestion">
                  <v-list-item-content>
                    Delete
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text class="subtitle-1">{{ oneData.text }}</v-card-text>
          <v-card-text>
            <!-- <Comment/> -->
            <v-chip-group multiple column
              active-class="primary--text">
              <v-chip class="ma-0" v-for="tag in oneData.tags" :key="tag" :to="'/tag/'+tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-col>
      </v-row>
      <v-expand-transition>
        <div>
          <v-card-text v-show="editField">
            <v-text-field
              label="Title"
              outlined v-model="edit.title"
            ></v-text-field>
            <v-textarea v-model="edit.text" relative>
              <template v-slot:label>
                <div>
                  Edit field
                </div>
              </template>
            </v-textarea>
            <v-combobox v-model="model"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="Search for a tag"
              multiple small-chips solo
              class="mt-7">
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip label small>
                  <span class="pr-2">
                    {{ item }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    close
                  </v-icon>
                </v-chip>
              </template>
            </v-combobox>
          </v-card-text>
          <v-card-actions v-if="editField" class="d-flex justify-end">
            <v-btn color="primary" large depressed
            @click="editQuestion">Edit</v-btn>
            <v-btn color="error" large depressed
            @click="editField = false">Cancel</v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
      <v-expand-transition>
        <v-card-text v-show="answerField">
          <v-textarea v-model="answer.text" relative>
            <template v-slot:label>
              <div>
                Your answer . . .
              </div>
            </template>
          </v-textarea>
        </v-card-text>
      </v-expand-transition>
      <v-card-actions class="d-flex justify-end">
        <v-expand-x-transition>
          <v-btn color="error" large depressed
          @click="answerField = false" v-show="answerField">Cancel</v-btn>
        </v-expand-x-transition>

        <v-btn color="primary" large depressed 
        @click="submitAnswer" v-if="!editField">Answer</v-btn>
      </v-card-actions>

      <v-row>
        <Answer v-for="answer in filters" :key="answer._id" :answer="answer" @fetchAgain="fetchOne"/>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Answer from '@/components/Answer.vue';
import Comment from '@/components/Comment.vue';
import { mapState } from 'vuex';

export default {
  computed: mapState(['questionBundle', 'tags']),
  components: {
    Answer,
    Comment,
  },
  data: () => ({
    dataReady: false,
    answerField: false,
    editField: false,
    edit: {
      title: '',
      text: '',
    },
    items: [],
    model: [],
    search: null,
    answer: {
      text: '',
    },
    oneData: {},
    idUser: '',
  }),
  computed: {
    filters() {
      // let cusSort = this.oneData.answers.reverse().sort((a, b) => (a.up_votes - a.down_votes) - (b.up_votes - b.down_votes));
      // return cusSort.reverse();
      let result = this.oneData.answers.reverse();
      return result.sort((a, b) => {
        (b.up_votes.length - b.down_votes.length) + (a.up_votes.length - a.down_votes.length)
      });
    }
  },
  created() {
    this.fetchOne();
    this.$store.dispatch('fetchQuestion');
    this.$store.dispatch('getId')
      .then(id => {
        this.idUser = id;
      })
    this.oneData = this.answer;
  },
  methods: {
    upVote() {
      this.$store.dispatch('upVote', this.$route.params.id)
        .then(_ => {
          return this.$store.dispatch('getOneQuestion', this.$route.params.id)
        })
        .then(data => {
          this.oneData = data;
          this.dataReady = true;
        })
        .catch(msg => {
          this.$swal(msg);
        })
    },
    downVote() {
      this.$store.dispatch('downVote', this.$route.params.id)
        .then(_ => {
          return this.$store.dispatch('getOneQuestion', this.$route.params.id);
        })
        .then(data => {
          this.oneData = data;
          this.dataReady = true;
        })
        .catch(msg => {
          this.$swal(msg);
        })
    },
    submitAnswer() {
      if (!this.answerField) {
        this.answerField = true;
      } else {
        let payload = {
          question_id : this.$route.params.id,
          text: this.answer.text,
        }
        this.$store.dispatch('answerQuestion', payload)
          .then(msg => {
            this.$swal.fire({
              type: 'success',
              title: msg,
            });
            this.answerField = false;
            this.answer.text = '';
            return this.$store.dispatch('getOneQuestion', this.$route.params.id);
          })
          .then(data => {
            this.oneData = data;
            this.dataReady = true;
          })
          .catch(msg => {
            console.log(msg, 'err<<<<<<<<<<<<');
          })
      }
    },
    fetchOne() {
      this.$store.dispatch('getOneQuestion', this.$route.params.id)
      .then(data => {
        this.oneData = data;
        this.dataReady = true;
      })
    },
    deleteQuestion() {
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
            return this.$store.dispatch('deleteQuestion', this.$route.params.id);
          }
        })
        .then(msg => {
          if (msg) {
            this.$store.commit('SNACK_MESSAGE', 'Question deleted!');
            this.$router.push('/');
          }
        })
        .catch(_ => {
          this.$swal.fire({
            type: 'warning',
            title: 'Something wrong!',
          })
        })
    },
    editQuestion() {
      let payload = {
        question_id: this.$route.params.id,
        title: this.edit.title,
        text: this.edit.text,
        tags: this.model,
      }
      this.$store.dispatch('editQuestion', payload)
        .then(msg => {
          this.fetchOne();
          this.editField = false;
          this.$swal.fire({
            type: 'success',
            title: msg,
          })
        })
    }
  },
  watch: {
    dataReady() {
      if (this.dataReady) {
        this.edit.title = this.oneData.title;
        this.edit.text = this.oneData.text;
        this.model = this.oneData.tags;   
      }
    },
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
