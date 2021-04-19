<template>
  <div class="planning-configuration-wrapper">
    <el-card>
      <div style="padding: 12px">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <el-button
            type="primary"
            @click="dialogToAdd"
            id="qa-test-deploy-add-template"
            >新增模板</el-button
          >
          <div>
            <el-input
              placeholder="请输入模板名称"
              type="text"
              size="small"
              class="__p_12p_u_129"
              v-model.trim="keyword"
              @keyup.native.enter="getList"
              @input="debounceGetList"
            >
              <template v-slot:suffix>
                <i class="el-icon-search __search-icon" @click="getList"></i>
              </template>
            </el-input>
          </div>
        </div>
        <div>
          <el-table :data="list">
            <el-table-column label="模板名称" prop="name"></el-table-column>
            <el-table-column
              label="适用端口数"
              prop="portNum"
            ></el-table-column>
            <el-table-column label="关联设备数" prop="deviceNum">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.deviceNum"
                  type="text"
                  @click="() => showDeviceList(scope.row.id, scope.row.name)"
                  >{{ scope.row.deviceNum }}</el-button
                >
                <span v-else>{{ scope.row.deviceNum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="() => dialogToEdit(scope.row, scope)"
                  :id="'qa-test-deploy-edit-template-' + scope.row.name"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  @click="() => remove(scope.row)"
                  :id="'qa-test-deploy-del-template-' + scope.row.name"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <div style="text-align: center; margin-top: 24px">
      <el-button
        type="info"
        @click="handlePreBtnClick"
        id="qa-test-deploy-btnPre"
        >上一步</el-button
      >
      <el-button
        type="primary"
        class="pc-next-btn"
        @click="handleNextBtnClick"
        id="qa-test-deploy-btnNext"
        >下一步</el-button
      >
    </div>
    <el-dialog
      :visible.sync="editorDialogVisible"
      width="1080px"
      top="5vh"
      :close-on-click-modal="false"
    >
      <template-editor
        v-if="editorDialogVisible"
        :payload="editorPayload"
        @cancel="editorDialogVisible = false"
        @saved="onTemplateSave"
      ></template-editor>
    </el-dialog>

    <el-dialog
      :visible.sync="deviceListDialogVisible"
      title="关联设备"
      width="1080px"
    >
      <templateDeviceList
        v-bind="deviceListDialogProps"
        v-if="deviceListDialogVisible"
      ></templateDeviceList>
    </el-dialog>
  </div>
</template>
<script>
import templateEditor from "./components/templateEditor";
import templateDeviceList from "./components/templateDeviceList";

export default {
  components: {
    templateEditor,
    templateDeviceList,
  },
  data() {
    return {
      list: [],
      keyword: "",
      editorPayload: null,
      editorDialogVisible: false,
      deviceListDialogVisible: false,
      deviceListDialogProps: {},
    };
  },
  methods: {
    showDeviceList(tmplId, tmplName) {
      this.deviceListDialogVisible = true;
      this.deviceListDialogProps.tmplId = tmplId;
      this.deviceListDialogProps.tmplName = tmplName;
    },
    remove(data) {
      this.$confirm("确认删除吗？").then(() => {
        // this.$axios
        //   .delete(`/api/vlan/customConfigTemplate/${data.id}`)
        //   .then(({ data: { success, message } }) => {
        //     if (success) {
        this.$message.success("操作成功");
        this.getList();
        //     } else {
        //       this.$message.error(message || "操作失败");
        //     }
        //   });
      });
    },
    dialogToAdd() {
      this.editorPayload = null;
      this.editorDialogVisible = true;
    },
    dialogToEdit(target) {
      this.editorPayload = target;
      this.editorDialogVisible = true;
    },
    onTemplateSave() {
      this.editorDialogVisible = false;
      this.getList();
    },
    debounceGetList() {
      // to be implemented in mounted hook
    },
    getList() {
      const loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // this.$axios
      //     .get("/api/vlan/customConfigTemplate/listAllConfigTemplate")
      //     .then(({ data: { success, result, message } }) => {
      //         if (success) {
      //             this.list = result.filter(
      //                 (e) => !!~e.name.indexOf(this.keyword)
      //             );
      //         }
      //     })
      //     .finally(() => {
      loading.close();
      // });
    },
    handlePreBtnClick() {
      this.$emit("preStep");
    },
    handleNextBtnClick() {
      this.$emit("nextStep");
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.__search-icon {
  line-height: 32px;
  padding: 0 7px;
}
</style>
