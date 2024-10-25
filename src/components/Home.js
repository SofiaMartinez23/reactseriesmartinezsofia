import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default class Home extends Component {

    url = Global.urlApiSeries;

    state={
        series:[]
    }

    loadSerie = () =>{
        let request = "api/series";
        axios.get(this.url + request).then(response =>{
            console.log(response.data);
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount = () =>{
        this.loadSerie();
    }

    render() {
        return (
                <div className="container mt-4">
                    <h1 className="mb-4">Series</h1>
                    <div className="row">
                        {this.state.series.map((serie, index) => {
                            return (
                                <div className="col-md-4 mb-4" key={index}>
                                    <div className="card">
                                        <img src={serie.imagen} className="card-img-top" style={{ height: "200px", objectFit: "cover" }}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{serie.nombre}</h5>
                                            <p className="card-text">Puntuación: {serie.puntuacion}</p>
                                            <NavLink to={"/series/" + serie.idSerie} className="btn btn-primary">
                                                Ver Personajes
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
        )
    }
}