<template>
    <div class="notificationContainer">
        <div class="notifications" v-for="notification in notifications" @click="goToRequest(notification.requestId, notification)" v-bind:key="notification.id">
            <div v-if="notification.requestId != 0">
                <div v-if="notification.isOpened">
                    <div class="notificationDotOpened">
                        .
                    </div>
                    <div class="notificationDescription">
                        {{notification.description}}
                    </div>
                </div>
                <div v-else>
                    <div class="notificationDotNotOpened">
                        .
                    </div>
                    <div class="notificationDescription">
                        {{notification.description}}
                    </div>
                </div>
            </div>
            <div v-else-if="notification.requestId == 0">
                <div v-if="notification.isOpened">
                    <div class="notificationDotOpened">
                        .
                    </div>
                    <div class="notificationDescription">
                        {{notification.description}}
                    </div>
                </div>
                <div v-else>
                    <div class="notificationDotNotOpened">
                        .
                    </div>
                    <div class="notificationDescription">
                        {{notification.description}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationService from '../services/notifications.service.js';
import LoggerService from '../services/logger.service.js';

const notificationService = new NotificationService();
const loggerService = new LoggerService();

export default {
    name: 'Notifications',
    props: {

    },
    data: function() {
        return {
            notifications: []
        }
    },
    methods: {
        async goToRequest(requestId, notification) {
            if (!notification.isOpened) {
                await notificationService.setIsOpened(notification)
                .then(response => {
                    if (response.status === 200) {
                        const log = {
                            success: true,
                            message: "Successfully updated a Helpr Notification in Notifications/goToRequest()",
                            httpStatusCode: response.status,
                            isBackEnd: false,
                            isFrontEnd: true,
                            timestamp: new Date()
                        };

                        loggerService.createLog(log);
                    } else {
                        const log = {
                            success: false,
                            message: "Could not update a Helpr Notification in Notifications/goToRequest()",
                            httpStatusCode: response.status,
                            isBackEnd: false,
                            isFrontEnd: true,
                            timestamp: new Date()
                        };

                        loggerService.createLog(log);
                    }
                })
            }

            notification.isOpened = true;

            window.location.replace("http://localhost:8080/#/request/" + requestId);
        },
        async getNotifications() {
            await notificationService.getNotificationsByUserId(localStorage.getItem('userId'))
            .then(response => {
                if (response.status === 200) {
                    this.notifications = response.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Notifications/getNotifications()",
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
        await this.getNotifications();
    }
}
</script>


<style scoped lang="scss">
.notificationContainer {
    padding: 5px;

    .notifications {
        border-radius: 12px;
        text-align: left;
        border-color: #90EE90;
        border-style: solid;
        height: 50px;
        padding: 15px;
        margin-bottom: 10px;
        cursor: pointer;

        &:hover {
            background-color: #90EE90;
        }

        .notificationDotOpened {
            position: relative;
            top: -90px;
            left: 260px;
            height: 10px;
            font-size: 100px;
            color: gray;
        }

        .notificationDotNotOpened {
            position: relative;
            top: -90px;
            left: 260px;
            height: 10px;
            font-size: 100px;
            color: #90EE90;
        }
    }
}

.notificationDescription {
    position: relative;
    top: -10px;
    margin-right: 10px;
}
</style>