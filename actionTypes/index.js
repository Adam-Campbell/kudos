/*
Action namespacing reference:

[hook] - These actions simply represent an event that has happened, such as the different lifecycle
stages of a network request, for example. There may or may not be a reducer listening for this action.
Generally these actions will not result in any entities being added into the store, but in some cases
may cause meta information related to certain entities to update.

[store one] - These actions represent either one whole entity or part of an entity being added into
the store. Generally it will be a whole, complete entity but in some cases where a specific part of an
entity needs its own network request and therefore it's own action, the [store one] namespace will then be 
used to represent the action that is responsible for decorating the entity with this extra information.

[store many] - These actions represent a collection of entities of the same type being added into the
store in one action.

[update reference] - These actions do not add any new entities into the store, but update a parent entities
reference to its children. Generally these actions will be fired at the same time as [store many] actions,
they are merely kept as seperate actions for the sake of modularity.
An example would be when a posts comments are fetched, the comments themselves will be added to the store
with a [store many] action, but the array of object_ids for the comments will be added to the parent post
with an [update reference] action. 

*/


export const FETCH_POSTS_REQUEST = '[hook] FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = '[hook] FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = '[hook] FETCH_POSTS_FAILED';

export const FETCH_CATEGORIES_POSTS_REQUEST = '[hook] FETCH_CATEGORIES_POSTS_REQUEST';
export const FETCH_CATEGORIES_POSTS_SUCCESS = '[hook] FETCH_CATEGORIES_POSTS_SUCCESS';
export const FETCH_CATEGORIES_POSTS_FAILED = '[hook] FETCH_CATEGORIES_POSTS_FAILED';

export const FETCH_POST_REQUEST = '[hook] FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = '[hook] FETCH_POST_SUCCESS';
export const FETCH_POST_FAILED = '[hook] FETCH_POST_FAILED';

export const FETCH_USER_REQUEST = '[hook] FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = '[hook] FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = '[hook] FETCH_USER_FAILED';

export const FETCH_CURRENT_USER_REQUEST = '[hook] FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = '[hook] FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILED = '[hook] FETCH_CURRENT_USER_FAILED';

export const FOLLOW_USER_REQUEST = '[hook] FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = '[hook] FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILED = '[hook] FOLLOW_USER_FAILED';

export const UNFOLLOW_USER_REQUEST = '[hook] UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = '[hook] UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILED = '[hook] UNFOLLOW_USER_FAILED';

export const GIVE_KUDOS_REQUEST = '[hook] GIVE_KUDOS_REQUEST';
export const GIVE_KUDOS_SUCCESS = '[hook] GIVE_KUDOS_SUCCESS'; 
export const GIVE_KUDOS_FAILED = '[hook] GIVE_KUDOS_FAILED';

export const REMOVE_KUDOS_REQUEST = '[hook] REMOVE_KUDOS_REQUEST';
export const REMOVE_KUDOS_SUCCESS = '[hook] REMOVE_KUDOS_SUCCESS'; 
export const REMOVE_KUDOS_FAILED = '[hook] REMOVE_KUDOS_FAILED';

export const UPDATE_USER_DETAILS_REQUEST = '[hook] UPDATE_USER_DETAILS_REQUEST';
export const UPDATE_USER_DETAILS_SUCCESS = '[hook] UPDATE_USER_DETAILS_SUCCESS'; 
export const UPDATE_USER_DETAILS_FAILED = '[hook] UPDATE_USER_DETAILS_FAILED';

export const UPDATE_USER_AVATAR_REQUEST = '[hook] UPDATE_USER_AVATAR_REQUEST';
export const UPDATE_USER_AVATAR_SUCCESS = '[hook] UPDATE_USER_AVATAR_SUCCESS'; 
export const UPDATE_USER_AVATAR_FAILED = '[hook] UPDATE_USER_AVATAR_FAILED';

export const UPDATE_USER_PASSWORD_REQUEST = '[hook] UPDATE_USER_PASSWORD_REQUEST';
export const UPDATE_USER_PASSWORD_SUCCESS = '[hook] UPDATE_USER_PASSWORD_SUCCESS';
export const UPDATE_USER_PASSWORD_FAILED = '[hook] UPDATE_USER_PASSWORD_FAILED';

export const CREATE_POST_REQUEST = '[hook] CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = '[hook] CREATE_POST_SUCCESS';
export const CREATE_POST_FAILED = '[hook] CREATE_POST_FAILED'; 

export const EDIT_POST_REQUEST = '[hook] EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = '[hook] EDIT_POST_SUCCESS'; 
export const EDIT_POST_FAILED = '[hook] EDIT_POST_FAILED';

export const GET_PASSWORD_RESET_EMAIL_REQUEST = '[hook] GET_PASSWORD_RESET_EMAIL_REQUEST';
export const GET_PASSWORD_RESET_EMAIL_SUCCESS = '[hook] GET_PASSWORD_RESET_EMAIL_SUCCESS';
export const GET_PASSWORD_RESET_EMAIL_FAILED = '[hook] GET_PASSWORD_RESET_EMAIL_FAILED'; 

export const SET_NEW_PASSWORD_REQUEST = '[hook] SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = '[hook] SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = '[hook] SET_NEW_PASSWORD_FAILED';

export const REPLY_TO_POST_REQUEST = '[hook] REPLY_TO_POST_REQUEST';
export const REPLY_TO_POST_SUCCESS = '[hook] REPLY_TO_POST_SUCCESS';
export const REPLY_TO_POST_FAILED = '[hook] REPLY_TO_POST_FAILED';

export const REPLY_TO_COMMENT_REQUEST = '[hook] REPLY_TO_COMMENT_REQUEST';
export const REPLY_TO_COMMENT_SUCCESS = '[hook] REPLY_TO_COMMENT_SUCCESS';
export const REPLY_TO_COMMENT_FAILED = '[hook] REPLY_TO_COMMENT_FAILED';

export const DELETE_COMMENT_REQUEST = '[hook] DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = '[hook] DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILED = '[hook] DELETE_COMMENT_FAILED';

export const EDIT_COMMENT_REQUEST = '[hook] EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = '[hook] EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILED = '[hook] EDIT_COMMENT_FAILED';

export const UPDATE_CATEGORY_POST_IDS = '[update reference] UPDATE_CATEGORY_POST_IDS'; 

export const SIGN_IN_REQUEST = '[hook] SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '[hook] SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = '[hook] SIGN_IN_FAILED';

export const SIGN_OUT_SUCCESS = '[hook] SIGN_OUT_SUCCESS';

export const SIGN_UP_REQUEST = '[hook] SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = '[hook] SIGN_UP_SUCCESS';
export const SIGN_UP_FAILED = '[hook] SIGN_UP_FAILED';

export const TOKEN_EXPIRED = '[hook] TOKEN_EXPIRED';

// Storing related actions

export const STORE_CURRENT_USER = '[store one] STORE_CURRENT_USER';
export const STORE_CURRENT_USERS_FOLLOWS = '[store one] STORE_CURRENT_USERS_FOLLOWS';
export const STORE_CURRENT_USERS_KUDOS = '[store one] STORE_CURRENT_USERS_KUDOS';
export const STORE_CURRENT_USERS_HIGHLIGHTS = '[store one] STORE_CURRENT_USERS_HIGHLIGHTS';

export const STORE_USER = '[store one] STORE_USER';
export const STORE_USERS_POSTS = '[store reference] STORE_USERS_POSTS';
export const STORE_USERS_FOLLOWERS = '[store one] STORE_USERS_FOLLOWERS';
export const STORE_USERS_COMMENTS = '[store reference] STORE_USERS_COMMENTS';
export const STORE_USERS_KUDOS = '[store reference] STORE_USERS_KUDOS';
export const STORE_USERS_HIGHLIGHTS = '[store reference] STORE_USERS_HIGHLIGHTS';

export const STORE_USERS = '[store many] STORE_USERS';

export const STORE_POST = '[store one] STORE_POST';
export const STORE_POSTS_COMMENT_IDS = '[update reference] STORE_POSTS_COMMENT_IDS';
export const STORE_POSTS_KUDOS = '[store one] STORE_POSTS_KUDOS';

export const STORE_POSTS = '[store many] STORE_POSTS';
export const STORE_POSTS_FOR_CATEGORY = 'STORE_POSTS_FOR_CATEGORY';

export const UPDATE_IDS_FOR_CATEGORY = '[update reference] UPDATE_IDS_FOR_CATEGORY';

export const STORE_COMMENT = '[store one] STORE_COMMENT';
export const STORE_COMMENTS = '[store many] STORE_COMMENTS';

export const STORE_HIGHLIGHTS = '[store many] STORE_HIGHLIGHTS';



















































// export const FETCH_POSTS_REQUEST = '[hook] FETCH_POSTS_REQUEST';
// export const FETCH_POSTS_SUCCESS = '[hook] FETCH_POSTS_SUCCESS';
// export const FETCH_POSTS_FAILED = '[hook] FETCH_POSTS_FAILED';

// export const FETCH_CATEGORIES_POSTS_REQUEST = '[hook] FETCH_CATEGORIES_POSTS_REQUEST';
// export const FETCH_CATEGORIES_POSTS_SUCCESS = '[hook] FETCH_CATEGORIES_POSTS_SUCCESS';
// export const FETCH_CATEGORIES_POSTS_FAILED = '[hook] FETCH_CATEGORIES_POSTS_FAILED';

// export const FETCH_POST_REQUEST = '[hook] FETCH_POST_REQUEST';
// export const FETCH_POST_SUCCESS = '[hook] FETCH_POST_SUCCESS';
// export const FETCH_POST_FAILED = '[hook] FETCH_POST_FAILED';

// export const FETCH_POST_COMMENTS_REQUEST = '[hook] FETCH_POST_COMMENTS_REQUEST';
// export const FETCH_POST_COMMENTS_SUCCESS = '[hook] FETCH_POST_COMMENTS_SUCCESS'; 
// export const FETCH_POST_COMMENTS_FAILED = '[hook] FETCH_POST_COMMENTS_FAILED';

// export const FETCH_USER_REQUEST = '[hook] FETCH_USER_REQUEST';
// export const FETCH_USER_SUCCESS = '[hook] FETCH_USER_SUCCESS';
// export const FETCH_USER_FAILED = '[hook] FETCH_USER_FAILED';

// export const SIGN_IN_REQUEST = '[hook] SIGN_IN_REQUEST';
// export const SIGN_IN_SUCCESS = '[hook] SIGN_IN_SUCCESS';
// export const SIGN_IN_FAILED = '[hook] SIGN_IN_FAILED';

// export const SIGN_OUT_SUCCESS = '[hook] SIGN_OUT_SUCCESS';

// export const SIGN_UP_REQUEST = '[hook] SIGN_UP_REQUEST';
// export const SIGN_UP_SUCCESS = '[hook] SIGN_UP_SUCCESS';
// export const SIGN_UP_FAILED = '[hook] SIGN_UP_FAILED';

// export const FETCH_CURRENT_USER_REQUEST = '[hook] FETCH_CURRENT_USER_REQUEST';
// export const FETCH_CURRENT_USER_SUCCESS = '[hook] FETCH_CURRENT_USER_SUCCESS';
// export const FETCH_CURRENT_USER_FAILED = '[hook] FETCH_CURRENT_USER_FAILED';

// export const FOLLOW_USER_REQUEST = '[hook] FOLLOW_USER_REQUEST';
// export const FOLLOW_USER_SUCCESS = '[hook] FOLLOW_USER_SUCCESS';
// export const FOLLOW_USER_FAILED = '[hook] FOLLOW_USER_FAILED';

// export const UNFOLLOW_USER_REQUEST = '[hook] UNFOLLOW_USER_REQUEST';
// export const UNFOLLOW_USER_SUCCESS = '[hook] UNFOLLOW_USER_SUCCESS';
// export const UNFOLLOW_USER_FAILED = '[hook] UNFOLLOW_USER_FAILED';

// export const GIVE_KUDOS_REQUEST = '[hook] GIVE_KUDOS_REQUEST';
// export const GIVE_KUDOS_SUCCESS = '[hook] GIVE_KUDOS_SUCCESS'; 
// export const GIVE_KUDOS_FAILED = '[hook] GIVE_KUDOS_FAILED';

// export const REMOVE_KUDOS_REQUEST = '[hook] REMOVE_KUDOS_REQUEST';
// export const REMOVE_KUDOS_SUCCESS = '[hook] REMOVE_KUDOS_SUCCESS'; 
// export const REMOVE_KUDOS_FAILED = '[hook] REMOVE_KUDOS_FAILED';

// export const UPDATE_USER_DETAILS_REQUEST = '[hook] UPDATE_USER_DETAILS_REQUEST';
// export const UPDATE_USER_DETAILS_SUCCESS = '[hook] UPDATE_USER_DETAILS_SUCCESS'; 
// export const UPDATE_USER_DETAILS_FAILED = '[hook] UPDATE_USER_DETAILS_FAILED';

// export const UPDATE_USER_AVATAR_REQUEST = '[hook] UPDATE_USER_AVATAR_REQUEST';
// export const UPDATE_USER_AVATAR_SUCCESS = '[hook] UPDATE_USER_AVATAR_SUCCESS'; 
// export const UPDATE_USER_AVATAR_FAILED = '[hook] UPDATE_USER_AVATAR_FAILED';

// export const UPDATE_USER_PASSWORD_REQUEST = '[hook] UPDATE_USER_PASSWORD_REQUEST';
// export const UPDATE_USER_PASSWORD_SUCCESS = '[hook] UPDATE_USER_PASSWORD_SUCCESS';
// export const UPDATE_USER_PASSWORD_FAILED = '[hook] UPDATE_USER_PASSWORD_FAILED';

// export const CREATE_POST_REQUEST = '[hook] CREATE_POST_REQUEST';
// export const CREATE_POST_SUCCESS = '[hook] CREATE_POST_SUCCESS';
// export const CREATE_POST_FAILED = '[hook] CREATE_POST_FAILED'; 

// export const EDIT_POST_REQUEST = '[hook] EDIT_POST_REQUEST';
// export const EDIT_POST_SUCCESS = '[hook] EDIT_POST_SUCCESS'; 
// export const EDIT_POST_FAILED = '[hook] EDIT_POST_FAILED';

// export const GET_PASSWORD_RESET_EMAIL_REQUEST = '[hook] GET_PASSWORD_RESET_EMAIL_REQUEST';
// export const GET_PASSWORD_RESET_EMAIL_SUCCESS = '[hook] GET_PASSWORD_RESET_EMAIL_SUCCESS';
// export const GET_PASSWORD_RESET_EMAIL_FAILED = '[hook] GET_PASSWORD_RESET_EMAIL_FAILED'; 

// export const SET_NEW_PASSWORD_REQUEST = '[hook] SET_NEW_PASSWORD_REQUEST';
// export const SET_NEW_PASSWORD_SUCCESS = '[hook] SET_NEW_PASSWORD_SUCCESS';
// export const SET_NEW_PASSWORD_FAILED = '[hook] SET_NEW_PASSWORD_FAILED';

// export const REPLY_TO_POST_REQUEST = '[hook] REPLY_TO_POST_REQUEST';
// export const REPLY_TO_POST_SUCCESS = '[hook] REPLY_TO_POST_SUCCESS';
// export const REPLY_TO_POST_FAILED = '[hook] REPLY_TO_POST_FAILED';

// export const REPLY_TO_COMMENT_REQUEST = '[hook] REPLY_TO_COMMENT_REQUEST';
// export const REPLY_TO_COMMENT_SUCCESS = '[hook] REPLY_TO_COMMENT_SUCCESS';
// export const REPLY_TO_COMMENT_FAILED = '[hook] REPLY_TO_COMMENT_FAILED';

// export const DELETE_COMMENT_REQUEST = '[hook] DELETE_COMMENT_REQUEST';
// export const DELETE_COMMENT_SUCCESS = '[hook] DELETE_COMMENT_SUCCESS';
// export const DELETE_COMMENT_FAILED = '[hook] DELETE_COMMENT_FAILED';

// export const EDIT_COMMENT_REQUEST = '[hook] EDIT_COMMENT_REQUEST';
// export const EDIT_COMMENT_SUCCESS = '[hook] EDIT_COMMENT_SUCCESS';
// export const EDIT_COMMENT_FAILED = '[hook] EDIT_COMMENT_FAILED';

// export const UPDATE_CATEGORY_POST_IDS = '[update reference] UPDATE_CATEGORY_POST_IDS'; 


// // Error related actions

// export const CLEANSE_ERRORS = 'CLEANSE_ERRORS';

// export const EMAIL_NOT_FOUND_ERROR_REGISTER = 'EMAIL_NOT_FOUND_ERROR_REGISTER';
// export const EMAIL_NOT_FOUND_ERROR_ACKNOWLEDGE = 'EMAIL_NOT_FOUND_ERROR_ACKNOWLEDGE';



// // Success related actions

// export const CLEANSE_SUCCESSES = 'CLEANSE_SUCCESSES';

// export const PASSWORD_RESET_EMAIL_SENT_REGISTER = 'PASSWORD_RESET_EMAIL_SENT_REGISTER';
// export const PASSWORD_RESET_EMAIL_SENT_ACKNOWLEDGE = 'PASSWORD_RESET_EMAIL_SENT_ACKNOWLEDGE';





// // Storing related actions

// export const STORE_CURRENT_USER = '[store one] STORE_CURRENT_USER';
// export const STORE_CURRENT_USERS_FOLLOWS = '[store one] STORE_CURRENT_USERS_FOLLOWS';
// export const STORE_CURRENT_USERS_KUDOS = '[store one] STORE_CURRENT_USERS_KUDOS';
// export const STORE_CURRENT_USERS_HIGHLIGHTS = '[store one] STORE_CURRENT_USERS_HIGHLIGHTS';

// export const STORE_USER = '[store one] STORE_USER';
// export const STORE_USERS_POSTS = '[store reference] STORE_USERS_POSTS';
// export const STORE_USERS_FOLLOWERS = '[store one] STORE_USERS_FOLLOWERS';
// export const STORE_USERS_COMMENTS = '[store reference] STORE_USERS_COMMENTS';
// export const STORE_USERS_KUDOS = '[store reference] STORE_USERS_KUDOS';
// export const STORE_USERS_HIGHLIGHTS = '[store reference] STORE_USERS_HIGHLIGHTS';

// export const STORE_USERS = '[store many] STORE_USERS';


// export const STORE_POST = '[store one] STORE_POST';
// export const STORE_POSTS_COMMENT_IDS = '[update reference] STORE_POSTS_COMMENT_IDS';
// export const STORE_POSTS_KUDOS = '[store one] STORE_POSTS_KUDOS';




// export const STORE_POSTS = '[store many] STORE_POSTS';
// export const STORE_POSTS_FOR_CATEGORY = 'STORE_POSTS_FOR_CATEGORY';

// export const UPDATE_IDS_FOR_CATEGORY = '[update reference] UPDATE_IDS_FOR_CATEGORY';

// export const STORE_COMMENT = '[store one] STORE_COMMENT';
// export const STORE_COMMENTS = '[store many] STORE_COMMENTS';

// export const STORE_HIGHLIGHTS = '[store many] STORE_HIGHLIGHTS';


// export const TOKEN_EXPIRED = '[hook] TOKEN_EXPIRED';








 