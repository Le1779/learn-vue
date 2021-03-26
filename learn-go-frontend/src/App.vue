<template>
  <div id="header">
    <h1>Learn Go</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/auth">Auth</router-link>
    </div>
  </div>
  <router-view />
</template>

<style>
* {
  color: #383838;
}

#app {
  margin: 24px 48px;
}

#header h1{
  display: inline-block;
}

#nav {
  display: inline-block;
  margin-left: 24px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
