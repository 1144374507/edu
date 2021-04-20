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
                  v-for="item in options"
                  :key="item.value"
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
              <el-select
                class="asm-input"
                size="small"
                v-model="form.classes"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-tooltip content="选择班级。" placement="right">
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
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-tooltip content="添加一个班主任。" placement="right">
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label=" 学 生 ：" prop="classmenbel">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                size="small"
                v-model="form.classmenbel"
                placeholder="请选择"
                filterable
                multiple
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
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
          <el-form-item label=" 老 师 ：" prop="teacherMessage">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                size="small"
                v-model="form.teacherMessage"
                placeholder="请选择"
                filterable
                multiple
              >
                <el-option
                  v-for="item in options3"
                  :key="item.value"
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
import qs from "qs";
export default {
  data() {
    return {
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
      options2: [
        {
          value: "江同学",
          label: "江同学",
          schoolNumber: "2017021065",
        },
        {
          value: "马同学",
          label: "马同学",
          schoolNumber: "2017021066",
        },
        {
          value: "李同学",
          label: "李同学",
          schoolNumber: "2017021067",
        },
      ],
      options3: [
        {
          value: "赵老师",
          label: "赵老师",
          workNumber: "001",
        },
        {
          value: "钱老师",
          label: "钱老师",
          workNumber: "002",
        },
        {
          value: "孙老师",
          label: "孙老师",
          workNumber: "003",
        },
      ],
      form: {
        id: "",
        grades: "",
        classes: "",
        monitor: "",
        classmenbel: "",
        teacherMessage: "",
      },
      rules: {
        grades: [{ required: true, message: "请输入" }],
        classes: [{ required: true, message: "请输入" }],
        monitor: [{ required: false, message: "请输入" }],
        classmenbel: [{ required: false, message: "请输入" }],
        teacherMessage: [{ required: false, message: "请输入" }],
      },
    };
  },
  mounted() {},
  methods: {
    // validateRouter1(rule, value, callback) {
    //   if (value) {
    //     if (value === this.form.router) {
    //       callback(new Error("自定义管理网关不能与默认管理网关相同"));
    //     }
    //   }
    //   callback();
    // },

    // async getManageVlanConfig() {
    //   const { data } = await this.$axios.get(
    //     "/api/vlan/managevlanconfig/getManageVlanConfig"
    //   );
    //   if (!data.success) {
    //     return this.$message({
    //       type: "error",
    //       message: data.message || "获取配置失败",
    //     });
    //   }
    //   const result = data.result.list;
    //   if (result[0]) {
    //     this.form.id = result[0].id;
    //     this.form.vlan = result[0].vlan;
    //     this.form.router = result[0].router;
    //     this.form.address = result[0].address;
    //     this.form.ipExcluded = result[0].ipExcluded;
    //   }
    //   if (result[1]) {
    //     this.form.id1 = result[1].id;
    //     this.form.vlan1 = result[1].vlan;
    //     this.form.router1 = result[1].router;
    //     this.form.address1 = result[1].address;
    //     this.form.ipExcluded1 = result[1].ipExcluded;
    //     this.showCustomVlan = true;
    //     this.disabledDeleteCustomVlan = true;
    //   }
    // },

    handleNextBtnClick() {
      this.form.id = nanoid();
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.$axios
            // .post("/addClass", qs.stringify(this.form))
            .post("/api/addClass", this.form)
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
          // setTimeout(() => {
          //   this.$message({
          //     type: "success",
          //     message: "保存成功!",
          //   });
          //   this.$emit("nextStep");
          //   loading.close();
          // }, 1000);
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
