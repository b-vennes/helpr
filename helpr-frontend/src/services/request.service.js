export default class RequestService {
    
    async getRequests(pageNumber, pageSize, search, includeClosed) {
        const response = await fetch(`http://localhost:3000/requests?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&includeClosed=${includeClosed}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }

    async getRequestById(requestId) {
        const response = await fetch(`http://localhost:3000/requests/getByRequestId/` + requestId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }

    async getRequestByUserId(userId) {
        const response = await fetch(`http://localhost:3000/requests/getByUserId/` + userId, {
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
            requestId: request.id,
        };

        const response = await fetch(`http://localhost:3000/requests/like`, {
            method: 'PUT',
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

        return response.json();
    }

    async closeRequest(request) {
        const body = {
            id: request.id
        };

        const response = await fetch(`http://localhost:3000/requests/close`, {
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