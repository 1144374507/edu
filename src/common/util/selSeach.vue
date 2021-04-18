<template>
	<div class="main-seach-sel">
		<input type="hidden" v-model="defKey" />
		<input type="hidden" v-model="defVal" />
		<input class="el-input__inner" 
			v-model="keyword" 
			:placeholder="tip" 
			@keyup="findByKeyUp" 
			@focus="findByFocus">
		</input>
    	<div v-if="isShow" class="form-item-bg sel-scroll" @scroll="scroll" @mousewheel="mousewheel">
    		<div v-if="seachObj.dataLs && seachObj.dataLs.length > 0" style="margin:10px 0px;">
    			<div
    				class="item" 
    				v-for="item in seachObj.dataLs" 
    				@click="doSel(item[keyName], item[valName])">
    				{{item[valName]}}
    			</div>
    		</div>
    		<div v-else class="item" style="margin:10px 0px;">
    			未找到终端信息
    		</div>
    	</div>
    	<div v-if="isShow" id="bgShadow" class="bgShadow" @click="hidSel"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ["url", "tip", "defKey", "defVal", "keyName", "valName"],
		data() {
			return {
				seachObj: {
					loading:false,
					dataLs:[],
					submitTimeObj:undefined,
					mousewheelTimeObj:undefined,
					val:undefined,
					isScroing:false,
					page:1, 
					size:20,
					pages:30
				},
				keyword:undefined,
				isShow:false,
				hasSet: false
			}
		},
		mounted: function() {
			
		},
		updated:function() {
			if(!this.hasSet) {
				this.keyword = this.defKey;
				this.seachObj.val = this.defVal;
				this.hasSet = true;
			}
		},
		methods: {
			mousewheel: function(e) {
      			let self = this;
      			window.clearTimeout(self.seachObj.mousewheelTimeObj);
      			self.seachObj.mousewheelTimeObj = window.setTimeout(function() {
      				if(self.seachObj.isScroing) return;
      				if(e.wheelDelta > 0) self.doScroll(2);
					else  self.doScroll(1);
      			}, 300);
      		},
      		scroll: function(e) {
      			this.seachObj.isScroing = true;
      			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight)) {
      				this.doScroll(1, e);
      				this.seachObj.isScroing = false;
      			} else if(e.target.scrollTop <= 0) {
      				this.doScroll(2, e);
      				this.seachObj.isScroing = false;
      			}
			},
			doScroll: function(flag, e) {
				let self = this;
				if(flag == 1) {
					if(self.seachObj.page < self.seachObj.pages) {
						self.seachObj.page++;
					}
					self.doFindTerminal();
					if(e) e.target.scrollTop -= 5;
				} else if(flag == 2) {
					if(self.seachObj.page > 1) {
						self.seachObj.page--;
					}
					self.doFindTerminal();
					if(e) e.target.scrollTop += 5;
				}
			},
			doSel: function(id, macAddress) {
				this.keyword = macAddress;
				this.seachObj.val = id;
				this.hidSel();
			},
			doFindTerminal: function() {
				let self = this;
      			let query = self.keyword;
      			window.clearTimeout(self.seachObj.submitTimeObj);
      			self.seachObj.submitTimeObj = window.setTimeout(function(){
      				let url = self.url;
					self.$axios.post(
			          	url, 
			          	{
			          		keyword: query, 
			          		seachOldVal: self.defVal,
			          		page:self.seachObj.page, 
			          		size:self.seachObj.size
			          	},
			        ).then(function(response) {
			        	let msg = response.data.message;
			        	self.seachObj.pages = msg.pages;
			        	self.seachObj.dataLs = msg.list;
			        	if(msg.total > 0) {
			        		self.isShow = true;
			        	} else {
			        		if(self.keyword) {
			        			self.isShow = true;
			        		} else {
			        			self.isShow = false;
			        		}
			        	}
			        }).catch(function(error){
			        });
      			}, 200);
			},
			findByFocus: function() {
				let self = this;
      			self.seachObj.page = 1;
      			self.doFindTerminal();
			},
      		findByKeyUp: function() {
      			let self = this;
      			self.seachObj.val = undefined;
      			self.findByFocus();
      		},
      		hidSel:function() {
      			this.isShow = false;
				this.$emit("callback", this.seachObj.val);
      		}
		}
	}
</script>

<style type="text/css">
	.main-seach-sel .sel-scroll{top:45px; position:absolute; width:100%; max-height:200px; overflow:auto; border-width:1px; border-style:solid; z-index:1111;}
	.main-seach-sel .sel-scroll .item{padding:0px 10px; margin:0px; height:25px; line-height:25px; width:100%; box-sizing: border-box;}
	.main-seach-sel .bgShadow{position:fixed; z-index:111; left:0px; top:0px; width:100%; height:100%;}
</style>