export default class Service {

    _apiBaseSingle = 'https://www.superheroapi.com/api.php/4086650971446174/';
    _apiBaseAll = 'https://akabab.github.io/superhero-api/api/all.json';

    async getResource(url) {
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllHeroes() {
        return this.getResource(this._apiBaseAll);
    }
    
    getHero(id) {
        return this.getResource(`${this._apiBaseSingle}${id}`);
    }

  
}








