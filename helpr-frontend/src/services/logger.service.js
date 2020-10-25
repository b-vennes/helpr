export default class LoggerService {

    async createLog(request) {
        const body = {
            success: request.success,
            message: request.message,
            httpStatusCode: request.httpStatusCode,
            isBackEnd: request.isBackEnd,
            isFrontEnd: request.isFrontEnd,
            timestamp: request.timestamp
        };

        const response = await fetch(`http://localhost:3000/loggers/create`, {
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