export default class RequestTagsService {

    async getRequestTagsById(requestId) {
        const response = await fetch(`http://localhost:3000/requesttags/getRequestTagsByRequestId/` + requestId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }
    
}