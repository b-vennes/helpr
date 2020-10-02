<template>
  <div class="container">
    <div class="all">
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
            <Button txt="Ask a Helpr" class="primary ask"></Button>
          </router-link>
          <router-link to="/card">
            <Button txt="Find a Helpr" class="secondary find"></Button>
          </router-link>
          <img src="../assets/settings.svg" class="settings">
        </div>
      </div>
      <div class="main">
            <div v-for="request in requests" :key="request.id">
                <div class="question">
                    <QuestionPreview
                        img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0KFFrNPMikH-rz4qzpFyms5mWnQUW_3KMDA&usqp=CAU"
                        v-bind:title="request.title"
                        v-bind:description="request.description"
                        v-bind:id="request.id"
                        tag="Forms"
                        v-on:click="this.$router.push({ name: 'Question', params: { id: request.id } })">
                    </QuestionPreview>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import RequestService from "../services/request.service.js";
import Button from '../components/Button'
import QuestionPreview from '../components/Question-preview'

const requestService = new RequestService();
export default {     
    data: function() {
        return {
            requests: [],
            error: ""
        }
    },
    components: {
        Button,
        QuestionPreview
    },
    methods: {
        async getRequests() {
            await requestService.getAllRequests()
            .then(data => {
                if (data) {
                    this.requests = data;
                }
            });
        }
    },
    async mounted(){ // like ngOnInit() lifecyclehook
        await this.getRequests();
    },
    beforeUnmount: function() { // like ngOnDestroy() lifecyclehook
        
    }
}
</script>

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

  .all {
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

        .ask, .find {
          margin-right: 12px;
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
