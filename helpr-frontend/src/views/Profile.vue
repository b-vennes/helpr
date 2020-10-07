<template>
  <div class="container">
    <Navbar class="navbar"></Navbar>
    <div class="profileContainer">
    <div class="content">
      <div class="top">
        <router-link to="/requests">
          <div class="back">
            <img src="../assets/left-chevron.svg">
          </div>
        </router-link>
      </div>
      <div class="main">
        <div class="header">
            <img :src="photo">
          <div class="points">
            {{ points }}
          </div>
        </div>
        <div class="name">
          {{ name }}
        </div>
        <div class="tags">
            <div v-for="userTag in userTags" v-bind:key="userTag.id">
                {{userTag.tagName}}
            </div>
        </div>
        <div class="description">
          <div>
              {{ description }}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import UserProfileService from '../services/userprofile.service.js';
import UserTagService from '../services/usertag.service.js';
import Navbar from "@/components/Navbar";

const userProfileService = new UserProfileService();
const userTagService = new UserTagService();

export default {
    data: function() {
        return {
            userTags: [],
            name: "",
            photo: "",
            points: 0,
            email: "",
            description: "",
            title: "",
            userId: 0
        }
    },
    components: {
        Navbar
    },
    methods: {
        async setData() {
            let firstName = localStorage.getItem('firstname');
            let lastName = localStorage.getItem('lastname');
            
            this.name = firstName + " " + lastName;
            this.photo = localStorage.getItem('photo');
            this.email = localStorage.getItem('email');
            this.userId = localStorage.getItem('userId');
        },
        async getUserProfileData() {
            await userProfileService.getUserProfileById(this.userId)
            .then(data => {
                if (data) {
                    this.points = data.points;
                    this.title = data.title;
                    this.description = data.aboutMe;
                }
            })
        },
        async getUserTags() {
            await userTagService.getUserTagsById(this.userId)
            .then(data => {
                if (data) {
                    this.userTags = data;
                }
            })
        }
    },
    async mounted() {
        await this.setData();
        await this.getUserProfileData();
        await this.getUserTags();
    }
}
</script>

<style scoped lang="scss">
.navbar {
  position: absolute;
  width: 100vw;
}

.profileContainer {
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

        background-color: #f1f1f1;
        border-radius: 50%;
        height: 40px;
        margin: 0 8px 8px 0;
        width: 40px;

        img {
          height: 15px;
        }

        &:hover {
          background-color: #fafafa;
          cursor: pointer;
        }
      }
    }

    .main {
      display: flex;
      flex-direction: column;

      background-color: #F1F1F1;
      background-image: url("../assets/card-background.svg");
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 40px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      height: 40rem;
      padding: 12px;
      width: 30rem;

      .header {
        margin: 24px 0 0 0;

        img {
          height: 225px;
          border-radius: 50%;
        }

        .points {
          position: absolute;
          left: 14rem;
          top: 15rem;
          background-color: #D25982;
          width: 3rem;
          border-radius: 24px;
          padding: 8px;
          margin: auto;
          font-weight: 600;
        }
      }

      .name {
        margin-top: 12px;
        font-size: 64px;
        line-height: 50px;;
        font-family: 'Patrick Hand SC', cursive;
      }

      .tags {
        display: flex;
        justify-content: center;

        div {
          margin: 12px 6px;
          background-color: #FFEE58;
          padding: 4px 8px;
          border-radius: 8px;
        }
      }

      .description {
        margin-top:15px;
        justify-content: center;
        align-items: center;

        div {
          margin-left: 0.7rem;
          text-align: left;
        }
      }
    }
  }
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
