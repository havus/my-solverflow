import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'http://34.87.62.125',
    questionBundle: [],
    oneTag: [],
    tags: [],
    snackMessage: '',
  },
  mutations: {
    FETCH_QUESTION(state, payload) {
      state.questionBundle = payload;
    },
    FETCH_TAGS(state, payload) {
      state.tags = payload;
    },
    FETCH_BY_TAG(state, payload) {
      state.oneTag = payload;
    },
    SNACK_MESSAGE(state, payload) {
      state.snackMessage = payload;
    }
  },
  actions: {
    signIn({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/user/signin`,
          data: payload,
        })
        .then(({data}) => {
          resolve('Berhasil login!');
          localStorage.setItem('token', data.token);
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    signUp({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/user/signup`,
          data: payload,
        })
          .then(({data}) => {
            resolve('Berhasil register!');
            localStorage.setItem('token', data.token);
          })
          .catch(({response}) => {
            reject(response.data.message);
          })
      })
    },
    fetchQuestion({ commit, state }) {
      axios({
        method: 'GET',
        url: `${state.baseUrl}/question`,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({data}) => {
          commit('FETCH_QUESTION', data.data);
          commit('FETCH_TAGS', data.tags);
        })
        .catch(({response}) => {
          console.log(response.data.message);
        })
    },
    getOneQuestion({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${state.baseUrl}/question/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({data}) => {
            dispatch('fetchQuestion');
            resolve(data);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
      })
    },
    askQuestion({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/question`,
          headers: {
            token: localStorage.getItem('token'),
          },
          data: payload,
        })
        .then(({data}) => {
          dispatch('fetchQuestion');
          resolve('Berhasil!');
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    upVote({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/question/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(_ => {
          dispatch('fetchQuestion');
          resolve();
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    downVote({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/question/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(_ => {
          dispatch('fetchQuestion');
          resolve();
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    answerQuestion({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/answer`,
          headers: {
            token: localStorage.getItem('token'),
          },
          data: payload,
        })
        .then(({ data }) => {
          dispatch('fetchQuestion');
          resolve(data.message);
        })
        .catch((err) => {
          reject(response.data.message);
        })
      })
    },
    getId({ state }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${state.baseUrl}/user`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(response.data.message);
        })
      })
    },
    upVoteAnswer({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/answer/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(_ => {
          dispatch('fetchQuestion');
          resolve();
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    downVoteAnswer({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/answer/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(_ => {
          dispatch('fetchQuestion');
          resolve();
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    getOneAnswer({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${state.baseUrl}/answer/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({data}) => {
            resolve(data);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
      })
    },
    getTags({ state, commit }, payload) {
      axios({
        method: 'GET',
        url: `${state.baseUrl}/question/tag/${payload}`,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({data}) => {
          commit('FETCH_BY_TAG', data);
          console.log(data);
        })
        .catch(({response}) => {
          console.log(response.data.message);
        })
    },
    getPopular({ state }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${state.baseUrl}/question/popular/tag`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({data}) => {
            console.log(data);
            resolve(data.filter);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
        })
    },
    deleteQuestion({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `${state.baseUrl}/question/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({data}) => {
            dispatch('fetchQuestion');
            resolve(true);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
      })
    },
    deleteAnswer({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `${state.baseUrl}/answer/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({data}) => {
            // dispatch('one')
            resolve(data.message);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
      })
    },
    editQuestion({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: `${state.baseUrl}/question/${payload.question_id}`,
          headers: {
            token: localStorage.getItem('token'),
          },
          data: {
            title: payload.title,
            text: payload.text,
            tags: payload.tags,
          }
        })
          .then(({data}) => {
            dispatch('fetchQuestion');
            resolve(data.message);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
      })
    },
    editAnswer({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: `${state.baseUrl}/answer/${payload.id}`,
          headers: {
            token: localStorage.getItem('token'),
          },
          data: {
            text: payload.text,
          }
        })
          .then(_=> {
            resolve();
          })
          .catch(({ response }) => {
            console.log(response.data.message);
          })
      })
    }
  },
});
