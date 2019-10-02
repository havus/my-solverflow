<template>
  <v-container fluid class="d-flex justify-center">
    <v-card width="920" class="pa-5 mt-12" flat>
      <div id="question-box" class="mt-5">
        <v-text-field
          label="Title"
          outlined v-model="form.title"
        ></v-text-field>
        <v-textarea v-model="form.text" relative>
          <template v-slot:label>
            <div>
              Ask question . . .
            </div>
          </template>
        </v-textarea>
      </div>
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
      <v-card-actions>
        <v-btn depressed block color="primary" @click="askQuestion">
          Ask now!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['tags']),
  data: () => ({
    form: {
      title: '',
      text: '',
    },
    model: [],
    items: [],
    search: null,
  }),
  created() {
    this.items = [...this.tags];
  },
  watch: {
    model (val) {
      if (val.length > 10) {
        this.$nextTick(() => this.model.pop());
      }
    },
  },
  methods: {
    askQuestion() {
      let payload = {
        title: this.form.title,
        text: this.form.text,
        tags: this.model
      }
      if (payload.title.length < 1 || payload.text.length < 1) {
        this.$swal.fire({
          type: 'error',
          title: 'Input kurang lengkap'
        });
      } else {
        this.$store.dispatch('askQuestion', payload)
        .then(msg => {
          this.$store.commit('SNACK_MESSAGE', 'Question submited!');
          // this.$swal.fire('',msg);
          this.$router.push('/');
        })
        .catch(msg => {
          this.$swal(msg);
        })
      }
    }
  },
}
</script>

<style scoped>
</style>
