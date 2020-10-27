export default class NotificationService {
    
    async getNotificationsByUserId(userId) {
        const response = await fetch(`http://localhost:3000/notifications/getLatestNotificationsByUserId/` + userId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }

    async sendNotifications(requestId) {
        const body = {
            requestId: requestId
        }

        const response = await fetch(`http://localhost:3000/notifications/sendNotifications`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async sendFriendNotifications(notification) {
        const body = {
            fromUserId: notification.fromUserId,
            toUserId: notification.toUserId,
            friendId: notification.friendId
        };

        const response = await fetch(`http://localhost:3000/notifications/sendFriendNotifications`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async createNotification(request) {
        const body = {
            description: request.description,
            createdDate: new Date(),
            userId: request.userId,
            requestId: request.requestId,
            isOpened: 0
        }

        const response = await fetch(`http://localhost:3000/notifications/createNotification`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async setIsOpened(notification) {
        const body = {
            notification: notification
        }

        const response = await fetch(`http://localhost:3000/notifications/setIsOpened`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }
}