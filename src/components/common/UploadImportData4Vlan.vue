<template>
  <div>
    <rj-dialog-contant max-height="650px">
      <div slot="content" class="upa-wrapper">
        <div><a id="down_template" class="rj-link" target="_blank" :href="downloadUrl">点此下载模板</a></div>
        <div class="upa-upload">
          <el-upload ref="upload" :action="uploadUrl" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError" :accept="accept" show-file-list :limit="1">
            <el-button id="upload_template" size="small" type="primary">点击选择文件并上传</el-button>
            <div slot="tip" class="el-upload__tip">提示：只能上传xls和xlsx文件{{tip}}</div>
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
import * as tokenObj from "@/common/js/tokenMng.js";

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
        "，若导入的设备IP在系统中已存在或已被系统识别为非设备IP，则跳过当前设备IP的导入，且一次最多仅允许导入5000行记录。";
    } else if(params.isAccount == true){
        this.tip =
        "，如果导入的账号在系统中已存在，则之前的账号会被覆盖。";
    }
    else if (params.isLocation == true) {
      this.tip =
        "，若场所编码与现有场所冲突，则之前的场所将会被覆盖。";
    }
		else if (params.isWhiteList == true) {
			this.tip =
				"，若设备IP和白名单地址存在重复，系统会过滤掉重复的记录，且一次最多仅允许导入10000行记录。";
		}
    else{
      this.tip = "";
    }
  },
  methods: {
    beforeUpload(file) {
      this.loading = this.$loading({
      	lock: true,
      	text: "处理中...",
      	spinner: "el-icon-loading",
      	background: "rgba(0, 0, 0, 0.7)"
      });
      return true;
    },
    handleSuccess(res, file) {
			this.loading.close();
      console.log(res);
			const params = this.rjDialogParams() || {};
			if (params.isWhiteList == true && res != null && res != "" && res.success) {
				this.$refs.upload.clearFiles();
				this.closeRjDialog({
					taskId: res.result.message
				});
			} else if (params.isDevice == true && res != null && res != ""  && res.success) {
        this.$message({
        	type: 'success',
        	message: '正在导入中，请稍后...'
        });
				this.$refs.upload.clearFiles();
				this.closeRjDialog();
				/* this.$alert(`正在导入中，请稍后...`, "正在导入", {
        	confirmButtonText: "好的",
        	type: "success",
        	callback: action => {
        		this.$refs.upload.clearFiles();
        		this.closeRjDialog();
        	}
        }); */
      } else if (res == null || res == "") {
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
        console.log(res);

        this.$alert(`恭喜您，导入成功。${res.result.message}`, "导入成功", {
          confirmButtonText: "好的",
          type: "success",
          callback: action => {
            this.$refs.upload.clearFiles();
            this.closeRjDialog();
          }
        });
      } else {
        console.log(res);
        if (typeof res.result == "undefined") {
          this.$alert(
            `导入失败。${res.message}`,
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
            `导入失败。${res.result.message}`,
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
			this.loading.close();
      this.$alert("导入失败。", "导入失败", {
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

