<template>
  <div class="container">
    <div class="content">
      <div class="title">Loading</div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service.js';
import UserProfileService from '../services/userprofile.service.js';
import LoggerService from '../services/logger.service.js';

const userService = new UserService();
const userProfileService = new UserProfileService();
const loggerService = new LoggerService();

export default {
    name: 'Loading',
    data: function() {
        return {
            
        }
    },
    methods: {
        async getUserProfileData(userId) {
            await userProfileService.getUserProfileById(userId)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('points', response.data.points)
                    localStorage.setItem('title', response.data.title)
                    localStorage.setItem('description', response.data.aboutMe)
                    localStorage.setItem('userProfileId', parseInt(response.data.id))
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Loading/getUserProfileData()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });
        },
        async getUser() {
            const searchCodeParameter = window.location.href;
            const id = searchCodeParameter.substring(searchCodeParameter.lastIndexOf('/') + 1);

            await userService.getUser(id)
            .then(response => {
                if (response.status === 200) {
                    this.getUserProfileData(response.data.id);
                    localStorage.setItem('companyId', response.data.companyId)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('firstname', response.data.firstname)
                    localStorage.setItem('lastname', response.data.lastname)
                    localStorage.setItem('userId', response.data.id)
                    localStorage.setItem('photo', response.data.photo)
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('requiresAuth', 'userIsAuthorized')
                    setTimeout(function () {
                        window.location.replace("http://localhost:8080/#/requests");
                    }, 2000);
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Loading/getUser()",
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
        await this.getUser();
    }
}
</script>

<style scoped lang="scss">
 .container {
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;

   background-image: url("../assets/landing-background.svg");
   background-repeat: no-repeat;
   background-size: cover;
   color: black;
   height: 100vh;

   .content {
     .title {
       animation: colorWheel 15s infinite;
       color: rgb(236,100,75);
       font-family: 'Patrick Hand SC', cursive;
       font-size: 17rem;
       line-height: 14rem;
     }
   }
 }

 // Remove the underline from the router button.
 a { text-decoration: none;}

 @keyframes colorWheel {
   from, to { color: black; }
   5%      { color: black; }
   10%      { color: black; }
   15%      { color: black; }
   20%      { color: black; }
   25%      { color: black; }
   30%      { color: black; }
   35%      { color: black; }
   40%      { color: black; }
   45%      { color: black; }
   50%      { color: #1de9b6; }
   55%      { color: #f06292; }
   60%      { color: #AB47BC; }
   65%      { color: #5C6BC0; }
   70%      { color: #26C6DA; }
   75%      { color: #FFEE58; }
   80%      { color: #FFA726; }
   85%      { color: #FF7043; }
   90%      { color: black; }
 }
</style>
