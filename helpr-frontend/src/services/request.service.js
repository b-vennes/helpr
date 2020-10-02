export default class RequestService {
    
    async getAllRequests() {
        const response = await fetch(`http://localhost:3000/requests/get`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }
    
    async incrementRequestLikes(request) {
        const body = {
            id: request.id,
            description: request.description,
            createdDate: request.createdDate,
            points: request.points,
            likes: request.likes, //increment is done in the backend
            isPublicRequest: request.isPublicRequest,
            userId: request.userId,
            isDeleted: false
        };

        const response = await fetch(`http://localhost:3000/requests/incrementLikes`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async createRequest(request) {
        const body = {
            description: request.description,
            createdDate: request.createdDate,
            points: request.points,
            likes: request.likes,
            isPublicRequest: request.isPublicRequest,
            userId: request.userId,
            isDeleted: request.isDeleted,
            title: request.title
        };

        const response = await fetch(`http://localhost:3000/requests/create`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response;
    }
}