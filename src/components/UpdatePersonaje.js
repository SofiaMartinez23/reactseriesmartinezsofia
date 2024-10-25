import axios from 'axios';
import React, { Component, createRef } from 'react';
import Global from './Global';
import { Navigate } from 'react-router-dom';

export default class CrearPersonaje extends Component {

    url = Global.urlApiSeries;

    cajaIdPersonaje = React.createRef();
    cajaIdSerie = React.createRef();

    state={
        status: false,
        series: [],
        personajes:[],
        personajeSeleccionado: null,
        serieSeleccionada: null
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

    loadPersonaje = () =>{
        let request = "api/personajes";
        axios.get(this.url + request).then(response =>{
            console.log(response.data);
            this.setState({
                personajes: response.data
            })
        })
    }

    insertarPersonaje = (e) =>{
        e.preventDefault();

        let idserie = parseInt(this.cajaIdSerie.current.value);
        let idpersonaje = parseInt(this.cajaIdPersonaje.current.value);

        let cambio ={
            idPersonaje: idpersonaje,
            idSerie: idserie
        }

        let request = "api/personajes/" + idpersonaje + "/" + idserie;
        console.log(this.url + request)


        axios.put(this.url + request, cambio).then(response =>{
            this.setState({
                status: true
            })
        })
    }

    mostrarSerieSeleccion = (e) =>{
        e.preventDefault();
        let idserie = parseInt(this.cajaIdSerie.current.value);
        const serieSeleccionada = this.state.series.find(serie => serie.idSerie === idserie);
        this.setState({
            serieSeleccionada: serieSeleccionada 
        });

    }

    mostrarPersonajeSeleccion = (e) =>{
        e.preventDefault();
        let idpersonaje = parseInt(this.cajaIdPersonaje.current.value);
        const personajeSeleccionado = this.state.personajes.find(personaje => personaje.idPersonaje === idpersonaje);
        this.setState({
            personajeSeleccionado: personajeSeleccionado 
        });
        
    }

    componentDidMount = () =>{
        this.loadSerie();
        this.loadPersonaje();
    }

    render() {
        return (
        <div>
            {
                this.state.status == true &&(
                    <Navigate to="/"/>
                )
            }
            <h1 style={{color: "blue"}}>Personajes y series</h1>

            <form>
                <label>Seleccione una serie: </label>
                <select ref={this.cajaIdSerie} className='form form-control' onChange={this.mostrarSerieSeleccion}>
                    {
                        this.state.series.map((serie, index) =>{
                            return(
                                <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                            )
                        })
                    }
                    
                </select>

                <label>Seleccione un personaje: </label>
                <select ref={this.cajaIdPersonaje} className='form form-control' onChange={this.mostrarPersonajeSeleccion}>
                    {
                        this.state.personajes.map((personaje, index) =>{
                            return(
                                <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                            )
                        })
                    }
                    
                </select>
                <button onClick={this.insertarPersonaje} className='btn btn-info m-3'>Guardar cambios</button>
            
                {
                    this.state.serieSeleccionada &&(
                        <div>
                            <h1>{this.state.serieSeleccionada.nombre}</h1>
                            <img src={this.state.serieSeleccionada.imagen} alt={this.state.serieSeleccionada.nombre}/>
                        </div>
                    )
                }
                {
                    this.state.personajeSeleccionado &&(
                        <div>
                            <h1>{this.state.personajeSeleccionado.nombre}</h1>
                            <img src={this.state.personajeSeleccionado.imagen} alt={this.state.personajeSeleccionado.nombre}/>
                        </div>
                    )
                }
            </form>
        </div>
        )
    }
}




