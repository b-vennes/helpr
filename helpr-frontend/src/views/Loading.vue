<template>
  <div class="container">
    <div class="content">
      <div class="title">Loading</div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service.js';

const userService = new UserService();

export default {
    name: 'Loading',
    data: function() {
        return {
            
        }
    },
    methods: {
        async getUser() {
            const searchCodeParameter = window.location.href;
            const id = searchCodeParameter.substring(searchCodeParameter.lastIndexOf('/') + 1);

            await userService.getUser(id)
            .then(data => {
                if (data) {
                    localStorage.setItem('companyId', data.companyId)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('firstname', data.firstname)
                    localStorage.setItem('lastname', data.lastname)
                    localStorage.setItem('userId', data.id)
                    localStorage.setItem('photo', data.photo)
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('requiresAuth', 'userIsAuthorized')
                    setTimeout(function () {
                        window.location.replace("http://localhost:8080/#/navigation");
                    }, 2000);
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