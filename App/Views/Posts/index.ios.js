/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');

var {
  Text,
  View,
  ListView,
} = React;

var styles = require("./style");
var api = require("../../Network/api.js");
var UtilFuncs = require("../../Utils/functions.js");

//View Elements
var PostCell = require("./Elements/PostCell");

//Views
var PostView = require("../Post");

var ViewReactClass = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(api.REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results.collection1),
          loaded: true
        });
      })
      .done();
  },
  render: function() {
    if(!this.state.loaded){
      return(
        <View style={styles.container}>
        <Text style={styles.loadingText}>
          Fetching Posts...
        </Text>
      </View>
      );
    }
    return (
      this.renderListView()
    );
  },
  renderListView: function(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPostCell}
        style={styles.postsListView}/>
    );
  },
  renderPostCell: function(post){
    return(
      <PostCell
        onSelect={() => this.selectPost(post)}
        post={post}/>
    );
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