import { shallow } from 'enzyme';
import { ArticleContainer } from './index';
import { store } from '../../mockedStore';
const article_id = 'article_A';
const altArticle_id = 'article_B';

describe('<ArticleContainer/>', () => {
    test('renders correctly if user is author of article', () => {
        const container = shallow(
            <ArticleContainer 
                article_id={article_id}
                articles={store.articles}
                isLoggedIn={store.currentUser.isLoggedIn}
                currentUser_id={store.currentUser._id}
            />
        );
        // create wrapper for the presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
        // check correct props are passed to the presentational component
        expect(container.find('Article').prop('isAuthor')).toBe(true);
    });
    test("renders correctly if user isn't author of article", () => {
        const container = shallow(
            <ArticleContainer 
                article_id={altArticle_id}
                articles={store.articles}
                isLoggedIn={store.currentUser.isLoggedIn}
                currentUser_id={store.currentUser._id}
            />
        );
        // create wrapper for the presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
        // check correct props are passed to the presentational component
        expect(container.find('Article').prop('isAuthor')).toBe(false);
    });
});
