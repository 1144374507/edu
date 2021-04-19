<template>
  <div>
    <el-select id="qa-test-deploy-convergeBind-newstrategy-template" class="m-select" :class="{'m-multi-select': multiple}" v-model="mValue" :placeholder="placeholder" :multiple="multiple" :filterable="filterable" size="small" @change="handleChange">
      <el-option v-for="item of configTemplateList" :value="item.tmplId" :label="item.name" :key="item.id" :id='"qa-test-deploy-excelbBind-editBindTemplate-configSelect-"+item.name'></el-option>
    </el-select>
  </div>
  
</template>
<script>
export default {
  props: {
    value: {
    },
    filterable: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    mValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      configTemplateList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('/api/vlan/customConfigTemplate/listAllConfigTemplate').then((res) => {
        if (res.data.success) {
          this.configTemplateList = res.data.result;
        }
      }).catch((err) => {
      }).finally(() => {
      });
    },
    handleChange (val) {
      const data = this.configTemplateList.find(item => item.tmplId === val)
      this.$emit('change', val, data)
    }
  }
}
</script>
<style scoped lang="scss">
.m-select.el-select {
  width: 100%;
}

</style>
<style lang="scss">
  .theme-2b6afd {
    .m-multi-select.el-select .el-input__inner {
      border-radius: 4px !important;
    }
  }
</style>