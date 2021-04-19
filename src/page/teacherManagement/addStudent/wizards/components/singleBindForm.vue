<template>
  <div class="__p_13b_u_1">
    <div>
      <div>
        <el-form label-position="left" label-width="120px" ref="form" :model="form" :rules="rules">
          <el-form-item label="设备SN序列号" prop="serialNo">
            <el-input v-model.trim="form.serialNo" maxlength="32" :disabled="disabledSN" placeholder="请输入" type="text" size="small" class="sbf-input" id='qa-test-deploy-singleBind-SN-input' ></el-input>
          </el-form-item>
          <el-form-item label="绑定的配置模板" prop="tmplId">
            <bindTemplateSelect id='qa-test-deploy-excelbBind-editBindTemplate-configSelect' v-model="form.tmplId" @change="onTmplIdChange" placeholder="可搜索" filterable class="sbf-input"></bindTemplateSelect>
          </el-form-item>
          <el-form-item label="区域名称" prop="areaId">
            <areaSelect v-model="form.areaId" class="sbf-input" placeholder="请选择" showNewOp ></areaSelect>
          </el-form-item>
          <el-form-item label="设备位置" prop="location">
            <el-input v-model="form.location" maxlength="32" placeholder="请输入，如3001室" type="text" size="small" class="sbf-input" id="qa-test-deploy-excelbBind-editBindTemplate-deviceLocations"></el-input>
            <el-tooltip content="32个中英文数字及字符，字符仅包含“-”、“_”" placement="top"><i class="el-icon-question __p_13b_u_22"></i></el-tooltip>
          </el-form-item>
          <el-form-item label="设备名称" prop="hostName">
            <el-input v-model="form.hostName" maxlength="32" placeholder="请输入" type="text" size="small" class="sbf-input" id='qa-test-deploy-excelbBind-editBindTemplate-deviceName'></el-input>
            <el-tooltip content="32个中英文数字及字符，字符仅包含“-”、“_”。若未填写,则后台根据区域名称和设备位置首字母自动生成。" placement="top"><i class="el-icon-question __p_13b_u_23"></i></el-tooltip>
          </el-form-item>
        </el-form>
        <div class="__p_13b_u_16">
          <el-button type="info" size="small" round class="__p_13b_u_17" @click="handleCancelClick" id='qa-test-deploy-excelbBind-editBindTemplate-cancel'>取消</el-button>
          <el-button type="primary" size="small" round class="__p_13b_u_18" @click="handelBindClick" id='qa-test-deploy-excelbBind-editBindTemplate-save'>绑定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import bindTemplateSelect from './bindTemplateSelect'
  import areaSelect from './areaSelect/index'

  // 上线状态
  const UP_STATUS_ENUM = {
    UN_LINE: 0, // 待上线
    ONLINE: 1, // 上线中
    ONLINE_FAIL: 2, // 上线失败
    ONLINE_SUCCESS: 3, // 上线成功
  }

  export default {
    props: {
      bindInfo: {
        type: Object,
        required: false,
      }
    },
    components: {
      bindTemplateSelect,
      areaSelect
    },
    data () {
      return {
        form: {
          serialNo: "",
          tmplId: undefined,
          areaId: undefined,
          location: "",
          hostName: "",
        },
        rules: {
          serialNo: [
            { required: true, message: '请输入' },
          ],
          tmplId: [
            { required: true, message: '请选择' },
          ],
          areaId: [
            { required: false, message: '请选择' },
          ],
          location: [
            { required: false, message: '请输入' },
            { validator: this.validateName, message: '请输入正确的设备位置' },
          ],
          hostName: [
            { required: false, message: '请输入' },
            { validator: this.validateName, message: '请输入正确的设备名称' },
          ]
        },
        hasTmplIdChanged: false,
      }
    },
    created () {
      this.init()
    },
    computed: {
      isEidt() {
        return !!this.bindInfo
      },
      disabledSN () {
        return !!(this.isEidt && this.form.serialNo)
      }
    },
    methods: {
      onTmplIdChange(){
        this.hasTmplIdChanged = true;
      },
      validateName (rule, value, callback) {
        if (value) {
          if (!(/[\u4e00-\u9fa5a-zA-Z0-9-_]+/.test(value))) {
            return callback(new Error(rule.message))
          }
        }
        callback()
      },
      init () {
        console.log("this.isEidt", this.isEidt, this.bindInfo)
        if (this.isEidt) {
          this.form.serialNo = this.bindInfo.serialNo
          this.form.tmplId = this.bindInfo.tmplId
          this.form.areaId = this.bindInfo.areaId
          this.form.location = this.bindInfo.location
          this.form.hostName = this.bindInfo.deviceName // 名称字段不一样
        }
      },
      handleCancelClick () {
        this.$emit('cancel')
      },
      addSubmit () {
        if (this.submitting) return
        this.submitting = true
        return this.$axios.put('/api/vlan/zeroConfig/addZeroConfig', [
          this.form
        ]).then(res => {
          if (res.data.success) {
            this.$message.success("绑定成功")
            this.$emit('saveFinish')
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          this.$message.error(err.message || "绑定失败")
        }).finally(() => {
          this.submitting = false
        })
      },
      editSubmit () {
        const predo = this.hasTmplIdChanged ? this.$confirm('绑定或变更模板会导致设备重启，请在业务空闲时段操作。', '是否保存修订？', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }) : Promise.resolve();
        
        predo.then(() => {
          if (this.submitting) return
          this.submitting = true
          return this.$axios.put('/api/vlan/zeroConfig/updateBind', this.form).then(res => {
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
        }).catch(() => {
        });
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
  .__p_13b_u_1 {
    .sbf-input {
      width: 274px;
    }
  }
</style>
<style scoped>
  .__p_13b_u_22 {
    margin-left: 10px;
  }

  .__p_13b_u_23 {
    margin-left: 10px;
  }

  .__p_13b_u_17 {
    width: 80px;
  }

  .__p_13b_u_18 {
    width: 80px;
    margin-right: 20px;
    margin-left: 20px;
  }

  .__p_13b_u_16 {
    text-align: right;
    margin-top: 20px;
  }
</style>