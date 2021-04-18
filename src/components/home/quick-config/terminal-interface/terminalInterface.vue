<template>
   <div>
     <div class="st_01">
       <span>说明：</span>下联接入交换机的接口。
     </div>
     <div class="st_02">
       <span>连接交换机接口</span>
       <el-button type="text" style="float:right" icon="el-icon-plus" @click="addItem">添加</el-button>
     </div>
     <div class="st_03">
       <el-table :data="terminals" style="width: 100%">
         <el-table-column prop="interface" label="接口编号" width="120">
            <template slot-scope="scope">
              <el-select style="width:80px" v-model="scope.row.interface" placeholder="请选择">
                <el-option
                  v-for="item in interfaceList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </template>
         </el-table-column>
          <el-table-column prop="status" label="接口状态" width="140">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.status">开启</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="allow_vlan" label="终端所属vlan" >
            <template slot-scope="scope">
              <el-input style="width:180px" placeholder="范围：4-4094"  size="mini" v-model="scope.row.vlan"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="端口描述" >
            <template slot-scope="scope">
               <el-input style="width:180px"  size="mini" v-model="scope.row.desc"></el-input>
            </template>
          </el-table-column>
           <el-table-column  label="操作" >
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
     </div>
    </div>
</template>

<script>
export default {
  name:"preRelease",
  data() {
    return {
      interfaceList:['Gi0/1','Gi0/2','Gi0/3','Gi0/4'],
      terminals: []
    }
  },
  computed:{
  },
  methods:{
    addItem() {
      let temp = {
        desc: '',
        avlan: '',
        status: true,
        interface: this.interfaceList[0],
       }
      this.terminals.push(temp)
      console.log( this.terminals)
    },
    deleteItem(index) {
       this.terminals.splice(index, 1);
    },
    getData() {
      return this.terminals
    }
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