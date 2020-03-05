import config from '../config'
import TokenService from './token-service'

const TennitApiService = {
    postLogIn(e){
		e.preventDefault()
		const { email, password } = e.target

		const userCreds = {email: email.value, password: password.value}

		return fetch(`${config.API_ENDPOINT}/auth/login`, {
			method: 'POST',
			headers: {
                'content-type': 'application/json',
			},
			body: JSON.stringify(userCreds)
		})
            .then(res =>{
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
			.then(res => {
                TokenService.saveAuthToken(res.authToken)
                return res
			})

    },
    getUser(userId){
        return fetch(`${config.API_ENDPOINT}/listings/${userId}`, {
				headers: {
					'authorization': `Bearer ${TokenService.getAuthToken()}`,
				},
        })
            .then(res =>{
                return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            })
    },
    requestMatchList(userId){
        return fetch(`${config.API_ENDPOINT}/matches/?user_id=${userId}`, {
            headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>{
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .then(userMatches=>{
                return (!userMatches.error)
                    ? {userMatches}
                    : {userMatches: []}
            })
    },
    requestMatch(matchId){
        return fetch(`${config.API_ENDPOINT}/matches/${matchId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>{
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .then(matchData =>{
                const user1 = {
                    user_id: matchData.user1_id,
                    firstname: matchData.firstname_1,
                    lastname: matchData.lastname_1,
                    image: matchData.image_1
                }
                const user2 = {
                    user_id: matchData.user2_id,
                    firstname: matchData.firstname_2,
                    lastname: matchData.lastname_2,
                    image: matchData.image_2
                }
                return {user1, user2}
            })
    },
    requestComments(matchId){
        return fetch(`${config.API_ENDPOINT}/comments/${matchId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>{
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    },
    submitComments(newComment){
        return fetch(`${config.API_ENDPOINT}/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                newComment
            )
        })
            .then(res =>{
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    },
    deleteMatch(matchId){
        return fetch(`${config.API_ENDPOINT}/matches/${matchId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    },
    searchListings(query){
        return fetch(`${config.API_ENDPOINT}/listings/?${query}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    },
    postUser(newUser){
        return  fetch(`${config.API_ENDPOINT}/users/`, {
            method: `POST`,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(
                newUser
            )
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e=> Promise.reject(e))
                    : res.json()
            })
    },
    postListing(listingBody){
        return  fetch(`${config.API_ENDPOINT}/listings/`, {
            method: `POST`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                listingBody
            )
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e=> Promise.reject(e))
                    : res.json()
            })
    },
    postImage(imageBody){
        return  fetch(`${config.API_ENDPOINT}/images/`, {
            method: `POST`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                imageBody
            )
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e=> Promise.reject(e))
                    : res.json()
            })
    },
    patchListing(newData){
        return fetch(`${config.API_ENDPOINT}/listings/${TokenService.parseJwt(TokenService.getAuthToken()).id}`, {
            method: `PATCH`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                newData
            )
        })
            .then(res => {
                    return (!res.ok)
                    ? res.json().then(e=> Promise.reject(e))
                    : res.json()
            })
    },
    patchImage(updatedImage){
        return fetch(`${config.API_ENDPOINT}/images/${updatedImage.user_id}`, {
            method: `PATCH`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                updatedImage
            )
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e=> Promise.reject(e))
                    : res.json()
            })
    },
    postNewMatch(matchData){
        return fetch(`${config.API_ENDPOINT}/matches/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                matchData
            )
        })
        .then(res=>{
            return (!res.ok)
                ? res.json().then(e=> Promise.reject(e))    
                : res.json()
        })
    }
}

export default TennitApiService