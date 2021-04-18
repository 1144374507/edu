<template>
  <div class="terminalinterface-wrapper">
    <div class="st_01">
      <span>说明：</span> 请确认输入的的联系方式是可用的。
    </div>
    <div class="st_02">
    </div>
    <div class="st_03">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="手机：" label-width="150px" prop="ip">
          <el-input
            placeholder="请输入手机号码"
            type="text"
            size="small"
            v-model="form.ip"
            class="showTips __p_YR_u_9"
          ></el-input>
        </el-form-item>
         
        <el-form-item label="固话：" label-width="150px" prop="mask">
          <el-input
            placeholder="请输入固话号码"
            type="text"
            size="small"
            v-model="form.mask"
            class="showTips __p_YR_u_11"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ：" label-width="150px" prop="gateway">
          <el-input
            placeholder="请输入QQ号码"
            type="text"
            size="small"
            v-model="form.gateway"
            class="showTips __p_YR_u_23"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信：" label-width="150px" prop="gateway">
          <el-input
            placeholder="请输入微信号码"
            type="text"
            size="small"
            v-model="form.gateway"
            class="showTips __p_YR_u_23"
          ></el-input>
        </el-form-item>
      
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "preRelease",
  data() {
    let isVlan = (rule, value, callback) => {
      if (!(value >= 1 && value <= 4049 && /^-?[1-9]\d*$/.test(value))) {
        return callback(new Error("值必须为 1 到 4094之间的整数"));
      }
      // console.log(value,'jsf');

      return callback();
    };
    return {
      interfaceList: [
        "Gi0/1",
        "Gi0/2",
        "Gi0/3",
        "Gi0/4",
        "Gi0/5",
        "Gi0/6",
        "Gi0/7",
        "Gi0/8",
        "Gi0/9",
        "Gi0/10",
        "Gi0/11",
        "Gi0/12",
        "Gi0/13",
        "Gi0/14",
        "Gi0/15",
        "Gi0/16",
        "Gi0/17",
        "Gi0/18",
        "Gi0/19",
        "Gi0/20",
        "Gi0/21",
        "Gi0/22",
        "Gi0/23",
        "Gi0/24",
        "Te0/25",
        "Te0/26",
        "Te0/27",
        "Te0/28",
        "Te0/29",
        "Te0/30",
        "Te0/31",
        "Te0/32",
      ],
      tips: "",
      isNext: false,
      form: {
        terminals: [
          // {}
        ],
      },
      rules: {
        vlan: [
          { required: true, message: "该字段不能为空" },
          { validator: isVlan },
        ],
      },
    };
  },
  computed: {},
  methods: {
    addItem() {
      let temp = {
        desc: "",
        vlan: "",
        status: true,
        interface: this.interfaceList[0],
      };
      this.form.terminals.push(temp);
      console.log(this.form.terminals);
    },
    deleteItem(index) {
      this.form.terminals.splice(index, 1);
    },
    getData() {
      return this.form.terminals;
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          resolve(valid);
        });
      });
    },
    getValidate() {
      this.$refs.form.validate((valid) => {
        //  || this.form.terminals.length === 0
        if (!valid) {
          console.log(valid, "valid");
          this.isNext = false;

          return;
        } else {
          this.isNext = true;
        }
      });
      return this.isNext;
    },
  },
};
</script>

<style>
.st_01 {
  padding: 5px;
  border: 1px rgb(45, 88, 125) dashed;
}
.st_02 {
  padding: 10px 0;
}
</style>
<style lang="scss">
.terminalinterface-wrapper {
  .el-form-item {
    margin: 0 !important;
    height: 60px;
  }
  .el-form-item__error {
    position: absolute;
    bottom: -16px;
    left: 0;
    z-index: 9;
    height: 14px;
    line-height: 12px;
    // width: 400px;
    padding: 0;
  }
  .el-form-item__error--inline {
    z-index: 3;
    padding: 0;
    margin: 0;
  }
}
</style>