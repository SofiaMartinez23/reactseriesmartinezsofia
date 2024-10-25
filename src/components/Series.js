import axios from 'axios';
import React, { Component } from 'react';
import Global from './Global';
import { NavLink } from 'react-router-dom';

export default class Series extends Component {

    url = Global.urlApiSeries;

    state={
        personajes: []
    }

    loadPersonajeSerie = () =>{
        let id = this.props.idSerie;
        console.log(id)
        let request ="api/series/personajesserie/" + id;
        console.log(this.url + request)
        axios.get(this.url + request).then(response =>{
            this.setState({
                personajes: response.data
            })
        })

    }


    componentDidMount = () =>{
        this.loadPersonajeSerie();
    }

    componentDidUpdate = (oldProps) =>{
        if (this.props.idSerie != oldProps.idSerie) {
            this.loadPersonajeSerie();
        }
    }

    render() {
        return (
        <div>
            <h1>Personajes Serie {this.props.idSerie}</h1>
            <button className='btn btn-danger'>
                <NavLink to="/">Volver</NavLink>
            </button>
            <table className='table table-table'>
                <thead>
                    <tr>
                        <th>Personaje</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.personajes.map((personaje,index) =>{
                        return(
                            <tr key={index}>
                                <td>{personaje.nombre}</td>
                                <td><img src={personaje.imagen} style={{width: "150px", height: "150px"}}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
        )
    }
}
