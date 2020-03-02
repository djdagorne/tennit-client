import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SearchPage from './SearchPage'
import '../../../setupTest'



it('renders without crashing', () => {
        const wrapper = shallow(<SearchPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
})
