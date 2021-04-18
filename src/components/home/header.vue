
<template>
  <div>
    <div class="__p_124_u_134">
      <div class="__p_124_u_135">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAYCAYAAACoaOA9AAAEB0lEQVRYhdWZTWhcVRTHf28caz8UO7pRi1SmtKla4ke6EVwojdCV4McURMVdotWNWkxRXLgyQaVuuohVED8WTrELPxBsNAvBhSStFazS0FhqQLQwIyQLxY+/i3Meub3z3uQlmYnJHy73vnvPPfe8c//n3DtvEkkUxOXAG94eAOaKTlyrSAo6pwc4Btzkzz8CDwLfd8muVYFSAZkaMMG8YwB2At8Aj3bDqNWCds65FDgE1LGQirEReAc4AqzvvGmrAJKyynWSvlJxfCtpW46uxZa6pLOSKkXku/T+SMpkzl3ACeDORaxxi8+5f9nWtqIGyEtfloCkhqSJjq8cees5Sf8sgjFZeF1S0iEWIakW6J7IYs5ynNNu7XIgdwWwBxj350uADZGuceDFjDX+jddciqELYBJjzhAw0gX9rXAvpTt9qA0j/pS03eU2L1AqkkpLZErdmRAzZ8iZ05BUXYg5Ln82sL8uqRKMp+v0ud6L5BTknP3A7cALwHSOH18Gprw9AjTblC+BOzqwdzH2eT3aTkhSH1AFdidJkgC7gf6ceXVgEEhcfz9wPFWEpMOSTkgqS7o7gzVnJK0PdnOzpF9yGDYraU7SYBeYkzJCkgbaMSfDYcclNYLnuuupReun+vtT5uwEbgOexvLKkUj3E8AfwfPvwFM5dkwDm4Cb2xm7DIxg+WcIqLQT9BcfljScI9sEjkZ9k173pc7Z7vVLwDbgADDjfe8DX2Qo/hD4KOqbAnq93Uv3MIiFTWZ4uVMaWMiEx38lzDs5aKaNEnbTvd6fN/iCs8DjLvhMG0VPuizYiRXepHctYMRyMAkcBGqSahnjw8B0YrgnSZKD5OfSGFWvmyXmWZNiD/AY8ClwI/BbG0UzWBIHOAlcG4xdDVxT0KClIA2vYYLddmZUgbFIPusCWcno7/d6rATsyJj0GnAl8GsBIw8Dn2C35BjdZA8Ye6rM7zZJkjQxltTSEJI0Sn5+Gg3mD3gZAabLWDKOcRXwCHAeC7USUAYu8/FNXh/D2LMOOIVdB5JAzy5ad7CTGMNeZCjq34e9dMNPtBGXjUOwiX2jmsCc18QcbpdMSe9GR/EPks55+6ec41qSfpa0TtIDQd+MpKng+a0lHueFy1Kh1itD5s+HHpc/g7EjZFLSonUeBzBGvRr0bfH6O2Ar3TvOVwQlLFSmsNxTjca3Yok2xjjwAfAscEPGeC/2jWc2Y2zNoIQd2Z8DF3JkdnDx9+K/sQvgFuD5nDmnsNh9qDNm/k8IYqwsaa/noLkov5wM2q+4/HuRzAXZ54pbu51nVqrkfWDfCNwLPAzsxXLROSxUerBc8jXGos+At4GPgb+6vZkriSL/PlSA+zAnHfXyJnAa+2lR5C60JvEfYEd+8fRMchcAAAAASUVORK5CYII="
          class="__p_124_u_136"
        />
      </div>
      <div class="__p_124_u_137">
        <!-- <img
          src="data:image/png;base64,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"
          class="__p_124_u_138"
        /> -->
        <div class="user __p_124_u_138">
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
      </div>
      <div class="flot1">
        <div class="__p_124_u_139">
          <span class="__p_124_u_140"
            ><router-link tag="a" to="/userManagement"
              >个人管理</router-link
            ></span
          >
        </div>
        <div class="__p_124_u_141">
          <span class="__p_124_u_140"
            ><router-link tag="a" to="/scheduleManagement"
              >课程管理</router-link
            ></span
          >
        </div>
        <div class="__p_124_u_143">
          <span class="__p_124_u_140"
            ><router-link tag="a" to="/courseElectives"
              >课程选修</router-link
            ></span
          >
        </div>
        <div class="__p_124_u_145">
          <span class="__p_124_u_140"
            ><router-link tag="a" to="/achievement">成绩管理</router-link></span
          >
        </div>
        <div class="__p_124_u_139">
          <span class="__p_124_u_140"
            ><router-link tag="a" to="/teacherManagement"
              >教师管理</router-link
            ></span
          >
        </div>
      </div>

      <!-- <div class="__p_124_u_147">
        <span class="__p_124_u_140">物联网应用</span>
      </div>
      <div class="__p_124_u_149"><span class="__p_124_u_140">系统</span></div> -->
    </div>
  </div>
</template>
<script>
export default {
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
  background: #03091f;
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
  background: #03091f !important;
}
</style>