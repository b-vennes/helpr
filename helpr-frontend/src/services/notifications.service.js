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