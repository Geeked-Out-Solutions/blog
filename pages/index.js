import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import map from 'lodash/map';

import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';

import getPosts from 'src/util/getPosts';
import { rhythm } from 'src/util/typography';

import Author from 'src/Author';
import PostLink from 'src/PostLink';
import TextPreview from 'src/TextPreview';
import HTMLPreview from 'src/HTMLPreview';
import EmailSignup from 'src/EmailSignup';


const HTML_PREVIEW_POSTS = 5;
const TEXT_PREVIEW_POSTS = 5;

const LARGER_MARGIN = 1.5;

function getHTMLPreviews(posts) {
  const sliced = posts.slice(0, HTML_PREVIEW_POSTS);
  return map(sliced, post => <HTMLPreview key={post.path} post={post} />);
}

function getTextPreviews(posts) {
  const sliced = posts.slice(HTML_PREVIEW_POSTS, HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  return map(sliced, post => <TextPreview key={post.path} post={post} />);
}

function getPlain(posts) {
  const sliced = posts.slice(HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  return map(sliced, post => <PostLink key={post.path} post={post} />);
}

export default function Index(props) {
  const posts = getPosts(props.route.pages);

  return (
    <DocumentTitle title={`Blog | ${config.blogTitle}`}>
      <div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <h3
          style={{
            textAlign: 'center',
            marginBottom: 0,
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}><Link to={prefixLink('/popular/')}>
            Popular Posts
          </Link> - <Link to={prefixLink('/tags/')}>
            Tags
          </Link> -</span> <span style={{ whiteSpace: 'nowrap' }}><a href="/rss.xml">
            RSS
          </a> - <a href="/atom.xml">
            Atom
          </a> - <a href="https://geekedoutsolutions.com">
            About Me
          </a></span>
        </h3>
        <EmailSignup text="Get updates straight to your inbox!" />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {getHTMLPreviews(posts)}
        {getTextPreviews(posts)}
        {getPlain(posts)}
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(2),
          }}
        />
        <div
          style={{
            marginTop: rhythm(LARGER_MARGIN),
          }}
        >
          <Author />
        </div>
      </div>
    </DocumentTitle>
  );
}

Index.propTypes = {
  route: React.PropTypes.object.isRequired,
};

