import {createClient} from 'contentful';

export default createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    host: process.env.NODE_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com',
});
