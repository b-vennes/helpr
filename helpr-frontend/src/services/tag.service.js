export default class TagService {

    async getAllTags() {
        const response = await fetch(`http://localhost:3000/tags/getAllTags`, {
            method: 'GET',
            mode: 'cors'
        });

        return response.json();
    }
}