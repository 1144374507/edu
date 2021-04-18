import * as tokenObj from '@common/js/tokenMng.js'
import rjMessage from '@common/js/message'
import { tm } from '@eweb_base/i18n/core'

/**
 * [二次封装后端请求类]
 * @param  {[type]} response  [服务端响应的上下文]
 * @param  {[type]} store  [vuex全局上下文]
 * @param  {[type]} types  [vuex全局上下文回调常量]
 * @param  {[type]} router [路由对象]
 * @return {[type]}        [description]
 */
export const error = (response, store, router, types) => {
  let code = response.respCode;
  let noErrorTip = response.noErrorTip;
  switch (code) {
    case "1999":
      rjMessage.error('系统还未授权,请先授权');
      store.state.authority.setAuthorityVal(undefined);
      router.push("/home/noAuthority");
      break;
    case "1401":
      // let tokenInvalid = tokenObj.checkTokenIsInvalid();
      // if (!tokenInvalid) {
      //   console.log("请求时间过长，导致原有token失效，但是有新token生成，页面不能判定为失效");
      // } else {
      console.log("token 失效了!");
      //登录页返回401
      if (router.history.current.fullPath === "/login") {
        rjMessage.error('用户名或密码错误，请重新登录!');
      } else {
        rjMessage.error('您当前页面已过期，请重新登录!');
        let loginUserInfo = JSON.parse(sessionStorage.loginUserInfo || "{}");
        store.commit(types.LOGOUT);
        router.push(loginUserInfo.loginOutUrl || "/login");
      }
      // }
      break
    case "1404":
      rjMessage.error('系统找不到您要访问的服务!');
      break
    case "1504":
      rjMessage.error('无法访问服务器!');
    case "1503":
      rjMessage.error('无法访问服务器!');
      //window.location.href = "/error/50x.html";
      break
    case "1204":
      rjMessage.error('系统出现未知错误!');
      break
    case "1500":
      if (!noErrorTip) {
        rjMessage.error(tm('eweb-request')(response.message));
        // rjMessage.error('无法获取服务器数据，请稍后重试!');
      }
      break
    case "1600":
      if (!noErrorTip) {
        rjMessage.error(tm('eweb-request')(response.message));
      }
      break
    default:
      rjMessage.error('系统出现未知错误!');
  }
}
