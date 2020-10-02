<template>
  <div class="container">
    <div class="content">
      <div class="title">Helpr</div>
      <div class="subtitle">What do you need help with?</div>
        <button @click="login" class="btn">
          <img src="../assets/google-logo.png">
          <div class="text">SIGN IN WITH GOOGLE</div>
        </button>
    </div>
    <div class="footer">A Viewpoint Project</div>
  </div>
</template>

<script>
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

export default {
    data: function() {
        return {
            
        }
    },
    methods: {
        async login() {
            await authService.login()
            .then(data => {
                console.log(data);
                if (data) {
                    localStorage.setItem('userInformation', data);
                    window.location.href = "http://localhost:8080/#/questions";
                }
            })
        }
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

     .subtitle {
       font-size: 1.7rem;
     }

     .btn {
       display: flex;
       align-items: center;

       background-color: #F06292;
       border: none;
       border-radius: 28px;
       filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
       font-family: 'Roboto', sans-serif;
       margin: 20px auto 30px auto;
       outline: none;
       padding: 16px;

       img {
         height: 26px;
         margin-right: 8px;
       }

       .text {
         border: none;
         font-family: 'Roboto', sans-serif;
         font-size: 20px;
       }

       &:hover {
         background-color: #E35D8A;
         cursor: pointer;
         filter: drop-shadow(0px 4.5px 4.5px rgba(0, 0.0, 0.0, 0.30));
       }

       &:active {
         background-color: #D25982;
       }
     }
   }

   .footer {
     position: absolute;
     bottom: 12px;
     left: 12px;
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
