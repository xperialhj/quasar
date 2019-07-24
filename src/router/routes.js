
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/databaselink', component: () => import('pages/DatabaseLink.vue')},
      { path: '/datadict', component: () => import('pages/DataDict.vue')},
      { path: '/datadriverinfo', component: () => import('pages/DataDriverInfo.vue')},
      { path: '/createtask', component: () => import('pages/CreateTask.vue')},
      
    ]
  },
 
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
