<template>
  <!-- 考务管理 -->
  <div class="__p_13f_u_66">
    <el-row type="flex" justify="start" align="top" :gutter="0">
      <el-col :span="12" :offset="0" :push="0" :pull="0" class="__p_13f_u_86">
        <div class="__p_13f_u_88">
          <div class="__p_13f_u_89">
            <el-menu
              mode="vertical"
              :default-openeds="defaultOpeneds"
              default-active="2-1"
            >
              <el-submenu
                title="成绩查询"
                index="2"
                :show-timeout="300"
                :hide-timeout="300"
                ><template slot="title"><span>成绩查询</span></template>
                <el-menu-item index="2-0" @click.native="setShow"
                  ><span slot="title">历年成绩</span></el-menu-item
                >
                <el-menu-item index="2-1" @click.native="setNoShow"
                  ><span slot="title">本学期成绩</span></el-menu-item
                >
                <el-menu-item index="2-2" @click.native="failedGradeClick"
                  ><span slot="title">不及格成绩</span></el-menu-item
                >
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-col>

      <el-col :span="12" :offset="0" :push="0" :pull="0" class="__p_13f_u_87">
        <div class="__p_13f_u_100">
          <!-- 搜索框 -->
          <el-row
            type="flex"
            justify="start"
            align="top"
            :gutter="0"
            class="__p_13f_u_103"
            v-if="!isShow"
          >
            <div style="margin-top: 15px">
              <span>学年学期</span>
              <el-select placeholder="请输入内容" size="small" v-model="grade">
                <el-option
                  v-for="(item, index) in term"
                  :key="index"
                  v-model="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
              <el-button @click="goSearch" size="small" icon="el-icon-search"
                >搜索
              </el-button>
            </div>
          </el-row>
          <!-- 标题 -->
          <el-row
            type="flex"
            justify="start"
            align="top"
            :gutter="0"
            class="__p_13f_u_104"
          >
            <el-col
              :span="12"
              :offset="0"
              :push="0"
              :pull="0"
              class="__p_13f_u_110"
              ><span
                ><span v-if="!isShow">当前为</span> {{ grade }} 学期</span
              ></el-col
            >
          </el-row>
        </div>

        <div>
          <el-table :data="data" stripe highlight-current-row>
            <el-table-column type="index" width="50"> </el-table-column>
            <!-- <el-table-column
                label="课程号"
                prop="courseID"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="课序号"
                prop="courseIdex"
                align="left"
                header-align="left"
              ></el-table-column> -->
            <el-table-column
              label="课程名"
              prop="courseName"
              align="left"
              header-align="left"
            >
              <div slot-scope="scope">
                <span v-if="length > scope.$index">{{
                  scope.row.courseName
                }}</span>
                <el-input
                  required
                  v-if="length <= scope.$index"
                  v-model="scope.row.courseName"
                ></el-input>
              </div>
            </el-table-column>
            <el-table-column
              label="课程属性"
              prop="courseType"
              align="left"
              header-align="left"
            >
              <div slot-scope="scope">
                <span v-if="!edit">{{ scope.row.courseType }}</span>
                <el-input
                  v-if="edit"
                  v-model="scope.row.courseType"
                ></el-input></div
            ></el-table-column>
            <el-table-column
              label="考试类型"
              prop="examType"
              width="100px"
              align="left"
              header-align="left"
            >
              <div slot-scope="scope">
                <span v-if="!edit">{{ scope.row.examType }}</span>
                <el-input v-if="edit" v-model="scope.row.examType"></el-input>
              </div>
            </el-table-column>
            <el-table-column
              label="成绩"
              prop="mark"
              align="left"
              header-align="left"
            >
              <div slot-scope="scope">
                <span v-if="!edit">{{ scope.row.mark }}</span>
                <el-input
                  v-if="edit"
                  v-model.number="scope.row.mark"
                ></el-input>
              </div>
            </el-table-column>
            <el-table-column
              label="授课老师"
              prop="teacher"
              align="left"
              header-align="left"
            >
              <div slot-scope="scope">
                <span v-if="!edit">{{ scope.row.teacher }}</span>
                <el-input v-if="edit" v-model="scope.row.teacher"></el-input>
              </div>
            </el-table-column>
            <el-table-column
              label="未通过原因"
              align="left"
              header-align="left"
            >
              <div slot-scope="scope">
                <span v-if="!edit">{{ scope.row.noPassReason }}</span>
                <el-input
                  v-if="edit"
                  v-model="scope.row.noPassReason"
                ></el-input>
              </div>
            </el-table-column>
            <el-table-column label="操作" align="left" header-align="left">
              <div slot-scope="scope">
                <el-button type="text" size="small" @click="del(scope.row)"
                  >删除</el-button
                >
              </div>
            </el-table-column>
          </el-table>
          <!-- <el-pagination
              :current-page="1"
              :page-sizes="[50, 100, 200]"
              :page-size="50"
              :total="100"
              layout="total, sizes, prev, pager, next, jumper"
              class="__p_13f_u_128"
            ></el-pagination> -->
        </div>

        <el-steps :active="0" align-center></el-steps>
      </el-col>
    </el-row>
    <el-button v-if="Boolean(this.studentData) && !edit" @click="editStu"
      >编辑</el-button
    >
    <el-button v-if="Boolean(this.studentData) && edit" @click="save"
      >保存</el-button
    >
    <el-button v-if="Boolean(this.studentData) && edit" @click="canslo"
      >取消</el-button
    ><el-button v-if="Boolean(this.studentData) && edit" @click="add"
      >添加</el-button
    >
  </div>
</template>
<script>
export default {
  props: {
    studentData: {},
  },
  data() {
    return {
      loading: "",
      length: "",
      isAdd: false,
      edit: false,
      failedGrade: false,
      grade: "",
      schoolNumber: "",
      isShow: true,
      key: "",
      defaultOpeneds: ["2"],
      term: [
        {
          value: "高一/秋季",
          label: "高一/秋季",
        },
        {
          value: "高一/春季",
          label: "高一/春季",
        },
        {
          value: "高二/秋季",
          label: "高二/秋季",
        },
        {
          value: "高二/春季",
          label: "高二/春季",
        },
        {
          value: "高三/秋季",
          label: "高三/秋季",
        },
        {
          value: "高三/春季",
          label: "高三/春季",
        },
      ],

      data: [],
      tatolData: [],
    };
  },
  created() {
    let grades = "";
    if (this.$store.state.userdata) {
      this.schoolNumber = this.$store.state.userdata.schoolNumber;
      grades = this.$store.state.userdata.grades;
    }
    if (this.studentData) {
      this.schoolNumber = this.studentData.schoolNumber;
      grades =this.studentData.grades
    }
    let date = new Date();
    const res = date.getFullYear() - parseInt(grades);
    console.log("res", res);
    // date.getMonth(); //获取当前月份(0-11,0代表1月)
    if (res == 0) {
      if (date.getMonth() > 9) {
        this.grade = "高一/秋季";
        this.grade2 = "高一/秋季";
      }
    } else if (res == 1) {
      if (date.getMonth() > 9 || date.getMonth() < 3) {
        this.grade = "高二/秋季";
        this.grade2 = "高二/秋季";
      } else {
        this.grade = "高一/春季";
        this.grade2 = "高一/春季";
      }
    } else if (res == 2) {
      if (date.getMonth() > 9 || date.getMonth() < 3) {
        this.grade = "高三/秋季";
        this.grade2 = "高三/秋季";
      } else {
        this.grade = "高二/春季";
        this.grade2 = "高二/春季";
      }
    } else {
      if (date.getMonth() > 9 || date.getMonth() < 3) {
        this.grade = "高二/秋季";
        this.grade2 = "高二/秋季";
      } else {
        this.grade = "高三/春季";
        this.grade2 = "高三/春季";
      }
    }
    this.getmark();
  },
  methods: {
    del(data) {
      this.$confirm("确认删除吗，点击确认将永久删除？").then(() => {
        this.loading = this.$loading({
          lock: true,
          text: "处理中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios
          .delete(
            `/api/getMark/deleteMark?schoolNumber=${this.schoolNumber}&&grade=${this.grade}&&courseName=${data.courseName}`
          )
          .then((res) => {
            if (res.data.success) {
              this.getmark();
              this.$message.success("删除成功");
              this.loading&&this.loading.close();
            } else {
              this.loading&&this.loading.close();
              this.$message.error("删除失败，请重试");
            }
          });
      });
    },
    add() {
      this.isAdd = true;
      let obj = {
        schoolNumber: this.schoolNumber,
        courseName: undefined,
        courseType: "",
        examType: "",
        mark: "",
        noPassReason: "",
        teacher: "",
        grade: this.grade,
      };
      this.data.push(obj);
    },
    editStu() {
      this.edit = true;
    },
    canslo() {
      this.$confirm("确认取消编辑吗，所有编辑将不会保存？").then(() => {
        this.edit = false;
        this.getmark();
      });
    },
    save() {
      let flog = true;
      this.data.map((item) => {
        if (!item.courseName) {
          this.$message.error("课程名不能为空");
          flog = false;
        }
      });
      if (flog) {
        this.$axios.post("/api/getMark/updataMark", this.data).then((res) => {
          this.loading = this.$loading({
            lock: true,
            text: "处理中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          if (res.data.success) {
            this.edit = false;
            this.getmark();
            this.$message.success("编辑成功");
            this.loading&&this.loading.close();
          } else {
            this.loading&&this.loading.close();
            this.$message.error("编辑失败，请重试");
          }
        });
      }
    },
    goSearch() {
      console.log("11111");

      console.log("this.grade", this.grade);
      this.getmark();
    },
    getmark() {
      this.loading = this.$loading({
        lock: true,
        text: "处理中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios
        .get(
          `/api/getMark?schoolNumber=${this.schoolNumber}&&grade=${this.grade}`
        )
        .then((res) => {
          if (res.data.success) {
            this.data = res.data.list;
            this.length = this.data.length;
            this.tatolData = res.data.list;
            this.loading&&this.loading.close();

            // 不及格成绩
            if (this.failedGrade) {
              this.data = this.tatolData.filter((item) => {
                if (
                  item.courseName == "语文" ||
                  item.courseName == "数学" ||
                  item.courseName == "英语"
                ) {
                  if (item.mark * 1 < 90) {
                    return item;
                  }
                } else if (item.courseName == "物理") {
                  if (item.mark * 1 < 110 * 0.6) {
                    return item;
                  }
                } else if (item.courseName == "化学") {
                  if (item.mark * 1 < 100 * 0.6) {
                    return item;
                  }
                } else if (item.courseName == "生物") {
                  if (item.mark * 1 < 90 * 0.6) {
                    return item;
                  }
                } else if (item.mark == "及格") {
                  return item;
                } else if (item.mark * 1 <= 60) {
                  return item;
                }
              });
            }
          } else {
            this.loading&&this.loading.close();
            this.$message.success("查询失败，请重试");
          }
        });
    },
    setShow() {
      this.isShow = false;
      this.failedGrade = false;
      this.getmark();
    },
    setNoShow() {
      this.isShow = true;
      this.failedGrade = false;
      this.grade = this.grade2;
      this.getmark();
    },
    failedGradeClick() {
      this.isShow = false;
      this.failedGrade = true;
      this.getmark();

      // this.data = this.tatolData.filter((item) => {
      //   if (
      //     item.courseName == "语文" ||
      //     item.courseName == "数学" ||
      //     item.courseName == "英语"
      //   ) {
      //     if (item.mark * 1 <= 90) {
      //       return item;
      //     }
      //   } else if (item.courseName == "物理") {
      //     if (item.mark * 1 <= 110 * 0.6) {
      //       return item;
      //     }
      //   } else if (item.courseName == "化学") {
      //     if (item.mark * 1 <= 100 * 0.6) {
      //       return item;
      //     }
      //   } else if (item.courseName == "生物") {
      //     if (item.mark * 1 <= 90 * 0.6) {
      //       return item;
      //     }
      //   } else if (item.mark == "及格") {
      //     return item;
      //   } else if (item.mark * 1 <= 60) {
      //     return item;
      //   }
      // });
    },
  },
  destroyed() {
    this.loading&&this.loading.close();
  },
};
</script>

<style scoped>
.__p_13f_u_89 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #bbbbbb;
}

.__p_13f_u_91 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #bbbbbb;
}

.__p_13f_u_93 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #bbbbbb;
}

.__p_13f_u_95 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #bbbbbb;
}

.__p_13f_u_88 {
  height: 70vh;
  border-right: 1px solid #bbbbbb;
}

.__p_13f_u_86 {
  width: 15vw;
  height: 70vh;
}

.__p_13f_u_107 {
  float: left;
  clear: both;
  margin-top: 6px;
  margin-right: 6px;
}

.__p_13f_u_108 {
  border-radius: 0;
  width: 70%;
  float: left;
  clear: right;
}

.__p_13f_u_109 {
  float: right;
}

.__p_13f_u_105 {
  width: 30%;
  margin-right: 20px;
  float: left;
  display: block;
}

.__p_13f_u_199 {
  float: left;
  clear: both;
  margin-top: 6px;
}

.__p_13f_u_201 {
  float: right;
}

.__p_13f_u_202 {
  width: 70%;
}

.__p_13f_u_198 {
  width: 438px;
  float: right;
  display: block;
}

.__p_13f_u_103 {
  width: 80vw;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.__p_13f_u_110 {
  clear: both;
}

.__p_13f_u_104 {
  margin-top: 20px;
}

.__p_13f_u_100 {
  margin-top: 20px;
}

.__p_13f_u_128 {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 30px;
  text-align: right;
}

.__p_13f_u_140 {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 30px;
  text-align: right;
}

.__p_13f_u_87 {
  width: 80vw;
}

.__p_13f_u_66 {
  height: 80vh;
}
</style>