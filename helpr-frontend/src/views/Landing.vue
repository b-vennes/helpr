<template>
  <div class="container">
    <div class="content">
      <div class="title">Helpr</div>
      <div class="subtitle">What do you need help with?</div>
      <button class="btn">
        <img src="../assets/google-logo.png">
        <div class="text">Sign in with Google</div>
      </button>
    </div>
  </div>
</template>

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
       font-family: 'Patrick Hand SC', cursive;
       font-size: 17rem;
       line-height: 14rem;
     }

     .subtitle {
       font-size: 1.7rem;
     }

     .btn {
       display: flex;

       background-color: #F06292;
       border: none;
       border-radius: 28px;
       filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
       font-family: 'Roboto', sans-serif;
       font-size: 33px;
       margin: 20px auto 30px auto;
       outline: none;
       padding: 16px;

       img {
         height: 33px;
         margin-right: 8px;
       }

       .text {
         border: none;
         font-family: 'Roboto', sans-serif;
         font-size: 24px;
       }

       &:hover {
         background-color: #E35D8A;
         cursor: pointer;
       }

       &:active {
         background-color: #D25982;
       }
     }
   }
 }
</style>
