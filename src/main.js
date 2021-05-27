// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import vueAxios from 'vue-axios'

// import {store} from '@/assets/js/extend4srt.js'
import store from '@/store/index'
import './theme/index.css'
import './theme/theme-000/index.css'
import '@/assets/js/extend4theme.js'

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';


import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'

// 注册组件后即可使用
Vue.component('v-chart', ECharts)

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel);

Vue.use(Loading.directive);




Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$getViewportSize = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,//兼容性获取屏幕宽度
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight//兼容性获取屏幕高度
  };
};
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.use(vueAxios, axios);
/* eslint-disable no-new */
// import store from './store'


router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = window.localStorage.token;
    if (token === 'null' || token === '' || token === undefined) {
      next('/login');
    } else {
      next();
    }
  }
})

//添加请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('store.state.token', router.history.current.name);
    if (store.state.token) {

      let token = `Bearer ${store.state.token}`
      // token = token.replace(/\"/g, "");
      config.headers.common['authorization'] = token
    } else {
      if (router.history.current.name != 'Login') {
        Vue.prototype.$message.error(`token不存在，请重新登陆`);
        console.log('this', this);

      }

    }
    return config;
  },
  error => {
    //对请求错误做什么
    return Promise.reject(error);
  }
)
import XLSX from 'xlsx'
Vue.use(XLSX)


//http reponse拦截器

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          /*     router.push('/views/login');*/
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
          })
      }
    }

  }
)


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
