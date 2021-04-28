<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import scroll from "./common/scroll";
import Header from "./components/home/header";
import Login from "./components/login/login";
export default {
  name: "App",
  components: {
    Header,
    Login,
    scroll,
  },

  computed: {
    height() {
      return this.$getViewportSize().height;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
* {
  margin: 0;
  padding: 0;
}

/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background-color: #5b5c5e;
  border-radius: 3px;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 4px;
  height: 3px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #93a6e2;
  border-radius: 5px;
}
</style>
