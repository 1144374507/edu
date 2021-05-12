
<template>
  <div class="__login__wrapp__">
    <div class="__p_123_u_21">
      <div class="__p_123_u_32"><span class="__p_123_u_33">连城一中</span></div>
      <el-form
        label-position="right"
        label-width="80px"
        class="__p_123_u_123"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            placeholder="请输入账号"
            class="__p_123_u_1231"
            v-model="form.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            placeholder="请输入密码"
            v-model="form.passWord"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">{{
            loginTxt
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import bcrypt  from 'bcryptjs'
import CryptoJS from 'crypto-js'
import {encrypt,decrypt} from '@/common/js/encrypt.js'

export default {
  props: {
    loginUrl: {},
  },
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!value || value.trim() == "") {
        return callback(new Error(this.accountPlaceholder || "请输入账号"));
      }
      value = value.trim();
      const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,}$/;
      if (!regex.test(value)) {
        callback(new Error("仅允许中文、字母、数字、下划线组合"));
      } else {
        callback();
      }
    };
    return {
      loginTxt: "登录",
      form: {
        userName: "2021021065",
        passWord: "123456",
      },
      rules: {
        userName: [{ validator: validateUserName }],
        passWord: [
          {
            required: true,
            message: this.pwdPlaceholder || "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const {userName,passWord } = this.form
      let form ={
        userName,
        passWord: encrypt(passWord)
      }
      console.log('form',form);
      let jiemi  = decrypt(form.passWord)
      console.log('jiemi',jiemi);
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return;
        }
        if (this.loginTxt == "登录中...") return;
        this.loginTxt = "登录中...";

        this.$axios.post("/api/login",form).then((res) => {
          console.log("res", res);
          if (res.data.success) {
            this.loginTxt = "登录";

            this.$store.commit("$_setStorage", res.data.token);
            console.log("localStorage", localStorage);
            if (res.data.root == "false") {
              this.$axios
                .get(`/api/getUserData/${this.form.userName}`)
                .then((res) => {
                  console.log("res", res);
                  if (res.data.success) {
                    this.$store.commit("$_setUserdata", res.data.list[0]||{});
                    console.log(this.$store.state.userdata||{}, "userdata");
                    this.$router.push("/userManagement");
                  }
                });
            } else {
              this.$router.push("/teacherManagement");
              this.$store.commit("$_setUserdata", {});
            }
            this.$store.commit("$_adminCount", res.data.root);
            this.$store.commit("$_userName", this.form.userName);
          } else {
            console.log("进入失败");
            this.loginTxt = "登录";
            this.$message.error(`${res.data.msg}`);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.__p_123_u_123 {
  width: 80%;
}
.__p_123_u_1231 {
  width: 100%;
}
.__p_123_u_33 {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 87px;
  color: rgb(155, 155, 201);
  font-size: 18px;
  font-weight: bolder;
}

.__p_123_u_32 {
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 30px;
  display: block;
}

.__p_123_u_22 {
  width: 403px;
  display: block;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 10px;
}

.__p_123_u_30 {
  width: 403px;
  display: block;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 10px;
}

.__p_123_u_24 {
  margin-left: auto;
  margin-right: auto;
  display: block;
  vertical-align: bottom;
  width: 175px;
  margin-bottom: 15px;
}

.__p_123_u_31 {
  width: 210px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.__p_123_u_21 {
  margin-left: auto;
  margin-right: 050px;
  display: block;
  width: 438px;
  margin-top: 30vh;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  background-color: #eaf2f5;
}
.__login__wrapp__ {
  position: absolute;
  width: 100%;
  height: 100vh;
  /* background-color: rgb(172, 144, 144); */
  background-image: url(./img/login_bg.jpg);
  background-repeat: no-repeat;
  background-position: 100% 50%;
  background-size: 100% 80%;
}
</style>
