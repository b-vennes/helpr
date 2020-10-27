<template>
    <div class="navbarContainer">
        <div class="nav" v-if="load">
            <div class="left">
                <router-link to="/requests">
                    <div class="requests" v-bind:class="{ active: this.$route.name === 'Requests' }"><a class="routeText">Requests</a></div>
                </router-link>

                <div class="messages" v-bind:class="{ active: this.$route.name === 'Messages' }"><a class="routeText">Messages</a></div>

                <router-link to="/rankings">
                    <div class="rankings" v-bind:class="{ active: this.$route.name === 'Rankings' }"><a class="routeText">Rankings</a></div>
                </router-link>

                <div class="contact" v-bind:class="{ active: this.$route.name === 'Contact' }"><a class="routeText">Contact</a></div>

            </div>
            
            <div class="right">
                <div v-if="hasNotifications">
                    <img class="notificationIcon" @click="openNotifications()" src="https://img.icons8.com/fluent-systems-filled/24/000000/appointment-reminders.png"/>
                </div>
                <div v-else>
                    <img class="notificationIcon" @click="openNotifications()" src="https://img.icons8.com/fluent-systems-regular/24/000000/appointment-reminders.png"/>
                </div>
                <router-link to="/profile">
                    <div class="profile" v-bind:class="{ active: this.$route.name === 'Profile'}"><a class="routeText">Profile</a></div>
                </router-link>
                <img class="profilePicture" @click="toggleModal()" :src="photo">
            </div>
        </div>

        <div class="modal" v-if="showModal">
            <div>James One</div>
            <Button class="secondary logout" txt="Log out" @click="logout"></Button>
        </div>
        <div class="notificationModalContainer">
            <div class="notificationModal" v-if="showNotifications">
                <div class="notificationTitle">Notifications</div>
                <Notifications></Notifications>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationService from '../services/notifications.service.js';
import LoggerService from '../services/logger.service.js';
import Button from "@/components/Button";
import Notifications from './Notifications';

const notificationService = new NotificationService();
const loggerService = new LoggerService();

export default {
    name: 'Navbar',
    components: {
        Button,
        Notifications
    },
    data: function() {
        return {
            showModal: false,
            showNotifications: false,
            load: true,
            goToUserProfile: false,
            photo: '',
            hasNotifications: false,
            notifications: []
        }
    },
    props: {
        activeTab: String
    },
    methods: {
        async getNotifications() {
            await notificationService.getNotificationsByUserId(localStorage.getItem('userId'))
                .then(response => {
                    if (response.status === 200) {
                        for (var notification of response.data) {
                            if (!notification.isOpened) {
                                this.hasNotifications = true;
                            }
                        }
                    } else {
                        const log = {
                            success: false,
                            message: "Get request unsuccessful in Navbar/getNotifications()",
                            httpStatusCode: response.status,
                            isBackEnd: false,
                            isFrontEnd: true,
                            timestamp: new Date()
                        };

                        loggerService.createLog(log);
                    }
            })
        },
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
    async mounted() {
        await this.getNotifications();

        this.photo = localStorage.getItem('photo');

        if (localStorage.getItem('requiresAuth') === "userIsAuthorized") {
            this.load = true;
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #1de9b6;
    color: black;
    height: 54px;
    transition: top 0.3s;
}

.left {
    display: flex;
    align-items: center;
    padding: 8px;

    div {
        margin: 2px 12px;
        padding: 16px 8px;

        &.active {
            padding: 12px;
            border-radius: 12px;
            background-color: #42b983;
        }

        &:hover {
            cursor: pointer;
            padding: 12px;
            border-radius: 12px;
            background-color: #ddd;
            color: black;
        }
    }
}

.right {
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 2px 12px;

    .profilePicture {
        border-radius: 50%;
    }

    .notificationIcon {
        margin-top: 5px;
    }

    img {
        height: 36px;
        margin-right: 20px;
        cursor: pointer;
    
    div {
        &.active {
            background-color: #42b983;
        }

        &:hover {
            cursor: pointer;
            text-decoration: none;
        }
    }
  }

  .profile {
      margin-right: 20px;
  }
}

.modal {
    display: flex;
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
        height: 35rem;
        width: 20rem;
        background-color: #F1F1F1;
        border-radius: 8px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        z-index: 1;

        .notificationTitle {
            margin-top: 20px;
            font-size: 30px;
        }
    }
}

.routeText {
    font-size: 20px;
    font-family: Helvetica; 
    font-weight: bold;
    color: darkgreen;
}
</style>
