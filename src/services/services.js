export default class Service {

    _apiBaseSingleHeroe = 'https://www.superheroapi.com/api.php/4086650971446174/';
    _apiBaseAllHeroes = 'https://akabab.github.io/superhero-api/api/all.json';

    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllHeroes = async () => {
        return this.getResource(this._apiBaseAllHeroes);
    }

    getHero = async (id) => {
        const res = await this.getResource(`${this._apiBaseSingleHeroe}${id}`);
        return this.editHeroResponce(res);
    }
    
    editHeroResponce = (response) => {
        return {
            name: response.name,
            fullName: response.biography['full-name'],
            gender: response.appearance.gender,
            race: response.appearance.race, 
            born: response.biography['place-of-birth'],
            publisher: response.biography.publisher,
            alignment: response.biography.alignment,
            img: response.image.url,
        }
    }

    
}




                    // name: hero.name,
                    // fullName: hero.biography['full-name'],
                    // gender: hero.appearance.gender,
                    // race: hero.appearance.race, 
                    // born: hero.biography['place-of-birth'],
                    // publisher: hero.biography.publisher,
                    // alignment: hero.biography.alignment,
                    // img: hero.image.url,
                    // loading: false,
                    // error: false,       



