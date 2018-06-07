export const store = {
    articles: {
        article_A: {
            _id: 'article_A',
            title: 'The title for Article A',
            description: 'The description for Article A.',
            image: 'https://example.com/article_a.jpg',
            text: 'The main body of Article A.',
            kudos: 7,
            author: 'user_A',
            category: 'category_A',
            commentIds: ['comment_A', 'comment_C']
        },
        article_B: {
            _id: 'article_B',
            title: 'The title for Article B',
            description: 'The description for Article B.',
            image: 'https://example.com/article_b.jpg',
            text: 'The main body of Article B.',
            kudos: 2,
            author: 'user_B',
            category: 'category_B',
            commentIds: ['comment_B', 'comment_D']
        },
        article_C: {
            _id: 'article_C',
            title: 'The title for Article C',
            description: 'The description for Article C.',
            image: 'https://example.com/article_c.jpg',
            text: 'The main body of Article C.',
            kudos: 0,
            author: 'user_A',
            category: 'category_B',
            commentIds: []
        }
    },
    users: {
        user_A: {
            _id: 'user_A',
            followers: 1,
            following: 0,
            username: 'Joe Bloggs',
            avatar: 'https://example.com/user_a.jpg',
            bio: 'The bio for User A.',
            postIds: ['article_A', 'article_C'],
            commentIds: ['comment_A', 'comment_B'],
            kudosIds: ['article_A'],
            highlightIds: ['article_A']
        },
        user_B: {
            _id: 'user_B',
            followers: 0,
            following: 1,
            username: 'Jane Smith',
            avatar: 'https://example.com/user_b.jpg',
            bio: 'The bio for User B.',
            postIds: ['article_B'],
            commentIds: ['comment_C'],
            kudosIds: ['article_B']
        }
    },
    comments: {
        comment_A: {
            _id: 'comment_A',
            text: 'The text for Comment A.',
            author: 'user_A',
            discussion: 'article_A',
            createdAt: 'Wed, 06 Jun 2018 08:07:53 GMT',
            parents: ['comment_A']
        },
        comment_B: {
            _id: 'comment_B',
            text: 'The text for Comment B.',
            author: 'user_A',
            discussion: 'article_B',
            createdAt: 'Wed, 06 Jun 2018 10:32:06 GMT',
            parents: ['comment_B']
        },
        comment_C: {
            _id: 'comment_C',
            text: 'The text for Comment C.',
            author: 'user_B',
            discussion: 'article_A',
            createdAt: 'Wed, 06 Jun 2018 12:21:27 GMT',
            parents: ['comment_A', 'comment_B']
        },
        comment_D: {
            _id: 'comment_D',
            text: 'Comment deleted by user.',
            discussion: 'article_B',
            createdAt: 'Wed, 06 Jun 2018 13:46:12 GMT',
            author: null,
            discussion: 'article_B',
            parents: ['comment_D']
        }
    },
    highlights: {
        highlight_A: {
            _id: 'highlight_A',
            post: 'article_A',
            user: 'user_A',
            excerpt: 'An excerpt from Article A.'
        }
    },
    currentUser: {
        isLoggedIn: true,
        token: 'abc123',
        _id: 'user_A',
        follows: ['user_B'],
        email: 'example@example.com'
    },
    categories: {
        all: ['article_A', 'article_B', 'article_C'],
        category_A: ['article_A'],
        category_B: ['article_B', 'article_C']
    },
    errors: {
        signUpDuplicateError: false,
        emailNotFound: false
    },
    successes: {
        passwordResetEmailSent: false
    }
}