const BASE_URL = "https://deckofcardsapi.com/api/deck";
const NEW_DECK = BASE_URL + "/new/shuffle/?deck_count=1"

const fetchJson = (...args) => fetch(...args).then(r => r.json())

export default class API {
    deckId = null
    remaining = 0

    constructor(deckId, remaining) {
        this.deckId = deckId
        this.remaining = remaining
    }

    static new() {
        return fetchJson(NEW_DECK).then(res => {
            const api = new API(res.deck_id, res.remaining)
            console.log(api)
            return api
        })
    }

    draw(count = 2) {
        return fetchJson(BASE_URL + `/${this.deckId}/draw/?count=${count}`).then(res => {
            this.remaining = res.remaining
            return res.cards
        })
    }

    shuffle() {
        return fetchJson(BASE_URL + `/${this.deckId}/shuffle`).then(res => {})
    }
}