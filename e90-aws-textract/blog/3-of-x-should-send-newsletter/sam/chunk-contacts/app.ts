import chunk from 'lodash.chunk';

interface Item {
    title: string;
    /** In ISO8601 format */
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

interface Contact {
    EmailAddress: string;
}

export interface ContactChunk {
    newBlogArticle: Item;
    contacts: { email: string; id: string }[];
}

interface LookupItem {
    email: { S: string };
    id: { S: string };
}
interface Input {
    ses: {
        Contacts: Contact[];
    };
    dynamodb: {
        Items: LookupItem[];
    };
    newBlogArticle: Item;
}

type NormalizedLookupItems = { [email: string]: LookupItem };

const normalize = (items: LookupItem[]): NormalizedLookupItems => {
    return items.reduce((acc, item) => {
        return { ...acc, [item.email.S]: item };
    }, {});
};

export const lambdaHandler = async (event: Input): Promise<{ chunks: ContactChunk[] }> => {
    const items = normalize(event.dynamodb.Items);
    const chunkSize = Number.parseInt(process.env.CHUNK_SIZE || '50', 10);
    const contactChunks = chunk(event.ses.Contacts, chunkSize);
    return {
        chunks: contactChunks.map((chunk) => ({
            newBlogArticle: event.newBlogArticle,
            contacts: chunk.map((contact) => ({
                email: contact.EmailAddress,
                id: items[contact.EmailAddress].id.S,
            })),
        })),
    };
};
