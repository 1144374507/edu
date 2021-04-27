<template>
<!-- 考务管理 -->
  <div>
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
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_13f_u_105"
                ><span class="__p_13f_u_107">学年学期</span>
                <el-select
                  placeholder="请输入内容"
                  size="small"
                  class="__p_13f_u_108"
                  v-model="value"
                >
                  <el-option
                    v-for="(item, index) in term"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <el-button type="primary" size="small" class="__p_13f_u_109"
                  >搜索</el-button
                >
              </el-col>
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_13f_u_198"
                ><span class="__p_13f_u_199">课程号</span>
                <el-button type="primary" size="small" class="__p_13f_u_201"
                  >搜索</el-button
                >
                <el-input
                  placeholder="请输入内容"
                  type="text"
                  size="small"
                  class="__p_13f_u_202"
                ></el-input>
              </el-col>
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_13f_u_198"
                ><span class="__p_13f_u_199">课程名</span>
                <el-button type="primary" size="small" class="__p_13f_u_201"
                  >搜索</el-button
                >
                <el-input
                  placeholder="请输入内容"
                  type="text"
                  size="small"
                  class="__p_13f_u_202"
                ></el-input>
              </el-col>
            </el-row>
            <!-- 标题 -->
            <el-row
              type="flex"
              justify="start"
              align="top"
              :gutter="0"
              class="__p_13f_u_104"
              v-if="!isShow"
            >
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_13f_u_110"
                ><span>当前为 {{ value }} 学期</span></el-col
              >
            </el-row>
          </div>

          <div>
            <el-table
              :data="data"
              stripe
              highlight-current-row
            >
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column
                label="课程号"
                prop="courseID"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="课序号"
                prop="courseIdex"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="课程名"
                prop="courseName"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="课程属性"
                prop="courseType"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="考试类型"
                prop="examType"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="成绩"
                prop="grades"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="未通过原因"
                prop="noPassReason"
                width="100px"
                align="left"
                header-align="left"
              ></el-table-column>
            </el-table>
            <el-pagination
              :current-page="1"
              :page-sizes="[50, 100, 200]"
              :page-size="50"
              :total="100"
              layout="total, sizes, prev, pager, next, jumper"
              class="__p_13f_u_128"
            ></el-pagination>
          </div>

          <el-steps :active="0" align-center></el-steps>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,

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
      value: "高一/秋季",
      data: [
        {
          courseID: "001",//课程号
          courseIdex: "0011",//课序号
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
      ],
      tatolData: [
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
        {
          courseID: "002",
          courseIdex: "0021",
          courseName: "数学",
          courseType: "必修",
          examType: "考试",
          grades: "89",
          noPassReason: "我过了",
        },
        {
          courseID: "003",
          courseIdex: "0031",
          courseName: "英语",
          courseType: "必修",
          examType: "考试",
          grades: "59",
          noPassReason: "我过了",
        },
        {
          courseID: "004",
          courseIdex: "0041",
          courseName: "物理",
          courseType: "必修",
          examType: "考试",
          grades: "109",
          noPassReason: "我过了",
        },
        {
          courseID: "005",
          courseIdex: "0051",
          courseName: "化学",
          courseType: "必修",
          examType: "考试",
          grades: "99",
          noPassReason: "我过了",
        },
        {
          courseID: "006",
          courseIdex: "0061",
          courseName: "生物",
          courseType: "必修",
          examType: "考试",
          grades: "54",
          noPassReason: "我过了",
        },
        {
          courseID: "007",
          courseIdex: "0071",
          courseName: "历史",
          courseType: "必修",
          examType: "考试",
          grades: "59",
          noPassReason: "我过了",
        },
        {
          courseID: "001",
          courseIdex: "0011",
          courseName: "语文",
          courseType: "必修",
          examType: "考试",
          grades: "129",
          noPassReason: "我过了",
        },
      ],
    };
  },
  methods: {
    setShow() {
      this.isShow = false;
    },
    setNoShow() {
      this.isShow = true;
    },
    failedGradeClick() {
      this.data = this.tatolData.filter((item) => {
        if (
          item.courseName == "语文" ||
          item.courseName == "数学" ||
          item.courseName == "英语"
        ) {
          if (item.grades * 1 <= 90) {
            return item;
          }
        } else if (item.courseName == "物理") {
          if (item.grades * 1 <= 110 * 0.6) {
            return item;
          }
        } else if (item.courseName == "化学") {
          if (item.grades * 1 <= 100 * 0.6) {
            return item;
          }
        } else if (item.courseName == "生物") {
          if (item.grades * 1 <= 90 * 0.6) {
            return item;
          }
        } else if (item.grades == "及格") {
          return item;
        } else if (item.grades * 1 <= 60) {
          return item;
        }
      });
    },
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
  border-top: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
  width: 80vw;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
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