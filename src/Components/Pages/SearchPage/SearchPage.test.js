import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchPage from './SearchPage';
import '../../../setupTest';



it('renders without crashing', () => { 
    const Context = React.createContext({});
    //If you are here reading this I am using sample contextValue copied from a test session, 
    // sorry for the wild looking js object.
    const contextValue = [{"user_id":2,"firstname":"Susan","lastname":"Susanson","age":25,"province":"Ontario","city":"Toronto","neighborhood":"The Annex","rent":1001,"listing":true,"userblurb":"i am user!","blurb":"this is setting description!","usergender":"female","prefgender":"male","image":"https://raw.githubusercontent.com/djdagorne/tennit-client/master/src/imgs/apt2.jpg"},{"user_id":3,"firstname":"Gertrude","lastname":"Gertrudeson","age":22,"province":"Ontario","city":"Mississauga","neighborhood":"Clarkson","rent":1500,"listing":true,"userblurb":"i am user!","blurb":"this is setting description!","usergender":"female","prefgender":"male","image":"https://raw.githubusercontent.com/djdagorne/tennit-client/master/src/imgs/apt3.jpg"},{"user_id":4,"firstname":"Margret","lastname":"Margretson","age":21,"province":"Ontario","city":"Toronto","neighborhood":"Yorkdale","rent":700,"listing":false,"userblurb":"i am user!","blurb":"this is setting description!","usergender":"female","prefgender":"male","image":"https://raw.githubusercontent.com/djdagorne/tennit-client/master/src/imgs/apt4.jpg"}];
    const wrapper = shallow(<Context.Provider value={contextValue}><SearchPage /></Context.Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
})
