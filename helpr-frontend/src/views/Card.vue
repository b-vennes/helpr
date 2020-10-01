<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <router-link to="/questions">
          <div class="back">
            <img src="../assets/left-chevron.svg">
          </div>
        </router-link>
      </div>
      <div class="main">
        Hello.
      </div>
    </div>
  </div>
</template>

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

  .content {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    .top {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 28px;

      .back {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #f1f1f1;
        border-radius: 50%;
        height: 40px;
        margin: 0 8px 8px 0;
        width: 40px;

        img {
          height: 15px;
        }

        &:hover {
          background-color: #fafafa;
          cursor: pointer;
        }
      }
    }

    .main {
      align-items: flex-start;
      background-color: rgba(#F1F1F1, 0.4);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      margin-bottom: 4px;
      padding: 12px;
    }
  }
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
