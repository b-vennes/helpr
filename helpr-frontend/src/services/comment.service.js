export default class CommentService {

    async getCommentsByRequestId(requestId) {
        const response = await fetch(`http://localhost:3000/comments/get/` + requestId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }

    async createComment(request) {
        const body = {
            description: request.description,
            createdDate: request.createdDate,
            like: request.like,
            requestId: request.requestId,
            userId: request.userId,
            isDeleted: request.isDeleted
        };

        const response = await fetch(`http://localhost:3000/comments/create`, {
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