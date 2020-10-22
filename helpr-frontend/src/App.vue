<template>
  <router-view/>
</template>

<style>
/* Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&family=Roboto&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

body, html {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #228B22;
}

::-webkit-scrollbar-thumb {
    background: #90EE90;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
