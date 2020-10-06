export default class UserProfileService {

    async getAllUserProfiles() {
        const response = await fetch(`http://localhost:3000/userprofiles/getAll`, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async getUserProfileById(profileId) {
        const response = await fetch(`http://localhost:3000/userprofiles/getUserProfileById/` + profileId, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }

    async addPointsToUserProfile(request) {
        const body = {
            id: request.id,
            points: request.points
        }

        const response = await fetch(`http://localhost:3000/userprofiles/addPoints`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    async update(request) {
        const body = {
            id: request.id,
            points: request.points,
            title: request.title,
            aboutMe: request.aboutMe,
            userId: request.userId
        }

        const response = await fetch(`http://localhost:3000/userprofiles/update`, {
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