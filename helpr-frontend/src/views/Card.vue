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
        <div class="header">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0KFFrNPMikH-rz4qzpFyms5mWnQUW_3KMDA&usqp=CAU">
          <div class="points">
            304
          </div>
        </div>
        <div class="name">
          James One
        </div>
        <div class="tags">
          <div>Forms</div>
          <div>JavaScript</div>
          <div>SQL</div>
        </div>
        <div class="description">
          <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
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
      display: flex;
      flex-direction: column;

      background-color: #F1F1F1;
      background-image: url("../assets/card-background.svg");
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 40px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      height: 40rem;
      padding: 12px;
      width: 30rem;

      .header {
        margin: 24px 0 0 0;

        img {
          border-radius: 50%;
        }

        .points {
          position: absolute;
          left: 14rem;
          top: 15rem;
          background-color: #D25982;
          width: 3rem;
          border-radius: 24px;
          padding: 8px;
          margin: auto;
          font-weight: 600;
        }
      }

      .name {
        margin-top: 12px;
        font-size: 64px;
        line-height: 50px;;
        font-family: 'Patrick Hand SC', cursive;
      }

      .tags {
        display: flex;
        justify-content: center;

        div {
          margin: 12px 6px;
          background-color: #FFEE58;
          padding: 4px 8px;
          border-radius: 8px;
        }
      }

      .description {
        justify-content: center;
        align-items: center;

        div {
          margin-left: 0.7rem;
          text-align: left;
        }
      }
    }
  }
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
