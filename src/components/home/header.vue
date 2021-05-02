
<template>
  <div>
   
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">个人管理</el-menu-item>
      <el-menu-item index="2">课程管理</el-menu-item>
      <el-menu-item index="3">成绩管理</el-menu-item>
      <el-menu-item index="4">教师管理</el-menu-item>
      <div class="user __change__theme__wrap__">
        <div class="">
          <span class="">
            <el-popover
              style="height: 120"
              placement="bottom"
              title="主题"
              width="200"
              trigger="manual"
              content="选择一个主题。"
              v-model="visible2"
            >
              <el-button slot="reference" @click="visible2 = !visible2"
                >主题</el-button
              >
              <themeIndex></themeIndex>
            </el-popover>
          </span>
        </div>
        <el-popover
          placement="bottom"
          width="300"
          :visible-arrow="false"
          trigger="click"
        >
          <div v-if="!showModifyOpiton">
            <div
              style="
                display: flex;
                justify-content: space-around;
                height: 50px;
                line-height: 50px;
                align-items: center;
              "
            >
              <div style="display: flex; align-items: center">
                <span class="user-logo">
                  <img
                    src="../../../static/eweb-base-img/theme-00aeff/user.png"
                  />
                </span>

                <span
                  class="el-dropdown-link"
                  style="font-size: 15px !important; margin-left: 20px"
                  >admin</span
                >
              </div>
              <div
                v-if="true"
                id="modifyPwd"
                @click="goModify"
                style="cursor: pointer"
              >
                修改密码
              </div>
            </div>
            <div
              style="
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
              "
              class="login-out-line"
            >
              <span v-if="true" id="logout" @click="logout">退出</span>
            </div>
          </div>
          <div v-if="showModifyOpiton">
            <div
              style="
                display: flex;
                height: 30px;
                line-height: 30px;
                align-items: center;
                margin-bottom: 10px;
              "
            >
              <img
                id="goBack"
                style="height: 18px"
                @click="goBack"
                src="../../../static/eweb-base-img/theme-00aeff/goback.png"
              />
              <span style="margin-left: 13px; font-size: 15px">修改密码</span>
            </div>
            <el-form
              style="text-align: center"
              label-width="100px"
              :rules="rules"
              ref="modifyForm"
              :model="modifyForm"
            >
              <el-form-item label="当前密码：" prop="curPwd">
                <el-input
                  id="curPwd"
                  type="password"
                  v-model.trim="modifyForm.curPwd"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码：" prop="newPwd">
                <el-input
                  id="newPwd"
                  type="password"
                  v-model.trim="modifyForm.newPwd"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认新密码：" prop="confirmPwd">
                <el-input
                  id="confirmPwd"
                  type="password"
                  v-model.trim="modifyForm.confirmPwd"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="modifyPwd">修改</el-button>
              </el-form-item>
            </el-form>
          </div>

          <span
            slot="reference"
            class="el-dropdown-link"
            style="
              font-size: 15px !important;
              margin-left: 5px;
              cursor: pointer;
            "
          >
            <img
              class="user-logo"
              src="../../../static/eweb-base-img/theme-00aeff/user.png"
            />
            admin
            <i
              class="el-icon-caret-bottom"
              style="font-size: 12px !important"
            ></i>
          </span>
        </el-popover>
      </div>
    </el-menu>
    <div class="line"></div>
  </div>
</template>
<script>
import themeIndex from "../theme/themeIndex";
export default {
  components: {
    themeIndex,
  },
  data() {
    //验证确认密码
    var validateConfirmPwd = (rule, value, callback) => {
      if (value !== this.modifyForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "1",
      visible2: false,
      showModifyOpiton: false,
      modifyForm: {
        userName: "admin",
        curPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      rules: {
        curPwd: [
          {
            required: true,
            message: "请输入当前密码",
          },
        ],
        newPwd: [
          {
            required: true,
            message: "请输入新密码",
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: "请输入 6 到 20 位字母、数字组合",
          },
        ],
        confirmPwd: [
          {
            required: true,
            message: "请输入确认密码",
          },
          {
            validator: validateConfirmPwd,
          },
        ],
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
          
     if(key==1) this.$router.push("/userManagement")
     if(key==2) this.$router.push("/scheduleManagement")
     if(key==3) this.$router.push("/achievement")
     if(key==4) this.$router.push("/teacherManagement")
    },
    goBack: function () {
      this.showModifyOpiton = false;
    },
    goModify: function () {
      this.showModifyOpiton = true;
    },
    //注销
    logout: function () {
      // let self = this;
      // self.$store.commit(self.$storeTypes.LOGOUT);
      // self.$nextTick(function () {
      //   self.$router.push(
      //     self.$store.state.loginUserInfo.loginOutUrl || "/login"
      //   );
      // });
    }, //修改密码
    modifyPwd: function () {
      //密码不能为空
      //新密码和确认密码要相等
      //提交密码
      let self = this;
      self.$refs["modifyForm"].validate((valid) => {
        if (valid) {
          self.$axios
            .post("/api/common/webmaster/modifyPassword", {
              userId: "self.$store.state.userId",
              userName: "self.$store.state.userName",
              oldPassword: self.modifyForm.curPwd,
              password: self.modifyForm.newPwd,
            })
            .then((res) => {
              if (res.data.success) {
                //提示用户修改成功，然后等待3秒，自动跳转到登录页
                self.rjMessage.success("修改成功，3秒后自动跳转到登录页");
                setTimeout(() => {
                  self.logout();
                }, 3000);
              } else {
                self.rjMessage.error(res.data.message || res.data.msg);
              }
            })
            .catch((error) => {
              self.rjMessage.error("当前密码错误");
              // 异常统一在axios/index.js中处理掉
            });
        }
      });
    },
  },
  created(){
    // 初始化菜单
    if(this.$route.name == 'UserManagement'){
      this.activeIndex = '1'
      return
    }
    if(this.$route.name == 'ScheduleManagement'){
      this.activeIndex = '2'
      return
    }
    if(this.$route.name == 'Achievement'){
      this.activeIndex = '3'
      return
    }
    if(this.$route.name == 'TeacherManagement'){
      this.activeIndex = '4'
      return
    }

  }
};
</script>

<style scoped>
.flot1 {
  float: left;
}
.router-link-active {
  color: #98a09e !important;
}

.__p_124_u_136 {
  vertical-align: middle;
}

.__p_124_u_135 {
  float: left;
}

.__p_124_u_138 {
  vertical-align: middle;
}

.__p_124_u_137 {
  float: right;
  margin-left: 50px;
}

.__p_124_u_140 {
  font-size: 14px;
  color: #ffffff;
}
.__p_124_u_140 > a {
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
}
.__p_124_u_139 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 50px;
}

.__p_124_u_142 {
  font-size: 14px;
  color: #ffffff;
}

.__p_124_u_141 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__p_124_u_144 {
  font-size: 14px;
  color: #12c2ab;
}

.__p_124_u_143 {
  display: inline-block;
  vertical-align: bottom;
  /* border-bottom: 2px solid #12c2ab; */
  margin-left: 38px;
}

.__p_124_u_146 {
  font-size: 14px;
  color: #ffffff;
}

.__p_124_u_145 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__p_124_u_148 {
  font-size: 14px;
  color: #ffffff;
}

.__p_124_u_147 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__p_124_u_150 {
  font-size: 14px;
  color: #ffffff;
}

.__p_124_u_149 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__p_124_u_134 {
  /* background: #03091f; */
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
  line-height: 60px;
  margin-bottom: 14px;
}
</style>
<style lang="scss">
.__p_124_u_134 {
  .el-popover__reference {
    color: blanchedalmond;
  }
  .user-logo {
    width: 24px;
    height: 24px;
    // background-color: rgb(31, 7, 7) !important;
    display: inline-block;
  }
}
.el-popover {
  // background: #03091f !important;
}
.__change__theme__wrap__ {
  margin-right: 20px;
  float: right;
  display: flex;
  margin-top: 10px;
  .el-popover {
    height: 120px !important;
  }
}
</style>