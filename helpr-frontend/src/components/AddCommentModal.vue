<template>
    <div class="addCommentModalContainer">
         <div class="content">
             <div class="top">
                <div>Add a Comment</div>
            </div>
            <div class="inputs">
                    <textarea v-model="comment" class="comment" rows="15" placeholder="Comment"></textarea>
            </div>
            <div class="buttons">
                <Button @click="createComment" txt="Submit" class="secondary submit"></Button>
                <Button @click="exitModal" txt="Cancel" class="cancel"></Button>
            </div>
         </div>
    </div>
</template>

<script>
import Button from './Button';
import CommentService from '../services/comment.service.js';
import LoggerService from '../services/logger.service.js';
import { emitter } from '../components/common/event-bus';

const commentService = new CommentService();
const loggerService = new LoggerService();

export default {
    props: {
        requestId: Number
    },
    data: function() {
        return {
            comment: ""
        }
    },
    components: {
        Button
    },
    methods: {
        async createComment() {
            const request = {
                description: this.comment,
                createdDate: new Date(),
                like: 0,
                userId: localStorage.getItem("userId"),
                requestId: this.requestId,
                isDeleted: false
            }

            await commentService.createComment(request)
            .then(response => {
                if (response.status === 200) {
                    const log = {
                        success: true,
                        message: "Successfully created a Helpr Comment in AddCommentModal/createComment()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);

                    emitter.emit('exit-create-comment-modal-event');
                } else {
                    const log = {
                        success: false,
                        message: "Could not create a Helpr Comment in AddCommentModal/createComment()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        exitModal() {
            emitter.emit('exit-create-comment-modal-event');
        },
    },
    async mounted() {
        
    },
    beforeUnmount: function() {
        
    }
}
</script>

<style scoped lang="scss">

.addCommentModalContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    color: black;
    height: 100vh;

    .content {
        background-color: #42b983;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        border-radius: 12px;

        .top {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;

            font-size: 28px;

        }

        .inputs {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            border-radius: 12px;
            margin-bottom: 20px;
            margin-left:20px;
            margin-right:20px;


            .comment {
                background-color: #f1f1f1;
                border: 0;
                border-radius: 8px;
                font-family: Avenir, Helvetica, Arial, sans-serif;
                font-size: 16px;
                outline: 0;
                margin-bottom: 8px;
                padding: 4px 8px;
                resize: none;
                width: 17rem;
            }
        }

        .buttons {
            align-self: flex-end;

            .submit {
                cursor: pointer;
                display: inline-block;
                margin-right: 20px;
                margin-bottom: 20px;
            }

            .cancel {
                cursor: pointer;
                display: inline-block;
                margin-right: 20px;
                margin-bottom: 20px;
            }
        }
    }
}

    a { text-decoration: none;}
</style>
