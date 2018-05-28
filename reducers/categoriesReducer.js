import * as actionTypes from '../actionTypes';
import { mergeAndDedupArrays } from '../utils';

const initialState = {
    all: { postIds: [], fetchedAt: null },
    javascript: { postIds: [], fetchedAt: null },
    fantasy: { postIds: [], fetchedAt: null },
    games: { postIds: [], fetchedAt: null },
    news: { postIds: [], fetchedAt: null },
    fashion: { postIds: [], fetchedAt: null },
    travel: { postIds: [], fetchedAt: null },
    motivation: { postIds: [], fetchedAt: null },
    relationships: { postIds: [], fetchedAt: null },
    design: { postIds: [], fetchedAt: null },
    politics: { postIds: [], fetchedAt: null },
    mentalhealth: { postIds: [], fetchedAt: null },
    music: { postIds: [], fetchedAt: null }
};

const categoriesReducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                all: {
                    postIds: mergeAndDedupArrays(state.all, action.payload.result),
                    fetchedAt: action.timestamp
                }
            }

        case actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS:
            return {
                ...state,
                [action.key]: {
                    postIds: mergeAndDedupArrays(state[action.key] ,action.payload.result),
                    fetchedAt: action.timestamp
                }
            }

        case actionTypes.UPDATE_CATEGORY_POST_IDS:
            return {
                ...state,
                [action.oldCategory]: {
                    fetchedAt: state[action.oldCategory].fetchedAt,
                    postIds: state[action.oldCategory].postIds.filter(id => id !== action.post_id)
                },
                [action.newCategory]: {
                    fetchedAt: state[action.newCategory].fetchedAt,
                    postIds: [action.post_id, ...state[action.newCategory].postIds]

                }
            }

        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                [action.category]: {
                    fetchedAt: state[action.category].fetchedAt,
                    postIds: [action.post_id, ...state[action.category].postIds]
                },
                all: {
                    fetchedAt: state.all.fetchedAt,
                    postIds: [action.post_id, ...state.all.postIds]
                }
            }

        default: 
            return state;
    }
};

export default categoriesReducer;
