import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { InlineArticleCardContainer } from './index';

const article_id = 'article_A';

describe('<InlineArticleCardContainer />', () => {
    test('renders correctly', () => {
        const container = shallow(
            <InlineArticleCardContainer
                article_id={article_id} 
                articles={store.articles}
                users={store.users}
            />
        );
        const presenter = container.first().shallow();
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});