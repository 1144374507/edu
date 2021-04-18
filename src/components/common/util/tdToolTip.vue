<template>
	<div class="td-tool-tip">
		<slot name="reference"></slot>
        <el-popover placement="right" trigger="hover">
            <div :style="unOnlineRemarkStyle">{{unOnlineRemark}}</div>
            <div slot="reference" 
        		@mouseover="go2ShowRemark($event, remark)"
		        @mouseout="go2RemoveRemark">
            	<span class="isCount-un" >
			        {{val}}
			    </span>
			</div>
        </el-popover>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ["val", "remark"],
		data() {
			return {
                unOnlineRemark:undefined,
                unOnlineRemarkStyle:undefined
			}
		},
		methods: {
			go2ShowRemark: function(e, val) {
				this.unOnlineRemarkStyle = "width:" + this.strlen(val) * 14 / 2 + "px";
                this.unOnlineRemark = val;
            },
            go2RemoveRemark: function() {
                //this.unOnlineRemark = undefined;
            },
            strlen: function(str){
			    let len = 0;
			    for (let i=0; i<str.length; i++) { 
			    	let c = str.charCodeAt(i); 
			    	//单字节加1 
			     	if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
			       		len++; 
			     	} else { 
			      		len+=2; 
			     	} 
			    } 
			    return len;
			}
		}
	}
</script>

<style type="text/css" scoped>
	.td-tool-tip .isCount-un{color:red!important; text-decoration:underline; cursor:pointer;}
    .td-tool-tip .un-online-remark{left:70px; top:10px; position:absolute; z-index:11111; border-width:1px;
    border-style: solid;  padding:5px 10px; height:30px; line-height:30px; border-radius: 8px; text-align: center;}
</style>