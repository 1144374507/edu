<template>
  <div>
    <div class="__p_12i_u_66">
      <el-row type="flex" justify="start" align="top" :gutter="0">
        <el-col :span="12" :offset="0" :push="0" :pull="0" class="__p_12i_u_86">
          <div class="__p_12i_u_88">
            <!-- 左侧二级导航 -->
            <div class="__p_12i_u_89">
              <el-menu
                mode="vertical"
                :default-openeds="defaultOpeneds"
                default-active="1-1"
              >
                <el-submenu
                  title="导航子菜单"
                  index="1"
                  :show-timeout="300"
                  :hide-timeout="300"
                  ><template slot="title"><span>课程管理</span></template>
                  <el-menu-item index="1-1" @click.native="setShow"
                    ><span slot="title">本学期课表</span></el-menu-item
                  >
                  <!-- <el-menu-item index="1-2" @click.native="setNoShow"
                    ><span slot="title">历年课表</span></el-menu-item
                  > -->
                </el-submenu>
              </el-menu>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="0" :push="0" :pull="0" class="__p_12i_u_87">
          <div v-if="isShow" class="__p_12i_u_100">
            <el-row
              type="flex"
              justify="start"
              align="top"
              :gutter="0"
              class="__p_12i_u_103"
            >
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_12i_u_105"
                ><span>学期</span>
                <el-select
                  placeholder="请选择学期"
                  size="small"
                  class="__p_12i_u_108"
                  v-model="value"
                >
                  <el-option
                    v-for="(i, key) in term"
                    :value="i.value"
                    :label="i.label"
                    :key="key"
                  ></el-option>
                </el-select>
                <el-button type="primary" size="small" class="__p_12i_u_109"
                  >查询</el-button
                >
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="start"
              align="top"
              :gutter="0"
              class="__p_12i_u_104"
            >
              <el-col :span="12" :offset="0" :push="0" :pull="0"
                ><span>当前为 {{ value }} 学期</span></el-col
              >
            </el-row>
          </div>
          <div v-if="!isShow" class="setmgtop"></div>

          <!-- 课表 -->
          <div style="width: 100%">
            <el-table
              :data="data"
              border
              :span-method="objectSpanMethod"
              stripe
              highlight-current-row
            >
              <el-table-column
                label=""
                prop="sectiontime"
                align="left"
                header-align="left"
              ></el-table-column
              ><el-table-column
                label="节次"
                prop="sections"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="时间"
                prop="time"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期一"
                prop="mom"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期二"
                prop="tue"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期三"
                prop="wed"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期四"
                prop="thurs"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期五"
                prop="friday"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期六"
                prop="sat"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="星期日"
                prop="sun"
                align="left"
                header-align="left"
              >
              </el-table-column>
            </el-table>
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
      pid: "",
      grades: "高一",
      activeindex: 1,
      schoolNumber: "2017012065",
      isShow: false,
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

      defaultOpeneds: ["1"],

      data: [
        // {
        //   sections: "早读",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sectiontime: "上午",
        //   sections: "第一节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第二节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第三节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第四节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sectiontime: "下午",
        //   sections: "第一节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第二节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第三节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sectiontime: "晚上",
        //   sections: "第一节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第二节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
        // {
        //   sections: "第三节",
        //   time: "07:10 - 7:40",
        //   courseday1: "语文",
        //   courseday2: "数学",
        // },
      ],
    };
  },
  created() {
    let date = new Date();
    const res = date.getFullYear() - parseInt("2017级");
    // date.getMonth(); //获取当前月份(0-11,0代表1月)
    if (res <= 1) {
      if (date.getMonth() > 9) {
        this.grade = "高一";
      } else {
        this.grade = "高一";
      }
    } else if (res <= 2) {
      if (date.getMonth() > 9) {
        this.grade = "高二";
      } else {
        this.grade = "高二";
      }
    } else {
      if (date.getMonth() > 9) {
        this.grade = "高三";
      } else {
        this.grade = "高三";
      }
    }
    this.getPid();
  },
  methods: {
    getPid() {
      this.$axios
        .get(
          `/api/getPid?schoolNumber=${this.schoolNumber}&&grades=${this.grades}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.pid = res.data.list[0].pid;
            this.getSchedule();
          } else {
            this.$message.error("接口异常");
          }
          // this.data = res.data.list
        });
    },
    getSchedule() {
      this.$axios
        .get(`/api/teacherManagement/getSchedule/${this.pid}`)
        .then((res) => {
          if (res.data.success) {
            this.data = res.data.list;
          } else {
            this.$message.error("接口异常");
          }
        });
    },
    setShow() {
      this.isShow = false;
    },
    setNoShow() {
      this.isShow = true;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 1,
            colspan: 1,
          };
        } else if (rowIndex === 1) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else if (rowIndex === 5) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else if (rowIndex === 9) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style scoped>
.setmgtop {
  margin-top: 10px;
}
.__p_12i_u_89 {
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

.__p_12i_u_91 {
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

.__p_12i_u_93 {
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

.__p_12i_u_95 {
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

.__p_12i_u_88 {
  height: 70vh;
  border-right: 1px solid #bbbbbb;
}

.__p_12i_u_86 {
  width: 15vw;
  height: 70vh;
}

.__p_12i_u_108 {
  border-radius: 0;
}

.__p_12i_u_109 {
  float: right;
}

.__p_12i_u_105 {
  width: 473px;
}

.__p_12i_u_103 {
  border-top: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
  width: 80vw;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

.__p_12i_u_104 {
  margin-top: 20px;
}

.__p_12i_u_100 {
  margin-top: 20px;
}

.__p_12i_u_128 {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 30px;
  text-align: right;
}

.__p_12i_u_140 {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 30px;
  text-align: right;
}

.__p_12i_u_87 {
  width: 80vw;
}

.__p_12i_u_66 {
  height: 80vh;
}
</style>