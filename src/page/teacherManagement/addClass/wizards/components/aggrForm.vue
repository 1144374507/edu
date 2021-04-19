<template>
  <div class="__p_13e_u_1">
    <div>
      <div>
        <div class="__p_13e_u_24"><i class="el-icon-warning"></i><span class="__p_13e_u_26">一个汇聚可绑定多个模板，从汇聚上来的接入设备自动根据端口数匹配对应模板。</span></div>
        <el-form label-position="right"  ref="form" :model="form" :rules="rules" label-width="120px" class="__p_13e_u_4">
          <el-form-item label="策略名称" prop="name">
            <el-input placeholder="请输入" v-model="form.name" type="text" size="small" class="sbf-input" id='qa-test-deploy-convergeBind-newstrategy-name'></el-input>
            <el-tooltip content="32个中英文数字及字符，字符仅包含“-”、“_”" placement="top"><i class="el-icon-warning __p_13e_u_22"></i></el-tooltip>
          </el-form-item>
          <el-form-item label="汇聚设备IP" prop="ip">
            <el-input placeholder="请输入" v-model="form.ip" type="text" size="small" class="sbf-input" id='qa-test-deploy-convergeBind-newstrategy-IP'>
              <template slot="prepend">设备IP</template>
              <!-- 听说之后要变成下拉框 -->
            </el-input>
            <el-tooltip content="需要与汇聚设备LLDP通告的IP一致（若汇聚设备有多个IP，需要为LLDP指定一个IP）" placement="top"><i class="el-icon-warning __p_13e_u_22"></i></el-tooltip>
          </el-form-item>
          <el-form-item label="绑定的配置模板" prop="tmplIdList">
            <bindTemplateSelect placeholder="请选择" v-model="form.tmplIdList" multiple filterable class="sbf-input"></bindTemplateSelect>
          </el-form-item>
        </el-form>
        <div class="__p_13e_u_16">
          <el-button type="info" size="small" round class="__p_13e_u_17" @click="handleCancelClick" id='qa-test-deploy-convergeBind-newstrategy-cancel'>取消</el-button>
          <el-button type="primary" size="small" round class="__p_13e_u_18" @click="handelBindClick" id='qa-test-deploy-convergeBind-newstrategy-save'>保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import bindTemplateSelect from './bindTemplateSelect'
  import { isValidIp } from '../../utils/validate'

  export default {
    props: {
      bindInfo: {
        type: Object,
        required: false,
      }
    },
    components: {
      bindTemplateSelect,
    },
    data () {
      return {
        form: {
          id: "",
          bindType: 3, // 绑定类型（2:基于汇聚端口 3:基于汇聚） 
          ip: '',
          name: '',
          tmplIdList: [],
        },
        rules: {
          name: [
            { required: true, message: '请输入' },
            { validator: this.validateName, message: '请输入正确的名称' },
          ],
          ip: [
            { required: true, message: '请输入' },
            { validator: this.validateIp },
          ],
          tmplIdList: [
            { required: true, message: '请选择' },
          ],
        }
      }
    },
    created () {
      this.init()
    },
    mounted (){
    },
    computed: {
      isEidt() {
        return !!this.bindInfo
      },
    },
    methods: {
      validateName (rule, value, callback) {
        if (value) {
          if (!(/[\u4e00-\u9fa5a-zA-Z0-9-_]+/.test(value))) {
            return callback(new Error(rule.message))
          }
        }
        callback()
      },
      validateIp (rule, value, callback) {
        if (value) {
          if (!isValidIp(value)) {
            return callback(new Error('请输入正确的IP'))
          }
        }
        callback()
      },
      init () {
        if (this.isEidt) {
          this.$axios.get(`/api/vlan/aggrBind/update/${this.bindInfo.id}`).then(res => {
            if (res.data.success) {
              const result = res.data.result
              this.form.id = result.id
              this.form.name = result.name
              this.form.ip = result.ipList[0] || ''
              this.form.tmplIdList = result.tmplIdList || []
            } else {
            }
          }).catch(err => {
          }).finally(() => {
          })
        }
      },
      handleCancelClick () {
        this.$emit('cancel')
      },
      addSubmit () {
        if (this.submitting) return
        this.submitting = true
        return this.$axios.post('/api/vlan/aggrBind/batchInsert', {
          "bindType": this.form.bindType,
          "ipList": [this.form.ip],
          "name": this.form.name,
          "tmplIdList": this.form.tmplIdList,
        }).then(res => {
          if (res.data.success) {
            this.$message.success("保存成功")
            this.$emit('saveFinish')
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          this.$message.error(err.message || "保存失败")
        }).finally(() => {
          this.submitting = false
        })
      },
      editSubmit () {
        if (this.submitting) return
        this.submitting = true
        return this.$axios.post('/api/vlan/aggrBind/batchUpdate', {
          "id": this.form.id,
          "bindType": this.form.bindType,
          "ipList": [this.form.ip],
          "name": this.form.name,
          "tmplIdList": this.form.tmplIdList,
        }).then(res => {
          if (res.data.success) {
            this.$message.success("保存成功")
            this.$emit('saveFinish')
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          this.$message.error(err.message || "保存失败")
        }).finally(() => {
          this.submitting = false
        })
      },
      handelBindClick () {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.isEidt) {
              this.editSubmit()
            } else {
              this.addSubmit()
            }
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .__p_13e_u_1 {
    .sbf-input {
      width: 274px;
    }
  }
</style>
<style scoped>
  .__p_13e_u_22 {
    margin-left: 10px;
  }
  .__p_13e_u_26 {
    margin-left: 10px;
  }

  .__p_13e_u_4 {
    padding-top: 20px;
  }

  .__p_13e_u_17 {
    width: 80px;
  }

  .__p_13e_u_18 {
    width: 80px;
    margin-right: 20px;
    margin-left: 20px;
  }

  .__p_13e_u_16 {
    text-align: right;
    margin-top: 20px;
  }
</style>