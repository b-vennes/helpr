export default class FriendService {

    async getFriendsByUserId(userId) {
        const response = await fetch(`http://localhost:3000/friends/getFriendsByUserId/` + userId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async sendFriendRequest(request) {
        const body = {
            userId: request.userId,
            friendUserId: request.userId,
            isConfirmed: request.isConfirmed
        };

        const response = await fetch(`http://localhost:3000/friends/create`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async confirmFriendRequest(request) {
        const body = {
            id: request.id,
            userId: request.userId,
            friendUserId: request.userId,
            isConfirmed: request.isConfirmed
        };

        const response = await fetch(`http://localhost:3000/friends/update`, {
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