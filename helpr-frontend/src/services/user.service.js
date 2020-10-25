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

    async getUsersByPagination(paginationDto) {
        const url = `http://localhost:3000/users/getUsersByPagination?page=` + paginationDto.page + `&limit=` + paginationDto.limit;
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async updateUser(user) {
        const response = await fetch(`http://localhost:3000/users/updateUser`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        return response.json();
    }
}