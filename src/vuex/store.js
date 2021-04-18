import Vuex from 'vuex'
import moduleName from 'vuex'
import Vue from 'vue'
import * as token from '@/common/js/tokenMng.js'
import {
  rememberAccount,
  removeAccount,
  getRememberAccount
} from '@/assets/js/rememberLogin'

Vue.use(Vuex);

var serviceName = document.getElementById("ui-serviceName").value;

const i18nLang = localStorage.getItem('I18N_LANG') || 'zh'

/**
 * [二次封装vuex-store全局上下文对象]
 * @param  {[type]} types [vue-store全局上下文常量类]
 * @param  {[type]} expendOpt [扩展vue-store全局上下文]
 * @return {[type]}       [vuex-store全局上下文对象]
 */
export let store = function (types, expendOpt) {
  let storeOpt = {
    state: {
      serviceName: serviceName,
      listenInit: undefined,
      tokenKey: 'Authorization',
      userName: '',
      token: '',
      userId: '',
      //菜单下的面包屑导航
      tipLs: undefined,
      //监听浏览器窗口变化
      monitor_win_size: undefined,
      //框架样式
      frameSetStyle: {
        //是否全屏
        fullScreen: false,
        //头部高度
        headH: 80,
        //初始化
        init: function () {
          let fullScreen = this.fullScreen;
          let headH = this.headH;
          let screenW = window.innerWidth <= 1000 ? 1000 : window.innerWidth;
          let screenH = window.innerHeight;
          let contentW = screenW;
          return {
            fullScreen: fullScreen,
            mainStyleHeight: `${screenH}`,
            mainStyle: ` height:${screenH}px; overflow:auto; `
          }
        }
      },
      base_default_url: undefined,
      //取得纯内容高度
      content_height: function () {
        let contentTip = document.getElementsByClassName("contentTip")[0];
        let tipH = contentTip ? contentTip.clientHeight : 0;
        let header = document.getElementsByClassName("header")[0];
        let headerH = header ? header.clientHeight : 0;
        let contentH = window.innerHeight - tipH - headerH - 22;
        return contentH;
      },
      //取得纯内容宽度
      content_width: function () {
        let contentTip = document.getElementsByClassName("contentTip")[0];
        let tipW = contentTip ? contentTip.clientWidth : 0;
        return tipW;
      },
      //菜单可用状态
      menuAvailable: undefined,
      //路由和项目名映射
      router2Pro: {},
      //二级路由
      containerRouteName: "home",
      //用户登录信息
      loginUserInfo: JSON.parse(sessionStorage.loginUserInfo||"{}"),
      //二级菜单
      subMenuLs: JSON.parse(sessionStorage.$subMenuLs || "[]"),
      //菜单选中index
      topMenuActiveIndex: '',
      leftMenuActiveIndex: '',
      baner4LeftMenuBottom: {
        obj: undefined,
        h: 0
      },
      //标记是否刷新当前页面
      flagIsReload: false,
      //一页显示数量
      pageSizes: [],
      // 国际化语言 默认中文
      i18nLang: i18nLang,
      // OEM信息
      oem: {
        compnayLimit: '锐捷网络股份有限公司', // 有限公司名称
        productName: 'eweb', // 产品名称 PS没有定制logo图片，首页使用产品名
        productDesc: 'hello eweb', // 产品描述
        copyright: 'Copyright @2019-2020', // 页脚显示
        officialWebsite: 'http://ruijie.com.cn', // 公司官网地址
        contactPhone: '4001233333', // 公司联系电话
        favicon: '/static/img/title-logo.png', // 浏览器tab栏小图标
        indexText: '', // 暂时未用到
        mainText: '', // 暂时未用到
        lang: 'zh', // 定制化产品的语言
        indexLogo: '/static/eweb-base-img/un-theme/eweb/login-logo.png', // 登录页logo
        mainLogo: '/static/eweb-base-img/theme-00aeff/img4service/eweb/head-logo.png' // 首页logo
      }
    },
    mutations: {
      [types.MENUACTIVE_INDEX]: (state, opt) => {
        opt = opt || {};
        state.topMenuActiveIndex = opt.topMenuActiveIndex;
        state.leftMenuActiveIndex = opt.leftMenuActiveIndex;
        state.baner4LeftMenuBottom = opt.baner4LeftMenuBottom;
      },
      [types.PAGE_SIZES]: (state, pageSizes) => {
        state.pageSizes = pageSizes;
      },
      [types.FLAG_IS_RELOAD]: (state, isReload) => {
        state.flagIsReload = isReload;
      },
      [types.RESET_MENU]: (state, menuLs) => {
        let loginUserInfo = state.loginUserInfo;
        loginUserInfo.menuLs = menuLs || [];
        state.loginUserInfo = loginUserInfo;
        sessionStorage.loginUserInfo = JSON.stringify(loginUserInfo);
      },
      [types.SUBMENU_LS]: (state, subMenuLs) => {
        state.subMenuLs = subMenuLs || [];
        sessionStorage.$subMenuLs = JSON.stringify(state.subMenuLs);
      },
      [types.loginUserInfo]: (state, loginUserInfo) => {
        //{isAdmin: 0,menuLs: [],loginOutUrl: "",pwdChgUrl: "",userType: "",userSubType: ""}
        state.loginUserInfo = loginUserInfo;
        sessionStorage.loginUserInfo = JSON.stringify(loginUserInfo);
        localStorage.setItem('userName', loginUserInfo.userName);
        localStorage.setItem('userId', loginUserInfo.userId);
        state.userName = localStorage.getItem('userName');
        state.userId = localStorage.getItem('userId');
        state.subMenuLs = [];
      },
      [types.CacheUserInfo]: (state, data) => {
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userId', data.userId);
        state.userName = localStorage.getItem('userName');
        state.userId = localStorage.getItem('userId');
      },
      [types.LOGIN]: (state, data) => {
        token.setToken(data);
        state.token = data.token;
        //下发到所有监听listenInit的组件
        state.listenInit = new Date().getTime();
      },
      [types.LOGOUT]: (state) => {
        let account = getRememberAccount();
        token.destroyed();
        sessionStorage.clear();
        localStorage.clear();
        rememberAccount(account);
      },
      [types.TOKEN]: function (state, token) {
        if (!token) return;
        state.token = token;
      },
      [types.BREADCRUMB]: function (state, tipLs) {
        if (state.authority.isCheck()) {
          let tipLsTemp = [];
          for (let i = 0; i < tipLs.length; i++) {
            tipLsTemp.push(tipLs[i])
          }
          state.tipLs = tipLsTemp;
        } else state.tipLs = undefined;
      },
      [types.BREADCRUMB_APPEND]: function (state, tipLsParams) {
        state.tipLs = state.tipLs ? state.tipLs : [];
        let tip = tipLsParams;
        if (!(tipLsParams instanceof Array)) {
          state.tipLs.push(tipLsParams);
        } else {
          for (let i = 0; i < tipLsParams.length; i++) {
            state.tipLs.push(tipLsParams[i]);
          }
          tip = tipLsParams[tipLsParams.length - 1];
        }
        let url = tip.url;
        let urlTemp = url.split("?");
        if (urlTemp.length == 2) {
          tip.url = urlTemp[0];
          tip.params = urlTemp[1];
        }
        let tipLsTemp = [];
        for (let i = 0; i < state.tipLs.length; i++) {
          tipLsTemp.push(state.tipLs[i]);
        }
        let menuToTipLs = JSON.parse(sessionStorage.getItem(types.MENU_TO_URL_TIPS));
        if (!menuToTipLs) return;
        let isStoreTip = menuToTipLs[tip.url];
        menuToTipLs[tip.url] = {
          spes: tipLsTemp,
          isshowbreak: isStoreTip ? isStoreTip.isshowbreak : true
        };
        sessionStorage.setItem(types.MENU_TO_URL_TIPS, JSON.stringify(menuToTipLs));
      },
      [types.BREADCRUMB_BACK]: function (state, tip) {
        let newTipLs = [];
        let tipLs = state.tipLs || [];
        for (let i = 0; i < tipLs.length - 1; i++) {
          newTipLs.push(tipLs[i]);
        }
        state.tipLs = newTipLs;
      },
      [types.BREADCRUMB_URL]: function (state, urlTips) {
        let lastMenuToUrl = JSON.parse(sessionStorage.getItem(types.MENU_TO_URL_TIPS));
        lastMenuToUrl = lastMenuToUrl ? lastMenuToUrl : {};
        Object.assign(lastMenuToUrl, urlTips);
        sessionStorage.setItem(types.MENU_TO_URL_TIPS, JSON.stringify(lastMenuToUrl));
      },
      [types.SET_FULL_SCREEN]: function (state, isFullScreen) {
        state.frameSetStyle.fullScreen = isFullScreen
        if (isFullScreen) state.frameSetStyle.headH = 0;
        else state.frameSetStyle.headH = 80;
        state.monitor_win_size = new Date().getTime();
      },
      [types.RESETFRAMESET]: function (state) {
        state.monitor_win_size = new Date().getTime();
      },
      [types.DEFAULT_URL]: function (state, defUrl) {
        state.base_default_url = defUrl;
      },
      [types.LicenseCheck]: function (state, isAvaiable) {
        sessionStorage.setItem("isAvaiable", isAvaiable);
        state.menuAvailable = isAvaiable;
      },
      [types.ROUTER_2_PRO]: (state, router2Pro) => {
        state.router2Pro = router2Pro;
      },
      [types.SET_I18N_LANG]: (state, val) => {
        Vue.locale = val
        state.i18nLang = val
        localStorage.setItem('I18N_LANG', val)
      },
      [types.SET_OEM_INFO]: (state, val) => {
        state.oem = val;
        document.getElementById("shortcut-icon").href = val.mainLogo
      }
    },
    getters: { // getters
    },
    modules: {}
  };

  if (expendOpt) {
    for (let i = 0; i < expendOpt.length; i++) {
      let expend = expendOpt[i];
      if (expend && expend.module && expend.store) {
        storeOpt.modules[expend.module] = expend.store
      }
    }
  }

  return new Vuex.Store(storeOpt);
};
