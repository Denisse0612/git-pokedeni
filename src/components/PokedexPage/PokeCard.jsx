import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import '../PokedexPage/stylespoke/PokeCard.css'

const PokeCard = ( { url } ) => {

    const [ infoPoke, getInfoPoke ] = useFetch(url)

    useEffect(() => {
        getInfoPoke()
    }, [])

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokedex/${infoPoke?.id}`)
    }

    return (
        <article className="card__art" onClick={handleNavigate}>
            <header className="card__header">
            <h3 className="card__h">{infoPoke?.name}</h3>
            </header>
            <section className="card__section">
            <img className="card__img" src={infoPoke?.sprites.other["official-artwork"].front_default} alt="" />
                
                <ul className="card__ul">
                    {
                        infoPoke?.types.map(infoType => (
                            <li className="card__key" key={infoType.type.url}>{infoType.type.name}</li>
                        ))
                    }
                </ul>
                <ul className="card__ul-info">
                    {
                        infoPoke?.stats.map(infoStat => (
                            <li className="card__li" key={infoStat.stat.url}>
                                <span className="card__span-name">{infoStat.stat.name}</span>
                                <span className="card__span-info">{infoStat.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard