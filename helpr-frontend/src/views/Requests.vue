<template>
  <div class="requestsContainer">
    <Navbar class="navbar"></Navbar>
    <ErrorDisplay v-if="isShowError" :errorMessage="errorMessage"></ErrorDisplay>
    <div class="all">
        <div class="top">
            <div class="left">
                <div class="header">
                    <div class="headerText">Open Requests</div>
                    <div class="closedRequestSwitch">
                        <label class="switch">
                            <input type="checkbox" v-model="isShowClosedRequests" @click="closedRequestsClicked()">
                            <span class="slider round"></span>
                        </label>
                        <div class="closedRequestText">
                            <div v-if="!isShowClosedRequests">
                                Show Only Open Requests
                            </div>
                            <div v-else>
                                Show Closed Requests
                            </div>
                        </div>
                    </div>
                </div>
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
                        <div class="messageUserIcon" v-if="request.userId != loggedInUserId">
                            <img @click="messageUser()" src="https://img.icons8.com/fluent-systems-filled/24/000000/chat-message.png"/>
                        </div>
                        <div class="thumbsIcon" v-if="request.userId != loggedInUserId">
                            <img @click="incrementsLikes(request.id)" src="https://img.icons8.com/android/24/000000/thumb-up.png"/>
                        </div>
                        <div class="thumbsIconLoggedIn" v-if="request.userId == loggedInUserId">
                            <img @click="incrementsLikes(request.id)" src="https://img.icons8.com/android/24/000000/thumb-up.png"/>
                        </div>
                    </div>
                    <div class="question">
                        <QuestionPreview
                            v-bind:likes="request.likes"
                            v-bind:points="request.points"
                            v-bind:title="request.title"
                            v-bind:description="request.description"
                            v-bind:id="request.id"
                            v-bind:userId="request.userId"
                            v-bind:isClosed="request.isDeleted"
                            tag="Forms">
                        </QuestionPreview>
                    </div>
                </div>
                    <div class="comments" v-if="request.isShowComment">
                        <Comments
                            v-bind:requestId="request.id"
                            :key="commentComponentKey">
                        </Comments>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="modal" v-if="showModal">
                <AskModal></AskModal>
            </div>
        </transition>
        
        <div class="modal" v-if="showAddCommentModal">
            <AddCommentModal 
                v-bind:requestId="commentRequestId"
            ></AddCommentModal>
        </div>

        <transition name="fade">
            <div class="transferPointsCard" v-if="showTransferPointsComponent">
                <TransferPoints 
                    v-bind:points="selectedRequestToTransferPoints.points"
                    v-bind:requestId="selectedRequestToTransferPoints.id"
                ></TransferPoints>
            </div>
        </transition>
    </div>
</template>

<script>
import RequestService from "../services/request.service.js";
import UserService from '../services/user.service.js';
import LoggerService from '../services/logger.service.js';
import Button from '../components/Button';
import QuestionPreview from '../components/Question-preview';
import ErrorDisplay from '../components/common/Error.vue';
import User from '../components/User';
import Navbar from "@/components/Navbar";
import AskModal from '../components/AskModal';
import AddCommentModal from '../components/AddCommentModal';
import TransferPoints from '../components/TransferPoints';
import Comments from '../components/Comments';
import { emitter } from '../components/common/event-bus';

const requestService = new RequestService();
const userService = new UserService();
const loggerService = new LoggerService();

export default {     
    data: function() {
        return {
            requests: [],
            initialRequests: [],
            selectedRequestToTransferPoints: {},
            errorMessage: "",
            isShowError: false,
            showModal: false,
            showAddCommentModal: false,
            commentRequestId: 0,
            commentUserId: 0,
            commentComponentKey: 0,
            loggedInUserId: 0,
            showTransferPointsComponent: false,
            isHoverUserEvent: false,
            hoverUserEventInfo: {},
            isShowClosedRequests: true
        }
    },
    components: {
        Navbar,
        Button,
        QuestionPreview,
        ErrorDisplay,
        User,
        AskModal,
        AddCommentModal,
        Comments,
        TransferPoints
    },
    methods: {
        async getRequests() {
            await requestService.getAllRequests()
            .then(response => {
                if (response.status === 200) {
                    this.initialRequests = response.data;

                    for (var initialRequest of this.initialRequests) {
                        initialRequest.isShowComment = false;
                    }

                    for (var request of response.data) {
                        if (!request.isDeleted) {
                            request.isShowComment = false;
                            this.requests.push(request);
                        }
                    }
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Requests/getRequests()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });
        },
        async getUser(userId) {
            await userService.getUser(userId)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Comments/getUsersForComments()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
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
            .then(response => {
                if (response.status === 200) {
                    const log = {
                        success: true,
                        message: "Successfully created a Helpr Like in Requests/incrementsLikes()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);

                    emitter.emit('add-to-thumbsup-amount');
                } else {
                    const log = {
                        success: false,
                        message: "Could not create a Helpr Like in Requests/incrementsLikes()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });
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

            this.forceRerender();
        },
        showCommentsEvent(event) {
            for (var request of this.requests) {
                if (request.id === event.id) {
                    if (event.isShowComment) {
                        request.isShowComment = true;
                    } else {
                        request.isShowComment = false;
                    }
                }
            }
        },
        forceRerender() {
            this.commentComponentKey += 1;
        },
        messageUser() {
            console.log("sup");
        },
        showTransferPointsEvent(event) {
            this.selectedRequestToTransferPoints = event;
            this.showTransferPointsComponent = true;
        },
        exitTransferPointsEvent() {
            this.selectedRequestToTransferPoints = {};
            this.showTransferPointsComponent = false;
        },
        closedRequestsClicked() {
            if (this.isShowClosedRequests) {
                this.requests = [];
                this.requests = this.initialRequests;
            } else {
                this.requests = [];
                for (var request of this.initialRequests) {
                    if (!request.isDeleted) {
                        request.isShowComment = false;
                        this.requests.push(request);
                    }
                }
            }
        }
    },
    async mounted() {
        this.loggedInUserId = localStorage.getItem('userId');

        await this.getRequests();

        emitter.on('error-display-event', () => {
            this.showErrorMessageEventListener();
        });

        emitter.on('exit-ask-modal-event', () => {
            this.getRequests();
            this.exitModal();
        });
        
        emitter.on('add-comment-event', event => {
            this.commentRequestId = event.requestId;
            this.commentUserId = event.userId;
            this.addCommentModal();
        });

        emitter.on('exit-create-comment-modal-event', () => {
            this.exitCommentModal();
        });

        emitter.on('show-comments-event', event => {
            this.showCommentsEvent(event);
        });

        emitter.on('transfer-points-event', event => {
            this.showTransferPointsEvent(event);
        });

        emitter.on('exit-transfer-points-event', () => {
            this.exitTransferPointsEvent();
        });
    },
    beforeUnmount: function() {
        emitter.off('error-display-event', () => {});
        emitter.off('exit-ask-modal-event', () => {});
        emitter.off('add-comment-event', () => {});
        emitter.off('exit-create-comment-modal-event', () => {});
        emitter.off('show-comments-event', () => {});
        emitter.off('transfer-points-event', () => {});
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
                    display: flex;
                    flex-direction: row;

                    .headerText {
                        font-size: 2rem;
                        line-height: 2rem;
                        margin: 0 0 8px 0;
                    }

                    .closedRequestSwitch {
                        position: relative;
                        top: 7px;
                        left: 15px;
                        display: flex;
                        flex-direction: row;

                        .switch {
                        }

                        .closedRequestText {
                            position: relative;
                            top: 3px;
                            left: 5px;
                        }
                    }
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
            padding: 24px;
            max-height: 25rem;
        
            .post {
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                align-items: flex-start;

                .user {
                    width: 30%;

                    .messageUserIcon {
                        position: relative;
                        left: 270px;
                        top: 10px;
                        background-color: #f1f1f1;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        
                        img {
                            position: relative;
                            top: 9px;
                            left: 1px;
                            height: 20px;
                        }

                        &:hover {
                            background-color: #fafafa;
                            cursor: pointer;
                        }
                    }

                    .thumbsIcon {
                        position: relative;
                        left: 225px;
                        top: -30px;
                        background-color: #f1f1f1;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        
                        img {
                            position: relative;
                            top: 10px;
                            left: 1px;
                            height: 20px;
                        }

                        &:hover {
                            background-color: #fafafa;
                            cursor: pointer;
                        }
                    }

                    .thumbsIconLoggedIn {
                        position: relative;
                        left: 273px;
                        top: 10px;
                        background-color: #f1f1f1;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        
                        img {
                            position: relative;
                            top: 10px;
                            left: 1px;
                            height: 20px;
                        }

                        &:hover {
                            background-color: #fafafa;
                            cursor: pointer;
                        }
                    }
                }

                .question {
                    width: 140%;
                    margin-bottom: 100px;
                    height: 300px;
                    float: right;
                }
            }

            .comments {
                margin-top: -80px;
                margin-left: 18.5%;
                margin-bottom: 5%;
            }
        }

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

    .transferPointsCard {
        position: fixed;
        bottom: 0;
        right: 0;
        top: 0;
    }

    .modal {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        position: fixed;
        right: 25%;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

</style>
