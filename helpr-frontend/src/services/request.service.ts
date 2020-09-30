import { Observable } from 'rxjs';
import axios from 'axios';

export default class RequestService {
    
    getAllRequests() {
        // we'll hard code the url for now
        axios.get(`http://localhost:3000/requests/get`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Error when getting a request");
            });
    }

    incrementRequestLikes(request) {
        axios.put(`http://localhost:3000/requests/incrementLikes`, {
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
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when updating a request");
        });
    }

    createRequest(request) {
        axios.post(`http://localhost:3000/requests/create`, {
            body: {
                description: request.description,
                createDate: new Date(),
                points: request.points,
                likes: 0,
                isPublicRequest: request.isPublicRequest,
                userId: request.userId,
                isDeleted: false
            }
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when creating a request");
        });
    }

    updateRequest(request) {
        axios.put(`http://localhost:3000/requests/update`, {
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
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when updating a request");
        });
    }

    deleteRequest(request) {
        axios.post(`http://localhost:3000/requests/delete`, {
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
        })
        .then(response => {})
        .catch(error => {
            console.log("Error when updating a request");
        });
    }
}