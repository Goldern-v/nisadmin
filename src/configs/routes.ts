import ViewHome from '../views/ViewHome'
import ViewLogin from '../views/ViewLogin'
import ViewUsers from '../views/ViewUsers'
import { RouteItem } from '../components/RouterView'

const routes: RouteItem[] = [
  {
    path: '/login',
    component: ViewLogin
  },
  {
    path: '/',
    component: ViewHome,
    redirect: '/users',
    routes: [
      {
        path: '/users',
        component: ViewUsers
      }
    ]
  }
]

export default routes
