import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { AuthorBlockContainer } from './index';

const article_id = 'article_A';


describe('<AuthorBlockContainer />', () => {
    test('renders correctly', () => {
        const container = shallow(
            <AuthorBlockContainer 
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