import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const AuthApiServices = {
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    postLogin(credentials){
        return fetch(`${config.API_ENDPOINT}/auth/login`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res=>
                (!res.ok) 
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {
                //when a logout is performed 
                //1. save the token in local
                //2. queue autologout
                //3. queue call to the refresh endpoint based on the JWT exp value
                TokenService.saveAuthToken(res.authToken)
                IdleService.registerIdleTimerResets()
                TokenService.queueCallbackBeforeExpiry(()=> {
                    AuthApiServices.postRefreshToken()
                })
                return res
            })
    },
    postRefreshToken(){
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()  
            )
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                TokenService.queueCallbackBeforeExpiry(()=>{
                    AuthApiServices.postRefreshToken()
                })
                return res
            })
            .catch(err => {
                console.log(err)
            })
    }
    
}

export default AuthApiServices