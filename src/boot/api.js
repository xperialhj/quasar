import api from '../api/api'

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$api = api
}
