
import './yandex-map.css';
import React, { Component } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
// import Spinner from '../spinner';

export default class YandexMap extends Component {

   state = {
       loading: true
   }

//    componentDidMount() {
//  setTimeout(() => 
//  this.setState({
//     loading:false
// })
//  , 5000)
//    }
  
    render() {
        const {mapData, coordinates, onAddItem, onDragEnd } = this.props;
        // const { loading } = this.state;

const PlaceMark = coordinates.map(coordinate => {
    const {id, coor, name} = coordinate;

            return (
                <Placemark 
                properties= {{
                    hintContent: name,
                    balloonContent: name,
                }}
                modules= {[
                    ['geoObject.addon.balloon', 'geoObject.addon.hint']
                ]}
                options={{
                    draggable: "true",
                }} 
                key={id}
                onDragEnd={(e) => onDragEnd(id, e)}
                geometry={coor}
                />
            )
        })
        
let coordinate = coordinates.map(({coor}) =>  coor )
// console.log(coordinate);
// if(loading) {
//     return <Spinner/>
// }

        return (
            <div className="Map">
                <YMaps>
                    <Map
                        width = '480px'
                        height = '360px'
                        defaultState={mapData}
                        onClick={onAddItem}
                    >
                    <Polyline
                        geometry={coordinate}
                        options={{
                            balloonCloseButton: false,
                            strokeColor: '#000',
                            strokeWidth: 4,
                            strokeOpacity: 0.5,
                        }}
                    /> 
                    {PlaceMark}                    
                    </Map>
                </YMaps>
            </div>
            )
        }
}












// const mapState = { center: [55.76, 37.64], zoom: 9, controls: [] };
// export default class YandexMap extends Component {
//     map = null;
//     ymaps = null;
//     route = null;
  
//     handleApiAvaliable = ymaps => {
//       this.ymaps = ymaps;
//       const balloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
//         "<div>Test</div>"
//       );
//       ymaps
//         .route(
//           [
//             "Королев",
//             { type: "viaPoint", point: "Мытищи" },
//             "Химки",
//             { type: "wayPoint", point: [55.811511, 37.312518] }
//           ],
//           { balloonContentBodyLayout }
//         )
//         .then(route => {
//           route.getPaths().options.set({
//             // в балуне выводим только информацию о времени движения с учетом пробок
//             // можно выставить настройки графики маршруту
//             strokeColor: "0000ffff",
//             opacity: 0.9
//           });
  
//           // добавляем маршрут на карту
//           this.map.geoObjects.add(route);
//         });
//     };
  
//     addRoute = () => {
//       if (this.ymaps && this.map) {
//         this.ymaps
//           .route(["Южное Бутово", "Москва, метро Парк Культуры"], {
//             multiRoute: true
//           })
//           .then(route => {
//             this.route = route;
//             this.map.geoObjects.add(route);
//           });
//       }
//     };
  
//     removeRoute = () => {
//       if (this.map && this.route) {
//         this.map.geoObjects.remove(this.route);
//       }
//     };
  
//     render() {
//       return (
//         <div className="App">
//           <div className="layer">
//             <YMaps
//             // Disabling `onApiAvaliable`, it is not supported anymore
//             // onApiAvaliable={ymaps => this.handleApiAvaliable(ymaps)}
//             >
//               <Map
//                 state={mapState}
//                 instanceRef={ref => (this.map = ref)}
//                 height="100%"
//                 width="100%"
//                 // Using onLoad instead of onApiAvaliable
//                 onLoad={ymaps => this.handleApiAvaliable(ymaps)}
//                 // Loading required modules with component
//                 modules={["templateLayoutFactory", "route"]}
//               />
//             </YMaps>
//             <button onClick={this.addRoute}>Add route</button>
//             <button onClick={this.removeRoute}>Delete route</button>
//           </div>
//         </div>
//       );
//     }
//   }