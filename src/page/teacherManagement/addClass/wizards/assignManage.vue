<template>
  <div>
    <el-card class="__p_12z_u_2 my__wrappppp___">
      <el-form
        label-position="left"
        label-width="110px"
        ref="form"
        :model="form"
        :rules="rules"
      >
        <div>
          <div class="__p_12z_u_7">创建一个新班级</div>
          <el-form-item label=" 年 级 ：" prop="grades">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                size="small"
                v-model="form.grades"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="index + 'grades'"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-tooltip
                class="asm-input-tips"
                content="选择年级。"
                placement="right"
              >
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label=" 班 级 ：" prop="classes">
            <div class="asm-input-wraop">
              <el-input class="asm-input" size="small" v-model="form.classes">
              </el-input>
              <el-tooltip content="输入班级。" placement="right">
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div> </el-form-item
          ><el-form-item label=" 班主任 ：" prop="monitor">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                size="small"
                v-model="form.monitor"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="(item, index) in options3"
                  :key="index + 'options3'"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
              <el-tooltip content="添加一个班主任。" placement="right">
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <div style="display: flex">
            <el-form-item label=" 学 生 ：" prop="classmenbel">
              <div class="asm-input-wraop111">
                <el-select
                  class="asm-input"
                  size="small"
                  v-model="form.classmenbel"
                  placeholder="请选择"
                  filterable
                  multiple
                >
                  <el-option
                    v-for="(item, index) in options2"
                    :key="index + 'students'"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-tooltip content="为班级添加学生。" placement="right">
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
            <div style="clear: both"></div>
          </div>
          <div style="display: flex">
            <el-form-item label=" 老 师 ：" prop="teacherMessage">
              <div class="asm-input-wraop111">
                <el-select
                  class="asm-input"
                  size="small"
                  v-model="form.teacherMessage"
                  placeholder="请选择"
                  filterable
                  multiple
                >
                  <el-option
                    v-for="(item, index) in options3"
                    :key="index + 'a'"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-tooltip content="为班级添加老师。" placement="right">
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
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      cid:"",
      values: [],
      teachervalues: [],
      pid: [],
      studentsData: [],
      teacherData: [],
      options: [
        {
          value: "高一",
          label: "高一",
        },
        {
          value: "高二",
          label: "高二",
        },
        {
          value: "高三",
          label: "高三",
        },
      ],
      options1: [
        {
          value: "1班",
          label: "1班",
        },
        {
          value: "2班",
          label: "2班",
        },
        {
          value: "3班",
          label: "3班",
        },
      ],
      options2: [],
      options3: [],
      form: {
        id: "",
        grades: "",
        classes: "",
        monitor: "",
        classmenbel: "",
        teacherMessage: "",
      },
      classmenbel: [],
      teacherMessage: [],
      rules: {
        grades: [{ required: true, message: "请输入" }],
        classes: [{ required: true, message: "请输入" }],
        monitor: [{ required: false, message: "请输入" }],
        classmenbel: [{ required: true, message: "请输入" }],
        teacherMessage: [{ required: true, message: "请输入" }],
      },
    };
  },
  mounted() {
    this.getStudents();
    this.getTeachers();
  },
  methods: {
    // validateRouter1(rule, value, callback) {
    //   if (value) {
    //     if (value === this.form.router) {
    //       callback(new Error("自定义管理网关不能与默认管理网关相同"));
    //     }
    //   }
    //   callback();
    // },
    getTeachers() {
      this.$axios.get("/api/addClass/getTeachers").then((res) => {
        this.teacherData = res.data.list;
        this.teacherData.map((item, index) => {
          this.options3.push({ value: item.schoolNumber, label: item.name });
        });
      });
    },
    getStudents() {
      this.$axios.get("/api/addClass/getStudents").then((res) => {
        this.studentsData = res.data.list;
        this.studentsData.map((item, index) => {
          this.options2.push({ value: item.schoolNumber, label: item.name });
        });
      });
    },
    handleNextBtnClick() {
      this.form.id = nanoid();
      this.pid = this.form.id;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          let form = this.form;

          if (this.form.classmenbel.length > 0) {
            this.studentsData.map((item, index) => {
              this.form.classmenbel.map((item1) => {
                if (item1 == item.schoolNumber) {
                  return this.classmenbel.push(item);
                }
              });
            });

            this.classmenbel.forEach((n, i) => {
              var _arr = [];
              var x = 0;
              for (var m in n) {
                if (
                  Object.keys(n)[x] == "name" ||
                  Object.keys(n)[x] == "sex" ||
                  Object.keys(n)[x] == "schoolNumber"
                ) {
                  _arr.push(n[m]);
                  this.cid = this.pid + n[m];
                }
                x++;
              }
              // if(_arr.length>1){
              this.cid = nanoid();
              console.log(this.cid, "this.cid");

              _arr.push(this.pid, this.form.classes, this.cid);

              this.values.push(_arr);

              // }
            });
            console.log(this.values, "this.values");
            form.classmenbel = this.values;
          }

          if (this.form.teacherMessage.length > 0) {
            this.teacherData.map((item, index) => {
              this.form.teacherMessage.map((item1) => {
                if (item1 == item.schoolNumber) {
                  return this.teacherMessage.push(item);
                }
              });
            });
            // ch处理老师的数据
            this.teacherMessage.forEach((n, i) => {
              let _arr = [];
              let x = 0;
              for (var m in n) {
                console.log(m);
                console.log(Object.keys(n)[x]);
                if (
                  Object.keys(n)[x] == "name" ||
                  Object.keys(n)[x] == "sex" ||
                  Object.keys(n)[x] == "schoolNumber" ||
                  Object.keys(n)[x] == "courseName" ||
                  Object.keys(n)[x] == "office" ||
                  Object.keys(n)[x] == "tel"
                ) {
                  _arr.push(n[m]);
                }
                x++;
              }
              // if(_arr.length>1){
              _arr.push(this.pid);

              this.teachervalues.push(_arr);

              // }
            });
            console.log(this.teachervalues, "this.teachervalues");

            form.teacherMessage = this.teachervalues;
          }
          this.$axios
            .post("/api/addClass", form)
            .then((res) => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "保存成功!",
                });
                this.$emit("nextStep");
                loading.close();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message || "保存失败",
                });
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.message || "保存失败",
              });
            });
        }
      });
    },
  },
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
<style lang="scss">
.my__wrappppp___ {
  .el-input--suffix {
    //
  }
  .el-select__tags {
    // max-height: 60px;
    // // padding-top: 3px;
    // margin-top: 2px;
    // overflow: auto;
  }
}
</style>