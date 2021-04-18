<template>
	<div>
		<el-dialog 
			:title="title" 
			:visible.sync="isShow" 
			width="500px"
			:show-close="showClose"
            :close-on-click-modal="closeOnClickModal">
            <div class="alert">
                <img :src="icon"/>
                <div id="dialog__content_alert" class="dialog-content">
                    <div class="dialog-mainContent">
                        <div v-for="(c) in content" :key="c">{{c}}</div>
                    </div>
                    <div v-if="subContent" v-text="subContent" class="subContent"></div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doSure">确 定</el-button>
            </div>
	    </el-dialog>
    </div>
</template>

<script type="text/javascript">
	export default{
		data() {
			return {
				title:"提示信息!",
                content:undefined,//"文本信息!",
                subContent:"",
                icon:`/static/eweb-base-img/${window.$rjCurrentTheme}/succ.png`,
				isShow:false,
				showClose:true,
                closeOnClickModal:true
			}
		},
		created(){
			let self = this;
			let rjAlert = function(){
                
                let subSelf = this;

                subSelf.icon = function(icon){
                	self.icon = icon ? icon : "succ.png";
                    self.icon = `/static/eweb-base-img/${self.rjTheme.current}/${self.icon}`;
                	return subSelf;
                };

                subSelf.success = function(){
                    self.icon = `/static/eweb-base-img/${self.rjTheme.current}/succ.png`;
                    return subSelf;
                };

                subSelf.warning = function(){
                    self.icon = `/static/eweb-base-img/${self.rjTheme.current}/warning.png`;
                    return subSelf;
                };

                subSelf.title = function(title){
                	self.title = title ? title : "提示信息!";
                	return subSelf;
                };

                subSelf.content = function(content){
                	content = content ? content : "文本信息!";
                    if(typeof content == "object") {
                        self.content = content;
                    }else{
                        self.content = [];
                        self.content.push(content);
                    }
                	return subSelf;
                };

                subSelf.subContent = function(subContent){
                    self.subContent = subContent ? subContent : "";
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
                	subSelf.rjAlertCallFun = callFun;
                    return subSelf;
                };

            };

            self.$parent.rjAlert = new rjAlert();
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
				self.$parent.rjAlert.close();
				if(self.$parent.rjAlert.rjAlertCallFun)
					self.$parent.rjAlert.rjAlertCallFun();
			},
			doSure(){
				let self = this;
				self.$parent.rjAlert.close();
				if(self.$parent.rjAlert.rjAlertCallFun)
					self.$parent.rjAlert.rjAlertCallFun();
			}
		}
	}
</script>
