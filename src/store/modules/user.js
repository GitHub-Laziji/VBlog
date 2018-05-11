import UserApi from '@/api/user'


const user = {
    state: {
        avatarUrl: null,
        name: null,
        location: null,
        blog: null,
        followers: 0,
        following: 0
    },

    mutations: {
        SET_AVATAR_URL: (state, value) => {
            state.avatarUrl = value
        },
        SET_NAME: (state, value) => {
            state.name = value
        },
        SET_LOCATION: (state, value) => {
            state.location = value
        },
        SET_BLOG: (state, value) => {
            state.blog = value
        },
        SET_FOLLOWERS: (state, value) => {
            state.followers = value
        },
        SET_FOLLOWING: (state, value) => {
            state.following = value
        }
    },

    actions: {
        GetInfo({ commit }) {
            UserApi.getInfo().then((response) => {
                let result = response.data
                commit('SET_AVATAR_URL', result['avatar_url'])
                commit('SET_NAME', result['name'])
                commit('SET_LOCATION', result['location'])
                commit('SET_BLOG', result['blog'])
                commit('SET_FOLLOWERS', result['followers'])
                commit('SET_FOLLOWING', result['following'])
            })

        }
    }
}

export default user