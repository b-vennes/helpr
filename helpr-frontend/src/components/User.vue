<template>
  <router-link :to="{ name: 'Card', params: { 
      userId: sendUserId, 
      firstname: user.firstname,
      lastname: user.lastname,
      photo: user.photo,
      email: user.email }
    }">
    <div class="userinformation">
        <img v-bind:src="user.photo">
        <div class="information">
            <div class="username">{{user.firstname}} {{user.lastname}}</div>
            <div class="createdDate">{{createdDateRequest}}</div>
        </div>
    </div>
  </router-link>
</template>


<script>
import UserService from '../services/user.service.js';
import LoggerService from '../services/logger.service.js';

const userService = new UserService();
const loggerService = new LoggerService();

export default {
    name: 'User',
    props: {
        userId: Number,
        createdDate: String,
    },
    data: function(){
        return {
            sendUserId: 0,
            user: {},
            createdDateRequest: new Date()
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
                        message: "Get request unsuccessful in User/getUser()",
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
        let date = new Date(this.createdDate);
        this.createdDateRequest = date.toDateString();

        this.sendUserId = parseInt(this.userId);
        await this.getUser();
    }
}
</script>

<style lang="scss" scoped>
    .userinformation {
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: #90EE90;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        padding: 8px 16px 0 12px;

        img {
            height: 52px;
            border-radius: 50%;
        }

        .information {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            align-self: center;
            margin-left: 8px;

            .username {
                font-size: 15px;
            }

            .email {
                font-size: 15px;
            }

            .createdDate {
                margin-top: 3px;
                font-size: 11px;
                color: #228B22;
            }
        }
    }
</style>
