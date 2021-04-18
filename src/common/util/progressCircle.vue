<template>
	<div class="el-progress el-progress--circle">
        <div class="el-progress-circle" :style="circleStyle">
            <svg viewBox="0 0 100 100">
                <defs>
                    <!-- <filter id="f1" x="0" y="0">
                        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0">
                            <animate attributeName="stdDeviation" attributeType="XML"
                                     from="0" to="1"
                                     begin="0s" dur="5s" fill="freeze" repeatCount="indefinite"/>
                        </feGaussianBlur>
                    </filter> -->
                    <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="20%" style="stop-color:#70e1d1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#fff;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="20%" style="stop-color:#7ca3e4;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#fff;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="20%" style="stop-color:#ffb47f;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#fff;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="gradient-default" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="20%" style="stop-color:#e5e9f2;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#fff;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path 
                    d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" 
                    :stroke="defLineStroke" 
                    :stroke-width="defStrokeWidth" 
                    fill="none" >
                </path>

                <path 
                    d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" 
                    stroke-linecap="round" 
                    :stroke="hightLineStroke" 
                    :stroke-width="hightLineStrokeWidth" 
                    fill="none" 
                    :style="hightLineStyle">
                    <!-- <animate attributeName="stroke-dashoffset" attributeType="CSS"
                       from="299.08" to="0"
                       begin="0s" dur="35s" fill="freeze" repeatCount="indefinite"/> -->
                    <!-- <animate attributeName="stroke-width" attributeType="CSS"
                       :from="defStrokeWidth" to="3"
                       begin="0s" dur="5s" fill="freeze" repeatCount="indefinite"/> -->
                </path>
            </svg>
        </div>
        <div class="el-progress__text" style="font-size: 16px;">
            <div v-if="isRate"><span :style="titleTipStyle">{{titleTip}}</span>{{symbol}}</div>
            <div v-else><span :style="titleTipStyle">{{titleTip}}</span>{{symbol}}</div>
            <div :style="subTitleTipStyle" class="progress-detail">
                {{subTitleTip}}
                <slot name="progress-detail"></slot>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import rjTweens from '@common/js/tweens'

	export default{
        props: ["width", "height", "defLineColor", "hightLineColor", "defLineWidth", "hightLineWidth", "rate", "rateStyle", "rateSymbol", "tip", "tipStyle", "theme", "linearGradient", "isAnimate"],
		data() {
			return {
                circleStyle: {
                    width: '156px',
                    height: '156px'
                },
                defLineStroke: '#e5e9f2',
                hightLineStroke: '#13ce66',
                defStrokeWidth: 4.8,
                hightLineStrokeWidth: 4.8,
                titleTip: '', //占比说明
                titleTipStyle: {
                },
                subTitleTip: '', //占比值
                subTitleTipStyle: {
                    "margin-top": '10px'
                },
                hightLineStyle: {
                    "stroke-dasharray": '299.08px, 299.08px',
                    "transition": 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
                    "stroke-dashoffset":299.08
                },
                effect: undefined,
                effectPre: 'el-progress-tip-threme-',
                thremeCls: undefined,
                thremeClsPre: 'threme-', 
                gradient: 'gradient-',
                symbol: '%',
                isRate: true,
                animateTime: undefined
			}
		},
        beforeCreate:function() {
            
        },
		created(){
			
		},
        mounted() {
            let self = this;
            self.init();
        },
        updated() {
            let self = this;
        },
        watch: {
            rate: 'init',
            theme: 'init'
        },
        methods: {
            init() {
                let self = this;
                let themeTmp = self.theme || "green";
                if(self.width) self.circleStyle.width = self.width;
                if(self.height) self.circleStyle.height =self.height;
                if(self.defLineColor) self.defLineStroke = self.defLineColor;
                if(self.hightLineColor) self.hightLineStroke = self.hightLineColor;
                if(self.linearGradient) self.hightLineStroke = 'url(#' + self.gradient + themeTmp + ')';
                if(self.defLineWidth) self.defStrokeWidth = self.defLineWidth;
                if(self.hightLineWidth) self.hightLineStrokeWidth = self.hightLineWidth;
                if(self.rateStyle) self.titleTipStyle = self.rateStyle;
                if(self.tip) self.subTitleTip = self.tip;
                if(self.tipStyle) self.subTitleTipStyle = self.tipStyle;
                if(self.rateSymbol != undefined) self.symbol = self.rateSymbol;
                self.thremeCls = self.thremeClsPre + themeTmp;
                self.effect = self.effectPre + themeTmp;
                self.setRate();
                self.setAnimate();
            },
            setRate() {
                let self = this;
                if(self.rate == undefined) return;
                self.titleTip = self.rate;
                if(self.rateSymbol != undefined) {
                    self.hightLineStyle["stroke-dashoffset"] = "0px"
                } else {
                    self.hightLineStyle["stroke-dashoffset"] = (299.08 - self.rate * 299.08 / 100) + "px"
                }
            },
            setAnimate() {
                let self = this;
                if(!self.isAnimate) return;
                let animate = () => {
                    self.hightLineStyle["stroke-dashoffset"] = 0 + "px";
                    window.clearTimeout(self.animateTime);
                    self.animateTime = window.setTimeout(() => {
                        self.hightLineStyle["stroke-dashoffset"] = 299.08 + "px";
                        window.setTimeout(() => {
                            animate(); 
                        }, 800);
                    }, 2000);
                }
                animate();
            }
        }
	}
</script>

<style lang="scss">
    .el-progress--circle .threme-yellow.el-tooltip{font-size:12px!important;background: #ffb47f; border-radius: 50px 50px; padding:0px 5px;}
    .el-tooltip__popper.is-el-progress-tip-threme-yellow{background: #fff; border: 1px solid #ffb47f;  max-width:200px; line-height: 20px;}
    .el-tooltip__popper.is-el-progress-tip-threme-yellow .popper__arrow, 
    .el-tooltip__popper.is-el-progress-tip-threme-yellow .popper__arrow::after{
        position: absolute; 
        width: 0; 
        height: 0; 
        border-top: 0px solid #ffb47f;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #ffb47f;
    }

    .el-progress--circle .threme-default.el-tooltip{font-size:12px!important; color:#fff!important; background: #e5e9f2; border-radius: 50px 50px; padding:0px 5px;}
    .el-tooltip__popper.is-el-progress-tip-threme-default{background: #fff; border: 1px solid #e5e9f2;  max-width:200px; line-height: 20px;}
    .el-tooltip__popper.is-el-progress-tip-threme-default .popper__arrow, 
    .el-tooltip__popper.is-el-progress-tip-threme-default .popper__arrow::after{
        position: absolute; 
        width: 0; 
        height: 0; 
        border-top: 0px solid #e5e9f2;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #e5e9f2;
    }

    .el-progress--circle .threme-green.el-tooltip{font-size:12px!important; color:#fff!important; background: #12c2ab; border-radius: 50px 50px; padding:0px 5px; font-weight: bold; cursor: pointer;}
    .el-tooltip__popper.is-el-progress-tip-threme-green{background: #fff; border: 1px solid #12c2ab;  max-width:200px; line-height: 20px;}
    .el-tooltip__popper.is-el-progress-tip-threme-green .popper__arrow, 
    .el-tooltip__popper.is-el-progress-tip-threme-green .popper__arrow::after{
        position: absolute; 
        width: 0; 
        height: 0; 
        border-top: 0px solid #12c2ab;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #12c2ab;
    }

    .el-progress .progress-detail span.tip{font-size:12px!important; border-radius: 50px 50px; padding:0px 5px; font-weight: bold;}
    .el-progress-popover-tip .note{
        margin-top:5px;
    }
    .el-progress-popover-tip .example{
        margin-top:5px;
    }
    .el-progress-popover-tip {
        background: #fff; border: 1px solid #12c2ab; line-height: 20px;
    }
</style>