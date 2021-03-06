import React, { Component } from "react";
import Hello from "./Hello";
import { PageHeader } from "react-bootstrap";
import MapPiece from "./mapcomponent";
import Leaflet from 'leaflet';
import NavBar from './navbar';
import LatLongForm from './latlongboxes';
import BootstrapSlider from 'react-bootstrap-slider/src/css/bootstrap-slider.min.css';

require('../css/fullstack.css');
var $ = require('jquery');

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/'

var $ = require('jquery');

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      editfrom: false,
      editto: false,
      flex: 100,
      elev: 1,
      fromlatlng: {
        lat: 42.389620,
        lng: -72.528230,
      },
      tolatlng: {
        lat: 42.389620,
        lng: -72.528230,
      },
      centerlatlng: {
        lat: 42.389620,
        lng: -72.528230,
      },
      response: {},
    }

  this.beginEditFrom = () => {
    this.setState({
      editfrom: true,
      fromlatlng: {
        lat: "selecting...",
        lng: "selecting...",
      }
    })
  }

  this.beginEditTo = () => {
    this.setState({
      editto: true,
      tolatlng: {
        lat: "selecting...",
        lng: "selecting...",
      }
    })
  }

  this.sendToServer = coords => {
    //console.log(coords.fromlat+', '+coords.fromlng);
    //console.log(coords.tolat+', '+coords.tolng);
    $.ajax({
      type: 'GET',
      url: window.location.href + 'route',
      data: coords,
      dataType: 'json',
      success: (data) => {
        this.setState({
          response: data
        })
      }
    });

  }

  this.handleMapClick = e => {
    if(this.state.editfrom){
      this.setState({
        editfrom: false,
        fromlatlng: e.latlng,
      })
    }
    else if(this.state.editto){
      this.setState({
        editto: false,
        tolatlng: e.latlng,
      })
    }
  }
  this
}


  render(){
    var route = null;
    var pathDist = null;
    var pathElev = null;
    if(this.state.response != {}){
      route = this.state.response.List;
      pathDist = this.state.response.distance;
      pathElev = this.state.response.elev;
    }
    return(
        <div>
        <LatLongForm routeDist={pathDist} routeElev={pathElev} editTo={this.beginEditTo.bind(this)} editFrom={this.beginEditFrom.bind(this)} submitCoordinates={this.sendToServer.bind(this)} initfrom={this.state.fromlatlng} initto={this.state.tolatlng} initflex={this.state.flex} initelev={this.state.elev}/>
        <br />
        <MapPiece mapClick={this.handleMapClick.bind(this)} fromMarker={this.state.fromlatlng} toMarker={this.state.tolatlng} bestRoute={route} />
        <br />
      </div>
    )
  }
}
