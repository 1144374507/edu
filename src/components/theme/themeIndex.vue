<template>
  <div class="theme_index_uid" style="display: block; box-sizing: border-box">
    <el-select v-model="theme" @change="themeCommand" placeholder="请选择">
      <el-option label="默认" value="1"> </el-option>
      <el-option label="天空" value="2"> </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 初始主题数据
      theme: "1",
      test: "",
      uploadUrl: "/api/base/logo/upload",
      headers: {},
    };
  },
  // 不需要动
  computed: {
    dataTitle() {
      return {
        theme: this.rjTheme.current,
        type: "title",
      };
    },
    dataLogin() {
      return {
        theme: this.rjTheme.current,
        type: "login",
      };
    },
    dataHome() {
      return {
        theme: this.rjTheme.current,
        type: "home",
      };
    },
  },
  mounted() {
    this.init();
    this.test = window.$rjCurrentTheme;
    if(this.test == 'theme-000') this.theme = '2'
    console.log('test',this.test);
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }

      return (isJPG || isPNG) && isLt2M;
    },
    onSuc(response, file, fileList) {
      let result = response;
      if (!result.success) {
        this.$message.error("图片上传失败，" + result.message);
      }
    },
    onErr(err, file, fileList) {
      this.$message.error("图片上传失败!");
    },
    // 主题切换
    themeCommand() {
      console.log('cahge');
      // console.log(this.$store)
      if (this.theme == 1) {
        this.rjTheme.obj.resetTheme("theme-jsfjsf", 12);
      } else if (this.theme == 2) {
        this.rjTheme.obj.resetTheme("theme-000", 12);
      } else if (this.theme == 3) {
        this.rjTheme.obj.resetTheme("theme-12c2ab", 12);
      } else if (this.theme == 4) {
        this.rjTheme.obj.resetTheme("theme-cc323e", 12);
      } else if (this.theme == 5) {
        this.rjTheme.obj.resetTheme("theme-639af4", 12);
      } else if (this.theme == 6) {
        this.rjTheme.obj.resetTheme("theme-18edd0", 12);
      }
      //  else if (this.theme == 7) {
      //   this.rjTheme.obj.resetTheme("theme-000c1f", 12);
      //   this.$store.icon="theme-000c1f"
      // // document.querySelector('.warnMessage_uid_img').src="/static/inap-home-img/alarm.svg"
      // }
    },
    // 初始化页面主题（插入主题）
    init() {
      let currentTheme = this.rjTheme.current;
      if (currentTheme == "theme-00aeff") {
        this.theme = "1";
      } else if (currentTheme == "theme-008376") {
        this.theme = "2";
      } else if (currentTheme == "theme-12c2ab") {
        this.theme = "3";
      } else if (currentTheme == "theme-cc323e") {
        this.theme = "4";
      } else if (currentTheme == "theme-639af4") {
        this.theme = "5";
      } else if (currentTheme == "theme_18edd0") {
        this.theme = "6";
      }
    },
  },
};
</script>
<style scoped>
.theme_index_uid {
  overflow: auto;
  /* height: 90vh; */
}
.content-box {
  overflow: auto;
}
.__muid_551 {
  vertical-align: middle;
}

.__muid_550 {
  float: left;
}

.__muid_553 {
  vertical-align: middle;
}

.__muid_552 {
  float: right;
  margin-left: 50px;
}

.__muid_555 {
  font-size: 14px;
  color: #ffffff;
}

.__muid_554 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 50px;
}

.__muid_557 {
  font-size: 14px;
  color: #ffffff;
}

.__muid_556 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__muid_559 {
  font-size: 14px;
  color: #ffffff;
}

.__muid_558 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__muid_561 {
  font-size: 14px;
  color: #ffffff;
}

.__muid_560 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__muid_563 {
  font-size: 14px;
  color: #ffffff;
}

.__muid_562 {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 38px;
}

.__muid_565 {
  font-size: 14px;
  color: #12c2ab;
}

.__muid_564 {
  display: inline-block;
  vertical-align: bottom;
  border-bottom: 2px solid #12c2ab;
  margin-left: 38px;
}

.__muid_549 {
  background: #03091f;
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
  line-height: 60px;
  margin-bottom: 14px;
}

.__muid_567 {
  font-size: 16px;
  font-weight: bold;
}

.__muid_566 {
  width: 1320px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.__muid_548 {
  background: #ffffff;
  padding-bottom: 14px;
}

.__muid_570 {
  font-size: 16px;
  margin-bottom: 20px;
}
.__muid_570_1 {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 0px;
}

.__muid_571 {
  margin-bottom: 20px;
}

.__muid_574 {
  margin-top: 20px;
  margin-right: 50px;
  display: block;
}
.__muid_499 {
  overflow: hidden;
  margin-top: 20px;
}

.__muid_578 {
  margin-bottom: 10px;
}

.__muid_579 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 10px;
  /* background: url("/static/inap-base-img/theme-00aeff/index/bg-theme.jpg"); */
}

.__muid_573 {
  width: 420px;
  float: left;
  margin-right: 50px;
}

.__muid_581 {
  margin-bottom: 10px;
}

.__muid_582 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 10px;
  background: url("/static/inap-base-img/theme-008376/index/bg-theme.jpg");
}
.__muid_500 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 10px;
  background: url("/static/inap-base-img/theme-cc323e/index/bg-theme.jpg");
}
.__muid_501 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 10px;
  background: url("/static/inap-base-img/theme-639af4/index/bg-theme.jpg");
}

.__muid_583 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 10px;
  background: url("/static/inap-base-img/theme-12c2ab/index/bg-theme.jpg");
}

.__muid_584 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 10px;
  background: url("/static/inap-base-img/theme-18edd0/index/bg-theme.jpg");
}

.__muid_580 {
  width: 420px;
  float: left;
}

.__muid_576 {
  overflow: hidden;
  margin-top: 20px;
}

.__muid_575 {
  border: 0px;
  clear: both;
  min-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}

.__muid_572 {
  margin-top: 20px;
}

.__muid_588 {
  margin-bottom: 10px;
}

.__muid_589 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 20px;
}

.__muid_587 {
  width: 420px;
  float: left;
  margin-right: 50px;
}

.__muid_592 {
  margin-bottom: 10px;
}

.__muid_593 {
  width: 400px;
  height: 200px;
  border: 1px solid #bbbbbb;
  margin-left: 20px;
}

.__muid_591 {
  width: 420px;
  float: left;
}

.__muid_590 {
  overflow: hidden;
}

.__muid_594 {
  border: 0px;
  clear: both;
  min-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}

.__muid_586 {
  margin-top: 20px;
}

.__muid_595 {
  height: 32px;
  margin-top: 20px;
}

.__muid_568 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  overflow: auto !important;
}
.upload_arae {
  display: inline;
}
.upload_login,
.upload_home,
.upload_title {
  display: inline-flex;
  margin: 10px 0 0 10px;
  width: 350px;
}
</style>
