<template>
    <div class="historyContainer">
        <div class="historyCard">
            <div class="historyTitle">
                Helpr History
            </div>
        </div>
        <div class="userHistoryList" v-if="historyList">
            <div class="userHistory" v-for="history in historyList" @mouseover="historyHoverOver(history)" @mouseleave="historyHoverLeave()" :key="history.id">
                <div class="history" v-if="history.user && history.request">
                    <div class="historyRequestTitle">
                        {{ history.request.title }}
                    </div>
                    <div class="historyRequestDateRewarded">
                        {{ history.dateTimeAwarded }}
                    </div>
                    <div class="historyRequestPoints">
                        {{ history.request.points }}
                    </div>
                </div>
            </div>
        </div>
        <div class="user" v-if="isUserInfoHover && userInfoHover">
            {{userInfoHover.firstname}}
        </div>
    </div>
</template>

<script>
import HistoryService from '../services/history.service.js';
import UserService from '../services/user.service.js';
import RequestService from '../services/request.service.js';

const historyService = new HistoryService();
const userService = new UserService();
const requestService = new RequestService();

export default {
    data: function() {
        return {
            historyList: [],
            profileUserId: 0,
            isUserInfoHover: false,
            userInfoHover: {}
        }
    },
    props: {
        userId: String
    },
    methods: {
        async getHistoryByUserId() {
            await historyService.getHistoryByUserId(this.profileUserId)
            .then(data => {
                this.historyList = data;
            });
        },
        async getRequestForHistory() {
            for (var history of this.historyList) {
                var date = new Date(history.dateTimeAwarded);
                history.dateTimeAwarded = date.toDateString();

                await requestService.getRequestById(history.requestId)
                .then(data => {
                    history.request = data;
                });
            }
        },
        async getUserForHistory() {
            for (var history of this.historyList) {
                await userService.getUser(history.fromUserId)
                .then(data => {
                    history.user = data;
                });
            }
        },
        async historyHoverOver(historyEvent) {
            for (var history of this.historyList) {
                if (history.userId === historyEvent.userId) {
                    this.isUserInfoHover = true;
                    this.userInfoHover = history.user;
                }
            }
        },
        historyHoverLeave() {
            this.isUserInfoHover = false;
            this.userInfoHover = {};
        }
    },
    async mounted() {
        this.profileUserId = parseInt(this.userId);
        await this.getHistoryByUserId();
        await this.getRequestForHistory();
        await this.getUserForHistory();
    }
}
</script>


<style scoped lang="scss">
.historyContainer {
    width: 400px;
    height: 700px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    background-color: #1de9b6;

    .historyCard {
        .historyTitle {
            font-size: 30px;
            padding: 20px;
        }
    }

    .userHistoryList {
        padding: 20px;
        width: 80%;
        height: 425px;
        margin-top: 10px;
        margin-left: 20px;
        border-radius: 12px;
        overflow-y: scroll;
        background-color: white;

        .userHistory {
            margin-bottom: 10px;
            padding: 10px;
            border-style: solid;
            border-color: #90EE90;
            border-radius: 12px;
            cursor: pointer;

            .history {
                .historyRequestTitle {
                    font-weight: bold;
                    font-size: 20px;
                    margin-bottom: 5px;
                }

                .historyRequestDateRewarded {
                    margin-bottom: 5px;
                    color: #228B22;
                }

                .historyRequestPoints{
                    border-style: solid;
                    border-width: 3px;
                    border-color: #D25982;
                    width: 3rem;
                    border-radius: 24px;
                    padding: 4px;
                    margin: auto;
                    font-weight: 600;
                }
            }
        }

        .userHistory::-webkit-scrollbar {
            width: 12px;               /* width of the entire scrollbar */
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