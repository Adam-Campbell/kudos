import * as actionTypes from '../actionTypes';
import { mergeAndDedupArrays } from '../utils';

export const initialState = {
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

        // case actionTypes.FETCH_POSTS_SUCCESS:
        //     return {
        //         ...state,
        //         all: {
        //             postIds: mergeAndDedupArrays(state.all, action.payload.result),
        //             fetchedAt: action.timestamp
        //         }
        //     }

        // case actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS:
        //     return {
        //         ...state,
        //         [action.key]: {
        //             postIds: mergeAndDedupArrays(state[action.key] ,action.payload.result),
        //             fetchedAt: action.timestamp
        //         }
        //     }

        // this action is for when we update the category of an existing post
        case actionTypes.UPDATE_CATEGORY_POST_IDS:
            return {
                ...state,
                [action.meta.oldCategory]: {
                    fetchedAt: state[action.meta.oldCategory].fetchedAt,
                    postIds: state[action.meta.oldCategory].postIds.filter(id => id !== action.meta.post_id)
                },
                [action.meta.newCategory]: {
                    fetchedAt: state[action.meta.newCategory].fetchedAt,
                    postIds: [action.meta.post_id, ...state[action.meta.newCategory].postIds]

                }
            }

        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                [action.meta.category]: {
                    fetchedAt: state[action.meta.category].fetchedAt,
                    postIds: [action.meta.post_id, ...state[action.meta.category].postIds]
                },
                all: {
                    fetchedAt: state.all.fetchedAt,
                    postIds: [action.post_id, ...state.all.postIds]
                }
            }

        // this action is for when the latest posts for a partiular category are fetched
        case actionTypes.UPDATE_IDS_FOR_CATEGORY:
            return {
                ...state,
                [action.meta.category]: {
                    postIds: mergeAndDedupArrays(state[action.meta.category], action.payload),
                    fetchedAt: action.meta.timestamp
                }
            }

        default: 
            return state;
    }
};

export default categoriesReducer;
