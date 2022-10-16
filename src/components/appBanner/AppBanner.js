import './appBanner.scss'
import avengers from '../../resourses/img/Avengers_logo.png'
import avengersLogo from '../../resourses/img/Avengers.png'

const AppBanner = () => {
    return (
        <div>
            <div className="app__banner">
                <img src={avengers}
                     alt="Avengers"/>
                <div className="app__banner-text">
                    New comics every week!<br/>
                    Stay tuned!
                </div>
                <img src={avengersLogo}
                     alt="Avengers logo"/>
            </div>
        </div>
    )
}

export default AppBanner