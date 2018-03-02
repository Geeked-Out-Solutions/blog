require('dotenv').config()

module.exports = {
    siteMetadata: {
        title: 'Geeked Out Solutions Blog',
    },
    plugins: [
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-remark'
    ],
};
