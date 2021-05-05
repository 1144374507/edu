<template>
  <div>
    <el-card class="__p_12z_u_2">
      <el-form
        label-position="left"
        label-width="110px"
        ref="form"
        :model="form"
        :rules="rules"
      >
        <div>
          <el-form-item label=" Q Q ：" prop="qq">
            <div class="asm-input-wraop">
              <el-input
                size="small"
                placeholder="请输入"
                v-model.number="form.qq"
                class="asm-input"
              ></el-input>
              <el-tooltip
                class="asm-input-tips"
                content="  填写qq号码"
                placement="right"
              >
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label=" 电话号码 ：" prop="tel">
            <div class="asm-input-wraop">
              <el-input
                size="small"
                placeholder="请输入"
                v-model.number="form.tel"
                class="asm-input"
              ></el-input>
              <el-tooltip content=" 输入电话号码" placement="right">
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>

          <div style="display: flex">
            <el-form-item label=" 邮箱：" prop="email">
              <div class="asm-input-wraop111">
                <el-input
                  size="small"
                  v-model="form.email"
                  class="asm-input"
                  placeholder="请输入"
                ></el-input>
                <el-tooltip content=" 请输入邮箱" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>

          <div style="display: flex">
            <el-form-item label=" 邮政编码 ：" prop="postcode">
              <div class="asm-input-wraop111">
                <el-input
                  size="small"
                  v-model.number="form.postcode"
                  class="asm-input"
                  placeholder="请输入"
                ></el-input>
                <el-tooltip content=" 请输入邮政编码" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>

    <div style="text-align: center; margin-top: 24px">
      <el-button
        type="info"
        @click="handlePreBtnClick"
        id="  qa-test-deploy-lastStep"
        >上一步</el-button
      >
      <el-button
        v-if="deployFinishStatus === 0"
        type="primary"
        @click="handleNextBtnClick"
        id="qa-test-deploy-fin"
        >完成</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    schoolNumber: {},
    teacherData: {},
  },
  data() {
    return {
      loading:"",
      deployFinishDialogVisible: false,
      form: {
        qq: "",
        tel: "",
        email: "",
        postcode: "",
        schoolNumber: "",
      },
      rules: {
        name: [{ required: true, message: "请输入" }],
        sex: [{ required: true, message: "请输入" }],
        schoolNumber: [{ required: true, message: "请输入" }],
      },

      deployFinishStatus: 0, // 1:已完成； 0:未完成
    };
  },
  methods: {
    // 上一辈
    handlePreBtnClick() {
      this.$emit("preStep");
    },

    // 下一步
    handleNextBtnClick() {
      this.deployFinishDialogVisible = true;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true,
            text: "处理中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          this.$axios
            .post("/api/createTeacher/other", this.form)
            .then((res) => {
              console.log(res);
              console.log(!res.data.success);
              if (!res.data.success) {
                this.$message.error(`${res.data.msg}`);
                return;
              } else {
                this.$message.success(`${res.data.msg}`);
              this.loading.close();

                if (this.teacherData) {
                  this.$emit("colseDielog");
                } else {
                  this.$emit("nextStep");
                }
              }
            });
        }
      });
    },
    // 获取数据库缓存学号
    getBufferSchoolNumber() {
      this.$axios
        .get("/api/createTeacher/getBufferSchoolNumber")
        .then((res) => {
          this.form.schoolNumber = res.data.list[0].schoolNumber;
          console.log(this.form.schoolNumber, "getBufferSchoolNumber 33333");
        });
    },
  },
  mounted() {
    if (this.teacherData) {
      this.form = this.teacherData;
    }
    if (this.schoolNumber == "") {
      this.getBufferSchoolNumber();
    } else if (this.schoolNumber == undefined) {
      this.getBufferSchoolNumber();
    } else {
      this.form.schoolNumber = this.schoolNumber;
      console.log(this.schoolNumber, "schoolNumber");
    }
  },
  destroyed(){
    this.loading.close()
  }
};
</script>
<style scoped>
.__p_12z_u_7 {
  font-size: 16px;
  font-weight: bold;
  color: #212527;
  margin-bottom: 20px;
}

.__p_12z_u_19 {
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
}

.__p_12z_u_2 {
  padding: 12px;
}

.__p_12z_u_20 {
  margin-left: 5px;
}

.__p_12z_u_18 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 48px;
}

.__p_12z_u_30 {
  width: 116px;
}

.__p_12z_u_29 {
  text-align: center;
  margin-top: 24px;
}
</style>
<style lang="scss" scoped>
.asm-input-wraop {
  position: absolute;
  left: 0;
  top: 0;
}
.asm-input {
  width: 200px;
  // position: absolute;
  // left: 0;
  // top: 0;
}

.asm-input-tips {
  // position: absolute;
  // left: 0;
  // top: 0;
}
</style>

<style scoped lang="scss">
.theme-18edd0 {
  .__p_12z_u_7 {
    color: #fff;
  }
}
</style>
