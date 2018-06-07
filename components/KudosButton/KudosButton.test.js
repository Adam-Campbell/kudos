import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { KudosButtonContainer } from './index';
import KudosButton from './KudosButton';
const article_id= 'article_A';
const altArticle_id = 'article_B';
const mockedGiveKudos = jest.fn();
const mockedRemoveKudos = jest.fn();


describe('<KudosButtonContainer/>', () => {
    test("doesn't render a button if user is not logged in", () => {
        const container = shallow(
            <KudosButtonContainer 
                article_id={article_id}
                users={store.users}
                currentUser_id={''}
                token={''}
                isLoggedIn={false}
            />
        );
        expect(container.find(KudosButton)).toHaveLength(0);
        expect(container).toMatchSnapshot();
    });
    test('renders and behaves correctly when the user has given kudos', () => {
        const container = shallow(
            <KudosButtonContainer 
                article_id={article_id}
                users={store.users}
                currentUser_id={store.currentUser._id}
                token={store.currentUser.token}
                isLoggedIn={store.currentUser.isLoggedIn}
                giveKudos={mockedGiveKudos}
                removeKudos={mockedRemoveKudos}
            />
        );
        // create a wrapper for the presentational component returned.
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
        // check correct prop is passed to the presentational component
        expect(container.find('KudosButton').prop('hasGivenKudos')).toBe(true);
        // check the correct function is called onClick
        expect(mockedRemoveKudos).not.toHaveBeenCalled();
        presenter.find('ButtonOuter').simulate('click');
        expect(mockedRemoveKudos).toHaveBeenCalledTimes(1);
    });
    test("renders and behaves correctly when the user hasn't given kudos", () => {
        const container = shallow(
            <KudosButtonContainer 
                article_id={altArticle_id}
                users={store.users}
                currentUser_id={store.currentUser._id}
                token={store.currentUser.token}
                isLoggedIn={store.currentUser.isLoggedIn}
                giveKudos={mockedGiveKudos}
                removeKudos={mockedRemoveKudos}
            />
        );
        // create a wrapper for the presentational component returned.
        const presenter = container.first().shallow();
         // check snapshots for container and presentational components
         expect(container).toMatchSnapshot();
         expect(presenter).toMatchSnapshot();
         // check correct prop is passed to the presentational component
        expect(container.find('KudosButton').prop('hasGivenKudos')).toBe(false);
        // check the correct function is called onClick
        expect(mockedGiveKudos).not.toHaveBeenCalled();
        presenter.find('ButtonOuter').simulate('click');
        expect(mockedGiveKudos).toHaveBeenCalledTimes(1);
    });
});
