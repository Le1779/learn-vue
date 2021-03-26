<template>
<h1>Learn Go</h1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/auth">Auth</router-link>
  </div>
  <router-view/>
</template>

<style>
h1 {
    color: #383838;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
