import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import LoginUser from './components/LoginUser'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/create' component={CreatePost} />
        <Route path='/login' component={LoginUser} />
      </div>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
