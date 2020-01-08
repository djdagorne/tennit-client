import React from 'react'
import STORE from './STORE'

const TennitContext = React.createContext({
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

export default TennitContext

export class TennitProvider extends React.Component {

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setConvo = article => {
    this.setState({ article })
  }

  setComments = comments => {
    this.setState({ comments })
  }

  addComment = comment => {
    this.setComments([
      ...this.state.comments,
      comment
    ])
  }

  render() {
    const { testUsers, testImages, testMatches, testConvos, testComments} = STORE.makeThingsFixtures()
    const contextValue = {
        loggedUser_Id: '',
        loggedIn: false,
        showLogInPopup: false,
        showCreatePopup: false,
        testUsers,
        testImages,
        testMatches,
        testConvos,
        testComments,
        toggleLogIn: ()=>{},
        toggleLogInPopup:()=>{},
        toggleCreatePopup: ()=>{},
        testtext: 'pepe'
    }
    return (
      <TennitContext.Provider value={contextValue}>
        {this.props.children}
      </TennitContext.Provider>
    )
  }
}
