import service from '../api/service'

export default async ({ Vue }) => {
  Vue.prototype.$axios = service
}
