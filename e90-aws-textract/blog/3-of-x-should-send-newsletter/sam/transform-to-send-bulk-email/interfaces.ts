export interface BulkEmailArgs {
    FromEmailAddress: string;
    DefaultContent: DefaultContent;
    BulkEmailEntries: BulkEmailEntry[];
}

interface BulkEmailEntry {
    Destination: Destination;
    ReplacementEmailContent: ReplacementEmailContent;
}

interface ReplacementEmailContent {
    ReplacementTemplate: ReplacementTemplate;
}

interface ReplacementTemplate {
    ReplacementTemplateData: string;
}

interface Destination {
    ToAddresses: string[];
}

interface DefaultContent {
    Template: Template;
}

interface Template {
    TemplateName: string;
    TemplateArn: string;
    TemplateData: string;
}

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

export interface ContactChunk {
    newBlogArticle: Item;
    contacts: { email: string }[];
}
