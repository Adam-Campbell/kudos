import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { JumboArticleCardContainer } from './index';
const article_id = 'article_A';

describe('<JumboArticleCardContainer />', () => {
    test('renders correctly', () => {
        const container = shallow(
            <JumboArticleCardContainer 
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