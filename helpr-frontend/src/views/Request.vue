<template>
    <div class="requestContainer">
        <Navbar class="navbar"></Navbar>
        <div class="all">
            <div class="post" v-if="request.userId">
                <div class="user">
                    <User
                        v-bind:userId="request.userId"
                        v-bind:createdDate="request.createdDate">
                    </User>
                    <div class="messageUserIcon">
                        <img @click="messageUser()" src="https://img.icons8.com/fluent-systems-filled/24/000000/chat-message.png"/>
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
                        tag="Forms">
                    </QuestionPreview>
                </div>
            </div>
            <div class="comments" v-if="showComments">
                <Comments
                    v-bind:requestId="requestId"
                    :key="commentComponentKey">
                </Comments>
            </div>

            <transition name="slide-fade" mode="out-in">
                <div class="modal" v-if="showModal">
                    <AskModal></AskModal>
                </div>
            </transition>
            
            <div class="modal" v-if="showAddCommentModal">
                <AddCommentModal 
                    v-bind:requestId="commentRequestId"
                ></AddCommentModal>
            </div>
        </div>
    </div>
</template>

<script>
import RequestService from '../services/request.service';
import QuestionPreview from '../components/Question-preview';
import Navbar from "@/components/Navbar";
import AskModal from '../components/AskModal';
import AddCommentModal from '../components/AddCommentModal';
import Comments from '../components/Comments';
import User from '../components/User';
import { emitter } from '../components/common/event-bus';

const requestService = new RequestService();

export default {
    data: function() {
        return {
            request: {},
            showModal: false,
            showAddCommentModal: false,
            commentRequestId: 0,
            commentUserId: 0,
            showComments: false,
            commentComponentKey: 0,
            loggedInUserId: 0
        }
    },
    components: {
        Navbar,
        QuestionPreview,
        User,
        AskModal,
        AddCommentModal,
        Comments
    },
    methods: {
        async getRequestById() {
            await requestService.getRequestById(this.requestId)
            .then(data => {
                if (data) {
                    console.log(data);
                    this.request = data;
                }
            });
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
            .then(() => {});
        },
        forceRerender() {
            this.commentComponentKey += 1;
        },
        exitModal() {
            this.showModal = false;
        },
        addCommentModal() {
            this.showAddCommentModal = true;
        },
        exitCommentModal() {
            this.showAddCommentModal = false;

            this.forceRerender();
        },
        showCommentsEvent() {
            if (this.showComments) {
                this.showComments = false;
            } else {
                this.showComments = true;
            }
        },
        messageUser() {
            console.log("sup");
        }
    },
    async beforeMount() {
        const searchCodeParameter = window.location.href;
        this.requestId = searchCodeParameter.substring(searchCodeParameter.lastIndexOf('/') + 1);

        this.loggedInUserId = localStorage.getItem('userId');

        await this.getRequestById();

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

        emitter.on('show-comments-event', () => {
            this.showCommentsEvent();
        });

        emitter.on('created-request-event', () => {
            this.exitModal();
        });
    },
    beforeUnmount: function() {
        emitter.off('exit-ask-modal-event', () => {});
        emitter.off('thumbs-up-event', () => {});
        emitter.off('add-comment-event', () => {});
        emitter.off('exit-create-comment-modal-event', () => {});
        emitter.off('show-comments-event', () => {});
        emitter.off('created-request-event', () => {});
    }
}
</script>


<style scoped lang="scss">
.navbar {
  position: absolute;
  width: 100vw;
}

.requestContainer {
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

        .post {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            align-items: flex-start;
            width: 70%;

            .user {
                width: 20%;
                float: left;

                .messageUserIcon {

                }
            }

            .question {
                width: 95%;
                margin-bottom: 100px;
                height: 300px;
                float: right;
            }
        }

        .comments {
            margin-left: 18.5%;
            margin-bottom: 5%;
        }
    }
}

</style>