import { shallow } from 'enzyme';
import { SimpleKudosBlockContainer } from './index';
import { store } from '../../mockedStore';
const article_id = 'article_A';

describe('<SimpleKudosBlockContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <SimpleKudosBlockContainer 
                article_id={article_id}
                articles={store.articles}
            />
        );
        const presenter = container.first().shallow();
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});
