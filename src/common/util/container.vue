<template>
	<div class="rj_container">
    <div style="clear:both;"></div>
		<input type="hidden" v-model="monitor_win_size" />
		<div class="rj_container_deny_un_content" :id="denyUnContentId" v-if="showUnContent">
			<slot name="deny_un_content"></slot>
		</div>
		<div class="module_top_content">
			<div class="rj_container_top" v-if="showTop" :id="topId">
				<slot name="top"></slot>
			</div>
			<div class="rj_container_top_expend" v-if="showTopExpend" :id="topExpId">
				<slot name="top_exp"></slot>
			</div>
			<div class="rj_container_form search-box " v-if="showForm" :id="formId">
				<slot name="seachForm"></slot>
			</div>
		</div>
		<div class="rj_container_content content-box" :id="contentId" v-if="showContent" :style="contentStyle">
			<slot name="content"></slot>
		</div>
		<div class="rj_container_content_unDataTip" :style="upDataTipStyle" v-else>
			<img class="tipImg" :src="`/static/eweb-base-img/${rjTheme.current}/unEq.png`" />
			<slot name="unDataTip">
				<div>哦、哦, 你访问的数据不存在!</div>
			</slot>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
  props: ["showTip", "initContentH"],
  data() {
    return {
      topId: new Date().getTime() + "_top",
      formId: new Date().getTime() + "_from",
      topExpId: new Date().getTime() + "_top_exp",
      contentId: new Date().getTime() + "_content",
      denyUnContentId: new Date().getTime() + "_un_content",
      showForm: true,
      showTopExpend: true,
      showTop: true,
      showContent: true,
      showUnContent: true,
      upDataTipStyle: {},
      contentStyle: {}
    };
  },
  mounted() {
    this.upRjPage();
    this.isShowModule();
    this.initStyle();
  },
  watch: {
    showTip: "showUnDataTip"
  },
  methods: {
    //显示无数据提示
    showUnDataTip() {
      if (this.showTip) this.showContent = false;
      else this.showContent = true;
    },
    //是否显示指定模块
    isShowModule() {
      if (this.$slots["seachForm"]) this.showForm = true;
      else this.showForm = false;
      if (this.$slots["top"]) this.showTop = true;
      else this.showTop = false;
      if (this.$slots["top_exp"]) this.showTopExpend = true;
      else this.showTopExpend = false;
      if (this.$slots["content"] && !this.showTip) this.showContent = true;
      else this.showContent = false;
      if (this.$slots["deny_un_content"]) this.showUnContent = true;
      else this.showUnContent = false;
    },
    //把分页向父层传一层
    upRjPage() {
      this.$parent.rjPage = this.rjPage;
    },
    //初始化样式
    initStyle() {
      let self = this;
      let hTmp = 0,
        formObj = document.getElementById(self.formId),
        topObj = document.getElementById(self.topId),
        topExpObj = document.getElementById(self.topExpId),
        denyUnContentObj = document.getElementById(self.denyUnContentId);
      if (this.$slots["seachForm"] && formObj) {
        hTmp = formObj.offsetHeight;
        hTmp += 10;
      }
      if (this.$slots["top"] && topObj) {
        hTmp += topObj.offsetHeight;
        hTmp += 20;
      }
      if (this.$slots["top_exp"] && topExpObj) {
        hTmp += topExpObj.offsetHeight;
        hTmp += 20;
      }
      if (this.$slots["deny_un_content"] && denyUnContentObj) {
        hTmp += denyUnContentObj.offsetHeight;
        hTmp += 20;
      }
      let mainContentH = this.$store.state.content_height();
      let mainContentW = this.$store.state.content_width();
      if (self.initContentH) mainContentH = self.initContentH - 20;
      let contentH = mainContentH - hTmp - 58;
      let contentW = mainContentW;
      this.contentStyle["min-height"] = contentH + "px";
      this.upDataTipStyle["min-height"] = contentH + "px";
      let tipPadding = (contentH - 71) / 2;
      this.upDataTipStyle["padding"] =
        tipPadding + "px 0px " + tipPadding + "px 0px";
      this.$nextTick(() => {
        self.$emit("onWinResize", { h: contentH, w: contentW });
      });
    }
  },
  computed: {
    monitor_win_size: function() {
      this.initStyle();
      return this.$store.state.monitor_win_size;
    }
  }
};
</script>
