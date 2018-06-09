import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { SimpleCommentBlockContainer } from './index';
import { SimpleArticleBlockContainer } from '../SimpleArticleBlock/index';
const comment_id = 'comment_A'

describe('<SimpleCommentBlockContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <SimpleCommentBlockContainer 
                comment_id={comment_id}
                comments={store.comments}
            />
        );
        const presenter = container.first().shallow();
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});