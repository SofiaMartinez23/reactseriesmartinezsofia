import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import Home from './Home'
import MenuSeries from './MenuSeries'
import Series from './Series'
import UpdatePersonaje from './UpdatePersonaje'
import CrearPersonaje from './CrearPersonaje'


export default class Router extends Component {

    render() {

        function SerieElement(){
            var {idSerie} = useParams();
            return <Series idSerie={idSerie}/>
        }

        function UpdatePersonajeElement(){
            var {idPersonaje} = useParams();
            return <UpdatePersonaje idPersonaje={idPersonaje}/>
        }

        return (
        <BrowserRouter>
        <MenuSeries />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/series/:idSerie' element={<SerieElement />}/>
                <Route path='/create' element={<CrearPersonaje />}/>
                <Route path='/update' element={<UpdatePersonajeElement />}/>
            </Routes>
        </BrowserRouter>
        )
    }
}
