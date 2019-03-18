import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'

export const game = {
  state: {
    is_fetching: false,
    is_error: false,
    snapshot: null
  }, //init state
  reducers: {
    // handle state changes with pure functions
    update(state, payload) {
      return {
        ...state,
        ...payload
      }
    },
    setFetchingStatus(state, payload) {
      return {
        ...state,
        is_fetching: payload
      }
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetch(game_id, rootState) {
      try {
        const { data } = await axios.get(_api(`games/${game_id}`))
        dispatch.game.update(data)
      } catch (err) {
        dispatch.game.update({ is_error: true })
      }
    },
    async checkBlock({ posX, posY, is_flag }, rootState) {
      if (rootState.game.status !== 'PD') return;
      const { data } = await axios.patch(_api(`games/${rootState.game.id}`), {
        posX,
        posY,
        is_flag
      })
      dispatch.game.update(data)
    },
    async create({ size_x, size_y, mine_num }, rootState) {
      const token = rootState.user.token
      const { data } = await axios.post(_api('games'), {
        // player,
        size_x,
        size_y,
        mine_num
      })
      dispatch.game.update(data)
      return data
    }
  })
}

export const history = {
  state: {
    list: []
  },
  reducers: {
    // handle state changes with pure functions
    update(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: (dispatch) => ({
    async fetch(rootState) {
      const { data } = await axios.get(_api('games'), _withAuth(rootState))
      dispatch.history.update({
        list: data
      })
    }
  })
}

export const user = {
  state: {
    token: localStorage.getItem('user_token')
  },
  reducers: {
    update(state, data) {
      return {
        ...state,
        ...data
      }
    },
    clear(state) {
      return {
        token: null
      }
    }
  },
  effects: dispatch => ({
    async login({ username, password }, rootState) {
      try {
        const { data } = await axios.post(_api('login'), { username, password })
        localStorage.setItem('user_token', data.token)
        dispatch.user.update(data)
      }catch(err){
        dispatch.user.update({
          is_login_error: true
        })
      }
      
    },
    async signup({ username, password, email }) {
      const { data } = await axios.post(_api('users'), { username, password, email })
      dispatch.user.update(data)
    },
    async logout() {
      localStorage.removeItem('user_token')
      dispatch.user.clear()
    }
  })
}


function _withAuth(rootState) {
  return {
    headers: {
      Authorization: 'Bearer ' + rootState.user.token
    }
  }
}

function _api(path) {
  return API_URL + path
}