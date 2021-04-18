<template>
  <div>
    <div slot="content" class="upa-wrapper" style= "width : 400px">
    <span style = "word-break: break-all; white-space: normal;">{{address}}</span>
    <el-button class="ml10" type="text" size="medium" __cid='el-button' __model='{"name":"复 制"}' id="pm_copy"
        v-clipboard:copy="address"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">点击复制</el-button>
         </div>
  </div>
</template>



<script type="text/javascript">
import clipboard from "../common/js/clipboard.js";
// import clipboard from '@eweb-auth-common/js/clipboard.js'
export default {
  porps: ["selectedTreeNodeId"],
  components: {
    clipboard
  },
  data() {
    return {
      accountSourceId: "",
      address: ""
    };
  },
  mounted() {},
  methods: {
    getAddress() {
      let curWWWPath = window.document.location.href;
      let pathname = window.document.location.pathname;
      let pos = curWWWPath.indexOf(pathname);
      this.address =
        curWWWPath.substring(0, pos) +
        "/api/auth-protocol/static/html/update_password.html?accountSourceId=" +
        this.accountSourceId;
    },
    onCopy(e) {
      this.$message({
        showClose: true,
        message: "复制成功"
      });
    },
    // 复制失败
    onError(e) {
      this.$message({
        showClose: errror,
        message: "复制失败"
      });
    },
    getAccountId(sourceId) {
      this.accountSourceId = sourceId;
      this.getAddress();
    }
  }
};
</script>
<style scoped>
.ml10 {
  position: absolute;
  right: 10px;
  bottom: 5px;
}
</style>
