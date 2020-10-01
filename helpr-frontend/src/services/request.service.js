export default class RequestService {
    
    async getAllRequests() {
        // we'll hard code the url for now
        const response = await fetch(`http://localhost:3000/requests/get`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }
    /*
    incrementRequestLikes(request) {
        return axios.put(`http://localhost:3000/requests/incrementLikes`, {
            body: {
                id: request.id,
                description: request.description,
                createdDate: request.createdDate,
                points: request.points,
                likes: request.likes, //increment is done in the backend
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            }
        });
    }

    createRequest(request) {
        return axios.post(`http://localhost:3000/requests/create`, {
            body: {
                description: request.description,
                createDate: new Date(),
                points: request.points,
                likes: 0,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            }
        });
    }

    updateRequest(request) {
        return axios.put(`http://localhost:3000/requests/update`, {
            body: {
                id: request.id,
                description: request.description,
                createdDate: request.createdDate,
                points: request.points,
                likes: request.likes,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            }
        });
    }

    deleteRequest(request) {
        return axios.post(`http://localhost:3000/requests/delete`, {
            body: {
                id: request.id,
                description: request.description,
                createdDate: request.createdDate,
                points: request.points,
                likes: request.likes,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: true
            }
        });
    }
    */
}