import config from '../config'
import TokenService from './token-service'

const TennitApiService = {
    postLogIn(e){
		e.preventDefault();
		const { email, password } = e.target
        if(email.length === 0){
			console.log('email required')
			return
        }
        if(password.length === 0){
			console.log('password required')
			return
        }

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
			})
			.catch(err => {
				console.log(err)
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
			.catch(err => {
				console.log(err)
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
            .catch(err => {
                console.log(err)
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
                console.log('first res with matchdata')
                console.log(matchData)
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
            .catch(err=>{
                console.log(err)
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
            .catch(err=>{
                console.log(err)
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
            .catch(err=>{
                console.log(err)
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
                    ? res.then(e => Promise.reject(e))
                    : res
            })
            .catch(err=>{
                console.log(err)
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
            .catch(err=>{
                console.log(err)
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
                    ? res.then(e=> Promise.reject(e))
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
            body: JSON.stringify({
                listingBody
            })
        })
            .then(res => {
                return (!res.ok)
                    ? res.then(e=> Promise.reject(e))
                    : res.json()
            })
            .catch(err=>{
                console.log(err)
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
                    ? res.then(e=> Promise.reject(e))
                    : res.json()
            })
            .catch(err=>{
                console.log(err)
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
                    ? res.then(e=> Promise.reject(e))
                    : res.json()
            })
            .catch(err=>{
                console.log(err)
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
                    ? res.then(e=> Promise.reject(e))
                    : res.json()
            })
            .catch(err=>{
                console.log(err)
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
        .catch(err=>{
            console.log(err)
        })
    }
}

export default TennitApiService;