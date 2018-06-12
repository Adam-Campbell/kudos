import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Header from '../components/Header';
import Router from 'next/router';
import ExperimentEditor from '../components/ExperimentEditor';

const experiment = props => {
    if (props.isLoggedIn) {
        return (
            <React.Fragment>
                <Header />
                <ExperimentEditor isNewArticle={true} />
            </React.Fragment>
        )
    } else {
        if (typeof window !== 'undefined') { Router.push('/signin'); }
        return null;
    }
}

experiment.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn
});

export default withRedux(makeStore, mapStateToProps)(experiment);
