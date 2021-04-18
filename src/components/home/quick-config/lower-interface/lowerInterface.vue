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
        <el-table :data="gateways" style="width: 100%">
            <el-table-column prop="desc" label="允许VLAN" width="220px">
            <template slot-scope="scope">
                <el-input style="width:180px"  size="mini" v-model="scope.row.vlan"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="网关状态" width="140">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.status">开启</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="allow_vlan" label="IPv4地址" width="220px">
            <template slot-scope="scope">
              <el-input style="width:180px" placeholder=""  size="mini" v-model="scope.row.ip"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="native_vlan" label="掩码" width="180px">
            <template slot-scope="scope">
              <el-input style="width:140px" placeholder=""  size="mini" v-model="scope.row.mask"></el-input>
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
     </div>
    </div>
</template>

<script>
export default {
  name:"preRelease",
  data() {
    return {
      interfaceList:['Gi0/1','Gi0/2','Gi0/3','Gi0/4'],
      gateways: []
    }
  },
  computed:{
  },
  methods:{
    addItem() {
      let temp = {
        vlan: '',
        status: '',
        ip: '',
        mask: '',
       }
      this.gateways.push(temp)
      console.log( this.gateways)
    },
    deleteItem(index) {
       this.gateways.splice(index, 1);
    },
    getData() {
      return this.gateways
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