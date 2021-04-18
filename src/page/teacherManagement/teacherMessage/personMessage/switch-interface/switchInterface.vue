<template>
  <div class="terminalinterface-wrappers">
    <div class="st_01"><span>说明：</span> 让大家更快认识你</div>
    <div class="st_02">
      <span>添加备注</span>
      <el-button
        type="text"
        style="float: right"
        icon="el-icon-plus"
        @click="addItem"
        >添加</el-button
      >
    </div>
    <div class="st_03">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="个人简介：" label-width="150px" prop="ip">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            size="small"
            v-model="form.ip"
            class="showTips __p_YR_u_9"
          >
            ></el-input
          >
        </el-form-item>

        <el-form-item label="爱好：" label-width="150px" prop="mask">
          <el-input
            placeholder="请输入爱好"
            type="text"
            size="small"
            v-model="form.mask"
            class="showTips __p_YR_u_11"
          ></el-input>
        </el-form-item>
        <el-form-item label="特长：" label-width="150px" prop="gateway">
          <el-input
            placeholder="请输入特长"
            type="textarea"
            autosize
            size="small"
            v-model="form.gateway"
            class="showTips __p_YR_u_23"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注："
          label-width="150px"
          prop="remark"
          v-for="(item, index) in form.remark"
          :key="index"
        >
          <template slot-scope="scope">
          <el-input
            placeholder="请输入"
            type="textarea"
            autosize
            size="small"
            :v-model="item.value"
            class="showTips __p_YR_u_23"
          ></el-input>
            <el-button
              style="flot:right"
              @click="deleteItem(scope.$index)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "preRelease",
  data() {
    let isAllowVlan = (rule, value, callback) => {
      if (
        !(
          ((value >= 5 && value <= 7) || value == 3) &&
          /^-?[1-9]\d*$/.test(value)
        )
      ) {
        return callback(new Error("值必须为 3 或 5 到 7 之间的整数"));
      }
      // console.log(value,'jsf');

      return callback();
    };
    let isNativeVlan = (rule, value, callback) => {
      if (!(value >= 1 && value <= 4049 && /^-?[1-9]\d*$/.test(value))) {
        return callback(new Error("值必须为 1 到 4094之间的整数"));
      }
      // console.log(value,'jsf');

      return callback();
    };
    return {
      // interfaceList:['Gi0/1','Gi0/2','Gi0/3','Gi0/4'],
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

      // interfaces: [],
      value: "",
      nativeVlanTips: "",
      allowVlanTips: "",
      form: {
        interfaces: [
          // { desc: '', native_vlan: '', allow_vlan: '', status: '', interface: '' },
        ],
        remark: [],
      },
      rules: {
        desc: [
          { required: true, message: "该字段不能为空" },
          // {validator:isVlan}
        ],
        native_vlan: [
          { required: true, message: "该字段不能为空" },
          { validator: isNativeVlan },
        ],
        allow_vlan: [
          { required: true, message: "该字段不能为空" },
          { validator: isAllowVlan },
        ],
        status: [{ required: true, message: "该字段不能为空" }],
        interface: [{ required: true, message: "该字段不能为空" }],
      },
      isNext: false,
    };
  },
  computed: {},
  methods: {
    addItem() {
      let temp = {
        value: "",
      };
      this.form.remark.push(temp);
    },
    deleteItem(index) {
      this.form.remark.splice(index, 1);
    },
    getData() {
      return this.form.interfaces;
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
<style lang="scss">
.terminalinterface-wrappers {
  .el-form-item {
    // margin-bottom: 0 ;
  }
}
</style>
<style scoped>
.st_01 {
  padding: 5px;
  border: 1px rgb(45, 88, 125) dashed;
}
.st_02 {
  padding: 10px 0;
}
</style>