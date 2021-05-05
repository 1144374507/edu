import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ScheduleManagement from '@/page/scheduleManagement/scheduleManagement'
import UserManagement from '@/page/userManagement/index'
import CourseElectives from '@/page/courseElectives/courseElectives'
import Achievement from '@/page/achievement'
import TeacherManagement from '@/page/teacherManagement/teacherManagement'
import changeTheme from '../components/theme/themeIndex'
import Login from '../components/login/login'
// const Home= ()=> import('@/components/home/header')

Vue.use(Router)
const routes = [
  {
    path: '/scheduleManagement',
    name: 'ScheduleManagement',
    component: ScheduleManagement,
    // children: [
    //   // {
    //   // 嵌套路由的默认路由
    //   // path: "",
    //   // redirect: 'news'
    //   // },
    //   {
    //     path: 'news',
    //     component: HomeNews
    //   },
    //   {
    //     path: 'message',
    //     component: HomeMessage
    //   }
    // ],
  },
  {
    // 用户管理
    path: '/userManagement',
    name: 'UserManagement',
    component: UserManagement
  },
  {
    // 课程管理
    path: '/courseElectives',
    name: 'CourseElectives',
    component: CourseElectives
  },
  {
    // 课程选修
    path: '/achievement',
    name: 'Achievement',
    component: Achievement
  },
  {
    // 教师管理
    path: '/teacherManagement',
    name: 'TeacherManagement',
    component: TeacherManagement
  },
  {
    // 主题管理
    path: '/changeTheme',
    name: 'ChangeTheme',
    component: changeTheme
  },,
  {
    // 登录管理
    path: '/login',
    name: 'Login',
    component: Login
  },
 
]
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
} 

export default new Router({
  routes,
  // mode:history,

})
