<template>
  <!-- 课表 -->
  <div class="__addschedule__wrap__">
    <el-table
      :data="data1"
      border
      :span-method="objectSpanMethod"
      stripe
      highlight-current-row
    >
      <el-table-column
        label=""
        prop="sectiontime"
        width="100px"
        align="left"
        header-align="left"
      ></el-table-column
      ><el-table-column
        label="节次"
        prop="sections"
        width="100px"
        align="left"
        header-align="left"
      ></el-table-column>
      <el-table-column
        label="时间"
        prop="time"
        width="100px"
        align="left"
        header-align="left"
      ></el-table-column>
      <el-table-column
        label="星期一"
        width="100px"
        align="left"
        header-align="left"
        ><div slot-scope="scope">
          <el-input v-model="scope.row.mom" /></div
      ></el-table-column>
      <el-table-column
        label="星期二"
        width="100px"
        align="left"
        header-align="left"
        ><div slot-scope="scope">
          <el-input v-model="scope.row.tue" /></div
      ></el-table-column>
      <el-table-column
        label="星期三"
        width="100px"
        align="left"
        header-align="left"
        ><div slot-scope="scope">
          <el-input v-model="scope.row.wed" /></div
      ></el-table-column>
      <el-table-column
        label="星期四"
        width="100px"
        align="left"
        header-align="left"
        ><div slot-scope="scope">
          <el-input v-model="scope.row.thurs" /></div
      ></el-table-column>
      <el-table-column
        label="星期五"
        width="100px"
        align="left"
        header-align="left"
        ><div slot-scope="scope">
          <el-input v-model="scope.row.friday" /></div
      ></el-table-column>
      <el-table-column
        label="星期六"
        width="100px"
        align="left"
        header-align="left"
      >
        <div slot-scope="scope">
          <el-input v-model="scope.row.sat" />
        </div>
      </el-table-column>
      <el-table-column
        label="星期日"
        width="100px"
        align="left"
        header-align="left"
      >
        <div slot-scope="scope">
          <el-input v-model="scope.row.sun" />
        </div>
      </el-table-column>
    </el-table>
    <!-- 组件复用 -->
    <el-button v-if="this.data != undefined" class="btn" @click="save"
      >保存</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    data: {},
    pid: {},
  },
  data() {
    return {
      loading:"",
      values: [],
      data1: [
        {
          pid: "",
          id: 1,
          sectiontime: "",
          sections: "早读",
          time: "07:10-7:40",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 2,
          sectiontime: "上午",
          sections: "第一节",
          time: "07:50-8:35",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 3,
          sectiontime: "",
          sections: "第二节",
          time: "08;45-9:30",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 4,
          sectiontime: "",
          sections: "第三节",
          time: "10:00-10:45",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 5,
          sectiontime: "",
          sections: "第四节",
          time: "10:55-11:40",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 6,
          sectiontime: "下午",
          sections: "第一节",
          time: "14:10-14:45",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 7,
          sectiontime: "",
          sections: "第二节",
          time: "14.55-15:40",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 8,
          sectiontime: "",
          sections: "第三节",
          time: "15:50-16:35",
          mom: "",
          pid: "",
          id: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 9,
          sectiontime: "",
          sections: "第四节",
          time: "16.40-17:25",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 10,
          sectiontime: "晚上",
          sections: "第一节",
          time: "19:00-19:45",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          sectiontime: "",
          sections: "第二节",
          time: "20:00-20:45",
          mom: "",
          pid: "",
          id: 11,
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
        {
          pid: "",
          id: 12,
          sectiontime: "",
          sections: "第三节",
          time: "21:00-21:45",
          mom: "",
          tue: "",
          wed: "",
          thurs: "",
          friday: "",
          sat: "",
          sun: "",
        },
      ],
    };
  },
  methods: {
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
    save() {
      this.loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios
        .post(`/api/teacherManagement/updataSchedule`, this.data1)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("修改成功");
         this.loading.close();
            this.$emit("closeAddSchedule", true);
          } else {
            this.$message.error();
            ("修改失败");
         this.loading.close();
            this.$emit("closeAddSchedule", false);
          }
        });
    },
  },
  mounted() {
    if (this.data != undefined) {
      this.data1 = this.data;
    } else {
      let arr = []
      this.data1.map(item => {
        item.pid = this.pid
        arr.push(item)
      })
      this.data1 = arr
    }
  },
  destroyed(){
    this.loading.close()
  }
};
</script>

<style lang="scss">
.__addschedule__wrap__ {
  .el-input__inner {
    background-color: inherit;
    border: none;
    outline: none;
  }
  .btn {
    margin-top: 15px;
  }
}
</style>