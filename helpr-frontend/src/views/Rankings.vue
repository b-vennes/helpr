<template>
    <div class="container">
        <Navbar class="navbar"></Navbar>
        <div class="rankingsContainer">
            <div class="rankingsTitle">
                Helpr Leaderboard
            </div>
            <div class="userList">
                <div class="user" v-for="user in paginatedUsers" :key="user.user.id">
                    <div class="userPoints">
                        {{ user.userProfile.points }}
                    </div>  
                    <div class="userRanking">
                        <img v-bind:src="user.user.photo">
                        <div class="userRankingInformation">
                            <div class="userName">
                                {{ user.user.firstname }} {{ user.user.lastname }}
                            </div>
                            <div class="userTitle">
                                {{ user.userProfile.title }}
                            </div>
                        </div>
                        <div class="userRankingIcons">
                            <div class="userHistoryRanking">
                                <div class="userHistoryRankBronze" v-if="user.userProfile.points <= 500">
                                    Bronze Helpr
                                </div>
                                <div class="userHistoryRankSilver" v-else-if="user.userProfile.points > 500 && user.userProfile.points <= 2000">
                                    Silver Helpr
                                </div>
                                <div class="userHistoryRankGold" v-else-if="user.userProfile.points > 2000 && user.userProfile.points <= 3500">
                                    Gold Helpr
                                </div>
                                <div class="userHistoryRankPlatinum" v-else-if="user.userProfile.points > 3500 && user.userProfile.points <= 5000">
                                    Platinum Helpr
                                </div>
                                <div class="userHistoryRankDiamond" v-else-if="user.userProfile.points > 5000">
                                    Diamond Helpr
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <div class="paginationPageLeft" @click="changePagesMaxLeft()">&laquo;</div>
                <div class="paginationPage" @click="changePagesLeft()">&lsaquo;</div>
                <div class="paginationPageList" @click="changePages(n)" v-for="n in paginationMaxPages" :key="n">
                    <div v-if="paginationPage == n">
                        <div class="page active">{{ n }}</div>
                    </div>
                    <div v-else>
                        <div class="page">{{ n }}</div>
                    </div>
                </div>
                <div class="paginationPage" @click="changePagesRight()">&rsaquo;</div>
                <div class="paginationPageRight" @click="changePagesMaxRight()">&raquo;</div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service.js';
import LoggerService from '../services/logger.service.js';
import Navbar from "@/components/Navbar";

const userService = new UserService();
const loggerService = new LoggerService();

export default {
    data: function() {
        return {
            paginatedUsers: [],
            paginationLimit: 4,
            paginationPage: 1,
            paginationMaxPages: 0
        }
    },
    components: {
        Navbar
    },
    methods: {
        async getUsersByPagination() {
            const paginationDto = {
                limit: this.paginationLimit,
                page: this.paginationPage
            };

            await userService.getUsersByPagination(paginationDto)
            .then(response => {
                if (response.status === 200) {
                    this.paginationMaxPages = response.data.pages;
                    this.paginatedUsers = response.data.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Rankings/getUsersByPagination()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });
        },
        async changePages(page) {
            if (this.paginationPage !== page) {
                this.paginationPage = page;
                this.getUsersByPagination();
            }
        },
        async changePagesMaxLeft() {
            this.paginationPage = 1;
            this.getUsersByPagination();
        },
        async changePagesMaxRight() {
            this.paginationPage = this.paginationMaxPages;
            this.getUsersByPagination();
        },
        async changePagesLeft() {
            if (this.paginationPage !== 1) {
                this.paginationPage -= 1;
                this.getUsersByPagination();
            }
        },
        async changePagesRight() {
            if (this.paginationPage !== this.paginationMaxPages) {
                this.paginationPage += 1;
                this.getUsersByPagination();
            }
        }
    },
    async mounted() {
        await this.getUsersByPagination();
    }
}
</script>


<style lang="scss" scoped>
.navbar {
    position: absolute;
    width: 100vw;
}

.rankingsContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: 100px;

    .rankingsTitle {
        margin-bottom: 30px;
        font-size: 60px;
    }

    .userList {
        position: relative;
        left: -25px;
        margin-bottom: 20px;
        
        .user {
            display: flex;
            flex-direction: row;

            .userPoints {
                padding: 5px;
                border-radius: 24px;
                background-color: #D25982;
                height: 35%;
                width: 5%;
                font-weight: 600;
            }

            .userRanking {
                margin-bottom: 10px;
                margin-left: 10px;
                width: 1200px;
                height: 120px;
                border-style: solid;
                border-radius: 12px;
                border-color: #42b983;
                display: flex;
                align-items: stretch;
                padding: 8px;

                img {
                    flex-grow: 1;
                    margin-right: 10px;
                    border-radius: 12px;
                }
                
                .userRankingInformation {
                    flex-grow: 25;
                    display: flex;
                    flex-direction: column;

                    .userName {
                        text-align: left;
                        font-size: 35px;
                        font-weight: 590;
                    }

                    .userTitle {
                        text-align: left;
                        font-size: 25px;
                        font-weight: bold;
                    }
                }

                .userRankingIcons {
                    flex-grow: 8;

                    .userHistoryRanking {
                        position: relative;
                        float: right;
                        width: 180px;
                        height: 30px;
                        font-size: 25px;
                        font-weight: 600;
                        font-family: 'Patrick Hand SC', cursive;

                        .userHistoryRankBronze {
                            border-radius: 24px;
                            background-color: #CD7F32;
                        }

                        .userHistoryRankSilver {
                            border-radius: 24px;
                            background-color: #C0C0C0;
                        }

                        .userHistoryRankGold {
                            border-radius: 24px;
                            background-color: #FFD700;
                        }

                        .userHistoryRankPlatinum {
                            border-radius: 24px;
                            background-color: #b19cd9;
                        }

                        .userHistoryRankDiamond {
                            border-radius: 24px;
                            background-color: #b9f2ff;
                        }
                    }
                }
            }
        }
    }

    .pagination {
        position: relative;
        top: 100px;
        display: inline-block;

        .paginationPage {
            position: relative;
            top: 8px;
            color: black;
            float: left;
            padding: 8px 16px;
            text-decoration: none;

            &:hover:not(.active) {
                background-color: #ddd;
                border-radius: 5px;
                cursor: pointer;
            }
        }

        .paginationPageLeft {
            position: relative;
            top: 8px;
            color: black;
            float: left;
            padding: 8px 16px;
            text-decoration: none;
            margin-right: 5px;

            &:hover {
                background-color: #ddd;
                border-radius: 5px;
                cursor: pointer;
            }
        }

        .paginationPageRight {
            position: relative;
            top: 8px;
            color: black;
            float: left;
            padding: 8px 16px;
            text-decoration: none;
            margin-left: 5px;

            &:hover {
                background-color: #ddd;
                border-radius: 5px;
                cursor: pointer;
            }
        }

        .paginationPageList {
            color: black;
            float: left;
            padding: 8px 16px;
            margin-left: 8px;
            text-decoration: none;

            .page {
                padding: 8px 16px;

                &.active {
                    background-color: #4CAF50;
                    color: white;
                    border-radius: 7px;
                }

                &:hover:not(.active) {
                    background-color: #ddd;
                    border-radius: 7px;
                    cursor: pointer;
                }
            }
        }
    }
}



</style>