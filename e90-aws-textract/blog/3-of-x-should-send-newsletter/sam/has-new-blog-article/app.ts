import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface Item {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    description: string;
    category?: unknown[];
    /** the thumbnail image */
    enclosure?: {
        attributes: {
            // TODO double-check
            url: string;
            // eslint-disable-next-line @typescript-eslint/ban-types
            type: 'image/jpeg' | (string & {}); // enforcing autocompletion for literals but allowing any value
        };
    };
}

interface RssFeed {
    rss: {
        channel: {
            item: Item[];
        };
    };
}

function assertIsRssFeed(rssFeed: unknown): asserts rssFeed is RssFeed {
    if (typeof rssFeed !== 'object' || rssFeed === null) {
        throw new Error('rssFeed is not an object');
    }
    const rssFeedObj: { rss?: { channel?: unknown } } = rssFeed;

    if (typeof rssFeedObj.rss?.channel !== 'object' || rssFeedObj.rss?.channel === null) {
        throw new Error('rssFeed.rss.channel is not an array');
    }
}

const toNiceRssFeedItem = ({ pubDate, ...rest }: Item) => ({
    ...rest,
    publishedAt: new Date(pubDate),
});

function isWithin24Hours({ publishedAt }: { publishedAt: Date }) {
    const now = new Date();
    const diffInMillis = now.getTime() - publishedAt.getTime();
    const onDayInMillis = 24 * 60 * 60 * 1000;
    return diffInMillis < onDayInMillis;
}

const toResponseItem = ({ publishedAt, ...rest }: ReturnType<typeof toNiceRssFeedItem>): Item => ({
    pubDate: publishedAt.toISOString(),
    ...rest,
});

const byPubDateNewestFirst = (a: ReturnType<typeof toNiceRssFeedItem>, b: ReturnType<typeof toNiceRssFeedItem>) =>
    b.publishedAt.getTime() - a.publishedAt.getTime();

export const lambdaHandler = async (): Promise<
    { hasNewBlogArticle: boolean; newBlogArticle?: Item } | { error: string }
> => {
    const rssFeedUrl = process.env.RSS_FEED_URL; // move to env var
    try {
        const { data } = await axios.get<string>(rssFeedUrl || '');
        const rssFeed = await parseStringPromise(data, {
            explicitArray: false,
            trim: true,
            normalize: true,
            attrkey: 'attributes',
        });
        assertIsRssFeed(rssFeed);

        const items = rssFeed.rss.channel.item.map(toNiceRssFeedItem);
        items.sort(byPubDateNewestFirst);
        const newestArticle = items[0];

        if (newestArticle && isWithin24Hours(newestArticle)) {
            return {
                hasNewBlogArticle: true,
                newBlogArticle: toResponseItem(newestArticle),
            };
        }
        return {
            hasNewBlogArticle: false,
        };
    } catch (err: unknown) {
        // TODO what does step functions do when we return a 500 HTTP error?
        console.error(err);
        return {
            error: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }
};
