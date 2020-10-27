<template>
  <div class="btn">{{ txt }}</div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    txt: String
  }
}
</script>

<style scoped lang="scss">
.btn {
  background-color: gray;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  height: 18px;
  padding: 12px 16px;

  &:hover {
   cursor: pointer;
   background-color: lightgray;
   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
 }

  &.primary {
    background-color: #90EE90;

    &:hover {
      background-color: #9aef9a;
    }
  }

  &.secondary {
    background-color: #ED91BF;

    &:hover {
      background-color: #ef9ac4;
    }
  }
}
</style>
