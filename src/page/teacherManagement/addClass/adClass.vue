<template></template>

<template>
  <div class="addClass__wrapp">
    <div class="demo-input-suffix">
      年 级 ：
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
      班 级 ：

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
<style scoped>
.__p_13t_u_33 {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
}

.__p_13t_u_34 {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  min-width: 0px;
  min-height: 0px;
  padding: 0px;
  border: none;
}

.__p_13t_u_32 {
  height: 100%;
}
</style>
