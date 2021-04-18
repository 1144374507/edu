  <!-- 管理地址配置 -->
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="家庭住址" label-width="150px" prop="ip">
        <el-input
          placeholder="以身份证上的住址为准"
          type="textarea"
          autosize
          size="small"
          v-model="form.ip"
          class="showTips __p_YR_u_9"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否住校" label-width="150px">
        <el-radio
          v-model="form.manage_interface_type"
          label="MGMT"
          @click.native="mgmtInput"
          >是</el-radio
        >
        <el-radio
          v-model="form.manage_interface_type"
          label="VLAN"
          @click.native="vlanInput"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item
        key="VLAN"
        label="现住址"
        label-width="150px"
        v-if="form.manage_interface_type === 'VLAN'"
        prop="interface"
      >
        <el-input
          placeholder="目前所在居住地"
          type="text"
          size="small"
          v-model="form.interface"
          class="showTips __p_YR_u_7"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.manage_interface_type === 'VLAN'"
        label="是否有监护人陪同"
        label-width="150px"
      >
        <el-radio v-model="form.manage_interface_e" label="MGT">是</el-radio>
        <el-radio v-model="form.manage_interface_e" label="VAN">否</el-radio>
      </el-form-item>
      <el-form-item
        label="宿舍楼"
        label-width="150px"
        v-if="form.manage_interface_type === 'MGMT'"
        prop="interface"
      >
        <el-cascader :options="options" clearable></el-cascader>
      </el-form-item>

      
    </el-form>
    <!-- <div @click="getSend">getSend</div> -->
  </div>
</template>

<script>
import Util from "@/common/util/util.js";
import { validateMask } from "@/common/util/validate.js";

export default {
  name: "addressConfig",
  data() {
    let isInteger = (rule, value, callback) => {
      return value == "0" || /^-?[1-9]\d*$/.test(value);
    };
    let checkVlan = (rule, value, callback) => {
      if (this.form.manage_interface_type === "MGMT") {
        return callback();
      } else if (
        !(
          value * 1 >= 1 &&
          value * 1 <= 4049 &&
          this.form.manage_interface_type === "VLAN" &&
          /^-?[1-9]\d*$/.test(value)
        )
      ) {
        console.log(value, "jsf");
        console.log(/^-?[1-9]\d*$/.test(value), "jsf");

        return callback(new Error("不正确的vlan"));
      }
      console.log(value, "jsf");

      return callback();
    };

    let checkIP = (rule, value, callback) => {
      if (!Util.isIP(value)) {
        return callback(new Error("不正确的IP地址"));
      }
      return callback();
    };

    let checkGateway = (rule, value, callback) => {
      if (!Util.isIP(value)) {
        return callback(new Error("不正确的网关"));
      }
      return callback();
    };
    let checkDns = (rule, value, callback) => {
      if (!Util.isIP(value)) {
        return callback(new Error("不正确的dns服务器"));
      }
      return callback();
    };

    return {
      timeZones: [
        {
          value: "-12",
          label: "UTC-12(国际日期变更线)",
        },
        {
          value: "-11",
          label: "UTC-11(阿拉斯加诺姆时间)",
        },
        {
          value: "-10",
          label: "UTC-10(夏威夷标准时间)",
        },
        {
          value: "-9",
          label: "UTC-9(阿拉斯加标准时间)",
        },
        {
          value: "-8",
          label: "UTC-8(太平洋标准时间)",
        },
        {
          value: "-7",
          label: "UTC-7(山地标准时间)",
        },
        {
          value: "-6",
          label: "UTC-6(中部标准时间)",
        },
        {
          value: "-5",
          label: "UTC-5(东部标准时间)",
        },
        {
          value: "-4",
          label: "UTC-4(东部夏时制)",
        },
        // {
        //   value: '-3:30',
        //   label: 'UTC-3(巴西利亚时间)'
        // },
        {
          value: "-3",
          label: "UTC-3(巴西利亚时间)",
        },
        {
          value: "-2",
          label: "UTC-2(巴西利亚夏令时)",
        },
        {
          value: "-1",
          label: "UTC-1(西非时间)",
        },
        {
          value: "+0",
          label: "UTC+0(格林尼治标准时间)",
        },
        {
          value: "+1",
          label: "UTC+1(中欧时间)",
        },
        {
          value: "+2",
          label: "UTC+2(英国双重标准时间)",
        },
        {
          value: "+3",
          label: "UTC+3(巴格达时间)",
        },
        // {
        //   value: '+3:30',
        //   label: 'UTC+3:30'
        // },
        {
          value: "+4",
          label: "UTC+4(毛里求斯时间)",
        },
        //  {
        //   value: '+4:30',
        //   label: 'UTC+4:30'
        // },
        {
          value: "+5",
          label: "UTC+5(马尔代夫时间)",
        },
        // {
        //   value: '+5:30',
        //   label: 'UTC+5:30'
        // },
        {
          value: "+6",
          label: "UTC+6(哈萨克斯坦阿拉木图时间)",
        },
        {
          value: "+7",
          label: "UTC+7(澳大利亚圣诞岛时间)",
        },
        {
          value: "+8",
          label: "UTC+8(北京，中国标准时间)",
        },
        {
          value: "+9",
          label: "UTC+9UTC +9(日本标准时间)",
        },
        //  {
        //   value: '+9:30',
        //   label: 'UTC+9:30'
        // },
        {
          value: "+10",
          label: "UTC+10(东澳大利亚标准时间)",
        },
        {
          value: "+11",
          label: "UTC+11UTC+ 11 (澳大利亚东部标准夏时制)",
        },
        {
          value: "+12",
          label: "UTC+12UTC+ 12(国际日期变更线)",
        },
      ],
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],

      isPc: true,
      characters: [],
      interfaceType: [
        {
          value: "Mgmt 0",
          label: "Mgmt 0",
        },
      ],
      modeRadio: "l2",
      form: {
        manage_interface_type: "MGMT",
        interface: "Mgmt 0",
        ip: "172.18.102.212",
        mask: "255.255.255.0",
        gateway: "172.18.102.1",
        dns: "114.114.114.114",
        managementInterface: "VLAN口作为管理接口",
        time: "",
        time_zone: "",
        character: "",
        // 字符集字段，后端接口暂缺，与后端沟通
      },
      isNext: false,
      rules: {
        interface: [
          { required: true, message: "该字段不能为空" },
          { validator: checkVlan },
        ],
        ip: [
          { required: true, message: "该字段不能为空" },
          { validator: checkIP },
        ],
        mask: [
          { required: true, message: "该字段不能为空" },
          { validator: validateMask },
        ],
        gateway: [
          { required: true, message: "该字段不能为空" },
          { validator: checkGateway },
        ],
        dns: [
          { required: false, message: "该字段不能为空" },
          { validator: checkDns },
        ],
      },
    };
  },
  methods: {
    inputValueChange(refsString, tipsString, event) {
      console.log(this.active, "jsf");

      console.log("11111", "jsf");
      console.log(refsString, "jsf");
      let regexIP = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
      let str = event.target.value;
      console.log(str, "jsf");
      // console.log(regexIP.test(str),'jsf');
      if (!regexIP.test(str)) {
        this.$refs[refsString].style.display = "inline-block";
        this.$refs[refsString].childNodes[1].innerHTML = tipsString;
        // 设置淡出的函数
        function fadeOut(elem, speed = 0.02, time = 50) {
          /*
           * 参数说明
           * elem==>需要淡出的元素
           * speed==>淡出速度
           * time
           */
          //初始化透明度变化值为1
          elem.style.opacity = 1;
          clearInterval(timer);
          let timer = setInterval(() => {
            elem.style.opacity -= speed;
            // console.log(elem.style.opacity,'jsf');
            if (elem.style.opacity < 0) {
              // console.log('clearInterval','jsf');
              clearInterval(timer);
            }
          }, time);
        }
        fadeOut(this.$refs[refsString]);
      } else {
        // this.$refs[refsString].childNodes[1].innerHTML = '格式正确✔'
        this.$refs[refsString].style.display = "";
      }
    },
    changeRadio(val) {
      this.$emit("change", val);
    },
    async validate() {
      return await this.$refs.form.validate();
    },
    getData() {
      if (this.isPc) {
        this.form.time = this.getNewTime();
      }
      return this.form;
    },
    getTime() {
      this.form.time = this.getNewTime();
      return this.form.time;
    },
    getNewTime() {
      var d = new Date();
      const datetime =
        d.getFullYear() +
        "-" +
        d.getMonth() +
        1 +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return datetime;
    },
    vlanInput() {
      // console.log('vlanInput','jsf');
      this.form.interface = "";
    },
    mgmtInput() {
      this.form.interface = "Mgmt 0";
    },
    go2Query() {
      console.log("获取系统字符集", "jsf");
      // this.$message.error('后端接口有问题');
      this.$axios
        .get(`/api/sw/port/switchport?pageNo=1&pageSize=10&mode=TRUNK`)
        .then((res) => {
          if (res.data.success) {
            this.characters = res.data.result;
            // this.original = res.data.result;
          }
          console.log(res, "jsf");
        });
    },
    getValidate() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.isNext = true;
      });
      return this.isNext;
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          resolve(valid);
        });
      });
    },
  },
  created() {
    this.form.character = "默认";
    this.form.time_zone = this.timeZones[20].value;

    // this.go2Query()
  },
  mounted() {},
};
</script>

<style scoped  >
.showTips {
  width: 320px;
}

.tips {
  display: none;
}

.choseTime {
  display: block;
}
</style>
