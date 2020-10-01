<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <router-link to="/questions">
          <div class="back">
            <img src="../assets/left-chevron.svg">
          </div>
        </router-link>
        <div>Ask a Helpr</div>
      </div>
      <div class="inputs">
        <input class="title" placeholder="Title">
        <textarea class="description" rows="20" placeholder="Description"></textarea>
      </div>
      <div class="submit">Submit</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
       display: flex;
       align-items: center;
       justify-content: center;

       font-size: 28px;

       .back {
         display: flex;
         align-items: center;
         justify-content: center;

         height: 40px;
         width: 40px;
         margin-bottom: 8px;
         margin-right: 8px;
         border-radius: 50%;
         background-color: #f1f1f1;

         img {
           height: 15px;
         }

         &:hover {
           background-color: #fafafa;
           cursor: pointer;
         }
       }
     }

     .inputs {
       display: flex;
       align-items: flex-start;
       flex-direction: column;
       background-color: rgba(#F1F1F1, 0.4);
       padding: 12px;
       border-radius: 12px;
       margin-bottom: 4px;
       .title {
         border: 0;
         outline: 0;
         padding: 4px 8px;
         background-color: #f1f1f1;
         border-radius: 8px;
         height: 30px;
         font-size: 18px;
         width: 30rem;
         margin-bottom: 8px;
       }

       .description {
         font-family: Avenir, Helvetica, Arial, sans-serif;
         border: 0;
         outline: 0;
         padding: 4px 8px;
         background-color: #f1f1f1;
         border-radius: 8px;
         width: 60rem;
         font-size: 16px;
         margin-bottom: 8px;
         resize: none;
       }
     }

     .submit {
       padding: 12px 16px;
       border-radius: 8px;
       background-color: #F06292;
       height: 18px;
       filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));

       align-self: flex-end;

       &:hover {
         cursor: pointer;
         background-color: #f26e9a;
         filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
       }
     }
   }
 }

 // Remove the underline from the router button.
 a { text-decoration: none;}
</style>
