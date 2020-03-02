import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Header from './Header'
import '../../setupTest'

it('renders without crashing', () => {
    const wrapper = shallow(<Header />)
    expect(toJson(wrapper)).toMatchSnapshot()
})
