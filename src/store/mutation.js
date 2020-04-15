import sessionStorage from '@/assets/js/storage/sessionStorage'
export default {
  SAVE_TOKEN (state, token) {
    state.token = token;
    sessionStorage.setItem("token", token);
  },
  set_user (state, user) {
    state.user = user;
    sessionStorage.setItem('user', user);
  }
}