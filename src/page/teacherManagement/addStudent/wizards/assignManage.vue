<template>
  <div>
    <el-card class="__p_12z_u_2">
      <el-form
        label-position="left"
        label-width="110px"
        ref="form"
        :model="form"
        :rules="rules"
      >
        <div>
          <div class="__p_12z_u_7">缺省管理VLAN和网段</div>
          <el-form-item label=" 年 级 ：" prop="vlan">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                size="small"
                v-model="value1"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-tooltip
                class="asm-input-tips"
                content="设备出厂缺省使用管理VLAN 1(但缺省报文本身不携带VLAN Tag)，可以被汇聚下连口的缺省VLAN覆盖。"
                placement="right"
              >
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label=" 班 级 ：" prop="vlan">
            <div class="asm-input-wraop">
              <el-select
                class="asm-input"
                size="small"
                v-model="value1"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-tooltip
                content="设备出厂缺省使用管理VLAN 1(但缺省报文本身不携带VLAN Tag)，可以被汇聚下连口的缺省VLAN覆盖。"
                placement="right"
              >
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div> </el-form-item
          ><el-form-item label=" 班主任 ：">
            <div class="asm-input-wraop">
              <el-input
                class="asm-input"
                v-model.trim="form.vlan"
                placeholder="请输入内容"
                type="text"
                size="small"
                disabled
              ></el-input>

              <el-tooltip
                content="设备出厂缺省使用管理VLAN 1(但缺省报文本身不携带VLAN Tag)，可以被汇聚下连口的缺省VLAN覆盖。"
                placement="right"
              >
                <i class="el-icon-question __p_12z_u_20"></i>
              </el-tooltip>
            </div>
          </el-form-item>
          <div style="display: flex">
            <el-form-item label=" 学 生 ：" prop="vlan">
              <div class="asm-input-wraop111">
                <el-select
                  class="asm-input"
                  size="small"
                  v-model="value1"
                  placeholder="请选择"
                  filterable
                  multiple
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-tooltip
                  content="设备出厂缺省使用管理VLAN 1(但缺省报文本身不携带VLAN Tag)，可以被汇聚下连口的缺省VLAN覆盖。"
                  placement="right"
                >
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>

          <div style="display: flex">
            <el-form-item label=" 老 师 ：" prop="vlan">
              <div class="asm-input-wraop11">
                <el-select
                  class="asm-input"
                  size="small"
                  v-model="value1"
                  placeholder="请选择"
                  filterable
                  multiple
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-tooltip
                  content="设备出厂缺省使用管理VLAN 1(但缺省报文本身不携带VLAN Tag)，可以被汇聚下连口的缺省VLAN覆盖。"
                  placement="right"
                >
                  <i class="el-icon-question __p_12z_u_20"></i>
                </el-tooltip>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
    <div class="__p_12z_u_29">
      <el-button
        id="qa-test-btnNext"
        type="primary"
        round
        class="__p_12z_u_30"
        @click="handleNextBtnClick"
        >保存，下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  isValidVlanId,
  isValidIp,
  isValidIpOrRange,
  isValidIpSegment,
  isIpWithin,
} from "../utils/validate";

export default {
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
      showCustomVlan: false,
      disabledDeleteCustomVlan: false,
      form: {
        id: "",
        vlan: "1",
        router: "",
        address: "",
        ipExcluded: "",
        id1: "",
        vlan1: "",
        router1: "",
        address1: "",
        ipExcluded1: "",
      },
      rules: {
        vlan: [
          { required: true, message: "请输入" },
          { validator: this.validateVlan },
        ],
        router: [
          { required: true, message: "请输入" },
          { validator: this.validateRouter },
        ],
        address: [
          { required: true, message: "请输入" },
          { validator: this.validateAddress },
        ],
        ipExcluded: [
          { required: false, message: "请输入" },
          { validator: this.validateIpExcluded },
        ],
        vlan1: [
          { required: true, message: "请输入" },
          { validator: this.validateVlan },
        ],
        router1: [
          { required: true, message: "请输入" },
          { validator: this.validateRouter },
          { validator: this.validateRouter1 },
        ],
        address1: [
          { required: true, message: "请输入" },
          { validator: this.validateAddress1 },
        ],
        ipExcluded1: [
          { required: false, message: "请输入" },
          { validator: this.validateIpExcluded },
        ],
      },
    };
  },
  mounted() {
    // this.getManageVlanConfig();
    this.form.router = "1.1.1.1";
    this.form.address = "1.1.1.0/24";
    this.form.ipExcluded = "1.1.1.1";
  },
  methods: {
    validateVlan(rule, value, callback) {
      if (value) {
        if (!isValidVlanId(value)) {
          return callback(new Error("请输入正常的管理VLAN"));
        }
      }
      callback();
    },
    validateRouter(rule, value, callback) {
      if (value) {
        if (!isValidIp(value)) {
          return callback(new Error("请输入正常的管理网关"));
        }
      }
      callback();
    },
    validateAddress(rule, value, callback) {
      if (value) {
        if (!isValidIpSegment(value)) {
          return callback(new Error("请输入正常的管理网段/掩码"));
        }
        if (!isIpWithin(value, this.form.router)) {
          return callback(new Error("管理网段/掩码与网关不匹配"));
        }
      }
      callback();
    },
    validateAddress1(rule, value, callback) {
      if (value) {
        if (!isValidIpSegment(value)) {
          return callback(new Error("请输入正常的管理网段/掩码"));
        }
        if (!isIpWithin(value, this.form.router1)) {
          return callback(new Error("管理网段/掩码与网关不匹配"));
        }
        if (value === this.form.address) {
          callback(new Error("自定义管理网段/掩码不能与默认管理网段/掩码相同"));
        }
      }
      callback();
    },
    validateIpExcluded(rule, value, callback) {
      if (value) {
        let arr = value.split(",").filter((item) => item);
        const flag = arr.reduce((value, item) => {
          return value && isValidIpOrRange(item);
        }, true);
        if (!flag) {
          return callback(new Error("IP地址格式不正确，请认真检查"));
        }
      }
      callback();
    },
    validateRouter1(rule, value, callback) {
      if (value) {
        if (value === this.form.router) {
          callback(new Error("自定义管理网关不能与默认管理网关相同"));
        }
      }
      callback();
    },
    handleCheckClick() {
      if (this.showCustomVlan) {
        this.showCustomVlan = false;
        return;
      }
      this.$confirm(
        "需确保自定义管理VLAN、自定义网关在接入设备到核心之间的联通性。开启后只对新上线的设备生效，已上线的设备不做处理。",
        "开启提示",
        {
          confirmButtonText: "继续开启",
          cancelButtonText: "取消",
          type: "info",
        }
      )
        .then(() => {
          this.showCustomVlan = true;
        })
        .catch(() => {});
    },
    // async getManageVlanConfig() {
    //   const { data } = await this.$axios.get(
    //     "/api/vlan/managevlanconfig/getManageVlanConfig"
    //   );
    //   if (!data.success) {
    //     return this.$message({
    //       type: "error",
    //       message: data.message || "获取配置失败",
    //     });
    //   }
    //   const result = data.result.list;
    //   if (result[0]) {
    //     this.form.id = result[0].id;
    //     this.form.vlan = result[0].vlan;
    //     this.form.router = result[0].router;
    //     this.form.address = result[0].address;
    //     this.form.ipExcluded = result[0].ipExcluded;
    //   }
    //   if (result[1]) {
    //     this.form.id1 = result[1].id;
    //     this.form.vlan1 = result[1].vlan;
    //     this.form.router1 = result[1].router;
    //     this.form.address1 = result[1].address;
    //     this.form.ipExcluded1 = result[1].ipExcluded;
    //     this.showCustomVlan = true;
    //     this.disabledDeleteCustomVlan = true;
    //   }
    // },
    getSaveData() {
      const list = [];
      list.push({
        id: this.form.id,
        vlan: this.form.vlan,
        router: this.form.router,
        address: this.form.address,
        ipExcluded: this.form.ipExcluded,
      });
      if (this.showCustomVlan) {
        list.push({
          id: this.form.id1,
          vlan: this.form.vlan1,
          router: this.form.router1,
          address: this.form.address1,
          ipExcluded: this.form.ipExcluded1,
        });
      }
      return list;
    },
    handleNextBtnClick() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          // this.$axios.post("/api/vlan/managevlanconfig/save", {
          //   list: this.getSaveData()
          // }).then((res) => {
          //   if (res.data.success) {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功!'
          //     });
          //     this.$emit('nextStep')
          //   } else {
          //     this.$message({
          //       type: 'error',
          //       message: res.data.message || '保存失败'
          //     });
          //   }
          // }).catch((err) => {
          //   this.$message({
          //     type: 'error',
          //     message: err.message || '保存失败'
          //   });
          // }).finally(() => {
          //   loading.close();
          // });
          setTimeout(() => {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.$emit("nextStep");
            loading.close();
          }, 1000);
        }
      });
    },
  },
};
</script>

<style scoped>
.__p_12z_u_7 {
  font-size: 16px;
  font-weight: bold;
  color: #212527;
  margin-bottom: 20px;
}

.__p_12z_u_19 {
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
}

.__p_12z_u_2 {
  padding: 12px;
}

.__p_12z_u_20 {
  margin-left: 5px;
}

.__p_12z_u_18 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 48px;
}

.__p_12z_u_30 {
  width: 116px;
}

.__p_12z_u_29 {
  text-align: center;
  margin-top: 24px;
}
</style>
<style lang="scss" scoped>
.asm-input-wraop {
  position: absolute;
  left: 0;
  top: 0;
}
.asm-input {
  width: 200px;
  // position: absolute;
  // left: 0;
  // top: 0;
}

.asm-input-tips {
  // position: absolute;
  // left: 0;
  // top: 0;
}
</style>

<style scoped lang="scss">
.theme-18edd0 {
  .__p_12z_u_7 {
    color: #fff;
  }
}
</style>
