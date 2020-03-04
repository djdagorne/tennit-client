import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SplashPage from './SplashPage';
import '../../../setupTest';



it('renders without crashing', () => {
    const wrapper = shallow(<SplashPage />);
    expect(toJson(wrapper)).toMatchSnapshot();
})
