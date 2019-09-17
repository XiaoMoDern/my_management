export default {
    state: {
        authorization: ''
    },
    getters: {

    },
    mutations: {
        login(state, authorization) {
            localStorage.setItem('Authorization', authorization);
            state.authorization = authorization;
        },
        logout(state) {
            state.authorization = "";
            localStorage.removeItem('Authorization');
        }
    }
}