import React from 'react'

export default React.createContext({
        testUsers: [],
        testImages: [],
        testMatches: [],
        testConvos: [],
        testComments: [],
        loggedUserId: {},
        loggedIn: {},
        showLogInPopup: ()=>{},
        showCreatePopup: ()=>{},
        toggleLogIn: ()=>{},
        toggleLogInPopup:()=>{},
        toggleCreatePopup: ()=>{},
    }
)