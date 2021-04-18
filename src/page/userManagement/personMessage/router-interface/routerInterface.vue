<template>
   <div>
     <div class="st_01">
       <span>说明：</span>路由口是用于当交换机为三层时，需要与上联设备（路由器或者其他三层设备）进行三层互联，此时的接口一定是三层接口。
     </div>
     <div class="st_02">
       <span>连接路由接口</span>
       <el-button type="text" style="float:right" icon="el-icon-plus" @click="addItem">添加</el-button>
     </div>
     <div class="st_03">
     <el-form :model="form" :rules="rules" ref="form">
        <el-table :data="form.routers" style="width: 100%">
          <el-table-column prop="interface" label="接口编号" width="120">
            <template slot-scope="scope">
              <el-form-item>
              <el-select style="width:90px" v-model="scope.row.interface" placeholder="请选择">
                <el-option
                  v-for="item in interfaceList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="接口状态" width="140">
            <template slot-scope="scope">
              <el-form-item>
              <el-checkbox v-model="scope.row.status">开启</el-checkbox>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="allow_vlan" label="IPv4地址" width="220px">
            <template slot-scope="scope">
              <el-form-item :prop="'routers.'+scope.$index+'.ip'" :rules="rules.ip" inline-message>
                <el-input style="width:180px"  placeholder="IP地址格式：192.168.1.1"  size="mini" v-model="scope.row.ip"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="native_vlan" label="掩码" width="180px">
            <template slot-scope="scope">
              <el-form-item :prop="'routers.'+scope.$index+'.mask'" :rules="rules.mask" inline-message>
                <el-input style="width:140px"  placeholder="255.255.255.0"  size="mini" v-model="scope.row.mask"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          
          <el-table-column prop="desc" label="端口描述" width="220px">
            <template slot-scope="scope">
             <el-form-item>

                <el-input style="width:180px"  size="mini" v-model="scope.row.desc"></el-input>
            </el-form-item>

            </template>
          </el-table-column>
            <el-table-column  label="操作" width="100px">
            <template slot-scope="scope">
              <el-form-item>
              <el-button
                @click="deleteItem(scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
     </div>
    </div>
</template>

<script>
export default {
  name:"preRelease",
  data() {
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
      return callback();
    }
    let isMask = (rule, value, callback) => {
      let exp = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
      if( !value.match(exp)){
          return callback(new Error("子网掩码格式错误"));
        }

      return callback();
    }
    return {
      // interfaceList:['Gi0/1','Gi0/2','Gi0/3','Gi0/4'],
      interfaceList:[
        'Gi0/1',
        'Gi0/2',
        'Gi0/3',
        'Gi0/4',
        'Gi0/5',
        'Gi0/6',
        'Gi0/7',
        'Gi0/8',
        'Gi0/9',
        'Gi0/10',
        'Gi0/11',
        'Gi0/12',
        'Gi0/13',
        'Gi0/14',
        'Gi0/15',
        'Gi0/16',
        'Gi0/17',
        'Gi0/18',
        'Gi0/19',
        'Gi0/20',
        'Gi0/21',
        'Gi0/22',
        'Gi0/23',
        'Gi0/24',
        'Te0/25',
        'Te0/26',
        'Te0/27',
        'Te0/28',
        'Te0/29',
        'Te0/30',
        'Te0/31',
        'Te0/32',
        
        ],
      
      form:{
        routers: [
          // { desc: '', mask: '' , ip : '' , status: true ,interface: '' },
        ],
      },
      rules: {
        desc: [
          { required: true, message: '该字段不能为空' },
        ],
        mask:[
          { required: true, message: '该字段不能为空' },
          {validator:isMask}
          
        ],
        ip:[
          { required: true, message: ' 该字段不能为空' },
          {validator:isIp}
        ],
        status:[
          { required: true, message: '该字段不能为空' },

        ],
        interface:[
          { required: true, message: '该字段不能为空' },

        ]
      },
      maskTips:"",
      ipTips:"",
      isNext:false,
    }
  },
  computed:{
  },
  methods:{
    addItem() {
      let temp = {
        desc: '',
        ip: '192.168.0.1',
        mask: '255.255.255.0',
        status: true,
        interface: this.interfaceList[0],
       }
      this.form.routers.push(temp)
      console.log( this.form.routers)
    },
    deleteItem(index) {
       this.form.routers.splice(index, 1);
    },
    getData() {
      return this.form.routers
    },
    clearDefaultIP(){
      console.log('hahahha','jsf');
      // this.form.routers.ip = ''
      this.$refs.clearDefaultIP.value = ''

      console.log(this.$refs.clearDefaultIP.value);
    },
    validateForm(){
      return new Promise(resolve => {
        this.$refs.form.validate((valid) => {
          resolve(valid)
        })
      })
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