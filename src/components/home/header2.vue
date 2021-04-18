<template>
  <div class="header-bg container-header --extend">
    <el-row style="padding-left: 20px">
      <el-col :span="3">
        <!-- <img v-if="oem.mainLogo" :src="oem.mainLogo" alt="oem.productName" style="vertical-align:middle;"> -->
        <!-- <span v-else class="product-name" v-text="oem.productName"></span> -->
      </el-col>
      <el-col :span="16">
        <sub-menu
          :menuLs="topMenus"
          :mode="'horizontal'"
          :style="{ height: '60px', 'line-height': '60px' }"
        ></sub-menu>
      </el-col>
      <el-col
        :span="5"
        style="
          display: flex;
          justify-content: flex-end;
          height: 60px;
          line-height: 60px;
          padding-right: 20px;
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span class="quick-config">
            <el-button @click="goQuickConfig" type="text">快速配置</el-button>
          </span>
          <el-popover
            placement="top-start"
            title=""
            width="200"
            popper-class="contact-popover"
            trigger="hover"
          >
            <!-- <span slot="reference" class="contact-logo">
							<img :src="`/static/eweb-base-img/${rjTheme.current}/4001.png`" style="width: 18px;height: 18px;">
							<span>智能客服</span>
						</span> -->
            <div class="contact">
              <i class="fas fa-phone-square-alt phone-icon"></i>
              <span class="phone-num">123</span>
            </div>
          </el-popover>
          <div class="user-container">
            <img
              class="user-logo"
              :src="`/static/eweb-base-img/theme-00aeff/user.png`"
              style="width: 18px; height: 18px"
            />
            <div class="user">
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
                      <img
                        class="user-logo"
                        :src="`/static/eweb-base-img/theme-00aeff/user.png`"
                        style="width: 24px; height: 24px"
                      />
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
                      :src="`/static/eweb-base-img/theme-00aeff/goback.png`"
                    />
                    <span style="margin-left: 13px; font-size: 15px"
                      >修改密码</span
                    >
                  </div>
                  <el-form
                    v-if="true"
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
                      <el-button type="primary" @click="modifyPwd"
                        >修改</el-button
                      >
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
                  admin
                  <i
                    class="el-icon-caret-bottom"
                    style="font-size: 12px !important"
                  ></i>
                </span>
              </el-popover>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <rjMessage></rjMessage>
    <rjDialog></rjDialog>
  </div>
</template>
<script>
import rjMessage from "../common/util/message.vue";
import SubMenu from "./menu.vue";
import quickConfig from "./quick-config/quickConfig";
import rjDialog from "../common/dialog";
// import { mapState } from "vuex";

export default {
  components: {
    rjMessage,
    SubMenu,
    quickConfig,
    rjDialog,
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
      userName: "admin",
      modifyForm: {
        userName: "admin",
        curPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      showModifyOpiton: false,
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
      menuLs: [
        {
          active: "",
          cellIndex: null,
          id: 1,
          imgCls: null,
          isDisabled: false,
          labelName: "1",
          name: "系统",
          rowIndex: null,
          showSub4NewPage: 3,
          subLs: [
            {
              active: "",
              cellIndex: 2,
              id: 10,
              imgCls: null,
              isDisabled: false,
              labelName: "50",
              name: "系统",
              rowIndex: 2,
              showSub4NewPage: 2,
              subLs: [
                {
                  active: "",
                  cellIndex: null,
                  id: 101,
                  imgCls: null,
                  isDisabled: false,
                  labelName: "eweb-system-administratoraccount",
                  name: "管理员帐号",
                  rowIndex: null,
                  showSub4NewPage: 2,
                  subLs: [
                    {
                      active: "",
                      cellIndex: null,
                      id: 1010,
                      imgCls: null,
                      isDisabled: false,
                      labelName: "eweb-system-administratoraccount",
                      name: "管理员帐号",
                      rowIndex: null,
                      showSub4NewPage: 2,
                      subLs: [],
                      url: "/home/eweb-system-administratoraccount/index",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          active: "",
          cellIndex: null,
          id: 5,
          imgCls: null,
          isDisabled: false,
          labelName: "5",
          name: "系统",
          rowIndex: null,
          showSub4NewPage: 3,
          subLs: [
            {
              active: "",
              cellIndex: 1,
              id: 50,
              imgCls: null,
              isDisabled: false,
              labelName: "50",
              name: "系统",
              rowIndex: 1,
              showSub4NewPage: 1,
              subLs: [
                {
                  active: "",
                  cellIndex: null,
                  id: 501,
                  imgCls: null,
                  isDisabled: false,
                  labelName: "eweb-system-administratoraccount",
                  name: "管理员帐号",
                  rowIndex: null,
                  showSub4NewPage: 1,
                  subLs: [
                    {
                      active: "",
                      cellIndex: null,
                      id: 5010,
                      imgCls: null,
                      isDisabled: false,
                      labelName: "eweb-system-administratoraccount",
                      name: "管理员帐号",
                      rowIndex: null,
                      showSub4NewPage: 1,
                      subLs: [],
                      url: "/home/eweb-system-administratoraccount/index",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          active: "",
          cellIndex: null,
          id: 5,
          imgCls: null,
          isDisabled: false,
          labelName: "5",
          name: "系统",
          rowIndex: null,
          showSub4NewPage: 3,
          subLs: [
            {
              active: "",
              cellIndex: 1,
              id: 50,
              imgCls: null,
              isDisabled: false,
              labelName: "50",
              name: "系统",
              rowIndex: 1,
              showSub4NewPage: 1,
              subLs: [
                {
                  active: "",
                  cellIndex: null,
                  id: 501,
                  imgCls: null,
                  isDisabled: false,
                  labelName: "eweb-system-administratoraccount",
                  name: "管理员帐号",
                  rowIndex: null,
                  showSub4NewPage: 1,
                  subLs: [
                    {
                      active: "",
                      cellIndex: null,
                      id: 5010,
                      imgCls: null,
                      isDisabled: false,
                      labelName: "eweb-system-administratoraccount",
                      name: "管理员帐号",
                      rowIndex: null,
                      showSub4NewPage: 1,
                      subLs: [],
                      url: "/home/eweb-system-administratoraccount/index",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          active: "",
          cellIndex: null,
          id: 5,
          imgCls: null,
          isDisabled: false,
          labelName: "5",
          name: "系统",
          rowIndex: null,
          showSub4NewPage: 3,
          subLs: [
            {
              active: "",
              cellIndex: 1,
              id: 50,
              imgCls: null,
              isDisabled: false,
              labelName: "50",
              name: "系统",
              rowIndex: 1,
              showSub4NewPage: 1,
              subLs: [
                {
                  active: "",
                  cellIndex: null,
                  id: 501,
                  imgCls: null,
                  isDisabled: false,
                  labelName: "eweb-system-administratoraccount",
                  name: "管理员帐号",
                  rowIndex: null,
                  showSub4NewPage: 1,
                  subLs: [
                    {
                      active: "",
                      cellIndex: null,
                      id: 5010,
                      imgCls: null,
                      isDisabled: false,
                      labelName: "eweb-system-administratoraccount",
                      name: "管理员帐号",
                      rowIndex: null,
                      showSub4NewPage: 1,
                      subLs: [],
                      url: "/home/eweb-system-administratoraccount/index",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          active: "",
          cellIndex: null,
          id: 5,
          imgCls: null,
          isDisabled: false,
          labelName: "5",
          name: "系统",
          rowIndex: null,
          showSub4NewPage: 3,
          subLs: [
            {
              active: "",
              cellIndex: 1,
              id: 50,
              imgCls: null,
              isDisabled: false,
              labelName: "50",
              name: "系统",
              rowIndex: 1,
              showSub4NewPage: 1,
              subLs: [
                {
                  active: "",
                  cellIndex: null,
                  id: 501,
                  imgCls: null,
                  isDisabled: false,
                  labelName: "eweb-system-administratoraccount",
                  name: "管理员帐号",
                  rowIndex: null,
                  showSub4NewPage: 1,
                  subLs: [
                    {
                      active: "",
                      cellIndex: null,
                      id: 5010,
                      imgCls: null,
                      isDisabled: false,
                      labelName: "eweb-system-administratoraccount",
                      name: "管理员帐号",
                      rowIndex: null,
                      showSub4NewPage: 1,
                      subLs: [],
                      url: "/home/eweb-system-administratoraccount/index",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    // ...mapState(['oem']),
    topMenus: function () {
      return this.menuLs;
    },
    // userName: function () {
    //   return this.userName;
    // },
  },
  mounted() {
    //vlan告警判断是否有vlan
    // this.init();
  },
  methods: {
    // init() {
    //   var tags = document.getElementById("iotp-run-modules-path").value;
    //   if (tags.indexOf("eweb-vlan") != -1) {
    //     this.hasVlan = true;
    //   }
    // },
    //注销
    logout: function () {
      // let self = this;
      // self.$store.commit(self.$storeTypes.LOGOUT);
      // self.$nextTick(function () {
      //   self.$router.push(
      //     self.$store.state.loginUserInfo.loginOutUrl || "/login"
      //   );
      // });
    },
    goBack: function () {
      this.showModifyOpiton = false;
    },
    goModify: function () {
      this.showModifyOpiton = true;
    },
    //修改密码
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
    goQuickConfig() {
      this.rjDialog
        .title("快速配置")
        .width("1100px")
        .currentView(quickConfig, { routeType: "static" })
        .showClose(true)
        .sizeTiny()
        .closeOnClickModal(false)
        .then((opt) => {})
        .show();
    },
  },
};
</script>
<style lang="scss" scoped>
.product-name {
  vertical-align: middle;
  font-size: 16px;
}
.quick-config {
  vertical-align: -2px;
  font-size: 16px;
  width: 75px;
}
.contact-logo {
  display: inline-block;
  width: 90px;
  img {
    vertical-align: middle;
  }
  span {
    vertical-align: -1px;
  }
}
.user-container {
  display: flex;
  align-items: center;
  width: 90px;
}
</style>

<style lang="scss">
.header-bg {
  .el-menu--horizontal {
    border: none;

    & > .el-menu-item,
    & > .el-submenu .el-submenu__title {
      // padding-top: 10px;
      box-sizing: border-box;
      height: 60px;
    }
  }
}
.contact-popover {
  .phone-icon {
    font-size: 32px;
    color: greenyellow;
    vertical-align: middle;
  }
  .phone-num {
    margin-left: 5px;
    color: white;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
