  <!-- 管理地址配置 -->
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form">
      <!-- 将classmenbels 和 classmenbel 区分开 -->
      <el-form-item :label="labelVal" prop="classmenbels">
        <el-select
          size="small"
          v-model="form.classmenbels"
          placeholder="请选择"
          filterable
          multiple
        >
          <el-option
            v-for="(item, index) in options"
            :key="index + 'students'"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="finish" type="primary" size="small" class="__p_YR_u_25"
        >完成</el-button
      >
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "addressConfig",
  props: {
    id: {},
    isaddTeacher: {},
    classes: {},
    grades: {},
  },
  data() {
    let isInteger = (rule, value, callback) => {
      return value == "0" || /^-?[1-9]\d*$/.test(value);
    };
    return {
      loading:"",
      labelVal: "学 生",
      cid: "",
      options: [],
      value1: [],
      values: [],
      studentsData: [],
      form: {
        pid: "",
        classes: "",
        classmenbels: [],
      },
      classmenbel: [],

      isNext: false,
      rules: {
        classmenbels: [{ required: true, message: "该字段不能为空" }],
        ip: [{ required: true, message: "该字段不能为空" }],
        mask: [{ required: true, message: "该字段不能为空" }],
        gateway: [{ required: true, message: "该字段不能为空" }],
        dns: [{ required: false, message: "该字段不能为空" }],
      },
    };
  },
  methods: {
    finish() {
      this.loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let form = this.form;

      if (this.form.classmenbels.length > 0) {
        this.studentsData.map((item, index) => {
          this.form.classmenbels.map((item1) => {
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
          this.cid = nanoid();
          console.log(this.cid);
          _arr.push(this.pid, this.form.classes, this.cid, this.grades);

          this.values.push(_arr);

          // }
        });
        if (this.isaddTeacher == "1") {
          form.teacherMessage = this.values;
        } else {
          form.classmenbel = this.values;
        }
      }
      console.log(this.isaddTeacher);
      if (this.isaddTeacher == "1") {
        //添加老师
        this.$axios.post("/api/addClass/addTeachers", form).then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$message.success("添加成功");
            this.$emit("updata");
            this.loading&&this.loading.close();
          } else {
            this.$message.error();
            ("添加失败");
            this.loading&&this.loading.close();
          }
        });
      } else {
        //添加学生

        this.$axios.post("/api/addClass/addStudents", form).then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$message.success(`${res.data.msg}`);
            this.$emit("updata");
            this.loading&&this.loading.close();
          } else {
            this.$message.error(`${res.data.msg}`);
            this.loading&&this.loading.close();
          }
        });
      }
    },
    getStudents() {
      this.$axios.get("/api/addClass/getStudents").then((res) => {
        this.studentsData = res.data.list;
        this.studentsData.map((item, index) => {
          this.options.push({ value: item.schoolNumber, label: item.name });
        });
      });
    },
    getTeachers() {
      this.$axios.get("/api/addClass/getTeachers").then((res) => {
        // 和学生数据公用一个数组 实际是 getTeachers
        this.studentsData = res.data.list;
        this.studentsData.map((item, index) => {
          this.options.push({ value: item.schoolNumber, label: item.name });
        });
      });
    },
  },
  created() {
    if (this.isaddTeacher == "1") {
      this.labelVal = "老 师";
      this.getTeachers();
    } else {
      this.getStudents();
    }
  },
  mounted() {
    this.pid = this.id;
    this.form.classes = this.classes;
  },
  destroyed(){
    this.loading&&this.loading.close()
  }
};
</script>

<style scoped  >
.showTips {
  width: 320px;
}

.tips {
  display: none;
}

.choseTime {
  display: block;
}
</style>
