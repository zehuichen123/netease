import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    is_show: true,
    uid: '',
    profile: {},
  },
  mutations: {
    set_profile(state, profile){
      state.profile = profile;
      state.uid = profile.userId;
    },
  }
})
