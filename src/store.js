import {
  createStore
} from 'redux'

function tweetsReducer(state = [], action) {
  if (action.type === 'CARREGA_TWEETS') {
    return action.tweets
  }

  return state
}
const store = createStore(tweetsReducer)
console.log(`Primeira versão da store:`, store.getState())

//window.store = store
export default store