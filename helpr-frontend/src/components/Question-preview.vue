<template>
    <div class="questionContainer">
    <div class="question">
        <div class="content">
            <div class="title">{{ title }}<span class="id"></span></div>
        </div>
    </div>
        <div class="description">
            <div class="requestDescription">{{ description }}</div>
        </div>
        <div class="footer">
            <div class="tags">
            <div class="requestTags" v-for="requestTag in requestTags" v-bind:key="requestTag.id">
                {{ requestTag.tagName }}
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service.js';
import RequestTagsService from '../services/requesttags.service';

const userService = new UserService();
const requestTagsService = new RequestTagsService();

export default {
    name: 'QuestionPreview',
    props: {
        description: String,
        id: Number,
        tag: String,
        title: String,
        userId: Number
    },
    data: function() {
        return {
            user: {},
            requestTags: []
        }
    },
    methods: {
        async getUser() {
            await userService.getUser(this.userId)
            .then(data => {
                if (data) {
                    this.user = data;
                }
            })
        },
        async getRequestTags() {
            await requestTagsService.getRequestTagsById(this.id)
            .then(data => {
                if (data) {
                    if (data.length === 0) {
                        const placeholderData = [{
                            tagName: "No Tags"
                        }];

                        this.requestTags = placeholderData;
                    } else {
                        this.requestTags = data;
                    }
                }
            })
        }
    },
    async mounted() {
        await this.getUser();
        await this.getRequestTags();
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
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.03));
    
    .content {
        padding: 16px;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        background-color: 	#90EE90;

        .title {
            display: flex;
            align-items: center;
            font-size: 2rem;

            .id {
                font-size: 15px;
                margin-left: 8px;
                opacity: 0.6;
            }
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


    .description {
        padding: 10px;
        display: block;
        text-align: left;
        height: 130px;

        .requestDescription {
            display: block;
            text-align: left;
            font-size: 18px;
        }
    }

    .footer {
        padding: 16px;
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
        padding: 16px;
        background-color: #90EE90;

        .requestTags {
            display: inline-block;
            background-color: #F1F1F1;
            border-radius: 20px;
            padding: 10px;
            font-size: 1.2rem;
            margin-right: 10px;
            
        }
    }
}
</style>
