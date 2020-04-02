import axios from 'axios'

export default axios.create({
  baseURL: 'https://twitelum-api.herokuapp.com'
})