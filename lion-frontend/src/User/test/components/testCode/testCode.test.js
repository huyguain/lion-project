import React from 'react';
import renderer from 'react-test-renderer';
import TestCode from '../../../../src/components/contents/test/testCode/TestCode';
import { Link, StaticRouter, MemoryRouter } from 'react-router-dom'

describe('contents', () => {
    it('testCode', () => {
        const component = renderer.create(
            <MemoryRouter>
                <TestCode click={() => alert('hehe')} />
            </MemoryRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        console.log(tree.children[0])
    })
})