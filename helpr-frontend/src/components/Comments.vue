<template>
    <div class="commentsContainer">
        <div class="comments" v-for="comment of comments" v-bind:key="comment.id">
            <div class="commentsInformation">
                <div class="user" v-if="comment.user">
                    <img v-bind:src="comment.user.photo">
                    <div class="information">
                        <div class="username">{{comment.user.firstname}} {{comment.user.lastname}}</div>
                        <div class="createdDate">{{comment.createdDate}}</div>
                    </div>
                </div>
                <div class="description">
                    {{comment.description}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentService from '../services/comment.service.js';
import UserService from '../services/user.service.js';
import LoggerService from '../services/logger.service.js';

const commentService = new CommentService();
const userService = new UserService();
const loggerService = new LoggerService();

export default {     
    data: function() {
        return {
            comments: []
        }
    },
    props: {
        requestId: Number
    },
    methods: {
        async getCommentsByRequestId() {
            await commentService.getCommentsByRequestId(this.requestId)
            .then(response => {
                if (response.status === 200) {
                    this.comments = response.data;

                    for (var comment of response.data) {
                        let date = new Date(comment.createdDate);
                        comment.createdDate = date.toDateString();
                    }
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Comments/getCommentsByRequestId()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });
        },
        async getUsersForComments() {
            for (var comment of this.comments) {
                await userService.getUser(comment.userId)
                .then(response => {
                    if (response.status === 200) {
                        comment.user = response.data;
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
                });
            }
        }
    },
    async mounted() {
        await this.getCommentsByRequestId();
        await this.getUsersForComments();
    }
}
</script>

<style lang="scss" scoped>
.commentsContainer {
    display: block;

    .comments {
        padding: 8px;
        border-radius: 24px;
        display: block;
        text-align: left;
        font-size: 18px;
        margin-bottom: 15px;
        border-color: #90EE90;
        border-style: solid;

        .commentsInformation {
            display: flex;
            flex-direction: row;

            .user {
                display: flex;
                flex-direction: row;
                width: 15%;
                background-color: #F1F1F1;
                border-radius: 18px;
                padding: 8px;
                
                img {
                    height: 60px;
                    border-radius: 16px;
                }

                .information {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-left: 15px;
                    margin-top: 9px;

                    .username {
                        font-size: 20px;
                    }

                    .createdDate {
                        font-size: 15px;
                        color: #228B22;
                    }
                }
            }

            .description {
                margin-left: 10px;
                padding: 10px;
            }
        }
    }
}


</style>