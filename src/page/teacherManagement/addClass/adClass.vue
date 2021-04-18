<template>
  <div class="addClass__wrapp">
    <el-page-header title="" content="添加班级"> </el-page-header>

    <div class="demo-input-suffix"> 年  级 ：
      <el-select v-model="value1" placeholder="请选择" filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix"> 班 级 ：

      <el-select v-model="value1" placeholder="请选择" filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix">
      班主任：

      <el-select v-model="value1" placeholder="请选择" filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix">
      添加老师：
      <el-select v-model="value1" multiple placeholder="请选择" filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix">
      添加学生：
      <el-select v-model="value1" multiple placeholder="请选择" filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      options: [
        {
          value: "2017021065",
          label: "江盛锋",
        },
        {
          value: "2017021066",
          label: "双皮奶",
        },
        {
          value: "2017021067",
          label: "蚵仔煎",
        },
        {
          value: "2017021068",
          label: "龙须面",
        },
        {
          value: "2017021069",
          label: "北京烤鸭",
        },
      ],
      value1: [],
      input4: "",
    };
  },
};
</script>

<style lang="scss">
.addClass__wrapp {
  float: left;
  .el-input {
    width: 20vw;
    margin-top: 20px;
  }
}
</style>
