export default class NotificationService {
    
    async getNotifications(userId) {
        const response = await fetch(`http://localhost:3000/notifications/getLatestNotifications/` + userId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    } 

}