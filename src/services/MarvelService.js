import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=12392304e65112c81dd042ac72c70d6f'
    const _baseOffset = 210

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacterByName = async name => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const _transformCharacter = char => {
        return {
            id: char.id,
            name: char.name,
            descriptionForRandomChar: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character.',
            descriptionForSearchedChar: char.description ? `${char.description}` : 'There is no description for this character.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10),

        }
    }

    const getComic = async id => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const _transformComics = comic => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'There is no description for this comic.',
            pageCount: comic.pageCount ? `${comic.pageCount} pages.` : `No information about the number of pages.`,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'Not available.',
            language: comic.textObjects.language ? comic.textObjects.language : 'en-us',

        }
    }

    return {loading, error, clearError, getCharacter, getCharacterByName, getAllCharacters, getComic, getAllComics}
}

export default useMarvelService
