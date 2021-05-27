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
          <el-form-item label=" 姓 名 ：" prop="name">
            <div class="asm-input-wraop">
              <el-input
                size="small"
                placeholder="请输入"
                v-model="form.name"
                class="asm-input"
              ></el-input>
              <el-tooltip
                class="asm-input-tips"
                content="  填写学生姓名。"
                placement="right"
              >
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label=" 英文名字 ：" prop="englishName">
            <div class="asm-input-wraop">
              <el-input
                size="small"
                placeholder="请输入"
                v-model="form.englishName"
                class="asm-input"
              ></el-input>
              <el-tooltip content=" 输入英文姓名" placement="right">
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>

          <div style="display: flex">
            <el-form-item label=" 学 号：" prop="schoolNumber">
              <div class="asm-input-wraop111">
                <el-input
                  size="small"
                  v-model.number="form.schoolNumber"
                  class="asm-input"
                  placeholder="请输入"
                  :disabled="Boolean(studentData)"
                ></el-input>
                <el-tooltip
                  content=" 请输入学号，请确保他是惟一的"
                  placement="right"
                >
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label=" 身份证：" prop="idCardNum">
              <div class="asm-input-wraop111">
                <el-input
                  size="small"
                  v-model="form.idCardNum"
                  class="asm-input"
                  placeholder="请输入"
                ></el-input>
                <el-tooltip
                  content=" 请输入身份证，请确保他是惟一的"
                  placement="right"
                >
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
          <el-form-item label=" 性 别 ：">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                v-model="form.sex"
                size="small"
                placeholder="请选择"
              >
                <el-option label="男" value="男"> </el-option
                ><el-option label="女" value="女"> </el-option>
              </el-select>
              <el-tooltip content="请输入性别" placement="right">
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <div style="display: flex">
            <el-form-item label=" 身 高 ：" prop="height">
              <div class="asm-input-wraop111">
                <el-input
                  size="small"
                  v-model="form.height"
                  class="asm-input"
                  placeholder="请输入"
                ></el-input>
                <el-tooltip content=" 请输入身高" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label=" 体 重：" prop="height">
              <div class="asm-input-wraop111">
                <el-input
                  size="small"
                  v-model="form.weight"
                  class="asm-input"
                  placeholder="请输入"
                ></el-input>
                <el-tooltip content=" 请输入体重" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
    <div class="__p_12z_u_29">
      <el-button
        id="qa-test-btnNext"
        type="primary"
        round
        class="__p_12z_u_30"
        @click="handleNextBtnClick"
        >保存，下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import {} from "../utils/validate";

export default {
  props: {
    studentData: {},
    edit: {},
  },
  data() {
    let valitorIdCard = (rule, value, callback) => {
      let reg = /^[0-9]{17}[0-9xX]{1}$/;
      if (!reg.test(value)) {
        callback(new Error("必需是18的数字或第8位位x"));
      }
      callback();
    };
    return {
      loading:"",
      showCustomVlan: false,
      disabledDeleteCustomVlan: false,
      form: {
        name: "江盛锋",
        englishName: "jiangshengfeng",
        sex: "男",
        height: "178",
        weight: "130",
        schoolNumber: "2017021065",
        idCardNum: "350825199803121114",
      },
      rules: {
        name: [{ required: true, message: "请输入" }],
        sex: [{ required: true, message: "请输入" }],
        schoolNumber: [{ required: true, message: "请输入" }],
        idCardNum: [
          { required: true, message: "请输入" },
          { validator: valitorIdCard },
        ],
      },
    };
  },
  mounted() {
    if (this.studentData) {
      this.form = this.studentData;
    }
    console.log("form", this.form);
  },
  methods: {
    handleCheckClick() {
      if (this.showCustomVlan) {
        this.showCustomVlan = false;
        return;
      }
    },

    handleNextBtnClick() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true,
            text: "处理中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          if (this.studentData) {
            console.log("formmm", this.form);
            this.$axios
              .post("/api/createStudent/base/updata", this.form)
              .then((res) => {
                if (!res.data.success) {
                  this.$message.error(`${res.data.msg}`);
                this.loading&&this.loading.close();
                  return;
                } else {
                  this.$message.success(`${res.data.msg}`);
                  let data = this.form.schoolNumber;
                  this.$emit("nextStep", data);
                this.loading&&this.loading.close();
                }
              });
          } else {
            this.$axios
              .post("/api/createStudent/base", this.form)
              .then((res) => {
                console.log(res);
                console.log(!res.data.success);
                if (!res.data.success) {
                  this.$message.error(`${res.data.msg}`);
                this.loading&&this.loading.close();
                  return;
                } else {
                  this.$message.success(`${res.data.msg}`);
                  console.log(this.form.schoolNumber, "this.form.schoolNumber");
                  let data = this.form.schoolNumber;
                  this.$emit("nextStep", data);
                this.loading&&this.loading.close();
                }
              });
          }
        }
      });
    },
  },
  destroyed(){
    this.loading&&this.loading.close()
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
