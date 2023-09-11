import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    user: null,
    isLogin: false
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getUser (state) {
      return state.user
    },
    getIsLogin (state) {
      return state.isLogin && state.user !== null
    }
  },
  mutations: {
    SetToken (state, token) {
      state.token = token
    },
    LoginIn (state, user) {
      state.user = user
      state.isLogin = true
    },
    LoginOut: state => {
      state.user = null
      state.isLogin = false
    },
    UpdateUser: (state,user) => {
      if(user){
        state.user = user
        state.isLogin = true
      }
    }
  },
  actions: {
    SetToken (context, token) {
      context.commit('SetToken', token)
    },
    LoginIn (context, user) {
      context.commit('LoginIn', user)
    },
    LoginOut (context) {
      context.commit('LoginOut')
    },
    UpdateUser (context, user=null) {
      context.commit('UpdateUser', user)
    }
  }

})

export default store