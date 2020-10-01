export default class RequestService {
    
    getAllRequests() {
        // we'll hard code the url for now
        fetch(`http://localhost:3000/requests/get`)
            .then(response => {
                return response.body;
            })
            .catch(error => {
                console.log("Error when getting a request");
            });
    }

    incrementRequestLikes(request) {
        fetch(`http://localhost:3000/requests/incrementLikes`, {
            method: 'PUT',
            body: JSON.stringify({
                id: request.id,
                description: request.description,
                createdDate: request.createdDate,
                points: request.points,
                likes: request.likes, //increment is done in the backend
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            })
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when updating a request");
        });
    }

    createRequest(request) {
        fetch(`http://localhost:3000/requests/create`, {
            method: 'POST',
            body: JSON.stringify({
                description: request.description,
                createDate: new Date(),
                points: request.points,
                likes: 0,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            })
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when creating a request");
        });
    }

    updateRequest(request) {
        fetch(`http://localhost:3000/requests/update`, {
            method: 'PUT',
            body: JSON.stringify({
                id: request.id,
                description: request.description,
                createdDate: request.createdDate,
                points: request.points,
                likes: request.likes,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            })
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when updating a request");
        });
    }

    deleteRequest(request) {
        fetch(`http://localhost:3000/requests/delete`, {
            method: 'POST',
            body: JSON.stringify({
                id: request.id,
                description: request.description,
                createdDate: request.createdDate,
                points: request.points,
                likes: request.likes,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: true
            })
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when updating a request");
        });
    }
}