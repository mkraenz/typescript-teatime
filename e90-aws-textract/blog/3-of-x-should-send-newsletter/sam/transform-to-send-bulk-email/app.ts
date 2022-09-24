import { BulkEmailArgs, ContactChunk } from './interfaces';

const getEnvVars = () => {
    if (!process.env.TEMPLATE_ARN) {
        throw new Error('TEMPLATE_ARN is not defined');
    }
    if (!process.env.FROM_EMAIL_ADDRESS) {
        throw new Error('FROM_EMAIL_ADDRESS is not defined');
    }
    if (!process.env.TEMPLATE_NAME) {
        throw new Error('TEMPLATE_NAME is not defined');
    }
    if (!process.env.API_GATEWAY_API_ID) {
        throw new Error('API_GATEWAY_API_ID is not defined');
    }
    return {
        TemplateArn: process.env.TEMPLATE_ARN,
        FromEmailAddress: process.env.FROM_EMAIL_ADDRESS,
        TemplateName: process.env.TEMPLATE_NAME,
        apiGatewayApiId: process.env.API_GATEWAY_API_ID,
    };
};

export const lambdaHandler = async (event: ContactChunk): Promise<BulkEmailArgs> => {
    const { TemplateArn, FromEmailAddress, TemplateName, apiGatewayApiId } = getEnvVars();
    return {
        FromEmailAddress,
        DefaultContent: {
            Template: {
                TemplateName,
                TemplateArn,
                TemplateData: JSON.stringify({
                    email: 'subscriber',
                    articleTitle: event.newBlogArticle.title,
                    linkToArticle: event.newBlogArticle.link,
                    apiGatewayApiId,
                }),
            },
        },
        BulkEmailEntries: event.contacts.map((contact) => ({
            Destination: {
                ToAddresses: [contact.email],
            },
            ReplacementEmailContent: {
                ReplacementTemplate: {
                    ReplacementTemplateData: JSON.stringify({ email: contact.email }),
                },
            },
        })),
    };
};
