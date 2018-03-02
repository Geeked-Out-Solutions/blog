import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import map from 'lodash/map';
import toPairs from 'lodash/toPairs';

import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';

import { rhythm } from 'src/util/typography';
import getTagCounts from 'src/util/getTagCounts';
import getPosts from 'src/util/getPosts';

import Author from 'src/Author';


const QUARTER = 0.25;
const LARGER_MARGIN = 1.5;

export default function TagIndex(props) {
  const title = 'Tags';
  const posts = getPosts(props.route.pages);
  const tags = getTagCounts(posts);
  const tagLinks = map(toPairs(tags), ([tag, count]) =>
    <li
      key={tag}
      style={{
        marginBottom: rhythm(QUARTER),
      }}
    >
      <Link to={prefixLink(`/tags/${tag}/`)} >{tag}</Link>
      <span
        style={{
          color: 'lightgray',
        }}
      >
        {` ${count} ${count === 1 ? 'entry' : 'entries'}`}
      </span>
    </li>
  );

  return (
    <DocumentTitle title={`${title} | ${config.blogTitle}`}>
      <div>
        <h1>{title}</h1>
        <ul>
          {tagLinks}
        </ul>
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

TagIndex.propTypes = {
  route: React.PropTypes.object.isRequired,
};
