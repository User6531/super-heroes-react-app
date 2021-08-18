export default class Service {

    _apiBaseSingleHeroe = 'https://www.superheroapi.com/api.php/4086650971446174/';
    _apiBaseAllHeroes = 'https://akabab.github.io/superhero-api/api/all.json';
    _apiBasePhotoOfDay = 'https://api.nasa.gov/planetary/apod?api_key=fLpFz2aflWuemZoAqecqd83CNFQfHs9yGpFdDcqI';
    

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
            eyeColor: response.appearance['eye-color'],
            hairColor: response.appearance['hair-color'],
            height: response.appearance.height,
            combat: response.combat,
            durability: response.powerstats.durability,
            intelligence: response.powerstats.intelligence,
            power: response.powerstats.power,
            speed: response.powerstats.speed,
            strength: response.powerstats.strength,
        }
    }
}

                


