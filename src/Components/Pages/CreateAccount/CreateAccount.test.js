import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CreateAccount from './CreateAccount';
import '../../../setupTest';



it('renders without crashing', () => {
    const wrapper = shallow(<CreateAccount />);
    expect(toJson(wrapper)).toMatchSnapshot();
})
