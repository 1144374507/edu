<template>
	<div>
		<el-dialog 
			:title="title" 
			:visible.sync="isShow" 
			:show-close="showClose"
            :close-on-click-modal="closeOnClickModal" 
			width="500px">
	        <div class="alert">
                <img :src="icon"/>
                <div v-text="content" id="dialog__content_alert" class=" dialog-content dialog-mainContent"></div>
            </div>
	        <div slot="footer" class="dialog-footer">
	            <el-button @click="doCancelDel">取 消</el-button>
	            <el-button type="primary" @click="doSure">确 定</el-button>
	        </div>
	    </el-dialog>
    </div>
</template>

<script type="text/javascript">
	export default{
		props:["id"],
		data() {
			return {
				title:"提示信息!",
                content:"文本信息!",
                icon:`/static/eweb-base-img/${window.$rjCurrentTheme}/confirm.png`,
				isShow:false,
				showClose:true,
                closeOnClickModal:true
			}
		},
		created(){
			let self = this;
			let rjConfirm = function(){
				let subSelf = this;

                subSelf.icon = function(icon){
                	self.icon = icon ? icon : "succ.png";
                    self.icon = `/static/eweb-base-img/${self.rjTheme.current}/${self.icon}`;
                	return subSelf;
                };

                subSelf.title = function(title){
                	self.title = title ? title : "提示信息!";
                	return subSelf;
                };

                subSelf.content = function(content){
                	self.content = content ? content : "文本信息!";
                	return subSelf;
                };

                subSelf.show = function(){
                	self.isShow = true;
                	return subSelf;
                };

                subSelf.showClose = function(flag){
                    self.showClose = flag;
                    return subSelf;
                };

                subSelf.closeOnClickModal = function(flag){
                    self.closeOnClickModal = flag;
                    return subSelf;
                };

                subSelf.close = function(){
                	self.isShow = false;
                	return subSelf;
                };

                subSelf.then = function(callFun){
	            	this.rjConfirmCallFun = callFun;
	            	return subSelf;
	            };

                return this;
            };

            self.$parent.rjConfirm = new rjConfirm();

		},
		updated: function(){
			this.checkIsMgTop();
		},
		methods:{
			checkIsMgTop: function() {
				let alertObj = document.getElementById("dialog__content_alert");
				let offsetHeight = alertObj.offsetHeight;
				if(offsetHeight > 30) {
					alertObj.style.marginTop = 0 + "px";
				}
			},
			doCancelDel(){
				let self = this;
				self.$parent.rjConfirm.close();
				if(self.$parent.rjConfirm.rjConfirmCallFun){
					self.$parent.rjConfirm.rjConfirmCallFun(false);
				}
			},
			doSure(){
				let self = this;
				self.$parent.rjConfirm.close();
				if(self.$parent.rjConfirm.rjConfirmCallFun){
					self.$parent.rjConfirm.rjConfirmCallFun(true);
				}
			}
		}
	}
</script>
