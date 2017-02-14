const React = require('react');
const ReactNative = require('react-native');
const Configuration = require('./configuration')
const {
  NetInfo
} = ReactNative

const limit = 20
const path = "v2/search"

import OAuthSimple from 'oauthsimple'

 export async function fetchList(searchString, callback) {
    var consumerKey = Configuration.keys.consumerKey
    var consumerSecret = Configuration.keys.consumerSecret
    var tokenSecret = Configuration.keys.tokenSecret
    var token = Configuration.keys.token

   oauth = new OAuthSimple(consumerKey, tokenSecret)

    request = oauth.sign({
      action: "GET",
      path: Configuration.baseUrl + path,
      parameters: "category_filter=realestateagents&location=" + searchString + "&cll" + searchString + "&limit=" + limit + "&sort=2", //sort by "Highest Rated"
      signatures: {api_key: consumerKey, shared_secret: consumerSecret, access_token: token, access_secret: tokenSecret},
    })

    console.log("Print request: ", request)
   fetch(request.signed_url, {method: "GET"})
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
      callback(error)
    })
    .then( item => {
      console.log(item)
      callback(item)
    }).done();
  }
