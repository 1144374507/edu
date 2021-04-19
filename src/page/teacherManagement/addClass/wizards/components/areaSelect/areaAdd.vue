<template>
  <div class="__p_13c_u_1">
    <div>
      <div>
        <el-form label-position="right" label-width="80px" ref="form" :model="form" :rules="rules">
          <el-form-item label="区域名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" maxlength="32" type="text" size="small" class="as-input" id='qa-test-deploy-excelbBind-editBindTemplate-newArea-name'></el-input>
            <el-tooltip content="32个中英文数字及字符，字符仅包含“-”、“_”" placement="top"><i class="el-icon-question __p_13c_u_22"></i></el-tooltip>
          </el-form-item>
          <el-form-item prop="pid" label="上级区域">
            <areaSelect v-model="form.pid" placeholder="请选择"></areaSelect>
          </el-form-item>
        </el-form>
        <div class="__p_13c_u_16">
          <el-button type="info" size="small" round class="__p_13c_u_24" @click="handleCancelBtnClick" id='qa-test-deploy-excelbBind-editBindTemplate-newArea-cancel'>取消</el-button>
          <el-button type="info" size="small" round class="__p_13c_u_17" @click="handleSaveBtnClick" id='qa-test-deploy-excelbBind-editBindTemplate-newArea-save'>保存</el-button>
          <el-button type="primary" size="small" round class="__p_13c_u_18" @click="handleSaveAndPlayBtnClick" id='qa-test-deploy-excelbBind-editBindTemplate-newArea-saveUse'>保存并应用</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import areaSelect from '../areaSelect/index'

  export default {
    name: 'areaAdd',
    components: {
      areaSelect,
    },
    data () {
      return {
        form: {
          name: '',
          pid: undefined,
        },
        rules: {
          name: [
            { required: true, message: '请输入' },
            { validator: this.validateName }
          ],
          pid: [
            { required: true, message: '请选择' },
          ]
        }
      }
    },
    methods: {
      validateName (rule, value, callback) {
        if (value) {
          if (!(/^[\u4e00-\u9fa5a-zA-Z0-9-_]+$/.test(value))) {
            return callback(new Error('请输入正确的名称'))
          }
        }
        callback()
      },
      areaSave () {
        if (this.submitting) return
        this.submitting = true
        return this.$axios.post('/api/base/area', {
          pid: this.form.pid,
          name: this.form.name
        }).then(res => {
          if (res.data.success) {
            this.$message.success("保存成功")
            return res.data.result
          } else {
            return Promise.reject(res)
          }
        }).catch(err => {
          this.$message.error(err.message || '保存失败')
          return Promise.reject(err)
        }).finally(() => {
          this.submitting = false
        })
      },
      handleCancelBtnClick () {
        this.$emit('close')
      },
      handleSaveBtnClick () {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.areaSave().then(res => {
              this.$emit('save')
            })
          }
        });
      },
      handleSaveAndPlayBtnClick () {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.areaSave().then(res => {
              this.$emit('apply', res)
            })
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .__p_13c_u_1 {
    .as-input {
      width: 220px;
    }
  }
</style>
<style scoped>
  .__p_13c_u_22 {
    margin-left: 10px;
  }

  .__p_13c_u_24 {
    width: 80px;
  }

  .__p_13c_u_17 {
    width: 80px;
    margin-left: 20px;
  }

  .__p_13c_u_18 {
    margin-right: 20px;
    margin-left: 20px;
  }

  .__p_13c_u_16 {
    text-align: right;
    margin-top: 20px;
  }
</style>
