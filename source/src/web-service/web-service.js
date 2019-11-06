
export default class webService {
    
async requestURL(geocode) {
    const APIkey = '16e669f2-ef27-4d0c-a11f-e7cbf67c2026';
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${APIkey}&format=json&geocode=${geocode}`;
    let res = await fetch(url);
    // console.log(url);
    return await res.json();
    
  }  

  async getName(geocode) {
    let coor1 = geocode[1];
    let coor2 = geocode[0];
      const res = await this.requestURL([coor1, coor2]);
     const name = res.response.GeoObjectCollection.featureMember[0].GeoObject.name;
    const description = res.response.GeoObjectCollection.featureMember[0].GeoObject.description;
      return {name,description};
  }
  async getGeoCode(name) {

      const res = await this.requestURL(name);
     const geocode = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
     const description = res.response.GeoObjectCollection.featureMember[0].GeoObject.description;

      return {geocode,description};
  }

  async getFullInfo(geocode) {
      const res = await this.requestURL(geocode);
      return res;
  }

}

// const api = new ApiService();

// api.getName().then(name => {
//     console.log(name)
// })
// api.getFullInfo().then(body => {
//     console.log(body)
// })
  
//   requestURL(geocode).then((body) => {
//     console.log(body.response.GeoObjectCollection.featureMember[0].GeoObject.name)
//     console.log(body)
//   })