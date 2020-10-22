export default class HistoryService {

    async getHistoryByUserId(userId) {
        const response = await fetch(`http://localhost:3000/history/getHistoriesByUserId/` + userId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async createHistory(request) {
        const body = {
            dateTimeAwarded: new Date(),
            requestId: request.requestId,
            fromUserId: request.fromUserId,
            userId: request.userId
        };

        const response = await fetch(`http://localhost:3000/history/createHistory`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }
}