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

interface ContactChunk {
    newBlogArticle: Item;
    contacts: { email: string }[];
}

interface Input {
    output: {
        Contacts: Contact[];
    };
    newBlogArticle: Item;
}

export const lambdaHandler = async (event: Input): Promise<{ chunks: ContactChunk[] }> => {
    const chunkSize = Number.parseInt(process.env.CHUNK_SIZE || '50', 10);
    const contactChunks = chunk(event.output.Contacts, chunkSize);
    return {
        chunks: contactChunks.map((chunk) => ({
            newBlogArticle: event.newBlogArticle,
            contacts: chunk.map((contact) => ({ email: contact.EmailAddress })),
        })),
    };
};
