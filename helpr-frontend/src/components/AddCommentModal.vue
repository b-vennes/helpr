<template>
    <div class="addCommentModalContainer">
         <div class="content">
             <div class="top">
                <div>Add a Comment to this Post</div>
            </div>
            <div class="inputs">
                <div class="commentinline">
                    <textarea v-model="comment" class="comment" rows="5" placeholder="Comment"></textarea>
                </div>
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
import { emitter } from '../components/common/event-bus';
import CommentService from '../services/comment.service.js';

const commentService = new CommentService();

export default {
    props: {
        requestId: Number,
        userId: Number
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
                userId: this.userId,
                requestId: this.requestId,
                isDeleted: false
            }

            await commentService.createComment(request)
            .then(() => {
                emitter.emit('exit-create-comment-modal-event');
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

            background-color: rgba(#F1F1F1, 0.4);
            border-radius: 12px;
            margin-bottom: 20px;
            padding: 30px;
            margin-left:20px;
            margin-right:20px;

            .commentinline {
                padding: 12px;

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
                    width: 60rem;
                }
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
