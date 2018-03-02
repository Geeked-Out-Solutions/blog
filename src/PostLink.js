import React from 'react';
import { Link } from 'react-router';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';


const QUARTER = 0.25;

export default function PostLink(props) {
  const post = props.post;
  const data = post.data;

  return <div
    style={{
      marginBottom: rhythm(QUARTER),
    }}
  >
    <Link to={prefixLink(post.path)}>
      {data.title}
    </Link>
    <span className="date">
      {' '}
      {shortDate(data.date)}
    </span>
  </div>;
}

PostLink.propTypes = {
  post: React.PropTypes.object.isRequired,
};

