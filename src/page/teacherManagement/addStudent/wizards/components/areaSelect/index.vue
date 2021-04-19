<template>
  <div>
    <el-popover
      ref="listPopover"
      placement="bottom"
      trigger="manual"
      popper-class="m-area-select-popover"
      id='qa-test-deploy-excelbBind-editBindTemplate-area'
      v-model="visible">
      <div class="new-btn-wrapper" v-if="showNewOp">
        <el-button type="text" icon="el-icon-plus" @click="handleNewAreaBtnClick" id="qa-test-deploy-excelbBind-editBindTemplate-newArea">新增区域</el-button>
      </div>
      <el-tree
        :data="list"
        :props="listTreeProps"
        node-key="id"
        ref="listTree"
        @current-change="listTreeCurrentChangeHandle"
        :default-expand-all="true"
        :highlight-current="true"
        :id='"qa-test-deploy-excelbBind-editBindTemplate-area-wrap"'
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node }">
          <span @dblclick="handleTreeItemDoubleClick">{{ node.label }}</span>
        </span>
      </el-tree>
    </el-popover>
    <el-input v-model="parentName" @click.native.stop="visible = !visible" v-popover:listPopover :readonly="true" :placeholder="placeholder"  id='qa-test-deploy-excelbBind-editBindTemplate-newArea-sup-select'
        class="tree-list__input"></el-input>
    <el-dialog title="新增区域" v-if="addDialogVisible" :visible="true" width="400px" @close="closeAddDialog" append-to-body>
      <areaAdd @close="closeAddDialog" @apply="handleAreaApply" @save="handleAreaSave"></areaAdd>
    </el-dialog>
  </div>
</template>

<script>
import { list2Tree, findParentsByIdIncludeSelf } from "@/common/js/tree";
import areaAdd from './areaAdd'
export default {
  name: 'areaSelect',
  components: {
    areaAdd
  },
  props: {
    value: Number,
    placeholder: {
      type: String,
      default: '请选择'
    },
    showNewOp: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      dataList: [],
      list: [],
      listTreeProps: {
        label: 'label',
        children: 'children'
      },
      parentName: '',
      visible: false,
      addDialogVisible: false,
    };
  },
  computed: {
    parentId: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  async mounted () {
    document.body.addEventListener("click", this.handleBodyClick)
    await this.getDataList()
    this.listTreeSetCurrentNode()
  },
  beforeDestroy () {
    document.body.removeEventListener("click", this.handleBodyClick)
  },
  activated () {
    this.getDataList()
  },
  methods: {
    handleBodyClick () {
      this.visible = false
    },
    getParentName (id) {
      if (id === 0) return '全局'
      const name = findParentsByIdIncludeSelf(this.dataList, id).map(item => item.label).join(' - ')
      return name
    },
    // 树选中
    listTreeCurrentChangeHandle (data, node) {
      this.parentId = data.id
      // this.parentName = data.label
      this.parentName = this.getParentName(data.id)
    },
    // 树设置当前选中节点
    listTreeSetCurrentNode () {
      console.log("this.parentId", this.parentName, this.parentId)
      this.$refs.listTree.setCurrentKey(this.parentId)
      if (this.parentId !== undefined) {
        // this.parentName = (this.$refs.listTree.getCurrentNode() || {})['label']
        this.parentName = this.getParentName(this.parentId)
      } else {
        this.parentName = ''
      }
    },
    async getDataList () {
      const { data } = await this.$axios({
        url: '/api/base/area/cascader_data',
        method: 'get'
      })
      const message = data.result;
      const rootTree = [{ id: 0, label: "全局", children: [] }];
      rootTree[0].children = list2Tree(message, 0);
      this.list = rootTree;
      this.dataList = message
    },
    handleTreeItemDoubleClick () {
      this.visible = false
    },
    closeAddDialog () {
      this.addDialogVisible = false
      this.visible = false
    },
    handleNewAreaBtnClick () {
      this.addDialogVisible = true
    },
    async handleAreaApply (area) {
      this.closeAddDialog()
      await this.getDataList()
      this.parentId = area.id
      // this.parentName = area.name
      this.parentName = this.getParentName(this.parentId)
    },
    handleAreaSave () {
      this.getDataList()
      this.closeAddDialog()
    }
  },
  watch: {
    parentId () {
      this.listTreeSetCurrentNode()
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-list__input {
  /deep/ .el-input__inner {
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.m-area-select-popover {
  .new-btn-wrapper {
    margin-bottom: 10px;
    margin-left: 5px;
  }
  .el-tree {
    max-height: 700px;
    overflow: auto;
  }
}
</style>
