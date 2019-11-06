import React, { Component } from 'react';
import './App.css';
import webService from '../../web-service/web-service';
import RouteList from '../route-list';
import AddItem from '../add-item';
import YandexMap from '../yandex-map';

const api = new webService();

export default class App extends Component { 

Id = 2;
// Letter = 65;

  state = {
    mapData: {
      center: [55.751574, 37.573856],
      zoom: 10,
    },
    coordinates: [
      {id: 0, name: "Третье транспортное кольцо", description: "Москва, Россия", coor:["55.7918", "37.6371"]},
      {id: 1, name: "проспект 60-летия Октября, 2/41", description: "Москва, Россия", coor:["55.7051", "37.5793"]},
    ],
  };

  onDelItem = (id) => {
    const {coordinates} = this.state;
    // console.log(coordinates[id].id)
    // console.log(id)
    
    const DelItem = coordinates.filter(coordinate => coordinate.id !== id)
    this.setState((coordinates) => {
      return {
        coordinates: DelItem
      }
    })
  }

    onAddItem = (e) => {
      const coords = e.get('coords');
      api.getName(coords).then(body => {
        let name = body.name;
        let description = body.description;
      const  NewItem = { 
        id: this.Id++,
        // letter: String.fromCharCode(this.Letter++),
        name: name, description: description,
        coor: [coords[0].toFixed(4), coords[1].toFixed(4)],
       };
    
        this.setState(({coordinates}) => {
          const NewArr = [
            ...coordinates,
            NewItem
          ];
          return {
            coordinates: NewArr,
          }
        })
      })
    }
    // улица Подвойского, вл5/19
    
    onDragEnd = (id, e) => {
     const NewCoor = e.get('target').geometry.getCoordinates();

      api.getName(NewCoor).then(body => {
        let nameBody = body.name;
        let descriptionBody = body.description;
        const newData = [...this.state.coordinates];
        // { coordinates } = this.state;
        // const {id, letter, name, description, coor} = coordinates;
      const  UpdItem = newData.find((coordinate) => coordinate.id === id );
    
      UpdItem.name = nameBody;
      UpdItem.description = descriptionBody;
      UpdItem.coor = NewCoor;
      
      this.setState({UpdItem})
      })
    }

    onItemAdded = (e) => {
      let name = e;
      api.getGeoCode(e).then(body => {
        let description = body.description;
        let coords = body.geocode.split(' ').reverse();
        // console.log(coords[0], coords[1])

      const  NewItem = { 
        id: this.Id++,
        letter: String.fromCharCode(this.Letter++),
        name: name, description: description,
        coor: [coords[0], coords[1]],
        };
    
        this.setState(({coordinates}) => {
          const NewArr = [
            ...coordinates,
            NewItem
          ];
          return {
            coordinates: NewArr,
          }
        })    

      })
    }

    onDragEndList = (from, to) => {
    this.setState(({coordinates}) => {
      const DragItem = coordinates.splice(from, 1)[0];
      coordinates.splice(to, 0 , DragItem)
      // const NewArray = [
      //           ...coordinates.slice(0, to),
      //           DragArr,
      //           ...coordinates.slice(to + 1),
      //         ];
        return {
          coordinates 
        }
    })
// console.log(from, to)
// console.log(CopyArr)
  }


    render() {

      const { mapData, coordinates } = this.state;
      // console.log(coordinates)


      return (
        <React.Fragment>
          <div className="YandexMap">
            <div className="RouteList">
              <AddItem onItemAdded={this.onItemAdded}/> 

              <RouteList 
              coordinates={coordinates}
              onDelItem={this.onDelItem}
              onDragEndList={this.onDragEndList}
              />
            </div>

          <YandexMap mapData={mapData} 
          coordinates={coordinates}
          onAddItem={this.onAddItem}
          onDragEnd={this.onDragEnd}
        />
        
          </div>
        </React.Fragment>
        )      
    }

  };
