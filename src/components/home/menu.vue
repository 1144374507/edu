<template>
	<div class="header-menu-wrapper">
		<el-menu popper-class="header-menu" :default-active="true" class="rj-menu" :mode="mode" :style="menuStyle" :class="{'container-menu-horizontal': (mode == 'vertical' ? false : true)}">
	      <template v-for="(m) in menuLs||[]" >
	        <el-menu-item 
	            v-if="(m.subLs.length == 0 || m.showSub4NewPage == 1) && !m.isDisabled"
	            :id="m.labelName"
	            :index="m.labelName"
              :key="m.id"
              :class="{'active': m.url && $route.path.indexOf(m.url) !== -1}"
	            @click="handleSelect(m.url, m.subLs)">
	            <i v-if="m.imgCls" :class="m.imgCls">&nbsp;</i> {{m.name}}
	        </el-menu-item>
	        <el-submenu
	            v-else-if="!m.isDisabled"
	            :index="m.labelName"
              :key="m.id"
	            :id="m.labelName">
	            <template slot="title">
	                <i v-if="m.imgCls" :class="m.imgCls">&nbsp;</i> {{m.name}}
	            </template>
	            <template v-if="m.showSub4NewPage != 3">
	            	<el-menu-item
		            	v-for="(s) in m.subLs"
		            	v-show="(s.subLs.length == 0 || s.showSub4NewPage == 1) && !s.isDisabled"
		            	:id="s.labelName"
                  :key="s.id"
			            :index="s.labelName"
		            	@click="handleSelect(s.url, s.subLs)">
			            {{s.name}}
			        </el-menu-item>
	            </template>
	            <template v-else >
	            	<MenuModule :subMenuLs="m.subLs" :handleSelect="handleSelect"></MenuModule>
	            </template>
	            <el-submenu 
	              	v-for="(s) in m.subLs"
	              	v-show="s.subLs.length > 0 && s.showSub4NewPage == 2 && !s.isDisabled"
	              	:id="s.labelName"
                  :key="s.id"
	              	:index="s.labelName">
	              <template slot="title">
	                  {{s.name}}
	              </template>
	              <el-menu-item
	                  	v-for="(ss) in s.subLs"
	                  	:id="ss.labelName"
	                  	v-show="!ss.isDisabled"
                      :key="ss.id"
	                  	:index="ss.labelName"
	            	  	@click="handleSelect(ss.url, s.subLs)">
	                  {{ss.name}}
	              </el-menu-item>
	            </el-submenu>
	        </el-submenu>
	      </template>
	    </el-menu>
      <slot name="banner4Menu"></slot>
	</div>
</template>

<script type="text/javascript">
import MenuModule from "./menuModule";
export default {
  props: ["menuLs", "mode", "menuStyle"],
  components: {
    MenuModule
  },
  data() {
    return {
      defUrl: ""
    };
  },
  watch: {
    menuLs: function() {
      // this.activeMenu();
    }
  },
  mounted() {},
  computed: {
  },
  methods: {
    // activeMenu() {
    //   if (this.$store.state.flagIsReload) {
    //     this.$store.commit(this.$storeTypes.FLAG_IS_RELOAD, false);
    //     this.$router.push({
    //       path: this.$route.path,
    //       query: { time: new Date().getTime() }
    //     });
    //   } else {
    //     if (this.menuLs.length > 0) {
    //       if (sessionStorage.defUrl) {
    //         this.$router.push(sessionStorage.defUrl);
    //       } else {
    //         let menu = this.menuLs[0];
    //         for(let k in this.menuLs){
    //           let x= this.menuLs[k];
    //           if (!x.isDisabled) {
    //             menu = x;
    //             break;
    //           }
    //         }
    //         this.$router.push(menu.url);
    //       }
    //     }
    //   }
    // },
    handleSelect(url, subs) {
      if (this.mode == "horizontal") {
        // this.$store.commit(this.$storeTypes.SUBMENU_LS, []);
      }
      sessionStorage.defUrl = "";
      if (url && subs && subs.length > 0) {
        // this.$store.commit(this.$storeTypes.SUBMENU_LS, []);
        sessionStorage.defUrl = url;
        this.$nextTick(() => {
          // this.$store.commit(this.$storeTypes.SUBMENU_LS, subs);
        });
      } else if (url) {
        this.$router.push(url);
      } else {
        // this.$store.commit(this.$storeTypes.SUBMENU_LS, []);
        this.$nextTick(() => {
          // this.$store.commit(this.$storeTypes.SUBMENU_LS, subs);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.el-menu--horizontal .el-menu--popup-bottom-start {
  margin-top: 0px !important;
}
// :class="{'active': m.url && $route.path.indexOf(m.url) !== -1}" <!-- 加载第9行和第10行中间 -->
.container-menu li.el-submenu.is-active div.el-submenu__title, .theme-00aeff .container-menu ul.el-menu > li.el-menu-item.is-active {
  border-left: none !important;
  background: none !important;
}
.header-menu-wrapper .container-menu li.el-submenu.is-active div.el-submenu__title, .theme-00aeff .container-menu ul.el-menu > li.el-menu-item.active {
  border-left: 4px solid #00aeff !important;
  background: linear-gradient(to right, rgba(0, 174, 255, 0.3), #2D587D) !important;
}
</style>
