module.exports = {
  blogPostDir: "blog-posts", // The name of directory that contains your posts.
  siteTitle: "Geeked Out Solutions", // Site title.
  siteTitleAlt: "Geeked Out Solutions", // Alternative site title for SEO.
  siteLogo: "/logos/logo.png", // Logo used for SEO and manifest.
  siteUrl: "https://vagr9k.github.io", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "A Blog About Datacenter Automation, Chatbots, and other Geeky Stuff", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  siteGATrackingID: "UA-102614039-1", // Tracking code ID for google analytics.
  disqusShortname: "https-geeked-out-solutions", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Brian Hopkins", // Username to display in the author segment.
  userTwitter: "btotharye", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Clayton, NC", // User location to display in the author segment.
  userAvatar: "/logos/avatar.jpg", // User avatar to display in the author segment.
  userDescription:
    "Brian Hopkins is a avid Python/javascript programmer and enjoys automating his house and other things in his work and personal life.  He enjoys teaching others about AI, chatbots, and other automation topics.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Geeked-Out-Solutions",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/geekedoutsol",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:geekedoutsolutions@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018. Geeked Out Solutions" // Copyright string for the footer of the website and RSS feed.
};
