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

                    for (var comment of this.comments) {
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
    background-color: #90EE90;
    padding: 12px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;

    .comments {
        padding: 2px;
        margin: 4px;
        border-radius: 24px;
        background-color: white;
        display: block;
        text-align: left;
        font-size: 18px;
        margin-bottom: 0px;
        border-color: white;
        border-style: solid;

        .commentsInformation {
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: 8px;

            .user {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                padding: 8px;
                
                img {
                    height: 48px;
                    border-radius: 50%;
                }

                .information {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-left: 8px;

                    .username {
                        font-size: 16px;
                        margin-right: 4px;
                    }

                    .createdDate {
                        align-self: center;
                        font-size: 12px;
                        color: #228B22;
                    }
                }
            }

            .description {
                margin-left: 10px;
                padding: 10px 0;
            }
        }
    }
}


</style>
