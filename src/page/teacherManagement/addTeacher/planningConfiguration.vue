<template>
  <div class="planning-configuration-wrapper">
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
            <el-form-item label=" 入学日期 ：" prop="admissionData">
              <div class="asm-input-wraop">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="form.admissionData"
                  class="asm-input"
                ></el-input>
                <el-tooltip
                  class="asm-input-tips"
                  content="  填写入学日期。"
                  placement="right"
                >
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item label=" 入学年级 ：" prop="admissionGrade">
              <div class="asm-input-wraop">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="form.admissionGrade"
                  class="asm-input"
                ></el-input>
                <el-tooltip content=" 输入入学年级" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>

            <div style="display: flex">
              <el-form-item label=" 年级：" prop="grades">
                <div class="asm-input-wraop111">
                  <el-input
                    size="small"
                    v-model="form.grades"
                    class="asm-input"
                    placeholder="请输入"
                  ></el-input>
                  <el-tooltip content=" 请输入点前年级" placement="right">
                    <i class="el-icon-question __p_12z_u_20"></i>
                  </el-tooltip>
                </div>
              </el-form-item>
            </div>
            <el-form-item label=" 是否留学生 ：" prop="overseas">
              <div class="asm-input-wraop">
                <el-select
                  class="asm-input"
                  v-model="form.overseas"
                  size="small"
                  placeholder="请选择"
                  filterable
                >
                  <el-option label="是" value="是"> </el-option
                  ><el-option label="否" value="否"> </el-option>
                </el-select>
                <el-tooltip content="是否为留学生" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>

    <div style="text-align: center; margin-top: 24px">
      <el-button
        type="info"
        @click="handlePreBtnClick"
        id="qa-test-deploy-btnPre"
        >上一步</el-button
      >
      <el-button
        type="primary"
        class="pc-next-btn"
        @click="handleNextBtnClick"
        id="qa-test-deploy-btnNext"
        >下一步</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    schoolNumber: {},
  },
  data() {
    return {
      form: {
        admissionData: "",
        admissionGrade: "",
        grades: "",
        overseas: "",
        schoolNumber: "",
      },
      rules: {
        name: [{ required: true, message: "请输入" }],
        sex: [{ required: true, message: "请输入" }],
        schoolNumber: [{ required: true, message: "请输入" }],
      },
    };
  },
  methods: {
    // 上一辈
    handlePreBtnClick() {
      this.$emit("preStep");
    },
    // 下一步
    handleNextBtnClick() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          this.$axios.post("/api/createStudent/chat", this.form).then((res) => {
            console.log(res);
            console.log(!res.data.success);
            if (!res.data.success) {
              this.$message.error(`${res.data.msg}`);
              return;
            } else {
              this.$message.success(`${res.data.msg}`);
              loading.close();
              this.$emit("nextStep");
            }
          });
        }
      });
    },
    // 获取数据库缓存学号
    getBufferSchoolNumber() {
      this.$axios.get('/api/createStudent/getBufferSchoolNumber').then(res => {
        this.form.schoolNumber = res.data.list[0].schoolNumber
        console.log(this.form.schoolNumber,'getBufferSchoolNumber');
      })
    },
  },
  mounted() {
    if(this.schoolNumber==''){
      this.getBufferSchoolNumber()
    }else if(this.schoolNumber==undefined){
      this.getBufferSchoolNumber()
    } else {
      this.form.schoolNumber = this.schoolNumber;
      console.log(this.schoolNumber, "schoolNumber 2222");

    }
  },
};
</script>
<style lang="scss" scoped>
.__search-icon {
  line-height: 32px;
  padding: 0 7px;
}
</style>
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
