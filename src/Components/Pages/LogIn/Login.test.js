import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LogIn from './LogIn';
import '../../../setupTest';



it('renders without crashing', () => {
    const wrapper = shallow(<LogIn />);
    expect(toJson(wrapper)).toMatchSnapshot();
})
