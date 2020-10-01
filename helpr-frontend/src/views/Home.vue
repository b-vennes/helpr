<template>
  <div class="container">
    <div class="stuff">
      <div class="top">
        <div class="left">
          <div class="header">Open Questions</div>
          <div class="filters">
            <span class="filter active">Recommended</span> | <span class="filter">All</span>
          </div>
        </div>
        <div class="right">
          <input type="text" placeholder="Search">
          <div class="ask">Ask a Helpr</div>
          <div class="find">Find a Helpr</div>
        </div>
      </div>
      <div class="main">
        <div class="question">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0KFFrNPMikH-rz4qzpFyms5mWnQUW_3KMDA&usqp=CAU">
          <div class="content">
            <div class="title">My Title</div>
            <div class="description">Some very short description of what I need from someone.</div>
          </div>
          <div class="right">Forms</div>
        </div>
        <div class="question">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0KFFrNPMikH-rz4qzpFyms5mWnQUW_3KMDA&usqp=CAU">
          <div class="content">
            <div class="title">My Title</div>
            <div class="description">Some very short description of what I need from someone.</div>
          </div>
          <div class="right">Forms</div>
        </div>
        <div class="question">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0KFFrNPMikH-rz4qzpFyms5mWnQUW_3KMDA&usqp=CAU">
          <div class="content">
            <div class="title">My Title</div>
            <div class="description">Some very short description of what I need from someone.</div>
          </div>
          <div class="right">Forms</div>
        </div>
        <div class="question">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0KFFrNPMikH-rz4qzpFyms5mWnQUW_3KMDA&usqp=CAU">
          <div class="content">
            <div class="title">My Title</div>
            <div class="description">Some very short description of what I need from someone.</div>
          </div>
          <div class="right">Forms</div>
        </div>
      </div>
    </div>
    </div>
</template>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-direction: column;

  background-image: url("../assets/questions-background.svg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
  height: 100vh;

  .stuff {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 15%;
    min-width: 80rem;

    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 70%;
      margin: 0 0 16px 0;

      .left {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;

        .header {
          font-size: 2rem;
          line-height: 2rem;
          margin: 0 0 8px 0;
        }

        .filters {
          .filter {
            &.active {
              font-weight: 600;
              text-decoration: underline;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        input {
          align-self: flex-end;
          margin-right: 36px;
          margin-bottom: 9px;
          height: 30px;
          font-size: 18px;
          border: 0;
          outline: 0;
          background: transparent;
          border-bottom: 1px solid black;
        }

        .ask {
          margin-right: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background-color: #1DE9B6;
          height: 18px;
        }

        .find {
          margin-right: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background-color: #F06292;
          height: 18px;
        }
      }
    }

    .main {
      width: 70%;
      background-color: rgba(#F1F1F1, 0.4);
      border-radius: 36px;
      padding: 24px;
      max-height: 25rem;
      overflow: scroll;
      overflow-x: hidden;

      .question {
        display: flex;
        background-color: #F1F1F1;
        padding: 16px;
        border-radius: 24px;
        align-items: center;
        margin-bottom: 4px;

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
      }
    }

    ::-webkit-scrollbar {
      width: 0;
      background: transparent; /* make scrollbar transparent */
    }
  }
}
</style>
