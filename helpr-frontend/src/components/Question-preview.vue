<template>
  <div class="question">
    <img v-bind:src="img">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="description"> {{ description }}</div>
    </div>
    <div class="right">{{ tag }}</div>
  </div>
</template>

<script>
export default {
  name: 'QuestionPreview',
  props: {
    description: String,
    img: String,
    tag: String,
    title: String
  }
}
</script>

<style scoped lang="scss">
.question {
  display: flex;
  background-color: #F1F1F1;
  padding: 16px;
  border-radius: 24px;
  align-items: center;
  margin-bottom: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.03));

  img {
    height: 80px;
    border-radius: 80px;
    margin-right: 18px;
  }

  .content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;

    .title {
      font-size: 2rem;
    }

    .description {
      font-size: 16px;
    }
  }

  .right {
    background-color: #FF7043;
    padding: 12px 18px;
    border-radius: 24px;
    margin: 0 24px 0 auto;
  }

  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
}
</style>
