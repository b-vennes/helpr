<template>
  <div class="container">
    Hello, {{ id }}.
  </div>
</template>

<script>

export default {
  props: {
    id: Number
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background-image: url("../assets/questions-background.svg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
  height: 100vh;
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
