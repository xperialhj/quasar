import service from './service'

export default async ({ Vue }) => {
  Vue.prototype.$axios = service
}
