import { shallow } from 'enzyme';
import { SimpleHighlightBlockContainer } from './index';
import { store } from '../../mockedStore';
const highlight_id = 'highlight_A';

describe('<SimpleHighlightBlockContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <SimpleHighlightBlockContainer 
                highlight_id={highlight_id}
                highlights={store.highlights}
            />
        );
        const presenter = container.first().shallow();
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});