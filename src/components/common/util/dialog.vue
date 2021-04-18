<template>
	<div>
        <el-dialog 
            :id="id"
            append-to-body
            :visible.sync="isShow" 
            :style="style"
            :width="width"
            :custom-class="`el-dialog--${selfSize}`"
            :title="title" 
            :size="size"
            :show-close="showClose"
            :close-on-click-modal="closeOnClickModal"
            :before-close="beforeClose">
            <component v-bind:is="currentView"></component>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import Vue from 'vue'

	export default{
		data() {
            return {
                id:new Date().getTime(),
                title:undefined,
                isShow:false,
                currentView:undefined,
                size:"",
                selfSize: "",
                showClose:true,
                closeOnClickModal:true,
                customClass:"",
                width: "",
                style:{}
            }
        },
        created(){
            let self = this;

            let rjDialog = function(){

                let subSelf = this;

                subSelf.currentView = function(currentView, params){
                    //先移除原有组件
                    self.currentView = currentView;
                    let methods = currentView.methods;
                    methods = methods ? methods : {};
                    methods.closeRjDialog = function(opt){
                        subSelf.close();
                        if(subSelf.rjAlertCallFun){
                            subSelf.rjAlertCallFun(opt);
                        }
                    };
                    methods.rjDialogParams = function(){
                        return params;
                    };
                    currentView.methods = methods;
                    return subSelf;
                };


                subSelf.title = function(title){
                    self.title = title;
                    return subSelf;
                };

                subSelf.sizeFull = function(){
                    self.size = "full";
                    self.style = {"border-radius":"none!important"};
                    self.selfSize = self.size;
                    return subSelf;
                };

                subSelf.sizeTiny = function(){
                    self.size = "tiny";
                    self.selfSize = self.size;
                    return subSelf;
                };

                subSelf.sizeSmall = function(){
                    self.size = "small";
                    self.selfSize = self.size;
                    return subSelf;
                };

                subSelf.sizeLarge = function(){
                    self.size = "large";
                    self.selfSize = self.size;
                    return subSelf;
                };

                //命名格式要求：.el-dialog--自定义{width:100px;}， 传入参数是：xxx
                subSelf.sizeSelf = function(sizeSelf){
                    self.size = "";
                    self.selfSize = sizeSelf;
                    return subSelf;
                };

                //设置宽度
                subSelf.width = function(w) {
                    self.width = w;
                    return subSelf;
                };

                subSelf.show = function(){
                    self.isShow = true;
                    self.$nextTick(() => {
                        let dialog = document.getElementById(self.id+"");
                        let header = dialog.getElementsByClassName("el-dialog__header")[0];
                        if(header) {
                            let hStyle = header.getAttribute("style")||"";
                            if(!self.title) hStyle = "display:none; padding: 0px;";
                            else hStyle = "display:block;";
                            header.setAttribute("style", hStyle);
                        }
                    });
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
                    self.currentView = null;
                    return subSelf;
                };

                subSelf.then = function(callFun){
                    subSelf.rjAlertCallFun = callFun;
                    return subSelf;
                };
            };

            self.$parent.rjDialog = new rjDialog();
        },
        mounted: function() {
            
        },
        updated: function() {
        },
        methods: {
            beforeClose: function() {
                this.$parent.rjDialog.close();
            }
        }

	};
</script>
