<template>
    <div class="requestsContainer">
        <div class="requestsCard">
            <div class="requestsTitle">
                Helpr Requests
            </div>
        </div>
        <div class="userRequestsList" v-if="userRequests">
            <div class="userRequests" v-for="request in userRequests" :key="request.id">
                <div class="request">
                    <div class="requestRowTitle">
                        <div class="requestTitle">
                            {{ request.title }}
                        </div>
                        <div class="requestTitleClosed" v-if="request.isDeleted">
                            Closed
                        </div>
                    </div>
                    <div class="requestDescription">
                        {{ request.description }}
                    </div>
                    <div class="requestRow">
                        <div class="requestDateCreated">
                            {{ request.createdDate }}
                        </div>
                        <div class="requestPoints">
                            {{ request.points }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RequestService from '../../services/request.service.js';
import LoggerService from '../../services/logger.service.js';

const requestService = new RequestService();
const loggerService = new LoggerService();

export default {
    data: function() {
        return {
            userRequests: [],
            profileUserId: 0
        }
    },
    props: {
        userId: String
    },
    methods: {
        async getRequestsByUserId() {
            await requestService.getRequestByUserId(this.profileUserId)
            .then(response => {
                if (response.status === 200) {
                    this.userRequests = response.data;

                    for (var request of this.userRequests) {
                        let date = new Date(request.createdDate);
                        request.createdDate = date.toDateString();
                    }
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Profile/Requests/getRequestsByUserId()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });
        }
    },
    async mounted() {
        this.profileUserId = parseInt(this.userId);
        
        await this.getRequestsByUserId();
    }
}
</script>


<style scoped lang="scss">
.requestsContainer {
    width: 400px;
    height: 700px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    background-color: #1de9b6;

    .requestsCard {
        .requestsTitle {
            font-size: 30px;
            padding: 20px;
        }
    }

    .userRequestsList {
        padding: 20px;
        width: 80%;
        height: 500px;
        margin-top: 10px;
        margin-left: 20px;
        border-radius: 12px;
        overflow-y: scroll;
        background-color: white;

        .userRequests {
            margin-bottom: 10px;
            padding: 10px;
            border-style: solid;
            border-color: #90EE90;
            border-radius: 12px;
            cursor: pointer;

            .request {
                .requestRowTitle {
                    .requestTitle {
                        display: inline-block;
                        font-weight: bold;
                        font-size: 20px;
                        margin-bottom: 5px;
                        margin-right: 10px;
                    }
                    .requestTitleClosed {
                        font-size: 20px;
                        font-weight: bold;
                        display: inline-block;
                        color: red;
                    }
                }

                .requestDescription {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                .requestRow {
                    padding: 10px;

                    .requestDateCreated{
                        display: inline-block;
                        color: #228B22;
                        margin-right: 10px;
                    }
                    .requestPoints {
                        display: inline-block;
                        color: #D25982;
                    }
                }
            }
        }
    }
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #90EE90;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>