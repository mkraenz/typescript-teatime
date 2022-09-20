import { fail } from 'assert';
import { lambdaHandler } from '../../app';

beforeEach(() => {
    process.env.RSS_FEED_URL = 'https://dev.to/rss';
});

it('verifies successful response', async () => {
    const result = await lambdaHandler();

    if ('error' in result) {
        fail();
    } else {
        expect(result.hasNewBlogArticle).toBe(true);
        expect(typeof result.newBlogArticle).toBe('object');
        expect(result.newBlogArticle).not.toBe(null);
    }
});
