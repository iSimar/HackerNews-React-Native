/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');

var {
  Text,
  View,
} = React;

var styles = require("./style");
var api = require("../../Network/api.js");
var UtilFuncs = require("../../Utils/functions.js");

//Views
var PostView = require("../Post/index.ios.js");

var RefreshableListView = require("./Components/RefreshableListView");

var ViewReactClass = React.createClass({
  render: function(){
    return(
        <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
                             onRefresh={(callback)=>this.listViewOnRefresh(callback)}
                             backgroundColor={'#F6F6EF'}/>
    );
  },
  renderListViewRow: function(row){
      return(
          <Text>{row.title.text}</Text>
      );
  },
  listViewOnRefresh: function(callback){
      fetch(api.REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
          callback(responseData.results.collection1, {allLoaded: true});
      })
      .done();
  },
  selectPost: function(post){
    this.props.navigator.push({
      title: "Top Story #"+post.count.substring(0, post.count.length - 1),
      component: PostView,
      passProps: {post_id: UtilFuncs.getId(post.comments.href),
                  post_title: post.title.text,
                  post_by: post.username.text.split(" ")[0],
                  post_comments_count: post.comments.text.split(" ")[0],
                  post_points_count: post.points.split(" ")[0],}
    });
  },

});
module.exports = ViewReactClass;
