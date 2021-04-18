<template>
	<div v-if="showTools" class="svgSlider-main" :style="pointLocation">
		<div class="slider-item">
			<div class="sliderHandle lt1" @mouseover="handleDrop(3)" @mouseout="endHandleDrop"><i class="el-icon-arrow-up"></i></div>
			<div class="sliderHandle lt2" @mouseover="handleDrop(1)" @mouseout="endHandleDrop"><i class="el-icon-arrow-left"></i></div>
			<div class="sliderHandle lt3" @click="resetSvgPoint" title="复原"><i class="el-icon-minus"></i></div>
			<div class="sliderHandle lt4" @mouseover="handleDrop(2)" @mouseout="endHandleDrop"><i class="el-icon-arrow-right"></i></div>
			<div class="sliderHandle lt5" @mouseover="handleDrop(4)" @mouseout="endHandleDrop"><i class="el-icon-arrow-down"></i></div>
			<div class="elsider">
			    <el-slider
			      	v-model="slider.sliderVal"
			      	@change="sliderChg"
			      	:vertical="true"
			      	:min="slider.min"
			      	:max="slider.max"
			      	height="300px">
			    </el-slider>
		  	</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import rjTweens from '@common/js/tweens'
	export default {
		props:["svgObj", "max", "min", "left", "top", "bottom", "right", "showTools"],
		data() {
			return {
				//拖动对象
				drapObj: {
					//拖动的对象
					obj: undefined,
					//是否有被拖动
					bDrag: false,
					//横坐标拖动距离
					disX: 0,
					//纵坐标拖动距离
		     		disY: 0,
		     		//拖动时间标识
		     		timeObj:undefined
				},
				//地图放大倍数
				slider: {
					sliderVal:100,
					min: 50,
					max: 500
				},
				//位置
				pointLocation: undefined
			}
		},
		mounted: function() {
			//绑定窗口拖动、滚轮
			if(this.svgObj) {
				this.bindDrop();
				this.bindMousWheel();
			}
			this.slider.max = this.max ? this.max : this.slider.max;
			this.slider.min = this.min ? this.min : this.slider.min;
			this.setSliderPoint();
			this.sliderChg(this.slider.sliderVal, true);
		},
		methods: {
			//设置滑块位置
			setSliderPoint: function() {
				let pointLocationStr = "";
				if(this.left != undefined) pointLocationStr += "left:" + this.left + "px;";
				if(this.top != undefined) pointLocationStr += "top:" + this.top + "px;";
				if(this.bottom != undefined) pointLocationStr += "bottom:" + this.bottom + "px;";
				if(this.right != undefined) pointLocationStr += "right:" + this.right + "px;";
				if(!pointLocationStr) pointLocationStr = "top:50px;";
				this.pointLocation = pointLocationStr;
			},
			//手动控制偏移
			handleDrop: function(flag) {
				let self = this;
				let moveSvg = function() {
					let oldl = self.svgObj.getAttribute("oldl");
					let oldt = self.svgObj.getAttribute("oldt");
					oldl = oldl ? parseFloat(oldl) : 0;
					oldt = oldt ? parseFloat(oldt) : 0;
					let step = 3;
					switch(flag) {
						case 1 : 
							oldl -= step;
							break;
						case 2 :
							oldl += step;
							break;
						case 3 : 
							oldt -= step;
							break;
						case 4 :
							oldt += step;
							break;
					}
					self.svgObj.setAttribute("oldl", oldl);
		          	self.svgObj.setAttribute("oldt", oldt);
	          		self.svgObj.setAttribute("transform", "translate(" + oldl + " " + oldt + ")");
				}
				self.drapObj.timeObj = window.setInterval(function(){
					moveSvg(flag);
				}, 10);
				
			},
			//结束手动控制偏移
			endHandleDrop: function() {
				let self = this;
				window.clearInterval(self.drapObj.timeObj);
			},
			//修改滑块大小
			sliderChg: function(val, isInit, isEnlarge) {
				let self = this;
				let clH = self.svgObj.parentNode.clientHeight;
				let clW = self.svgObj.parentNode.clientWidth;
				//改成不管图片大小多大，默认兼容外围大小
				let w = clW;
				let h = clH;
				//上次svg宽高
				let lastW = self.svgObj.getAttribute("width");
				let lastH = self.svgObj.getAttribute("height");
				//设置原始宽高，以及目前缩放成的宽高
				self.svgObj.setAttribute("oldw", w);
				self.svgObj.setAttribute("oldh", h);
				self.svgObj.setAttribute("width", w * val/100);
				self.svgObj.setAttribute("height", h * val/100);
				//取得最新宽高
				let svgW = self.svgObj.getAttribute("width");
				let svgH = self.svgObj.getAttribute("height");
				//取得上次偏移量
				let lastOldl = self.svgObj.getAttribute("oldl");
				let lastOldt = self.svgObj.getAttribute("oldt");
				//默认偏移量居中
				let oldl = (clW - svgW) / 2;
				let oldt = (clH - svgH) / 2;
				if(!isInit) {
					//如果不是首次初始化、按最近一次的缩放大小改变便宜
					if(val/100 >= 1) {
						//放大
						oldl = (lastW - svgW) / 2 + parseInt(lastOldl);
						oldt = (lastH - svgH) / 2 + parseInt(lastOldt);
					} else {
						//缩小
						oldl = (lastW - svgW) / 2 + parseInt(lastOldl);
						oldt = (lastH - svgH) / 2 + parseInt(lastOldt);
					}
				}
				//重新设置偏移量
				self.svgObj.setAttribute("oldl", oldl);
				self.svgObj.setAttribute("oldt", oldt);
	      		self.svgObj.setAttribute("transform", "translate("+oldl+" "+oldt+")");
				//回调缩放比例
				self.sliderCallBack(val/100, isEnlarge);
				//回写缩放比例
				self.$emit("callSliderVal", val/100);
			},
			//绑定可拖动节点
			bindDrop: function() {
				let self = this;
		     	let o = self.svgObj;
		     	o.onmousedown = function (event){
		          	self.drapObj.bDrag = true;
		          	self.drapObj.obj = this;
		          	let oldl = self.svgObj.getAttribute("oldl");
					let oldt = self.svgObj.getAttribute("oldt");
					oldl = oldl ? oldl : 0;
					oldt = oldt ? oldt : 0;
		          	self.drapObj.disX = event.clientX - oldl;
		          	self.drapObj.disY = event.clientY - oldt;  
		          	return false
		     	};
				o.onmousemove = function (event){
	          		if (!self.drapObj.bDrag || !self.drapObj.obj) return;
	          		let iL = event.clientX - self.drapObj.disX;
	          		let iT = event.clientY - self.drapObj.disY;
		          	//移动指定的对象
		          	self.drapObj.obj.setAttribute("oldl", iL);
		          	self.drapObj.obj.setAttribute("oldt", iT);
	          		self.drapObj.obj.setAttribute("transform", "translate(" + iL + " " + iT + ")");
	          		return false
	         	};
			 	o.onmouseup = function (){
		      		self.drapObj.bDrag = false;    
		     	};
			},
			//绑定鼠标滚轮事件
			bindMousWheel: function() {
				let self = this;
		     	let o = self.svgObj;
		     	let timeObj = undefined;
		     	let scrollFunc = function(event) {
		     		window.clearTimeout(timeObj);
		     		timeObj = window.setTimeout(() => {
		     			let scrollVal = event.wheelDelta || event.detail;
						self.slider.sliderVal += (scrollVal % 100);
						if(self.slider.sliderVal >= self.slider.max)
							self.slider.sliderVal = self.slider.max;
						if(self.slider.sliderVal <= self.slider.min)
							self.slider.sliderVal = self.slider.min;
						self.sliderChg(self.slider.sliderVal, false, scrollVal>0);
		     		}, 10);
		     	}
		     	let mousewheel = "mousewheel";
		     	let userAgent = navigator.userAgent;
				if (userAgent.indexOf("Firefox") > -1) { /**firefox**/ 
			         mousewheel = "DOMMouseScroll";
			    } 
				o.addEventListener(mousewheel, scrollFunc, false); 
			},
			//重置svg位置
			resetSvgPoint: function() {
				let self = this;
				let iL = 0, iT = 0;
				self.svgObj.setAttribute("oldl", iL);
	          	self.svgObj.setAttribute("oldt", iT);
          		self.svgObj.setAttribute("transform", "translate(" + iL + " " + iT + ")");
          		self.slider.sliderVal = 100;
			},
			//缩放回调
            sliderCallBack: function(val, isEnlarge) {
            	let self = this;
            	let viewBoxRate = self.svgObj.getAttribute("viewBoxRate");
            	viewBoxRate = JSON.parse(viewBoxRate);
            	let resetImgSize = function(img, proportion, index) {
            		let flagsize = img.getAttribute("flagsize");
            		let width = img.getAttribute("width");
            		let height = img.getAttribute("height");
            		let x = img.getAttribute("x");
            		let y = img.getAttribute("y");
            		if(flagsize) {
            			width = img.getAttribute("init_width");
            			height = img.getAttribute("init_height");
            			x = img.getAttribute("init_x");
            			y = img.getAttribute("init_y");
            		} else {
            			img.setAttribute("init_width", width);
            			img.setAttribute("init_height", height);
            			img.setAttribute("init_x", x);
            			img.setAttribute("init_y", y);
            			img.setAttribute("flagsize", "true");
            		}
            		if(index == 1) {
            			img.setAttribute("x", x/proportion);
            			img.setAttribute("y", y/proportion);
            		}
            		img.setAttribute("width", width/proportion);
            		img.setAttribute("height", height/proportion);
            	}
            	let imgs_g = self.svgObj.getElementsByClassName("svg_eqimentImg");
            	for(let i=0; i<imgs_g.length; i++) {
            		let imgs = imgs_g[i].childNodes;
            		resetImgSize(imgs[0], val, 0);
            		resetImgSize(imgs[1], val, 1);
            	}
            	let textObjs = self.svgObj.querySelectorAll("text[name='room-tip-num']");
            	for(let i=0; i<textObjs.length; i++) {
					let initFontSize = textObjs[i].getAttribute("init_size");
            		if(!initFontSize) {
            			initFontSize = 10 * viewBoxRate.rate;
            			textObjs[i].setAttribute("init_size", initFontSize);
            		}
            		initFontSize = initFontSize / val;
            		let style = textObjs[i].style;
            		if(style) {
            			textObjs[i].style.fontSize = initFontSize + "px";
            		} else {
            			textObjs[i].setAttribute("style", "font-size:" + initFontSize + "px");
            		}
            	}
			}
		}
	}
</script>

<style type="text/css">
	.svgSlider-main{position:fixed; z-index: 1111;}
	.svgSlider-main .slider-item{position:relative; clear:both; float:left;}
	.svgSlider-main .slider-item .sliderHandle{float:left;background:#12c2ab!important; padding:2px; cursor:pointer;}
	.svgSlider-main .slider-item .sliderHandle.lt1{float:left; margin:10px 0px 0px 48px;}
	.svgSlider-main .slider-item .sliderHandle.lt2{clear:both; float:left; margin:20px 0px 0px 10px;}
	.svgSlider-main .slider-item .sliderHandle.lt3{float:left; margin:20px 0px 0px 20px;}
	.svgSlider-main .slider-item .sliderHandle.lt4{float:left; margin:20px 0px 0px 20px;}
	.svgSlider-main .slider-item .sliderHandle.lt5{clear:both; float:left; margin:20px 0px 0px 48px;}
	.svgSlider-main .slider-item .sliderHandle i{color:#fff!important;}
	.svgSlider-main .slider-item .elsider{clear:both; float:left; margin:10px 0px 0px 38px;}
	.svgSlider-main .slider-item .elsider .el-slider__bar{z-index:111; background: #12c2ab!important;}
	.svgSlider-main .slider-item .elsider .el-slider__button{background: #12c2ab!important;}
	
</style>