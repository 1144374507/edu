<template>
	<div id="rjMessage">
		
	</div>
</template>

<script type="text/javascript">

	import Vue from 'vue'

	export default{
		data() {
			return {
				
			}
		},
		created(){
			let self = this;

			let rjMessage = function(){
				
				let subSelf = this;

				let bg = {
					success:'rgba(19,206,102,0.8)',
					error:'rgba(255,73,73,0.8)',
					warning:'rgba(247,186,42,0.8)',
					info:'rgba(80,191,255,0.8)'
				};

				let removeOld = function() {
					let emObjs = document.getElementsByClassName("el-message");
					for(let i=0; i<emObjs.length; i++) {
						emObjs[i].parentNode.removeChild(emObjs[i]);
					}
				};

				let setElCls = function(clsName) {
					/*let emObjs = document.getElementsByClassName("el-message");
					emObjs[0].style.top = "10px";
					emObjs[0].style.background = bg[clsName];
					emObjs[0].lastChild.firstChild.setAttribute("style", "color:#fff!important");*/
				};

                subSelf.error = function(msg){
                	removeOld();
                	self.$message.error(msg);
                	setElCls("error");
                	return subSelf;
                };

                subSelf.success = function(msg){
                	removeOld();
                	self.$message({
			        	message: msg,
			          	type: 'success'
			        });
			        setElCls("success");
                	return subSelf;
                };

                subSelf.warning = function(msg){
                	removeOld();
                	self.$message({
			        	message: msg,
			          	type: 'warning'
			        });
			        setElCls("warning");
                	return subSelf;
                };

                subSelf.info = function(msg){
                	removeOld();
                	self.$message(msg);
                	setElCls("info");
                	return subSelf;
                };

            };

            self.$parent.rjMessage = new rjMessage();
		}
	}
</script>
