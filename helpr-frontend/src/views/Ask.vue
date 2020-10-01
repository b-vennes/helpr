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
      <Button txt="Submit" class="secondary submit"></Button>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button'

export default {
  components: {
    Button
  }
}
</script>


<style scoped lang="scss">
 .container {
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;

   color: black;
   background-image: url("../assets/questions-background.svg");
   background-repeat: no-repeat;
   background-size: cover;
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

         background-color: #f1f1f1;
         border-radius: 50%;
         height: 40px;
         margin: 0 8px 8px 0;
         width: 40px;

         img {
           height: 15px;
         }

         &:hover {
           cursor: pointer;
           background-color: #fafafa;
         }
       }
     }

     .inputs {
       display: flex;
       align-items: flex-start;
       flex-direction: column;

       background-color: rgba(#F1F1F1, 0.4);
       border-radius: 12px;
       margin-bottom: 4px;
       padding: 12px;

       .title {
         background-color: #f1f1f1;
         border: 0;
         border-radius: 8px;
         font-size: 18px;
         height: 30px;
         margin-bottom: 8px;
         outline: 0;
         padding: 4px 8px;
         width: 30rem;
       }

       .description {
         background-color: #f1f1f1;
         border: 0;
         border-radius: 8px;
         font-family: Avenir, Helvetica, Arial, sans-serif;
         font-size: 16px;
         outline: 0;
         margin-bottom: 8px;
         padding: 4px 8px;
         resize: none;
         width: 60rem;
       }
     }

     .submit {
       align-self: flex-end;
     }
   }
 }

 // Remove the underline from the router button.
 a { text-decoration: none;}
</style>
