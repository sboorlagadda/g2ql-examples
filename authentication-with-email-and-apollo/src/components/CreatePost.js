import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends React.Component {

  state = {
    title: '',
    contents: '',
  }

  render () {

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-50 h1 pa3 mv2'
            value={this.state.title}
            placeholder='Title'
            onChange={e => this.setState({title: e.target.value})}
            autoFocus
          />
          <textarea
            className='w-100 pa3 mv2'
            value={this.state.contents}
            placeholder='Contents'
            onChange={e => this.setState({contents: e.target.value})}
          />
          {this.state.contents &&
            this.state.title &&
            <button
              className='pa3 bg-black-10 bn dim ttu pointer'
              onClick={this.handlePost}
            >
              Post
            </button>
          }
        </div>
      </div>
    )
  }

  handlePost = async () => {
    // redirect if no user is logged in
    if (!localStorage.getItem('graphcoolToken')) {
      console.warn('only logged in users can create new posts')
      return
    }

    const author = localStorage.getItem("graphcoolToken")
    const variables = { key: this.state.title, post: {title: this.state.title, contents: this.state.contents, author: author}}

    await this.props.createPostMutation({variables})
    this.props.history.replace('/')
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($key: String, $post: PostInput) {
    putPost(key: $key, Post: $post) {
      title
      contents
      author
    }
  }
`

export default compose(
  graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' }),
)(withRouter(CreatePost))
