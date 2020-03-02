import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ConvoPage from './ConvoPage'
import '../../../setupTest'



it('renders without crashing', () => {
    const Context = React.createContext({})
    //If you are here reading this I am using sample contextValue copied from a test session, 
    // sorry for the wild looking js object.
    const contextValue = {"loggedUser":{"user_id":1,"firstname":"John","lastname":"Johnson","age":20,"province":"Ontario","city":"Toronto","neighborhood":"Leaside","rent":1000,"listing":true,"userblurb":"i am user!","blurb":"this is setting description!","usergender":"male","prefgender":"female","image":"https://raw.githubusercontent.com/djdagorne/tennit-client/master/src/imgs/apt.jpg"},"loggedUserMatches":[{"id":1,"user1_id":1,"user2_id":2,"firstname_1":"John","lastname_1":"Johnson","firstname_2":"Susan","lastname_2":"Susanson"},{"id":2,"user1_id":1,"user2_id":3,"firstname_1":"John","lastname_1":"Johnson","firstname_2":"Gertrude","lastname_2":"Gertrudeson"},{"id":3,"user1_id":1,"user2_id":4,"firstname_1":"John","lastname_1":"Johnson","firstname_2":"Margret","lastname_2":"Margretson"}],"showLogInPopup":false,"showCreatePopup":false,"showEditPopup":false,"error":null,"email":"john@email.com","password":"AAaa11!!","searchQuery":[]}
    const wrapper = shallow(<Context.Provider value={contextValue}><ConvoPage /></Context.Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
})
