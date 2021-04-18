<template>
	<div>
		<el-upload 
		  	class="upload-demo"
		  	:ref="refsName"
		  	:data="data"
		  	:drag="drag"
			:action="action"
			:on-progress="onHandleProgress"
			:on-change="changeUpload"
			:headers='uploadHeaders'
			:show-file-list="showFileList ? showFileList : false"
			:before-upload="onBeforeUpload"
			:on-success="onSuccessUpload"
			:on-error="onErrorUpload"
			:multiple="multiple"
		  	:auto-upload="autoUpload ? autoUpload : false">
		  	<slot name="upload-opt"></slot>
	  	</el-upload>
	</div>
</template>

<script type="text/javascript">
	import * as tokenObj from '@common/js/tokenMng.js'
	import * as httpHandle from '@common/js/httpHandle.js';

	export default {
		props:[
			"action", 
			"headers", 
			"on-change",
			"before-upload", 
			"on-success", 
			"on-error", 
			"data", 
			"auto-upload", 
			"show-file-list",
			"on-progress",
			"multiple" ,
			"drag"
		],
		data() {
			return {
				uploadHeaders: {},
				refsName: new Date().getTime()
			}
		},
		mounted() {
			this.uploadHeaders = this.headers || {};
			this.$emit("onLoadSuccess", this.$refs[this.refsName])
		},
		methods: {
			changeUpload(file) {
				let self = this;
				if(self.onChange) {
					return self.onChange(file);
				} 
				return true;
			},
			onBeforeUpload(file) {
				let self = this;
				self.uploadHeaders[self.$store.state.tokenKey] = tokenObj.getToken();
				if(self.beforeUpload) {
					return self.beforeUpload(file);
				}
				return true;
			},
			onSuccessUpload(rsp, file, fileList) {
				let self = this;
				if(self.onSuccess) {
					self.onSuccess(rsp, file, fileList);
				}
				
			},
			onErrorUpload(error) {
				let self = this;
				if(self.onError) {
					self.onError();
				}
				let errorstrs = error.toString().split("{");
				let errorStr = errorstrs[0];
				if(errorstrs.length == 2) {
					errorStr = errorstrs[1];
				}
				errorStr = "{" + errorStr;
				let errorObj = JSON.parse(errorStr);
				httpHandle.error(errorObj, self.$store, self.$router, self.$storeTypes);
			},
			onHandleProgress() {
				let self = this;
				if(self.onProgress) {
					self.onProgress();
				}
			}
		}
	}
</script>