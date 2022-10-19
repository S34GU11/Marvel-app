import {useState, useEffect, } from "react"
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Link} from "react-router-dom"
import Spinner from "../spinner/Spinner"
import useMarvelService from "../../services/MarvelService"
import ErrorMessage from "../errorMessage/ErrorMessage"
import './comicsList.scss'

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded]  = useState(false)

    const {loading, error, getAllComics} = useMarvelService()

    useEffect(() => onRequest(offset, true), [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false)

        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = newComicList => {
        let ended = false
        if (newComicList.length < 8) ended = true
        setComicsList([...comicsList, ...newComicList])
        setNewItemLoading(false)
        setOffset(offset + 8)
        setComicsEnded(ended)
    }

    const renderItems = arr => {
        const duration = 300
        const items = arr.map((item, i) => {

            return (
                <CSSTransition timeout={duration}
                               key={i}
                               classNames="comics__item">
                    <li className="comics__item">
                        <Link to={`/comics/${item.id}`} >
                            <img src={item.thumbnail}
                                 alt={item.title}
                                 className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(comicsList)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList