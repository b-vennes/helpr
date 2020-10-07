<template>
    <div class="container">
        <ErrorDisplay class="successDisplay" v-if="isShowError" :errorMessage="errorMessage"></ErrorDisplay>
        <SuccessDisplay  v-if="isShowSuccess" :successMessage="successMessage"></SuccessDisplay>
     
        <div class="content">
        <div class="top">
            <router-link to="/requests">
            <div class="back">
                <img src="../assets/left-chevron.svg">
            </div>
            </router-link>
            <div>Ask a Helpr</div>
        </div>
        <div class="inputs">
            <div class="titleInline">
                <input v-model="title" class="title" placeholder="Title">
                <input v-model="points" class="points" placeholder="Points">
            </div>
            <div class="descriptionInline">
                <textarea v-model="description" class="description" rows="20" placeholder="Description"></textarea>
            </div>
            <div class="checkboxInline">
                <input class="isPublicRequest" type="checkbox" id="isPublicRequestCheckbox" v-model="isPublicRequest" />
                <label class="labelIsPublicRequest" for="isPublicRequestCheckbox">Public Request</label>
            </div>
        </div>
        <Button @click="createRequest" txt="Submit" class="secondary submit"></Button>
        </div>
    </div>
</template>

<script>
    import RequestService from "../services/request.service.js";
    import Button from '../components/Button';
    import ErrorDisplay from '../components/common/Error.vue';
    import SuccessDisplay from '../components/common/Success.vue';
    import { emitter } from '../components/common/event-bus';

    const requestService = new RequestService();

    export default {
        data: function() {
            return {
                title: "",
                description: "",
                errorMessage: "",
                points: "",
                isShowError: false,
                isShowSuccess: false,
                successMessage: "",
                isPublicRequest: false
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
            async createRequest() {
                const request = {
                    description: this.description,
                    createdDate: new Date(),
                    points: parseInt(this.points),
                    likes: 0,
                    isPublicRequest: this.isPublicRequest,
                    userId: 1,
                    isDeleted: false,
                    title: this.title
                }
                
                await requestService.createRequest(request)
                .then(data => {
                    if (data.statusText === "Created") {
                        this.showSuccessMessage("Successfully posted a new request");
                    } else {
                        this.showErrorMessage("Error in posting a new request");
                    }
                });
            },
            showErrorMessageEventListener() {
                this.isShowError = false;
            },
            showSuccessMessageEventListener() {
                this.isShowSuccess = false;
            }
        },
        async mounted() {
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

        .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        color: black;
        background-image: url("../assets/questions-background.svg");
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;

        .content {
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            .top {
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 28px;

            .back {
                display: flex;
                align-items: center;
                justify-content: center;

                background-color: #f1f1f1;
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
                margin-bottom: 4px;
                padding: 15px;
                
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

                .checkboxInline {
                    padding: 12px;

                    .labelIsPublicRequest {
                        margin-left: 10px;
                    }
                }
            }

            .submit {
                align-self: flex-end;
            }
        }
    }

    // Remove the underline from the router button.
    a { text-decoration: none;}
</style>
