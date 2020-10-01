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
          <router-link to="/ask">
            <div class="ask">Ask a Helpr</div>
          </router-link>
          <router-link to="/card">
            <div class="find">Find a Helpr</div>
          </router-link>
          <img src="../assets/settings.svg" class="settings">
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
            &:hover {
              cursor: pointer;
            }

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
          padding: 4px 8px;
          background-color: #f1f1f1;
          border-radius: 8px;
        }

        .ask {
          margin-right: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background-color: #1DE9B6;
          height: 18px;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));

          &:hover {
            cursor: pointer;
            background-color: #2aeaba;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          }
        }

        .find {
          margin-right: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background-color: #F06292;
          height: 18px;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));

          &:hover {
            cursor: pointer;
            background-color: #f26e9a;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          }
        }

        .settings {
          height: 24px;
          opacity: 0.6;
          padding: 8px;
          border-radius: 50%;
          background-color: rgba(0,0,0,0.05);

          &:hover {
            background-color: rgba(0,0,0,0.075);
            cursor: pointer;
            opacity: 1;
          }
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
    }

    // Remove the underline from the router button.
    a {
      color: black;
      text-decoration: none;
    }

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;

      &:hover {
        cursor: pointer;
      }
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    }
  }
}
</style>
