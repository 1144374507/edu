<template>
  <div ref='closs_quickConfig'>
    <div class="__p_YR_u_2">
      <el-steps :active="active" align-center class="__p_YR_u_13">
        <el-step title="基础信息"></el-step>
        <el-step title="联系方式"></el-step>
        <el-step title="个人简介"></el-step>
        <el-step title="住址"></el-step>
      </el-steps>
      <el-form label-position="left">
        <!-- 设备管理 -->
        <deviceManagement ref='deviceManagement' @change="change" v-show="active === 0" ></deviceManagement>
        <!-- 终端接口 -->
        <terminalInterface ref="terminalInterface"  v-show="active === 1"></terminalInterface>
        <!-- 交换机接口 -->
        <switchInterface ref="switchInterface" v-show="active === 2"></switchInterface>
        <!-- 住址 -->
        <security ref="security" v-show="active === 3"></security>
        
      </el-form>
      <!-- 控制流程 -->
      <div class="__p_YR_u_19" v-show="active !== steps">
        <el-button @click="goOut" type="default" size="small">退出个人信息修改</el-button>
        <div>
          <el-button @click="prev" v-show="active !== 0" type="primary" size="small" class="__p_YR_u_25">上一步</el-button>
          <el-button  @click="next" v-show="active !== steps-1" type="primary" size="small" class="__p_YR_u_25">下一步</el-button>
          <el-button  @click="finish"  v-show="active === steps-1" type="primary" size="small" class="__p_YR_u_25">完成</el-button>
        </div>
      </div>
      <!-- 配置等待界面 -->
      <div class="__p_YZ_u_2" v-show="active === steps && !isSuccess">
        <div class="__p_YZ_u_3"><img src="http://vve.qiniu.qjzd.net/FmYPdQrzVLJ4Ne7KUfOfHbFMEyWy" class="__p_YZ_u_12" /></div>
        <div class="__p_YZ_u_5"><span class="__p_YZ_u_6">个人信息修改中，请稍候</span><span class="__p_YZ_u_11">请不要执行任何操作，也不要刷新或关闭本页面。</span></div>
      </div>  
       <!-- 配置完成 -->
      <div class="__p_Z0_u_10" v-show="isSuccess">
        <div class="__p_Z0_u_11"><i class="el-icon-check __p_Z0_u_17"></i></div>
        <div class="__p_Z0_u_13"><span class="__p_Z0_u_14">已完成个人信息修改</span>
          <el-button type="primary" size="small" class="__p_Z0_u_16">点此重新登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import deviceManagement from './device-management/deviceManagement'
  import terminalInterface from './terminal-interface/terminalInterface'
  import switchInterface from './switch-interface/switchInterface'
  import routerInterface from './router-interface/routerInterface'
  import lowerInterface  from "./lower-interface/lowerInterface";
  import security  from "./security/security";
  export default {
    components:{
      deviceManagement,
      terminalInterface,
      switchInterface,
      security,
      routerInterface,
      lowerInterface
    },
    data() {
      return{
        mode: 'l2',
        steps: 4,
        active: 0,
        isSuccess: false,
        form:{
          device_info:{},
          terminals: {},
          interfaces: {}
        },
        
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      change(val) {
        this.mode = val
        if(val === 'l2') {
          this.steps = 4
        } else {
          this.steps = 6
        }
      },
      prev() {
        
        this.active--;
      } ,
      async next() {
        const { active } = this
        let rst = true
        if (active === 0) {
          rst = await this.$refs.deviceManagement.validateForm()
        } else if (active === 1){
          rst = await this.$refs.terminalInterface.validateForm()
        }else if (active === 2){
          rst = await this.$refs.switchInterface.validateForm()
        }else if (active === 3){
          rst = true
        }else if (active === 4){
          rst = await this.$refs.routerInterface.validateForm()
        }else if (active === 5){
          rst = await this.$refs.lowerInterface.validateForm()
        }
        if (!rst) {
            return this.$message.error('请把表单填写完整')
        }
        this.active++;
      },
    
      finish() {
        // this.active++;
        const deviceManagement = this.$refs.deviceManagement.getData()
        const terminalInterface = this.$refs.terminalInterface.getData()
        const switchInterface = this.$refs.switchInterface.getData()
        const security = this.$refs.security.getData()
        const routerInterface = this.$refs.routerInterface.getData()
        const lowerInterface = this.$refs.lowerInterface.getData()
        //封装请求数据
        const reqData = {
          mgmt_info:{
            manage_interface_type: deviceManagement.manage_interface_type,
            interface: deviceManagement.interface,
            ip: deviceManagement.ip,
            mask: deviceManagement.mask,
            gateway: deviceManagement.gateway,
          },
          device_info: {
            dns: deviceManagement.dns,
            time_zone: deviceManagement.time_zone,
            time: deviceManagement.time
          },
          terminals:terminalInterface,
          interfaces: switchInterface,
          routers: [],
          gateways: [],
          safe_info: security,
        
        }
        //如是三层，加入三层数据
        if(this.mode==='l3') {
          reqData.routers = routerInterface
          reqData.gateways = lowerInterface
        }
        //这里发起请求
        console.log(reqData,'123')
        //获取返回数据
        this.$axios.post('/api/sw/wizard/save',reqData,{loading:true})
        .then((res) => {
          if(res.data.success) {
            flog = res.data.success
            //处理成功返回的数据
            console.log(res,'jsf');
            this.$message.success(res.data.message)
            
            this.goOut()

            return
          }
          
            console.log(res,'jsf');

          this.$message.error(res.data.message)
        })
        .catch((err) => {
          this.$message.error("接口异常")
        })
        
        
        
      },
      goOut() {
       this.closeRjDialog();
      },
     
      
    }
  }
</script>


<style  >
  .__p_YR_u_13 {
    margin-bottom: 40px;
    /* display: none; */
  }

  .__p_YR_u_7 {
    width: 320px;
  }

  .__p_YR_u_26 {
    margin-left: 5px;
    color: #00AEFF;
  }

  .__p_YR_u_9 {
    width: 320px;
  }

  .__p_YR_u_27 {
    margin-left: 5px;
    color: #00AEFF;
  }

  .__p_YR_u_11 {
    width: 320px;
  }

  .__p_YR_u_23 {
    width: 320px;
  }

  .__p_YR_u_28 {
    margin-left: 5px;
    color: #00AEFF;
  }

  .__p_YR_u_25 {
    width: 100px;
  }

  .__p_YR_u_19 {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 20px;
    width: 100%;
    left: 0;
    padding-left: 20px;
    padding-right: 20px;
  }

  .__p_YR_u_2 {
    padding-top: 20px;
    padding-bottom: 80px;
    padding-left: 20px;
    padding-right: 20px;
    min-height: 500px;
    position: relative;
  }

   .__p_YT_u_13 {
    width: 200px;
    margin-left: 100px;
  }

  .__p_YT_u_14 {
    margin-left: 5px;
    color: #00AEFF;
  }

  .__p_YT_u_2 {
    line-height: 40px;
  }

    .__p_YW_u_64 {
    font-weight: bold;
  }

  .__p_YW_u_76 {
    display: block;
    opacity: 0.6;
  }

  .__p_YW_u_77 {
    display: block;
    opacity: 0.6;
  }

  .__p_YW_u_65 {
    margin-top: 20px;
    padding-left: 20px;
    line-height: 40px;
  }

  .__p_YW_u_78 {
    margin-top: 20px;
  }

  .__p_YW_u_63 {
    margin-top: 20px;
  }

    .__p_YV_u_40 {
    margin-left: 0;
    margin-right: 0;
    text-align: right;
    font-size: 14px;
  }

  .__p_YV_u_41 {
    margin-top: 10px;
    margin-bottom: 20px;
    height: 100px;
    border: 1px solid #2D587D;
  }

  .__p_YV_u_43 {
    color: #00aeff;
  }

  .__p_YV_u_42 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .__p_YV_u_46 {
    font-weight: bold;
  }

  .__p_YV_u_47 {
    margin-left: 5px;
    color: #00AEFF;
  }

  .__p_YV_u_59 {
    display: block;
    opacity: 0.6;
  }

  .__p_YV_u_64 {
    width: 200px;
    margin-left: 50px;
  }

  .__p_YV_u_65 {
    margin-left: 50px;
  }

  .__p_YV_u_66 {
    width: 200px;
    margin-left: 50px;
  }

  .__p_YV_u_60 {
    margin-top: 20px;
  }

  .__p_YV_u_48 {
    margin-top: 20px;
    padding-left: 20px;
    line-height: 40px;
  }

  .__p_YV_u_67 {
    margin-top: 20px;
  }

  .__p_YV_u_45 {
    margin-top: 20px;
  }
  .__p_YX_u_46 {
    margin-top: 20px;
    padding-left: 20px;
    line-height: 40px;
  }

  .__p_YX_u_44 {
    margin-top: 20px;
  }

    .__p_YY_u_40 {
    font-size: 18px;
  }

  .__p_YY_u_39 {
    line-height: 40px;
    border-bottom: 1px solid #2D587D;
  }

  .__p_YY_u_42 {
    font-weight: bold;
  }

  .__p_YY_u_52 {
    display: inline-block;
    width: 120px;
    flex: 1;
  }

  .__p_YY_u_53 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_54 {
    display: inline-block;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_55 {
    display: inline-block;
    width: 100px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_57 {
    display: inline-block;
    width: 80px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_49 {
    margin-top: 20px;
  }

  .__p_YY_u_65 {
    display: inline-block;
    width: 120px;
    flex: 1;
  }

  .__p_YY_u_66 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_67 {
    display: inline-block;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_68 {
    display: inline-block;
    width: 100px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_69 {
    display: inline-block;
    width: 80px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_70 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_71 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_72 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_73 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_74 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_75 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_77 {
    display: inline-block;
    width: 120px;
    flex: 1;
  }

  .__p_YY_u_78 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_79 {
    display: inline-block;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_80 {
    display: inline-block;
    width: 100px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_81 {
    display: inline-block;
    width: 80px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_82 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_83 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_84 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_85 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_86 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_87 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_51 {
    opacity: 0.6;
  }

  .__p_YY_u_43 {
    padding-left: 20px;
    padding-bottom: 40px;
  }

  .__p_YY_u_88 {
    font-weight: bold;
  }

  .__p_YY_u_91 {
    display: inline-block;
    width: 120px;
    flex: 1;
  }

  .__p_YY_u_92 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_93 {
    display: inline-block;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_94 {
    display: inline-block;
    width: 100px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_95 {
    display: inline-block;
    width: 80px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_90 {
    margin-top: 20px;
  }

  .__p_YY_u_97 {
    display: inline-block;
    width: 120px;
    flex: 1;
  }

  .__p_YY_u_98 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_99 {
    display: inline-block;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_100 {
    display: inline-block;
    width: 100px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_101 {
    display: inline-block;
    width: 80px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_102 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_103 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_104 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_105 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_106 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_107 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_109 {
    display: inline-block;
    width: 120px;
    flex: 1;
  }

  .__p_YY_u_110 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_111 {
    display: inline-block;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_112 {
    display: inline-block;
    width: 100px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_113 {
    display: inline-block;
    width: 80px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_114 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_115 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_116 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_117 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_118 {
    display: inline-block;
    width: 80px;
    flex: 1;
    opacity: 0.6;
    text-align: center;
  }

  .__p_YY_u_119 {
    display: inline-block;
    vertical-align: bottom;
    width: 160px;
    flex: 1;
    padding-left: 10px;
  }

  .__p_YY_u_89 {
    padding-left: 20px;
    padding-bottom: 40px;
  }

  .__p_YY_u_41 {
    margin-top: 20px;
    line-height: 40px;
  }

  .__p_YY_u_37 {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

    .__p_YZ_u_12 {
    vertical-align: bottom;
    width: 48px;
    height: 48px;
  }

  .__p_YZ_u_3 {
    text-align: center;
  }

  .__p_YZ_u_6 {
    font-size: 18px;
  }

  .__p_YZ_u_11 {
    display: block;
    opacity: 0.6;
  }

  .__p_YZ_u_5 {
    text-align: center;
    margin-top: 20px;
    line-height: 30px;
  }

  .__p_YZ_u_2 {
    padding-top: 40px;
  }

    .__p_Z0_u_17 {
    line-height: 60px;
    font-size: 30px;
    font-weight: bold;
  }

  .__p_Z0_u_11 {
    text-align: center;
    width: 60px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    border-radius: 50%;
    background: #3BF8A3;
  }

  .__p_Z0_u_14 {
    font-size: 18px;
    display: block;
  }

  .__p_Z0_u_16 {
    margin-top: 10px;
    width: 120px;
  }

  .__p_Z0_u_13 {
    text-align: center;
    margin-top: 20px;
    line-height: 30px;
  }

  .__p_Z0_u_10 {
    padding-top: 40px;
  }
</style>
