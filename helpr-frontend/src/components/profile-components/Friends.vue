<template>
    <div class="friendsContainer">
        <div class="friendsCard">
            <div class="friendsTitle">
                Friends List
            </div>
        </div>
        <div class="userFriendsList" v-if="userFriends">
            <div class="userFriends" v-for="friend in userFriends" :key="friend.id">
                <div class="friend">
                    <div class="rowFriend">
                        <div class="friendPhoto">
                            <img v-bind:src="friend.photo">
                        </div>
                        <div class="friendInformation">
                            <div class="friendName">
                                {{friend.firstname}} {{friend.lastname}}
                            </div>
                            <div class="friendEmail">
                                {{friend.email}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FriendService from '../../services/friend.service.js';
import LoggerService from '../../services/logger.service.js';

const friendService = new FriendService();
const loggerService = new LoggerService();

export default {
    data: function() {
        return {
            userFriends: [],
            profileUserId: 0
        }
    },
    props: {
        userId: String
    },
    methods: {
        async getFriendsByUserId() {
            await friendService.getFriendsByUserId(this.profileUserId)
            .then(response => {
                if (response.status === 200) {
                    this.userFriends = response.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Profile/Friends/getFriendsByUserId()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        }
    },
    async mounted() {
        this.profileUserId = parseInt(this.userId);
        
        await this.getFriendsByUserId();
    }
    
}
</script>


<style scoped lang="scss">
.friendsContainer {
    width: 400px;
    height: 700px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    background-color: #1de9b6;

    .friendsCard {
        .friendsTitle {
            font-size: 30px;
            padding: 20px;
        }
    }

    .userFriendsList {
        padding: 20px;
        width: 80%;
        height: 500px;
        margin-top: 10px;
        margin-left: 20px;
        border-radius: 12px;
        overflow-y: scroll;
        background-color: white;

        .userFriends {
            margin-bottom: 10px;
            padding: 10px;
            border-style: solid;
            border-color: #90EE90;
            border-radius: 12px;
            cursor: pointer;

            .friend {
                .rowFriend {
                    img {
                        height: 60px;
                        border-radius: 12px;
                    }
                    .friendInformation{
                        .friendName {
                            display: inline-block;
                            font-weight: bold;
                            font-size: 20px;
                        }

                        .friendEmail {

                        }
                    }
                }
            }
        }
    }
}
</style>