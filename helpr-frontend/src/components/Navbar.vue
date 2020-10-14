<template>
    <div class="navbarContainer">
        <div class="nav" v-if="load">
            <div class="left">
                <router-link to="/requests">
                    <div class="requests" v-bind:class="{ active: this.$route.name === 'Requests' }"><a class="routeText">Requests</a></div>
                </router-link>
                <div class="messages" v-bind:class="{ active: this.$route.name === 'Messages' }"><a class="routeText">Messages</a></div>
                <div class="rankings" v-bind:class="{ active: this.$route.name === 'Rankings' }"><a class="routeText">Rankings</a></div>
                <div class="contact" v-bind:class="{ active: this.$route.name === 'Contact' }"><a class="routeText">Contact</a></div>
            </div>
            
            <div class="right">
                <img @click="openNotifications()" src="https://img.icons8.com/fluent-systems-regular/24/000000/appointment-reminders.png"/>
                <router-link to="/profile">
                    <div class="profile" v-bind:class="{ active: this.$route.name === 'Profile'}"><a class="routeText">Profile</a></div>
                </router-link>
                <img @click="toggleModal()" :src="photo">
            </div>
        </div>

        <div class="modal" v-if="showModal">
            <div>James One</div>
            <Button class="secondary logout" txt="Log out" @click="logout"></Button>
        </div>
        <div class="notificationModalContainer">
            <div class="notificationModal" v-if="showNotifications">
                <div>Notifications</div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: 'Navbar',
  components: {
    Button
  },
  data: function() {
    return {
      showModal: false,
      showNotifications: false,
      load: true,
      goToUserProfile: false,
      photo: '',
    }
  },
  props: {
    activeTab: String
  },
  methods: {
    logout: function() {
      localStorage.setItem('requiresAuth', 'userIsNotAuthorized')
      localStorage.clear()
      this.load = true;
      window.location.replace("http://localhost:8080");
    },
    toggleModal: function() {
      this.showModal = !this.showModal;
    },
    openNotifications: function() {
        this.showNotifications = !this.showNotifications;
    }
  },
  mounted: function() {
    this.photo = localStorage.getItem('photo');

    if (localStorage.getItem('requiresAuth') === "userIsAuthorized") {
      this.load = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #1de9b6;
  color: black;
  height: 48px;
}

.left {
  display: flex;
  align-items: center;

  padding: 8px;

  div {
    margin: 2px 12px;
    padding: 16px 8px;

    &.active {
      background-color: #42b983;
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.right {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 2px 12px;

  img {
    border: 2px solid #42b983;
    border-radius: 50%;
    height: 36px;
    margin-right: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  .profile {
      margin-right: 20px;
  }
}

.modal {
  display: flex;
  //align-items: center;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  right: 12px;
  height: 8rem;
  width: 8rem;
  background-color: #F1F1F1;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 1;
}
.notificationModalContainer {
    margin-top: 10px;

    .notificationModal {
        flex-direction: column;
        justify-content: center;

        position: absolute;
        right: 20px;
        height: 32rem;
        width: 16rem;
        background-color: #F1F1F1;
        border-radius: 8px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        z-index: 1;
    }
}

.routeText {
      font-size: 20px;
      font-family: Helvetica; 
      font-weight: bold;
      color: darkgreen;
  }
</style>
