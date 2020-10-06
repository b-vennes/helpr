<template>
  <div class="userinformation">
    <img v-bind:src="user.photo">
    <div class="information">
        <div class="username">{{user.firstname}} {{user.lastname}}</div>
        <div class="email">{{user.email}}</div>
        <div class="createdDate">{{createdDate}}</div>
    </div>
  </div>
</template>


<script>
import UserService from '../services/user.service.js';
const userService = new UserService();

export default {
    name: 'User',
    props: {
        userId: Number,
        createdDate: String
    },
    data: function(){
        return {
            user: {}
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
        }
    },
    async mounted() {
        await this.getUser();
    }
}
</script>

<style lang="scss" scoped>
    .userinformation {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: #F1F1F1;
        border-radius: 24px;
        padding: 16px;

        img {
            height: 70px;
            border-radius: 24px;
        }

        .information {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-left: 15px;

            .username {
                font-size: 25px;
            }

            .email {
                font-size: 15px;
            }

            .createdDate {
                font-size: 15px;
                color: #228B22;
            }
        }
    }
</style>