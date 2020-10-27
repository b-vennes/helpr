<template>
    <div class="container">
        <Navbar class="navbar"></Navbar>
        <div class="content">
            <div class="top">
                <router-link to="/requests">
                    <div class="back">
                        <img src="../assets/left-chevron.svg">
                    </div>
                </router-link>
                <div class="helprHistory" @click="helprHistoryDisplay()">
                    Helpr History
                </div>
                <div class="ranking">
                    <div class="rankBronze" v-if="points <= 500">
                        Bronze Helpr
                    </div>
                    <div class="rankSilver" v-else-if="points > 500 && points <= 2000">
                        Silver Helpr
                    </div>
                    <div class="rankGold" v-else-if="points > 2000 && points <= 3500">
                        Gold Helpr
                    </div>
                    <div class="rankPlatinum" v-else-if="points > 3500 && points <= 5000">
                        Platinum Helpr
                    </div>
                    <div class="rankDiamond" v-else-if="points > 5000">
                        Diamond Helpr
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="header">
                    <img :src="photo">
                    <div class="points">
                        {{ points }}
                    </div>
                </div>
                <div class="name">
                    {{ name }}
                </div>
                <div class="title">
                    {{ title }}
                </div>
                <div class="tags">
                    <div v-for="userTag in userTags" v-bind:key="userTag.id">
                        {{userTag.tagName}}
                    </div>
                </div>
                <div class="description">
                    <div>
                        {{ description }}
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="userHistoryCard" v-if="showUserHistory">
                <History
                    v-bind:userId="profileUserId"
                ></History>
            </div>
        </transition>
        <div class="userHistoryHovered" v-if="isUserInfoHover && userInfoHover">
            <div class="userHistoryHoveredCard">
                <div class="userHistoryPhoto">
                    <img v-bind:src="userInfoHover.user.photo">
                </div>
                <div class="userHistoryInformation">
                    <div class="userHistoryName">
                        {{userInfoHover.user.firstname}} {{userInfoHover.user.lastname}}
                    </div>
                    <div class="userHistoryTitle">
                        {{ userInfoHover.userProfile.title }}
                    </div>
                </div>
                <div class="userHistoryRanking">
                    <div class="userHistoryRankBronze" v-if="userInfoHover.userProfile.points <= 500">
                        Bronze Helpr
                    </div>
                    <div class="userHistoryRankSilver" v-else-if="userInfoHover.userProfile.points > 500 && userInfoHover.userProfile.points <= 2000">
                        Silver Helpr
                    </div>
                    <div class="userHistoryRankGold" v-else-if="userInfoHover.userProfile.points > 2000 && userInfoHover.userProfile.points <= 3500">
                        Gold Helpr
                    </div>
                    <div class="userHistoryRankPlatinum" v-else-if="userInfoHover.userProfile.points > 3500 && userInfoHover.userProfile.points <= 5000">
                        Platinum Helpr
                    </div>
                    <div class="userHistoryRankDiamond" v-else-if="userInfoHover.userProfile.points > 5000">
                        Diamond Helpr
                    </div>
                </div>
                <div class="userHistoryComment">
                    {{ userInfoHover.commentFromUser }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileService from '../services/userprofile.service.js';
import UserTagService from '../services/usertag.service.js';
import LoggerService from '../services/logger.service.js';
import Navbar from "@/components/Navbar";
import History from '../components/profile-components/History';
import { emitter } from '../components/common/event-bus';

const userProfileService = new UserProfileService();
const userTagService = new UserTagService();
const loggerService = new LoggerService();

export default {
    data: function() {
        return {
            userTags: [],
            profileUserId: 0,
            name: '',
            points: 0,
            title: '',
            description: '',
            userProfileId: 0,
            showUserHistory: false,
            isUserInfoHover: false,
            userInfoHover: {}
        }
    },
    props: {
        userId: String,
        firstname: String,
        lastname: String,
        photo: String,
        email: String
    },
    components: {
        Navbar,
        History
    },
    methods: {
        async setData() {
            this.name = this.firstname + " " + this.lastname;
        },
        async getUserProfileData() {
            await userProfileService.getUserProfileById(this.profileUserId)
            .then(response => {
                if (response.status === 200) {
                    this.points = response.data.points;
                    this.title = response.data.title;
                    this.description = response.data.aboutMe;
                    this.userProfileId = response.data.id;
                } else {
                    const log = {
                        success: false,
                        message: "Could not get UserProfile data",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        async getUserTags() {
            await userTagService.getUserTagsById(this.profileUserId)
            .then(data => {
                if (data) {
                    this.userTags = data;
                }
            })
        },
        helprHistoryDisplay() {
            this.showUserHistory = !this.showUserHistory;
        }
    },
    async mounted() {
        this.profileUserId = parseInt(this.userId);
        await this.setData();
        await this.getUserProfileData();
        await this.getUserTags();

        emitter.on('user-hover-info-event', event => {
            this.isUserInfoHover = event.isUserInfoHover;
            this.userInfoHover = event.userInfoHover
        });

        emitter.on('user-leave-hover-info-event', () => {
            this.isUserInfoHover = false;
            this.userInfoHover = {};
        });
    },
    beforeUnmount: function() {
        emitter.off('user-hover-info-event', () => {});
        emitter.off('user-leave-hover-info-event', () => {});
    }
}
</script>

<style scoped lang="scss">
.navbar {
    position: absolute;
    width: 100vw;
    top: 0;
}

.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-image: url("../assets/questions-background.svg");
    background-repeat: no-repeat;
    background-size: cover;
    color: black;
    height: 100vh;

    .content {
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        .top {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 28px;

            a {
                display: flex;
                align-items: center;
                justify-content: center;

                .back {
                    position: relative;
                    left: -5px;
                    background-color: #f1f1f1;
                    border-radius: 50%;
                    height: 40px;
                    margin: 0 8px 8px 0;
                    width: 40px;

                    img {
                        height: 15px;
                    }

                    &:hover {
                        background-color: #fafafa;
                        cursor: pointer;
                    }
                }
            }

            .helprHistory {
                padding: 3px;
                margin-bottom: 7px;
                position: relative;
                left: 0px;
                font-family: 'Patrick Hand SC', cursive;
                width: 230px;
                font-size: 25px;
                font-weight: 600;
                border-radius: 24px;
                background-color: #42b983;

                &:hover {
                    cursor: pointer;
                }
            }

            .ranking {
                position: relative;
                left: 10px;
                width: 210px;
                font-size: 25px;
                font-weight: 600;
                font-family: 'Patrick Hand SC', cursive;

                .rankBronze {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #CD7F32;
                }

                .rankSilver {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #C0C0C0;
                }

                .rankGold {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #FFD700;
                }

                .rankPlatinum {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #b19cd9;
                }

                .rankDiamond {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #b9f2ff;
                }
            }
        }

        .main {
            display: flex;
            flex-direction: column;

            background-color: #F1F1F1;
            background-image: url("../assets/card-background.svg");
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 40px;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            height: 40rem;
            padding: 12px;
            width: 30rem;

            .header {
                margin: 24px 0 0 0;

                img {
                    height: 225px;
                    border-radius: 50%;
                }

                .points {
                    position: absolute;
                    left: 14rem;
                    top: 15rem;
                    background-color: #D25982;
                    width: 3rem;
                    border-radius: 24px;
                    padding: 8px;
                    margin: auto;
                    font-weight: 600;
                }
            }

            .name {
                margin-top: 12px;
                font-size: 55px;
                line-height: 50px;
                font-family: 'Patrick Hand SC', cursive;
            }

            .title {
                font-size: 25px;
                font-family: 'Patrick Hand SC', cursive;
            }

            .tags {
                display: flex;
                justify-content: center;

                div {
                    margin: 12px 6px;
                    background-color: #FFEE58;
                    padding: 4px 8px;
                    border-radius: 8px;
                }
            }

            .description {
                margin-top:15px;
                justify-content: center;
                align-items: center;

                div {
                    text-align: left;
                }
            }
        }
    }

    .userHistoryCard {
        position: fixed;
        left: 1550px;
    }

    .userHistoryHovered {
        .userHistoryHoveredCard {
            position: fixed;
            top: 275px;
            right: 290px;
            height: 400px;
            width: 300px;
            background-color: white;
            border-style: solid;
            border-color: #1de9b6;
            border-radius: 12px;

            img {
                margin-top: 10px;
                height: 120px;
                border-radius: 12px;
            }

            .userHistoryRanking {
                position: relative;
                left: 55px;
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

            .userHistoryComment {
                margin-top: 15px;
                font-size: 20px;
                font-family: 'Patrick Hand SC', cursive;
            }

            .userHistoryInformation {
                .userHistoryName {
                    font-size: 35px;
                    font-family: 'Patrick Hand SC', cursive;
                }

                .userHistoryTitle {
                    margin-top: -5px;
                    font-size: 25px;
                    font-family: 'Patrick Hand SC', cursive;
                }
            }
        }
    }
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
