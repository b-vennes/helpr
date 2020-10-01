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

        height: 40px;
        width: 40px;
        margin-bottom: 8px;
        margin-right: 8px;
        border-radius: 50%;
        background-color: #f1f1f1;

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
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      background-color: rgba(#F1F1F1, 0.4);
      padding: 12px;
      border-radius: 12px;
      margin-bottom: 4px;
    }
  }
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
