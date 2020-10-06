export default class MessageService {

    async getMessagesByAssociatedId(associatedId) {
        const response = await fetch(`http://localhost:3000/messages/getMessagesByAssociatedId/` + associatedId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async createMessage(request) {
        const body = {
            sourceUserId: request.sourceUserId,
            destinationUserId: request.destinationUserId,
            description: request.description,
            createdDate: new Date(),
            associatedMessageId: request.associatedMessageId, //this should be null if this is the first message
            isLatestMessage: true
        }

        const response = await fetch(`http://localhost:3000/messages/create`, {
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