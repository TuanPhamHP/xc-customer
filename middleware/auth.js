import api from '@/services';
import { getCookie } from '@/helpers/customizeCookie.js';
// eslint-disable-next-line require-await
export default async function ({ redirect, route, store, next }) {
  const fullPath = route.fullPath || '/';
  const cacheCToken = getCookie('token');
  const authUser = store.state.auth;
  if (route.path === '/login') {
    // alert('?');
    if (authUser.isAuth) {
      redirect('/');
    }
    return;
  }
  if (!cacheCToken) {
    redirect(`/login?c=${fullPath}`);
  } else {
    console.log('v2');
    if (!authUser.isAuth) {
      const res = await api.user.getUserInfo(cacheCToken);

      if (!res) {
        redirect(`/login?c=${fullPath}`);
      }
      try {
        const authSet = {
          isAuth: true,
          user: res.data.data.customer,
          token: `Bearer ${cacheCToken}`
        };
        store.commit('SET_USER_LOGGEDIN', authSet);

        // if (route.path !== '/') {
        //   console.log('v3.1');
        //   const nextPath = route.query.c || route.path;
        //   redirect(`${nextPath}`);
        // }
      } catch (error) {
        redirect(`/login?c=${fullPath}`);
      }
    } else {
      console.log('v4');
    }
  }
}
