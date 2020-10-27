<template>
    <div class="questionContainer">
        <div class="question">
            <div class="content">
                <div class="title">
                    {{ title }}
                </div>
                <div v-if="isClosed" class="requestClosed">
                    <div class="closedText">
                        Closed
                    </div>
                </div>
            </div>
        </div>
        <div class="description">
            <div class="requestDescription">{{ description }}</div>
        </div>
        <div v-if="!isClosed">
            <div class="commentIcon">
                <img @click="commentRequest()" src="https://img.icons8.com/ios-filled/50/000000/comments.png"/>
            </div>
        </div>
        <div v-else>
            <div class="commentIconClosed">
                <img src="https://img.icons8.com/ios-filled/50/000000/comments.png"/>
            </div>
        </div>
        <div class="dropdownIcon">
            <div v-if="!isShowComment">
                <img @click="dropdown()" src="https://img.icons8.com/fluent-systems-filled/24/000000/chevron-down--v2.png"/>
            </div>
            <div v-else>
                <img @click="dropdown()" src="https://img.icons8.com/fluent-systems-filled/24/000000/chevron-up--v2.png"/>
            </div>
        </div>
        <div v-if="loggedInUserId == userId ">
            <div v-if="!isClosed">
                <div class="transferPointsIcon">
                    <img @click="transferPoints()" src="https://img.icons8.com/material-rounded/24/000000/back-sorting.png"/>
                </div>
            </div>
            <div v-else-if="isClosed">
                <div class="transferPointsIconClosed">
                    <img src="https://img.icons8.com/material-rounded/24/000000/back-sorting.png"/>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="thumbsUp">
                {{ thumbsUpAmount }}
            </div>
            <div class="tags">
                <div class="requestTags" v-for="requestTag in requestTags" v-bind:key="requestTag.id">
                    {{ requestTag.tagName }}
                </div>
            </div>
            <div class="points">
                +{{ points }}
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service.js';
import RequestTagsService from '../services/requesttags.service';
import LoggerService from '../services/logger.service.js';
import { emitter } from './common/event-bus';

const userService = new UserService();
const requestTagsService = new RequestTagsService();
const loggerService = new LoggerService();

export default {
    name: 'QuestionPreview',
    props: {
        description: String,
        id: Number,
        tag: String,
        title: String,
        userId: Number,
        likes: Number,
        points: Number,
        isClosed: Boolean
    },
    data: function() {
        return {
            user: {},
            requestTags: [],
            thumbsUpAmount: 0,
            loggedInUserId: 0,
            isShowComment: false
        }
    },
    methods: {
        async getUser() {
            await userService.getUser(this.userId)
            .then(response => {
                if (response.status === 200) {
                    this.user = response.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Question-preview/getUser()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        async getRequestTags() {
            await requestTagsService.getRequestTagsById(this.id)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.length === 0) {
                        const placeholderData = [{
                            tagName: "No Tags"
                        }];

                        this.requestTags = placeholderData;
                    } else {
                        this.requestTags = response.data;
                    }
                } else {
                    const placeholderData = [{
                        tagName: "No Tags"
                    }];

                    this.requestTags = placeholderData; 
                    
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Question-preview/getRequestTags()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        commentRequest() {
            const event = {
                userId: this.userId,
                requestId: this.id
            }

            emitter.emit('add-comment-event', event);
        },
        dropdown() {
            this.isShowComment = !this.isShowComment;
            
            const event = {
                id: this.id,
                isShowComment: this.isShowComment
            };

            emitter.emit('show-comments-event', event);
        },
        transferPoints() {
            emitter.emit('transfer-points-event', { id: this.id, points: this.points} )
        }

    },
    async mounted() {
        this.thumbsUpAmount = this.likes;
        this.loggedInUserId = localStorage.getItem('userId');

        await this.getUser();
        await this.getRequestTags();

        emitter.on('add-to-thumbsup-amount', () => {
            this.thumbsUpAmount += 1;
        });
    },
    beforeUnmount: function() {
        emitter.off('add-to-thumbsup-amount', () => {});
    }
}
</script>

<style scoped lang="scss">
.questionContainer {
    margin-left: 20px;
    border-style: solid;
    border-color: #90EE90;
    border-radius: 32px;
    height: 300px;

    .question {
        background-color: #F1F1F1;
        border-radius: 24px;
        margin-bottom: 4px;
        
        .content {
            padding: 16px;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            background-color:	#90EE90;
            align-self: flex-end;
            height: 40px;

            .title {
                font-size: 2rem;
                float: left;
            }
            
            .requestClosed {
                float: right;
                background-color: #FF6347;
                border-radius: 16px;
                width: 8%;
                height: 40px;

                .closedText {
                    position: relative;
                    top: 8px;
                    font-size: 20px;
                    font-weight: bold;
                }
            
            }
        }

        .right {
            background-color: #FF7043;
            padding: 12px 18px;
            border-radius: 24px;
            margin: 0 24px 0 auto;
        }
    }


    .description {
        padding: 10px;
        display: block;
        text-align: left;
        height: 70px;

        .requestDescription {
            display: block;
            text-align: left;
            font-size: 18px;
        }
    }

    .commentIcon {
        position: relative;
        left: -10px;
        top: 10px;
        float: right;
        background-color: #f1f1f1;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        
        img {
            position: relative;
            top: 10px;
            left: 0px;
            height: 20px;
        }

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .commentIconClosed {
        position: relative;
        left: -10px;
        top: 10px;
        float: right;
        background-color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        
        img {
            position: relative;
            top: 10px;
            left: 0px;
            height: 20px;
        }

        &:hover {
            cursor: pointer;
        }
    }

    .dropdownIcon {
        position: relative;
        left: -15px;
        top: 10px;
        float: right;
        background-color: #f1f1f1;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        
        img {
            position: relative;
            top: 10px;
            left: 0px;
            height: 20px;
        }

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .transferPointsIcon {
        position: relative;
        left: -20px;
        top: 10px;
        float: right;
        background-color: #f1f1f1;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        
        img {
            position: relative;
            top: 10px;
            left: 0px;
            height: 20px;
        }

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .transferPointsIconClosed {
        position: relative;
        left: -20px;
        top: 10px;
        float: right;
        background-color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        
        img {
            position: relative;
            top: 10px;
            left: 0px;
            height: 20px;
        }

        &:hover {
            cursor: pointer;
        }
    }

    .footer {
        position: relative;
        top: 60px;
        padding: 16px;
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
        background-color: #90EE90;

        .thumbsUp {
            float: left;
            background-color: #F1F1F1;
            border-radius: 20px;
            font-size: 1.2rem;
            padding: 10px;
        }

        .requestTags {
            display: inline-block;
            background-color: #F1F1F1;
            border-radius: 20px;
            padding: 10px;
            font-size: 1.2rem;
            margin-right: 10px;
        }

        .points {
            position: relative;
            top: -43px;
            left: 10px;
            float: right;
            background-color: #F1F1F1;
            padding: 10px;
            font-size: 1.2rem;
            margin-right: 10px;
            border-radius: 20px;
        }
    }
}
</style>
