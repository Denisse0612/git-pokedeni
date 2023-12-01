import { useRef } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice.js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../pages/styles/HomePage.css'

const HomePage = () => {

    const inputName = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerName(inputName.current.value.trim()))
    navigate('/pokedex')
}

  return (
    <div className="saludo">
        <img  className="saludo__titulo" src="/public/Pokedex_logo.png"/>
        <h1 className="saludo__intro">HOLA ENTRENADOR❗</h1>
        <p className="saludo__p">Para poder empezar, ingresa tu nombre 🔑</p>
        <form className="saludo__form" onSubmit={handleSubmit}>
            <input className="saludo__input" ref={inputName} type="text" />
            <button type="submit" className="saludo__btn">COMENZAR!</button>
        </form>
    </div>
  )
}

export default HomePage