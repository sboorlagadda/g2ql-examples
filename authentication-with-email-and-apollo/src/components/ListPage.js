import React from 'react'
import Post from '../components/Post'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  render () {
    if (this.props.postsByAuthor.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
        {this.props.postsByAuthor.Posts && this.props.postsByAuthor.Posts.map((post) =>
            <Post key={post.title} post={post} />
          )}
        </div>
      </div>
    )
  }
}

const ALL_POSTS_QUERY = gql`
  query postsByAuthor($author: String) {
    Posts(author: [$author]) {
      title
      contents
      author
    }
  }
`


export default compose(
  graphql(ALL_POSTS_QUERY, {
    name: 'postsByAuthor',
    options: () => ({
      variables: {
        author: localStorage.getItem('graphcoolToken'),
      }
    }),
  }),
)(withRouter(ListPage))
