<template>
  <div>
    <div class="st_01">
       <span>说明：</span> 开启默认路由功能，会自动生成指向路由口的缺省路由，如果有多个路由口，则会按照条目序号自动配置优先级。
    </div>
    <div class="st_02">
      <el-form label-position="right" label-width="220px">
        <el-form-item prop="wizard_default_router" label="默认路由：">
          <el-checkbox v-model="safe_info.wizard_default_router">开启</el-checkbox>
        </el-form-item>
        <el-form-item prop="wizard_span_tree" label="生成树环路保护机制：">
         <el-checkbox v-model="safe_info.wizard_span_tree">开启</el-checkbox>
        </el-form-item>
         <el-form-item prop="wizard_port_fast" label="边缘端口优化配置：">
            <el-checkbox v-model="safe_info.wizard_port_fast">开启</el-checkbox>
        </el-form-item>
         <el-form-item prop="wizard_rldp" label="连接终端接口开启RLDP防环">
          <el-checkbox v-model="safe_info.wizard_rldp">开启</el-checkbox>  
        </el-form-item>  
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:"upportConfig",
  data() {
    return {
      safe_info: {
        wizard_default_router: true,
        wizard_span_tree: true,
        wizard_port_fast: true,
        wizard_rldp: true,
      }
    }
  },
  methods: {
    getData() {
      return this.safe_info
    }
  }
}
</script>

<style scoped >
.st_01 {
  padding: 5px;
  border: 1px rgb(45, 88, 125) dashed ;
}
</style>