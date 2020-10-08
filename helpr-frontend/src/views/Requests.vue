<template>
  <div class="requestsContainer">
    <Navbar class="navbar"></Navbar>
    <ErrorDisplay v-if="isShowError" :errorMessage="errorMessage"></ErrorDisplay>
    <div class="all">
        <div class="top">
            <div class="left">
                <div class="header">Open Requests</div>
                <div class="filters">
                    <span class="filter active">Recommended</span> | <span class="filter">All</span>
                </div>
            </div>
            <div class="right">
            <input type="text" placeholder="Search">
            
            <Button txt="Ask a Helpr" class="primary ask" @click="toggleModal()"></Button>
            
            <router-link to="/card">
                <Button txt="Find a Helpr" class="secondary find"></Button>
            </router-link>
            <img src="../assets/settings.svg" class="settings">
            </div>
        </div>
        <div class="main">
            <div v-for="request in requests" :key="request.id">
                <div class="post">
                    <div class="user">
                        <User
                            v-bind:userId="request.userId"
                            v-bind:createdDate="request.createdDate">
                        </User>
                    </div>
                    <div class="question">
                        <QuestionPreview
                            v-bind:likes="request.likes"
                            v-bind:title="request.title"
                            v-bind:description="request.description"
                            v-bind:id="request.id"
                            v-bind:userId="request.userId"
                            tag="Forms">
                        </QuestionPreview>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div class="modal" v-if="showModal">
                <AskModal></AskModal>
            </div>
        </transition>
        
            <div class="modal" v-if="showAddCommentModal">
                <AddCommentModal 
                    v-bind:userId="commentUserId"
                    v-bind:requestId="commentRequestId"
                ></AddCommentModal>
            </div>
      </div>
</template>

<script>
import RequestService from "../services/request.service.js";
import UserService from '../services/user.service.js';
import Button from '../components/Button';
import QuestionPreview from '../components/Question-preview';
import ErrorDisplay from '../components/common/Error.vue';
import User from '../components/User';
import { emitter } from '../components/common/event-bus';
import Navbar from "@/components/Navbar";
import AskModal from '../components/AskModal';
import AddCommentModal from '../components/AddCommentModal';

const requestService = new RequestService();
const userService = new UserService();

export default {     
    data: function() {
        return {
            requests: [],
            errorMessage: "",
            isShowError: false,
            showModal: false,
            showAddCommentModal: false,
            commentRequestId: 0,
            commentUserId: 0
        }
    },
    components: {
        Navbar,
        Button,
        QuestionPreview,
        ErrorDisplay,
        User,
        AskModal,
        AddCommentModal
    },
    methods: {
        async getRequests() {
            await requestService.getAllRequests()
            .then(data => {
                if (data) {
                    this.requests = data;
                } else {
                    this.showErrorMessage("Error when receiving requests");
                }
            });
        },
        async getUser(userId) {
            await userService.getUser(userId)
            .then(data => {
                if (data) {
                    return data;
                }
            })
        },
        showErrorMessageEventListener() {
            this.isShowError = false;
        },
        toggleModal() {
            this.showModal = true;
        },
        exitModal() {
            this.showModal = false;
        },
        showErrorMessage: function(message) {
            this.errorMessage = message;
            this.isShowError = true;
        },
        addCommentModal() {
            this.showAddCommentModal = true;
        },
        exitCommentModal() {
            this.showAddCommentModal = false;
        },
        async incrementsLikes(requestId) {
            let tempRequest = {}

            for (var request in this.requests) {
                if (request.requestId === requestId) {
                    tempRequest = request;
                }
            }

            const body = {
                id: requestId,
                description: tempRequest.description,
                createdDate: tempRequest.createdDate,
                points: tempRequest.points,
                likes: tempRequest.likes,
                isPublicRequest: tempRequest.isPublicRequest,
                userId: tempRequest.userId,
                isDeleted: tempRequest.isDeleted
            }

            await requestService.incrementRequestLikes(body)
            .then(data => {
                if (data) {
                    console.log("success");
                }
            });
        }
    },
    async mounted(){
        await this.getRequests();

        emitter.on('error-display-event', () => {
            this.showErrorMessageEventListener();
        });

        emitter.on('exit-ask-modal-event', () => {
            this.exitModal();
        });

        emitter.on('thumbs-up-event', requestId => {
            this.incrementsLikes(requestId);
        });
        
        emitter.on('add-comment-event', event => {
            this.commentRequestId = event.requestId;
            this.commentUserId = event.userId;
            this.addCommentModal();
        });

        emitter.on('exit-create-comment-modal-event', () => {
            this.exitCommentModal();
        });
    },
    beforeUnmount: function() {
        emitter.off('error-display-event', () => {});
        emitter.off('exit-ask-modal-event', () => {});
        emitter.off('thumbs-up-event', () => {});
        emitter.off('add-comment-event', () => {});
        emitter.off('exit-create-comment-modal-event', () => {});
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  width: 100vw;
}

.requestsContainer {
  display: flex;
  flex-direction: column;

  //background-image: url("../assets/questions-background.svg");
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
      //background-color: rgba(#F1F1F1, 0.4);
      //border-radius: 36px;
      padding: 24px;
      max-height: 25rem;
      //overflow: scroll;
      //overflow-x: hidden;
    }

    .post {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-start;

        .user {
            width: 20%;
            float: left;
        }

        .question {
            width: 95%;
            margin-bottom: 100px;
            height: 300px;
            float: right;
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

.modal {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
