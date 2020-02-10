import config from '../config'
import jwtDecode from 'jwt-decode'

let _timeoutId
const _TEN_SECOND_IN_MS = 10000

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
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
    //get num of ms from now until expiry of token
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
    )
    //queue a callback 10 seconds before token expirt
    //in this case the callback is calling the refresh endpoint
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECOND_IN_MS)
  },
  clearCallbackBeforeExpiry(){
    clearTimeout(_timeoutId)
  }
}

export default TokenService
