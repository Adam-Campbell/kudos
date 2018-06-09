import React from 'react';
import { SimpleArticleBlockContainer } from './index';
import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
const article_id = 'article_A';

describe('<SimpleArticleBlockContainer />', () => {
    test('renders correctly', () => {
        const container = shallow(
            <SimpleArticleBlockContainer 
                article_id={article_id}
                articles={store.articles}
            />
        );
        const presenter = container.first().shallow();
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});