import React from 'react'
import {useState, useEffect} from 'react';
import Error from './Error';


function Formulario({ pacientes, setPacientes }) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false)

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        //Validación del formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('Hay al menos un campo vacío.')

            setError(true)
            return;
        }

        setError(false)

        //Objeto paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
            id : generarId()
        }

        /**
         * setPacientes(...pacientes, objetoPaciente);
         * Esto funciona solo con objetos, pacientes es una lista,
         * lo que estás haciendo con esto es añadir la propiedad
         * objetoPaciente al objeto lista, no a los items de la lista
         * 
         * El resultado vendría a ser algo como:
         * pacientes.prototype = {
         *  map: Function
         *  items: Array<Paciente>
         *  objetoPaciente: Paciente
         *  filter: Function
         *  ...
         * }
         * 
         * No se si lo he explicado bien, en lugar de añadir 
         * el nuevo paciente a la lista, has añadido una nueva propiedad
         * al objeto lista (en js todo son objetos).
         */

        /**
         * Lo que quieres hacer es esto, solo te faltaban los [ ]
         * otra opción es setPacientes(pacientes.concat(objetoPaciente));
         * hacen exactamente lo mismo, así que ha gusto del consumidor
         */
        setPacientes([... pacientes, objetoPaciente])

        //Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }

    return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {' '}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form 
            onSubmit={ handleSubmit}
            className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        >
            {error && <Error><p>Todos los campos son obligatorios</p></Error>}
            <div className='mb-5'>
                <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
                    Nombre Mascota
                </label>
                <input
                    id='mascota'
                    type="text"
                    placeholder="Nombre de la Mascota"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                    onChange = { (e) => setNombre(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
                    Nombre Propietario
                </label>
                <input
                    id='propietario'
                    type="text"
                    placeholder="Nombre del Propietario"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange = { (e) => setPropietario(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
                    Email
                </label>
                <input
                    id='email'
                    type="email"
                    placeholder="Email contacto"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange = { (e) => setEmail(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
                    Fecha de Alta
                </label>
                <input
                    id='alta'
                    type="date"
                    className='border-2 w-full p-2 mt-2 rounded-md'
                    value={fecha}
                    onChange = { (e) => setFecha(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
                    Síntomas
                </label>
                <textarea
                    id='sintomas'
                    placeholder='Describe los síntomas'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={sintomas}
                    onChange = { (e) => setSintomas(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
                value="Agregar paciente"
            />

        </form>
    </div>
  )
}

export default Formulario