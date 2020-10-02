export default class AuthService {
    async login() {
        const response = await fetch(`http://localhost:3000`, {
            method: 'GET'
        });

        return response.json();
    }
}