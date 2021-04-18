<template>
	<div v-show="isShow" :id="id" class="el-loading-mask" :style="bgColor" style="z-index: 999999;">
		<div class="el-loading-spinner" style="top:35%!important;">
			<svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-clock">
                <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
                <circle cx="50" cy="50" r="30" fill="#f3fffb" stroke="#c6e6dc" stroke-width="8px"></circle>
                <line x1="50" y1="50" x2="50" y2="30" stroke="#ff3b3b" stroke-width="1" stroke-linecap="round" transform="rotate(8.39991 50 50)">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite"></animateTransform>
                </line>
                <line x1="50" y1="50" x2="50" y2="20" stroke="#ff1515" stroke-width="2" stroke-linecap="round" opacity="0" transform="rotate(41.9996 50 50)">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"></animateTransform>
                </line>
            </svg>
			<p class="el-loading-text text-primary">{{text}}</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
        props: ['denyTime'],
		data() {
			return {
                id:new Date().getTime(),
                clId:undefined,
				isShow: false,
				target:"content_root",
				width:"150px",
				height:"150px",
				text:"拼命加载中...",
				bgColor:"background-color:rgba(0, 0, 0, 0.1)!important",
                showTipTimeOut:undefined
			}
		},
        beforeCreate:function() {
            
        },
		created(){
			let self = this;

			let rjLoading = function(){
				let subSelf = this;

                let setBgColor = function() {
                    self.width = !self.width || self.width == "90px" ? "150px" : self.width;
                    self.height = !self.height || self.height == "90px" ? "150px" : self.height;
                    self.bgColor = "background-color:rgba(0, 0, 0, 0.1)!important";
                }

                let resetLoading = function(root, position, top) {
                    let doLoading = function() {
                        self.$nextTick(function () {
                            let loadingObj = document.getElementById(self.id);
                            if(!loadingObj) return;
                            let olc_cln = document.getElementById(self.clId);
                            if(olc_cln) olc_cln.parentNode.removeChild(olc_cln);
                            loadingObj.style.position = position;
                            loadingObj.style.width = "100%";
                            loadingObj.style.height = "100%";
                            loadingObj.style.top = top + "px";
                            let clId = new Date().getTime();
                            let cln = loadingObj.cloneNode(true);
                            self.clId = clId;
                            cln.setAttribute("id", clId);
                            cln.style.display = "block";
                            root.appendChild(cln);
                        });
                    }
                    window.clearTimeout(self.showTipTimeOut);
                    self.showTipTimeOut = window.setTimeout(function() {
                        doLoading();
                    }, self.denyTime || 1500);
                    
                }

                subSelf.text = function(text){
                	self.text = text;
                	return subSelf;
                };

                subSelf.target = function(target){
                	self.target = target;
                	self.target = self.target.replace("#", "");
                	return subSelf;
                };

                subSelf.bgWhite = function() {
                	setBgColor();
                	return subSelf;
                }

                subSelf.bgBlack = function() {
                	setBgColor();
                	return subSelf;
                }

                subSelf.modelFull = function(width) {
                	self.target = "body";
                	return subSelf;
                }

                subSelf.width = function(width) {
                	self.width = width;
                	return subSelf;
                }

                subSelf.height = function(height) {
                	self.height = height;
                	return subSelf;
                }

                subSelf.show = function(){
                    let content_root = document.getElementById("content_root");
                    if(!content_root) self.target = "body";
                	if(self.target == "body") {
                        let body = document.getElementsByTagName(self.target)[0];
                		body.style.position = "relative";
                        resetLoading(body, "fixed", 0);
                	}else{
                		content_root.style.position = "relative";
                        resetLoading(content_root, "absolute", 60);
                	}
                    setBgColor();        	
	                return subSelf; 
                };

                subSelf.close = function(){
                    window.clearTimeout(self.showTipTimeOut);
                    let cln = document.getElementById(self.clId);
                    if(cln) cln.parentNode.removeChild(cln);
                	return subSelf;
                };
            };
            self.$parent.rjLoading = new rjLoading();
		}
	}
</script>