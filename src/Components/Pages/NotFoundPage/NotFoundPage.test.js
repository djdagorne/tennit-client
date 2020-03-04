import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotFoundPage from './NotFoundPage'
import '../../../setupTest'



it('renders without crashing', () => {
        const wrapper = shallow(<NotFoundPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
})
