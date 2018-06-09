import { shallow } from 'enzyme';
import { Button, AnchorButton } from './index';

describe('<Button/>', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <Button>A Button</Button>
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('the isHovered prop is toggled appropriately on MouseEnter and MouseLeave',() => {
        const wrapper = shallow(
            <Button>A Button</Button>
        );
        expect(wrapper.find('ButtonElement').prop('isHovered')).toBe(false);
        wrapper.find('ButtonElement').simulate('mouseEnter');
        expect(wrapper.find('ButtonElement').prop('isHovered')).toBe(true);
        wrapper.find('ButtonElement').simulate('mouseLeave');
        expect(wrapper.find('ButtonElement').prop('isHovered')).toBe(false);  
    });
    test('any additional props are passed to the rendered output correctly', () => {
        const wrapper = shallow(
            <Button foo="bar">A Button</Button>
        );
        expect(wrapper.find('ButtonElement').prop('foo')).toBe('bar');
    });
});

describe('<AnchorButton/>', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <AnchorButton>An Anchor Button</AnchorButton>
        );
        expect(wrapper).toMatchSnapshot();
    });
    test("the isHovered prop is toggled appropriately on MouseEnter and MouseLeave",() => {
        const wrapper = shallow(
            <AnchorButton>An Anchor Button</AnchorButton>
        );
        expect(wrapper.find('ButtonElement').prop('isHovered')).toBe(false);
        wrapper.find('ButtonElement').simulate('mouseEnter');
        expect(wrapper.find('ButtonElement').prop('isHovered')).toBe(true);
        wrapper.find('ButtonElement').simulate('mouseLeave');
        expect(wrapper.find('ButtonElement').prop('isHovered')).toBe(false);  
    });
    test('any additional props are passed to the rendered output correctly', () => {
        const wrapper = shallow(
            <AnchorButton foo="bar">An Anchor Button</AnchorButton>
        );
        expect(wrapper.find('ButtonElement').prop('foo')).toBe('bar');
    });
});