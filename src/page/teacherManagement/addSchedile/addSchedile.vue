<template>
  <!-- 课表 -->
  <div class="__addschedule__wrap__">
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
    <el-button class="btn" @click="save">保存</el-button>
  </div>
</template>

<script>
export default {
  props:{
    data:[]
  },
  data() {
    return {
      data1: [
        {
          sections: "早读",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "sun",
        },
        {
          sectiontime: "上午",
          sections: "第一节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "sun",
        },
        {
          sections: "第二节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "sun",
        },
        {
          sections: "第三节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "sun",
        },
        {
          sections: "第四节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "sun",
        },
        {
          sectiontime: "下午",
          sections: "第一节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "",
        },
        {
          sections: "第二节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "",
        },
        {
          sections: "第三节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "",
        },
        {
          sectiontime: "晚上",
          sections: "第一节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "",
        },
        {
          sections: "第二节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
          sun: "",
        },
        {
          sections: "第三节",
          time: "07:10 - 7:40",
          mom: "语文",
          tue: "数学",
          wed: "数学",
          thurs: "数学",
          friday: "数学",
          sat: "物理",
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
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex === 8) {
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

    save(){
      console.log(this.data);
    }
  },
  mounted(){
    this.data1 = this.data
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
  .btn{
    margin-top: 15px;
  }
}
</style>