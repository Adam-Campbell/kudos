import * as actionTypes from '../actionTypes';
import categoriesReducer, { initialState } from './categoriesReducer';
const mockedTimestamp = Date.now();

describe('categories reducer', () => {
    test('returns initial state', () => {
        expect(categoriesReducer(undefined, {})).toEqual(initialState);
    });
    test('handles FETCH_POSTS_SUCCESS', () => {
        expect(
            categoriesReducer(undefined, {
                type: actionTypes.FETCH_POSTS_SUCCESS,
                payload: {
                    result: ['abc', '123']
                },
                timestamp: mockedTimestamp
            })
        )
        .toEqual({
            all: { postIds: ['abc', '123'], fetchedAt: mockedTimestamp },
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
        });
    });
    test('handles FETCH_CATEGORIES_POSTS_SUCCESS', () => {
        expect(
            categoriesReducer(undefined, {
                type: actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS,
                payload: {
                    result: ['abc', '123']
                },
                key: 'javascript',
                timestamp: mockedTimestamp
            })
        )
        .toEqual({
            all: { postIds: [], fetchedAt: null },
            javascript: { postIds: ['abc', '123'], fetchedAt: mockedTimestamp },
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
        })
    });
    test('handles UPDATE_CATEGORY_POST_IDS', () => {
        expect(
            categoriesReducer(
                {
                    all: { postIds: [], fetchedAt: null },
                    javascript: { postIds: ['abc', '123'], fetchedAt: mockedTimestamp },
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
                },
                {
                    type: actionTypes.UPDATE_CATEGORY_POST_IDS,
                    oldCategory: 'javascript',
                    newCategory: 'fantasy',
                    post_id: 'abc'
                }
            )
        )
        .toEqual({
            all: { postIds: [], fetchedAt: null },
            javascript: { postIds: ['123'], fetchedAt: mockedTimestamp },
            fantasy: { postIds: ['abc'], fetchedAt: null },
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
        })
    });
    test('handles CREATE_POST_SUCCESS', () => {
        expect(
            categoriesReducer(
                undefined,
                {
                    type: actionTypes.CREATE_POST_SUCCESS,
                    payload: {},
                    key: 'user_A',
                    category: 'javascript',
                    post_id: 'abc'
                }
            )
        )
        .toEqual({
            all: { postIds: ['abc'], fetchedAt: null },
            javascript: { postIds: ['abc'], fetchedAt: null },
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
        });
    });
});