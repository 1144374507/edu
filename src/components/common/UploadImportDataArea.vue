<template>
  <div>
    <rj-dialog-contant max-height="650px">
      <div slot="content" class="upa-wrapper">
        <div><a id="qa-test-deploy-btn-download" class="rj-link" target="_blank" :href="downloadUrl">点此下载模板</a></div>
        <div class="upa-upload">
          <el-upload ref="upload" :action="uploadUrl" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError" :accept="accept" :show-file-list="false" :limit="1">
            <el-button id="area_upload_template" size="small" type="primary">点击选择文件并上传</el-button>
            <div slot="tip" class="el-upload__tip">提示：只能上传xls和xlsx文件</div>
          </el-upload>
        </div>
      </div>
      <div slot="footer-opt">
      </div>
    </rj-dialog-contant>
  </div>
</template>

<script type="text/javascript">
import rjDialogContant from "@common/dialogContant.vue";
import * as tokenObj from "@common/js/tokenMng.js";

export default {
  components: {
    rjDialogContant
  },
  data() {
    return {
      accept: ".xls,.xlsx",
      uploadUrl: "",
      downloadUrl: "",
      tip: "",
      loading:undefined
    };
  },
  created() {
    const params = this.rjDialogParams() || {};
    let token = tokenObj.getToken();

    if (params.uploadUrl.indexOf("?") !== -1) {
      this.uploadUrl = params.uploadUrl + "&token=" + token;
    } else {
      this.uploadUrl = params.uploadUrl + "?token=" + token;
    }
    if (params.uploadUrl.indexOf("?") !== -1) {
      this.downloadUrl = params.downloadUrl + "&token=" + token;
    } else {
      this.downloadUrl = params.downloadUrl + "?token=" + token;
    }
    if (params.isDevice == true) {
      this.tip =
        "，若导入的设备在系统中已存在（MAC相同），则之前的设备会被覆盖。";
    } else if(params.isAccount == true){
        this.tip =
        "，如果导入的账号在系统中已存在，则之前的账号会被覆盖。";
    }
    else if (params.isLocation == true) {
      this.tip =
        "，若场所编码与现有场所冲突，则之前的场所将会被覆盖。";
    }
    else{
      this.tip = "";
    }
  },
  methods: {
    beforeUpload(file) {
      const isXls =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      if (!isXls) {
        this.$message.error("只能上传xls，xlsx格式!");
        return false;
      }
      if (file.size > 50 * 1024 * 1024) {
        this.$message.error("文件大小不能大于50MB!");
        return false;
      }
      this.loading = this.$loading({
				lock: true,
				text: '导入中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
            });
      return true;
    },
    handleSuccess(res, file) {
      if(this.loading){
         this.loading.close();
      }
      if (res == null || res == "") {
        console.log(res);
        if (typeof res.result == "undefined") {
          this.$alert(`恭喜您，导入成功。`, "导入成功", {
            confirmButtonText: "好的",
            type: "success",
            callback: action => {
              this.$refs.upload.clearFiles();
              this.closeRjDialog();
            }
          });
        }
      } else if (res.success) {
        this.$alert(`恭喜您，导入成功。`, "导入成功", {
          confirmButtonText: "好的",
          type: "success",
          callback: action => {
            this.$refs.upload.clearFiles();
            this.closeRjDialog();
          }
        });
      } else {
        if (typeof res.result == "undefined") {
          this.$alert(
            `${res.message}`,
            "导入失败",
            {
              confirmButtonText: "关闭",
              type: "error",
              callback: action => {
                this.$refs.upload.clearFiles();
              }
            }
          );
        } else {
          this.$alert(
            `导入失败，请修改后重新导入。${res.result.message}`,
            "导入失败",
            {
              confirmButtonText: "关闭",
              type: "error",
              callback: action => {
                this.$refs.upload.clearFiles();
              }
            }
          );
        }
      }
    },
    handleError(err, file) {
      if(this.loading){
         this.loading.close();
      }
      this.$alert("导入失败，请修改后重新导入。", "导入失败", {
        confirmButtonText: "关闭",
        type: "error",
        callback: action => {
          this.$refs.upload.clearFiles();
        }
      });
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upa-wrapper {
}
.upa-download-text {
  color: #0ec0ed;
  cursor: pointer;
}
.upa-upload {
  padding-top: 20px;
}
</style>

