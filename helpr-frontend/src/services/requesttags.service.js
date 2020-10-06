export default class RequestTagsService {

    async getRequestTagsById(requestId) {
        const response = await fetch(`http://localhost:3000/requesttags/getRequestTagsByRequestId/` + requestId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async createRequestTag(requestTag) {
        const body = {
            requestTag: requestTag
        }

        const response = await fetch(`http://localhost:3000/requesttags/createRequestTag`, {
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