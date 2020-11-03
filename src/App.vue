<template>
  <div class="main-app">
    <h1>Folder Copy App</h1>
    <copier-app />
  </div>
</template>

<script>
import copierApp from "./components/copier-app.vue";
export default {
  name: "App",
  components: {
    copierApp,
  },
};
</script>

<style>
.main-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
