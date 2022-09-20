import { BulkEmailArgs, ContactChunk } from './interfaces';

export const lambdaHandler = async (event: ContactChunk): Promise<BulkEmailArgs> => {
    const TemplateArn =
        process.env.TEMPLATE_ARN || 'arn:aws:ses:us-east-1:756399734264:template/EmailNewsletterWelcome';
    const FromEmailAddress = process.env.FROM_EMAIL_ADDRESS || 'typescriptteatime@gmail.com';
    const TemplateName = process.env.TEMPLATE_NAME || 'EmailNewsletterWelcome';
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
