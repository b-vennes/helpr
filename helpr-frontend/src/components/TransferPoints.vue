<template>
    <div class="transferPointsContainer">
        <div class="transferPointsCard">
            <div class="searchUser">
                <input v-model="search" class="search" placeholder="Search for a User">
            </div>
            <div class="usersContainer" v-if="users">
                <div v-for="user in users" @mouseover="userHoverOver(user)" @mouseleave="userHoverLeave()" @click="selectedUser(user)" v-bind:key="user.id">
                    <div class="user" v-if="user.id != loggedInUserId">
                        {{ user.firstname }} {{ user.lastname }}
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="footerUserSelected" v-if="ischosenUserForTransfer">
                    Are you sure you want to send {{ points }} points to 
                    {{ chosenUserForTransfer.firstname }} 
                    {{ chosenUserForTransfer.lastname}} ?
                    <div class="buttons">
                        <Button @click="yesSelected()" txt="Yes" class="secondary submit"></Button>
                        <Button @click="cancel()" txt="Cancel" class="cancel"></Button>
                    </div>
                </div>
                <div class="footerUserUnselected" v-else>
                    Select a user that helped you with you Helpr Request
                    <div class="buttons">
                        <Button @click="exitTransfer()" txt="Exit Transfer" class="cancel"></Button>
                    </div>
                </div>
                <div class="footerShowUserHover" v-if="isUserInfoHover">
                    <div class="userPhoto">
                        <img v-bind:src="userInfoHover.photo">
                    </div>
                    <div class="userName">
                        {{ userInfoHover.firstname }}
                    </div>
                    <div class="userTitle">
                        {{ userInfoHover.title }}
                    </div>
                    <div class="userPoints">
                        Points: {{ userInfoHover.points }}
                    </div>
                    <div class="userRanking">
                        <div class="rankBronze" v-if="userInfoHover.points <= 500">
                            Bronze Helpr
                        </div>
                        <div class="rankSilver" v-else-if="userInfoHover.points > 500 && userInfoHover.points <= 2000">
                            Silver Helpr
                        </div>
                        <div class="rankGold" v-else-if="userInfoHover.points > 2000 && userInfoHover.points <= 3500">
                            Gold Helpr
                        </div>
                        <div class="rankPlatinum" v-else-if="userInfoHover.points > 3500 && userInfoHover.points <= 5000">
                            Platinum Helpr
                        </div>
                        <div class="rankDiamond" v-else-if="userInfoHover.points > 5000">
                            Diamond Helpr
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service.js';
import UserProfileService from '../services/userprofile.service.js';
import RequestService from '../services/request.service.js';
import Button from './Button';
import { emitter } from '../components/common/event-bus';

const userService = new UserService();
const userProfileService = new UserProfileService();
const requestService = new RequestService();

export default {
    data: function() {
        return {
            users: [],
            search: "",
            chosenUserForTransfer: {},
            ischosenUserForTransfer: false,
            loggedInUserId: 0,
            isUserInfoHover: false,
            userInfoHover: {}
        }
    },
    props: {
        points: Number,
        requestId: Number
    },
    components: {
        Button
    },
    methods: {
        async getUserProfileData(userId) {
            await userProfileService.getUserProfileById(userId)
            .then(data => {
                if (data) {
                    this.userInfoHover.points = data.points;
                    this.userInfoHover.title = data.title;
                    this.userInfoHover.description = data.aboutMe;
                    this.userInfoHover.userProfileId = data.id;
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
        async userHoverOver(user) {
            this.userInfoHover = user;
            await this.getUserProfileData(user.id);
            this.isUserInfoHover = true;
        },
        selectedUser(user) {
            this.isUserInfoHover = false;
            this.userInfoHover = {};
            this.chosenUserForTransfer = user;
            this.ischosenUserForTransfer = true;
        },
        async yesSelected() {
            const userToDeduct = {
                id: parseInt(localStorage.getItem('userProfileId')),
                points: this.points
            };

            const userToReward = {
                id: this.chosenUserForTransfer.id,
                points: this.points
            };

            const requestToClose = {
                id: this.requestId
            };

            await userProfileService.deductPointsToUserProfile(userToDeduct)
            .then(() => {});

            await userProfileService.addPointsToUserProfile(userToReward)
            .then(() => {});

            await requestService.closeRequest(requestToClose)
            .then(() => {});

            this.chosenUserForTransfer = {};
            this.ischosenUserForTransfer = false;
            this.exitTransfer();
        },
        cancel() {
            this.chosenUserForTransfer = {};
            this.ischosenUserForTransfer = false;
        },
        exitTransfer() {
            emitter.emit('exit-transfer-points-event');
        },
        userHoverLeave() {
            this.isUserInfoHover = false;
            this.userInfoHover = {};
        }
    },
    async mounted() {
        this.loggedInUserId = localStorage.getItem('userId');

        await this.getAllUsers();
    }
}
</script>


<style scoped lang="scss">
.transferPointsContainer {
    position: relative;
    top: 190px;
    left: -55px;
    float: right;
    width: 250px;
    height: 700px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    background-color: #42b983;
    
    .transferPointsCard {
        .searchUser {
            .search {
                width: 80%;
                margin-top: 10px;
                height: 30px;
                border-radius: 12px;
                font-family: 'Patrick Hand SC', cursive;

                input {
                    font-size: 25px;
                    border-color: #42b983;
                    outline: none;
                    border: none;
                }
            }
        }

        .usersContainer {
            padding: 20px;
            width: 67%;
            height: 425px;
            margin-top: 10px;
            margin-left: 20px;
            border-radius: 12px;
            overflow-y: scroll;
            background-color: white;

            .user {
                margin-bottom: 10px;
                padding: 10px;
                border-style: solid;
                border-color: #90EE90;
                border-radius: 12px;
                cursor: pointer;
            }
        }

        .footer {
            padding: 20px;
            height: 75%;

            .footerUserSelected {
                margin-top: 10px;
                width: 100%;
                background-color: #42b983;

                .buttons {
                    margin-top: 15px;
                    align-self: flex-end;

                    .submit {
                        cursor: pointer;
                        display: inline-block;
                        margin-right: 10px;
                    }

                    .cancel {
                        cursor: pointer;
                        display: inline-block;
                    }
                }
            }
            
            .footerUserUnselected {
                margin-top: 20px;
                background-color: #42b983;

                .buttons {
                    margin-top: 15px;

                    .cancel {
                        cursor: pointer;
                    }
                }
            }

            .footerShowUserHover {
                position: relative;
                top: -120px;
                height: 140px;
                background-color: #F1F1F1;
                border-radius: 12px;

                img {
                    position: relative;
                    top: 10px;
                    left: -60px;
                    height: 70px;
                    border-radius: 12px;
                }

                .userName {
                    position: relative;
                    top: -60px;
                    left: 10px;
                    font-size: 20px;
                }

                .userTitle {
                    position: relative;
                    top: -60px;
                    left: 25px;
                    font-size: 15px;
                }

                .userPoints {
                    position: relative;
                    top: -60px;
                    left: 25px;
                    font-size: 15px;
                    color: lightcoral;
                }

                .userRanking {
                    position: relative;
                    width: 90%;
                    left: 10px;
                    top: -42px;
                    font-weight: 600;
                    font-size: 20px;
                    font-family: 'Patrick Hand SC', cursive;

                    .rankBronze {
                        padding: 3px;
                        border-radius: 24px;
                        height: 20%;
                        background-color: #CD7F32;
                    }

                    .rankSilver {
                        padding: 3px;
                        border-radius: 24px;
                        height: 20%;
                        background-color: #C0C0C0;
                    }

                    .rankGold {
                        padding: 3px;
                        border-radius: 24px;
                        height: 20%;
                        background-color: #FFD700;
                    }

                    .rankPlatinum {
                        padding: 3px;
                        border-radius: 24px;
                        height: 20%;
                        background-color: #a076ee;
                    }

                    .rankDiamond {
                        padding: 3px;
                        border-radius: 24px;
                        height: 20%;
                        background-color: #b9f2ff;
                    }
                }
            }
        }
    }
}
</style>