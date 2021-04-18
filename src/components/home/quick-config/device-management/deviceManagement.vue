  <!-- 管理地址配置 -->
<template>
<div>
  <el-form :model="form">
    <el-form-item label="模式匹配" label-width="150px">
      <el-radio v-model="modeRadio" @change="changeRadio" label="l2">二层模式</el-radio>
      <el-radio v-model="modeRadio" @change="changeRadio" label="l3">三层模式</el-radio>
    </el-form-item>
    <el-form-item label="设备管理接口" label-width="150px">
      <el-radio v-model="form.manage_interface_type" label="MGMT" >MGMT口作为管理接口</el-radio>
      <el-radio v-model="form.manage_interface_type" label="VLAN">VLAN口作为管理接口</el-radio>
    </el-form-item>
    <el-form-item label="*管理设备VLAN" label-width="150px">
      <el-input placeholder="请输入内容" type="text" size="small" v-model='form.interface'  @blur='inputValueChange("vlanTips","IP地址格式错误",$event)' class=" showTips __p_YR_u_7"></el-input><div ref="vlanTips" class="tips"><span></span><span >vlan的范围为[1-4094]</span></div>
    </el-form-item>
    <el-form-item label="*IP地址" label-width="150px">
      <el-input placeholder="请输入内容" type="text" size="small" v-model='form.ip' @blur='inputValueChange("ipTips","IP地址格式错误1",$event)' class=" showTips __p_YR_u_9"></el-input><div ref="ipTips" class="tips"><span></span><span>vlan的范围为[1-4094]</span></div>
    </el-form-item>
    <el-form-item label="*子网掩码" label-width="150px">
      <el-input placeholder="请输入内容" type="text" size="small" v-model='form.mask' @blur='inputValueChange("SubnetTips","IP地址格式错误2",$event)' class=" showTips __p_YR_u_11"></el-input><div ref="SubnetTips" class="tips"><span></span><span>vlan的范围为[1-4094]</span></div>
    </el-form-item>
    <el-form-item label="*网关" label-width="150px">
      <el-input placeholder="请输入内容" type="text" size="small" v-model='form.gateway' @blur='inputValueChange("getwayTips","IP地址格式错误4",$event)' class=" showTips __p_YR_u_23"></el-input><div ref="getwayTips" class="tips"><span></span><span>vlan的范围为[1-4094]</span></div>
    </el-form-item>
    <el-form-item label="*DNS服务器" label-width="150px">
      <el-input placeholder="请输入内容" type="text" size="small" v-model='form.dns' @blur='inputValueChange("dnsTips","IP地址格式错误5",$event)' class=" showTips __p_YR_u_23"></el-input><div ref="dnsTips" class="tips"><span></span><span>vlan的范围为[1-4094]</span></div>
    </el-form-item>
    <el-form-item label="重新设置时间" label-width="150px">
      <el-radio v-model="isPc" :label="true" >PC时间</el-radio>
      <el-radio v-model="isPc" :label="false"> 自定义时间 </el-radio>
          <el-date-picker
          v-if="!isPc"
          v-model="form.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="时区：" label-width="150px">
      <el-select v-model="form.time_zone" placeholder="请选择">
        <el-option
          v-for="item in timeZones"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 与后端沟通 -->
    <!-- <el-form-item label="系统字符集：" label-width="150px">
      <el-select v-model="value" placeholder="请选择">
        <el-option value="UTF-8" label="UTF-8"></el-option>
        <el-option value="GBK" label="GBK"></el-option>
        <el-option value="default" label="默认"></el-option>
      </el-select>
    </el-form-item> -->
  </el-form>
</div>
</template>

<script>
export default {
  name:'addressConfig',
  data(){
    return{
      timeZones: [{
          value: '-12',
          label: 'UTC-12'
        },{
          value: '-11',
          label: 'UTC-11'
        }, {
          value: '-10',
          label: 'UTC-10'
        }, {
          value: '-9',
          label: 'UTC-9'
        }, {
          value: '-8',
          label: 'UTC-8'
        }, {
          value: '-7',
          label: 'UTC-7'
        }, {
          value: '-6',
          label: 'UTC-6'
        }, {
          value: '-5',
          label: 'UTC-5'
        }, {
          value: '-4',
          label: 'UTC-4'
        }, {
          value: '-3:30',
          label: 'UTC-3:30'
        }, {
          value: '-3',
          label: 'UTC-3'
        }, {
          value: '-2',
          label: 'UTC-2'
        }, {
          value: '-1',
          label: 'UTC-1'
        }, {
          value: '+0',
          label: 'UTC+0'
        }, {
          value: '+1',
          label: 'UTC+1'
        }, {
          value: '+2',
          label: 'UTC+2'
        }, {
          value: '+3',
          label: 'UTC+3'
        }, {
          value: '+3:30',
          label: 'UTC+3:30'
        }, {
          value: '+4',
          label: 'UTC+4'
        }, {
          value: '+4:30',
          label: 'UTC+4:30'
        }, {
          value: '+5',
          label: 'UTC+5'
        }, {
          value: '+5:30',
          label: 'UTC+5:30'
        }, {
          value: '+6',
          label: 'UTC+6'
        }, {
          value: '+7',
          label: 'UTC+7'
        }, {
          value: '+8',
          label: 'UTC+8'
        }, {
          value: '+9',
          label: 'UTC+9'
        }, {
          value: '+9:30',
          label: 'UTC+9:30'
        }, {
          value: '+10',
          label: 'UTC+10'
        }, {
          value: '+11',
          label: 'UTC+11'
        }, {
          value: '+12',
          label: 'UTC+12'
        }],
      isPc: true,
      modeRadio:'l2',
      form: {
      manage_interface_type: 'MGMT',
      interface:'',
      ip:'',
      mask:'',
      gateway:'',
      dns:'',
      managementInterface:'VLAN口作为管理接口',
      time: '',
      time_zone: '',
      // character: ''，字符集字段，后端接口暂缺，与后端沟通
      }
    }
  },
  methods:{
   inputValueChange(refsString,tipsString,event){ 
        console.log(this.active,'jsf');

        console.log('11111','jsf');
        console.log(refsString,'jsf');
        let regexIP = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
        let str = event.target.value
        console.log(str,'jsf');
        // console.log(regexIP.test(str),'jsf');
        if(!regexIP.test(str)){
          this.$refs[refsString].style.display = 'inline-block'
          this.$refs[refsString].childNodes[1].innerHTML = tipsString
          // 设置淡出的函数
          function fadeOut(elem, speed = 0.02, time = 50){
            /*
            * 参数说明
            * elem==>需要淡出的元素
            * speed==>淡出速度
            * time
            */
            //初始化透明度变化值为1
            elem.style.opacity = 1
            clearInterval(timer)
            let timer = setInterval(() => {
                elem.style.opacity -=speed
                console.log(elem.style.opacity,'jsf');
                if(elem.style.opacity < 0){
                  console.log('clearInterval','jsf');
                  clearInterval(timer)
                }
            }, time);
          }
          fadeOut(this.$refs[refsString]) 
        }else{
            // this.$refs[refsString].childNodes[1].innerHTML = '格式正确✔'
            this.$refs[refsString].style.display = ''
        }
    },
    changeRadio(val) {
      this.$emit('change',val)
    },
    getData() {
      if(this.isPc) {
       this.form.time = this.getNewTime()
      }
      return this.form
    },
    getNewTime() {
       var d = new Date();
       const datetime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate()+ ' ' +d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
       return datetime
    },
  }

}
</script>

<style scoped  >
.showTips {
    width: 320px;
  }

.tips{
 display: none;
}
.tips span:first-child{
  display: inline-block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 8px solid #194c83;
}
.tips span:last-child{
  display: inline-block;
  /* width: 0; */
  /* height: 50px; */
  padding-left: 5px;
  padding-right: 5px;
  background-color:#194c83;
  border-radius: 5px;
}
.showTips:hover +.tips{
  display: inline-block;
}
 
</style>
