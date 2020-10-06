export default class UserTagService {

    async getUserTagsById(userId) {
        const response = await fetch(`http://localhost:3000/usertags/getById/` + userId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async createUserTag(request) {
        const body = {
            userId: request.userId,
            tagId: request.tagId,
            isDeleted: request.isDeleted
        }

        const response = await fetch(`http://localhost:3000/usertags/createUserTag`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async deleteUserTag(request) {
        const body = {
            userId: request.userId,
            tagId: request.tagId,
            isDeleted: request.isDeleted
        }

        const response = await fetch(`http://localhost:3000/usertags/deleteUserTag`, {
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