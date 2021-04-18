<template>
   <div>
     <div class="st_01">
       <span>说明：</span>网关是用于不同VLAN之间三层互访，建议每个终端VLAN都要配置网关。（注意：没有配置网关的VLAN终端，将无法进行三层访问）。
     </div>
     <div class="st_02">
       <span>下联端口配置网关</span>
       <el-button type="text" style="float:right" icon="el-icon-plus" @click="addItem">添加</el-button>
     </div>
     <div class="st_03">
     <el-form :model="form" :rules="rules" ref="form">
        <el-table :data="form.gateways" style="width: 100%">
            <el-table-column prop="desc" label="允许VLAN" width="220px">
            <template slot-scope="scope">
              <el-form-item :prop="'gateways.'+scope.$index+'.vlan'" :rules="rules.vlan" inline-message>
                <el-input style="width:180px"  placeholder="范围：[1-4094]" size="mini" v-model="scope.row.vlan"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  label="网关状态" width="140">
            <template slot-scope="scope">
              <el-form-item :prop="'gateways.'+scope.$index+'.ip'" :rules="rules.ip" inline-message>
                <el-checkbox v-model="scope.row.status">开启</el-checkbox>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="allow_vlan" label="IPv4地址" width="220px">
            <template slot-scope="scope">
              <el-form-item :prop="'gateways.'+scope.$index+'.ip'" :rules="rules.ip" inline-message>
                <el-input style="width:180px" placeholder="IP地址格式：192.168.1.1"  size="mini" v-model="scope.row.ip"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="native_vlan" label="掩码" width="180px">
            <template slot-scope="scope">
              <el-form-item :prop="'gateways.'+scope.$index+'.mask'" :rules="rules.mask" inline-message>
                <el-input style="width:140px" placeholder="255.255.255.0"  size="mini" v-model="scope.row.mask"></el-input>
              </el-form-item>
            
            </template>
          </el-table-column>
            <el-table-column  label="操作" width="100px">
            <template slot-scope="scope">
              <el-button
                @click="deleteItem(scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-form>
     </div>
     <!-- <div @click="getValidate">点击{{getValidate()}}</div> -->
    </div>
</template>

<script>
export default {
  name:"preRelease",

  data() {
    let isVlan = (rule, value, callback) => {
      if( !(value >= 1 && value <= 4049 && /^-?[1-9]\d*$/.test(value) )){
          return callback(new Error("值必须为 1 到 4094之间的整数"));
        }
          // console.log(value,'jsf');

        return callback();
      }
      let isMask = (rule, value, callback) => {
        let exp = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
        if( !value.match(exp)){
            return callback(new Error("子网掩码格式错误"));
          }
            // console.log(value,'jsf');

          return callback();
      }
      let isIp = (rule, value, callback) => {
          let pattern = new RegExp(
            "^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$"
          );
        if( !pattern.test(value)){
            return callback(new Error("IP地址格式错误"));
          }
            // console.log(value,'jsf');

          return callback();
      }
      
    return {
      interfaceList:['Gi0/1','Gi0/2','Gi0/3','Gi0/4'],
      form:{
        gateways: [
        //  { vlan:'' , status : true , ip : '',  mask :'' },
        ]
      },
      rules: {
        vlan: [
          { required: true, message: '该字段不能为空' },
          {validator:isVlan}
        ],
        status:[
          { required: true, message: '该字段不能为空' },
          
        ],
        ip:[
          { required: true, message: '该字段不能为空' },
          {validator:isIp}
        ],
        mask:[
          { required: true, message: '该字段不能为空' },
          {validator:isMask}

        ]
      },
      
      maskTips:"",
      ipTips:"",
      allowVlanTips:"",
      isNext:false,

    }
  },
  computed:{
  },
  methods:{
    addItem() {
      let temp = {
        vlan: '',
        status: true,
        ip: '192.168.0.1',
        mask: '255.255.255.0',
       }
      this.form.gateways.push(temp)
      console.log( this.form.gateways)
    },
    deleteItem(index) {
       this.form.gateways.splice(index, 1);
    },
    getData() {
      return this.form.gateways
    },
    
    getValidate(){
      this.$refs.form.validate((valid) => {
        if(!valid){
          console.log(valid,'valid');
        this.isNext = false
          return ;
        }else{
          this.isNext = true
        }
      })
      return this.isNext
    },
    validateForm(){
      return new Promise(resolve => {
        this.$refs.form.validate((valid) => {
          resolve(valid)
        })
      })
    },
  }
}
</script>

<style>

.st_01 {
  padding: 5px;
  border: 1px rgb(45, 88, 125) dashed ;
}
.st_02 {
   padding: 10px 0;
}
</style>