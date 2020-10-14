export default class UserService {
    async getUser(userId) {
        const response = await fetch(`http://localhost:3000/users/getById/` + userId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }
    
    async getAllUsers() {
        const response = await fetch(`http://localhost:3000/users/getAllUsers`, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }
}