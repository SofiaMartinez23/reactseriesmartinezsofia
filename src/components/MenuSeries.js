import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from './Global';
import axios from 'axios';

export default class MenuSeries extends Component {

    url = Global.urlApiSeries;

    state={
        series: [],
        personajes: []
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
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example"> 
            <div className="container-fluid"> 
            <a className="navbar-brand" href="#"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPZtjzQdverRm37KEEPcMAKpuBMXGU-427A&s' style={{width:"80px", height:"50px"}}/></a> 
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation"> 
                <span className="navbar-toggler-icon"></span> 
            </button> 
                <div className="collapse navbar-collapse" id="navbarsExample03"> 
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0"> 
                        <li className="nav-item"> 
                            <NavLink className="nav-link active" to="/">Home</NavLink> 
                        </li>  
                        <li className="nav-item"> 
                            <NavLink className="nav-link active" to="/create">Nuevo Personaje</NavLink> 
                        </li>
                        <li className="nav-item"> 
                            <NavLink className="nav-link active" to="/update">Modificar Personaje</NavLink> 
                        </li>
                        <li className="nav-item dropdown"> 
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Series</a> 
                            <ul className="dropdown-menu"> 
                                {
                                    this.state.series.map((serie, index) =>{
                                        return(
                                            <li key={index}>
                                                <NavLink to={"/series/" + serie.idSerie}
                                                className="dropdown-item">{serie.nombre}</NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul> 
                        </li>
                    </ul> 
                </div>
            </div> 
        </nav> 
        )
    }
}
