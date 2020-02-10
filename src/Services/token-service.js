import config from '../config'
import jwtDecode from 'jwt-decode'


let _timeoutId
const TEN_SECOND_IN_MS = 10000

const TokenService = {
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    parseJwt(jwt){
        return jwtDecode(jwt)
    },
    readJwtToken(){
        return TokenService.parseJwt(TokenService.getAuthToken())
    },
    _getMsUntilExpiry(payload){
        //payload from the jwt
        //the exp value is in seconds, convert to ms, then calculate difference between now and when jwt expires
        return (payload.exp * 1000) - Date.now()
    },
    queueCallbackBeforeExpiry(callback){
        const msUntilExpiry = TokenService._getMsUntilExpiry(
            TokenService.readJwtToken()
        )
        //queue a callback with a fetch to the refresh endpoint 10 seconds before token expirt
        _timeoutId = setTimeout(callback, msUntilExpiry - TEN_SECOND_IN_MS)
    },
    clearCallbackBeforeExpiry(){
        clearTimeout(_timeoutId)
    }
}

export default TokenService
