import api from '@/services';
import { getCookie } from '@/helpers/customizeCookie.js';
// eslint-disable-next-line require-await
export default async function ({ redirect, route, store, next }) {
  console.log(route);
  const fullPath = route.fullPath || '/';
  console.log(fullPath, 'fullPath');
  const cacheCToken = getCookie('token');
  const authUser = store.state.auth;
  if (route.path === '/login') {
    // alert('?');
    if (authUser.isAuth) {
      console.log('v0');
      redirect('/');
    }
    return;
  }
  if (!cacheCToken) {
    console.log('v1');
    redirect(`/login?c=${fullPath}`);
  } else {
    console.log('v2');
    console.log(authUser.isAuth);
    if (!authUser.isAuth) {
      const res = await api.user.getUserInfo(cacheCToken);
      console.log(res);
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
        console.log('v3');
        // if (route.path !== '/') {
        //   console.log('v3.1');
        //   const nextPath = route.query.c || route.path;
        //   redirect(`${nextPath}`);
        // }
      } catch (error) {
        redirect(`/login?c=${fullPath}`);
        console.log(error);
      }
    } else {
      console.log('v4');
    }
  }
}
