import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"

const BlogPost = ({node}) => {
    return (
        <div style={{
            marginBottom: '1.5rem',
            padding: '1.5rem',
            border: '1px solid #ccc'
        }}>
          <h3><Link to={node.slug}>{node.title}</Link></h3>
          <p>{node.createdAt}</p>
        </div>
    )
}

const IndexPage = (props) => {

    console.log(props)
    return (
        <div>
          {props.data.allContentfulPost.edges.map((edge) => <BlogPost key={edge.node.id} node={edge.node} />)}
        </div>
    )
}

export default IndexPage

export const pageQuery = graphql`
query pageQuery {
    allContentfulPost(
        filter: {
            node_locale: {eq: "en-US"}
        },
        sort: {
            fields: [createdAt], order: DESC
        }
    ) {
        edges {
            node {
                id
                title {
                  id
                }
                slug
                createdAt(formatString: "MMMM DD, YYYY")
                featuredImage {
                    resolutions(width: 300) {
                      base64
                      aspectRatio
                      width
                      height
                      src
                      srcSet
                    }
                }
            }
        }
    }
}
`
