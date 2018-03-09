import React, { Component } from "react";
import Disqus from "disqus-react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardText from "react-md/lib/Cards/CardText";
import Avatar from "react-md/lib/Avatars";
import FontIcon from "react-md/lib/FontIcons";
import config from "../../../data/SiteConfig";

class Article extends Component {
  render() {
    const { postNode, expanded } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    const post = postNode.frontmatter;
    const url = config.siteUrl + postNode.fields.slug;
    console.log("The disqus url is: " + url)
    console.log(config.disqusShortname)
    return (
      <Card className="md-grid md-cell md-cell--12">
        <CardTitle
          title="Comments"
          avatar={<Avatar icon={<FontIcon>comment</FontIcon>} />}
          expander={!expanded}
        />
        <CardText expandable={!expanded}>
          <Disqus.CommentCount shortname={config.disqusShortname} config={config}>
                    Comments
          </Disqus.CommentCount>
        </CardText>
      </Card>
    );
  }
}

export default Article;
