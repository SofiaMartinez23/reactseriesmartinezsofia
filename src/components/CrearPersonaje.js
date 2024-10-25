import axios from 'axios';
import React, { Component, createRef } from 'react';
import Global from './Global';
import { Navigate } from 'react-router-dom';

export default class CrearPersonaje extends Component {

    url = Global.urlApiSeries;

    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    cajaSerie = React.createRef();

    state={
        status: false,
        series: []
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

    insertarPersonaje = (e) =>{
        e.preventDefault();
        this.loadSerie();
        
        let request = "api/personajes";

        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let serie = parseInt(this.cajaSerie.current.value);


        let personajenuevo ={
            idPersonaje: 1,
            nombre: nombre,
            imagen: imagen,
            idSerie: serie
        }

        console.log(personajenuevo)
        console.log(this.url + request)

        axios.post(this.url + request, personajenuevo).then(response =>{
            this.setState({
                status: true
            })
        })
    }

    componentDidMount = () =>{
        this.loadSerie();
    }

    render() {
        return (
        <div>
            {
                this.state.status == true &&(
                    <Navigate to="/"/>
                )
            }
            <h1 style={{color: "blue"}}>Nuevo personaje</h1>

            <form>
                <label>Nombre: </label>
                <input type='text' ref={this.cajaNombre} className='form form-control'/>
                <label>Imagen: </label>
                <input type='text' ref={this.cajaImagen} className='form form-control'/>
                <label>Serie: </label>
                <select ref={this.cajaSerie} className='form form-control'>
                    {
                        this.state.series.map((serie, index) =>{
                            return(
                                <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                            )
                        })
                    }
                    
                </select>
                <button onClick={this.insertarPersonaje} className='btn btn-info m-3'>Insertar personaje</button>
            </form>
        </div>
        )
    }
}
