import {useState} from "react"
import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import decoration from '../../resourses/img/vision.png'

const MainPage = () => {
    const [selectedChar, setChar] = useState(null)
    const [inProp, setInProp] = useState(false)

    const onCharSelected = id => {
        setChar(id)
        setInProp(true)
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}
                              inProp={inProp}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration"
                 src={decoration}
                 alt="vision"/>
        </>
    )
}

export default MainPage