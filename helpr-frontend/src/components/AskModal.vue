<template>
    <div class="askModalContainer">
        <ErrorDisplay class="successDisplay" v-if="isShowError" :errorMessage="errorMessage"></ErrorDisplay>
        <SuccessDisplay  v-if="isShowSuccess" :successMessage="successMessage"></SuccessDisplay>
     
        <div class="content">
            <div class="top">
                <div>Post a Request</div>
            </div>
            <div class="inputs">
                <div class="titleInline">
                    <input v-model="title" class="title" placeholder="Title">
                    <input v-model="points" class="points" placeholder="Points">
                </div>
                <div class="descriptionInline">
                    <textarea v-model="description" class="description" rows="10" placeholder="Description"></textarea>
                </div>
                <div class="selectListInLine">
                    <div class="checkboxInline">
                        <input class="isPublicRequest" type="checkbox" id="isPublicRequestCheckbox" v-model="isPublicRequest" />
                        <label class="labelIsPublicRequest" for="isPublicRequestCheckbox">Public Request</label>
                    </div>
                    <div id="v-model-select-dynamic" class="selectTags">
                        <select v-model="selected" @change="onSelected()">
                            <option disabled value="">Select a Tag</option>
                            <option v-for="tag in tagSelectList" v-bind:key="tag.name">
                                {{ tag.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="tags">
                    <div class="requestTags" v-for="selectedTag in selectedTags" v-bind:key="selectedTag.id">
                        {{ selectedTag.name }}
                    </div>
                </div>
            </div>
            <div class="buttons">
                <Button @click="createRequest" txt="Submit" class="secondary submit"></Button>
                <Button @click="exitModal" txt="Cancel" class="cancel"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import RequestService from "../services/request.service.js";
import TagService from '../services/tag.service.js';
import UserService from '../services/user.service.js';
import RequestTagService from '../services/requesttags.service.js';
import NotificationService from '../services/notifications.service.js';
import Button from '../components/Button';
import ErrorDisplay from '../components/common/Error.vue';
import SuccessDisplay from '../components/common/Success.vue';
import { emitter } from '../components/common/event-bus';

const requestService = new RequestService();
const tagService = new TagService();
const userService = new UserService();
const requestTagService = new RequestTagService();
const notificationService = new NotificationService();

export default {
    data: function() {
        return {
            tags: [],
            users: [],
            tagSelectList: [],
            selectedTags: [],
            selected: '',
            title: "",
            description: "",
            errorMessage: "",
            points: "",
            isShowError: false,
            isShowSuccess: false,
            successMessage: "",
            isPublicRequest: false,
            createdRequest: {}
        }
    },
    components: {
        Button,
        ErrorDisplay,
        SuccessDisplay
    },
    methods: {
        showErrorMessage: function(message) {
            this.errorMessage = message;
            this.isShowError = true;
        },
        showSuccessMessage: function(message) {
            this.successMessage = message;
            this.isShowSuccess = true;
        },
        exitModal() {
            emitter.emit('exit-ask-modal-event');
        },
        showErrorMessageEventListener() {
            this.isShowError = false;
        },
        showSuccessMessageEventListener() {
            this.isShowSuccess = false;
        },
        onSelected() {
            let tagToRemove = {};
            for (var tag of this.tags) {
                if (tag.name === this.selected) {
                    tagToRemove = tag;
                    this.selectedTags.push(tag);
                    break;
                }
            }

            var index = this.tagSelectList.indexOf(tagToRemove);
            this.tagSelectList.splice(index, 1);
            this.selected = '';
        },
        async createRequest() {
            const request = {
                description: this.description,
                createdDate: new Date(),
                points: parseInt(this.points),
                likes: 0,
                isPublicRequest: this.isPublicRequest,
                userId: localStorage.getItem('userId'),
                isDeleted: false,
                title: this.title
            }
            
            await requestService.createRequest(request)
            .then(data => {
                if (data.id) {
                    this.showSuccessMessage("Successfully posted a new request");
                    this.createRequestTags(data);
                    this.createNotifications(data.id);
                } else {
                    this.showErrorMessage("Error in posting a new request");
                }
            })
        },
        async getAllUsers() {
            await userService.getAllUsers()
            .then(data => {
                if (data) {
                    this.users = data;
                }
            });
        },
        createRequestTags(createdRequest) {
            for (var selectedTag of this.selectedTags) {
                const request = {
                    requestId: createdRequest.id,
                    tagId: selectedTag.id
                }

                requestTagService.createRequestTag(request)
                .then(data => {
                    if (data) {
                        this.showSuccessMessage("data added to request tag");
                    }
                });
            }
        },
        createNotifications(requestId) {
            notificationService.sendNotifications(requestId)
            .then(() => {
                this.exitModal();
            });
        },
        async getTags() {
            await tagService.getAllTags()
            .then(data => {
                if (data) {
                    this.tagSelectList = data;
                    this.tags = data;
                }
            })
        }
    },
    async mounted() {
        await this.getTags();

        emitter.on('error-display-event', () => {
            this.showErrorMessageEventListener();
        });

        emitter.on('success-display-event', () => {
            this.showSuccessMessageEventListener();
        });
    },
    beforeUnmount: function() {
        emitter.off('error-display-event', () => {});
        emitter.off('success-display-event', () => {});
    }
}
</script>

<style scoped lang="scss">

    .askModalContainer {
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

            .back {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                height: 40px;
                margin: 0 8px 8px 0;
                width: 40px;

                img {
                height: 15px;
                }

                &:hover {
                cursor: pointer;
                background-color: #fafafa;
                }
            }
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
                
                .titleInline {
                    padding: 12px;

                    .title {
                        background-color: #f1f1f1;
                        border: 0;
                        border-radius: 8px;
                        font-size: 18px;
                        height: 30px;
                        margin-bottom: 8px;
                        margin-right:10px;
                        outline: 0;
                        padding: 4px 8px;
                        width: 29rem;
                    }
                
                    .points {
                        background-color: #f1f1f1;
                        border: 0;
                        border-radius: 8px;
                        font-size: 18px;
                        height: 30px;
                        margin-bottom: 8px;
                        margin-left:10px;
                        outline: 0;
                        padding: 4px 8px;
                        width: 29rem;
                    }
                }
            
                .descriptionInline {
                    padding: 12px;

                    .description {
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

                .selectListInLine {
                    width: 50%;

                    .checkboxInline {
                        padding: 12px;
                        float: left;

                        .labelIsPublicRequest {
                            margin-left: 10px;
                        }
                    }

                    .selectTags {
                        width: 60rem;
                        padding: 12px;
                    }
                }

                .tags {
                    margin-top: 10px;
                    margin-left: 10px;

                    .requestTags {
                        display: inline-block;
                        background-color: #F1F1F1;
                        border-radius: 20px;
                        padding: 10px;
                        font-size: 1rem;
                        margin-right: 10px;
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

    // Remove the underline from the router button.
    a { text-decoration: none;}
</style>
