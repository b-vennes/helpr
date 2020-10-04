export default class AuthService {
    async login() {
        const response = await fetch(`http://localhost:3000/auth/google/uri`, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }
}