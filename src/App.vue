<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Header></Header>
    <!-- <Login></Login> -->
    
    <router-view />
  </div>
</template>

<script>
import Header from "./components/home/header";
import Login from "./components/login/login";
export default {
  name: "App",
  components: {
    Header,
    Login,
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
</style>
