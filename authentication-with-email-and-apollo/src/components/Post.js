import React from 'react'

export default class Post extends React.Component {

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div className='pt3'>
          {this.props.post.title}&nbsp;
        </div>
        <div className='flex items-center black-80 fw3 description'>
          {this.props.post.contents}
        </div>
      </div>
    )
  }
}
