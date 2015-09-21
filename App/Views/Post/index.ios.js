/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} = React;

var styles = require('./style');

var api = require("../../Network/api.js");

//View Elements
var CommentCell = require("./Elements/CommentCell");

//Views
var Web_View = require("../Web");

var Post = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      comments: [],
      commentsLoaded: false,
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(api.HN_ITEM_ENDPOINT+this.props.post_id+'.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          post_text: responseData.text,
          post_url: responseData.url,
          loaded: true
        });
        if(responseData.kids){
          this.fetchComments(responseData.kids, 0, responseData.kids.length, []);
        }
      })
      .done();
  },
  fetchComments: function(kids, current, end, a){
    if(current != end){
    fetch(api.HN_ITEM_ENDPOINT+kids[current]+'.json')
      .then((response) => response.json())
      .then((responseData) => {
        responseData.leftMargin = 10;
        if(responseData.kids){
          responseData.replies_count = responseData.kids.length;
        }
        this.updateDataSource(a);
        if(responseData.deleted){
          this.fetchComments(kids, current+1, end, a.concat([{"by": "<Username>", "text": "<Comment Deleted>", "leftMargin": 10}]));
        }
        else{
          this.fetchComments(kids, current+1, end, a.concat([responseData]));
        }
      })
      .done();
    }
  },
  insertInComments: function(new_parent_comment, comments_to_added, location){
    var head_array = this.state.comments.slice(0, location-1);
    var tail_array = this.state.comments.slice(location, this.state.comments.length);
    return ((head_array.concat([new_parent_comment])).concat(comments_to_added)).concat(tail_array);
  },
  updateDataSource: function(comments){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(comments),
      comments: comments,
      commentsLoaded: true,
    });
  },
  render: function() {
    return (
     <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentCell}
          renderHeader={this.renderCommentsHeader}
          style={styles.commentListView}/>
    );
  },
  renderCommentsHeader: function(){
    if(!this.state.loaded){
      return(
      <View style={styles.container}>
          <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.post_title}
          </Text>
          <TouchableHighlight 
            onPress={() => this.openPage()}
            underlayColor='#F6F6EF'>
          <Text style={styles.source}>
            (Source)
          </Text>
          </TouchableHighlight>
          <Text style={styles.text}>
            {this.state.post_text}
          </Text>
          <Text style={styles.postDetailsLine}>
            Posted by Username | 18 Points
          </Text>
          <View style={styles.separator}/>
          <Text style={styles.commentTitle}>{this.props.post_comments_count} Comments:</Text>
          <Text style={styles.loadingText}>Fetching Comments...</Text>
          </View>
      </View>
      );
    }
    return(
      <View style={styles.container}>
          <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.post_title}
          </Text>
          <TouchableHighlight 
            onPress={() => this.openPage()}
            underlayColor='#F6F6EF'>
          <Text style={styles.source}>
            (Source)
          </Text>
          </TouchableHighlight>
          <Text style={styles.text}>
            {this.state.post_text}
          </Text>
          <Text style={styles.postDetailsLine}>
            Posted by {this.props.post_by} | {this.props.post_points_count} Points
          </Text>
          <View style={styles.separator}/>
          <Text style={styles.commentTitle}>{this.props.post_comments_count} Comments:</Text>
          </View>
      </View>
    );
  },
  renderCommentCell: function(comment){
    return(
        <CommentCell 
          comment={comment}
          onSelectShowReplies={() => this.getAndRenderCommentReplies(comment)} />
    );
  },
  getAndRenderCommentReplies: function(comment){
    this.fetchSubComments(comment.kids, 0, [], comment, this.state.comments.indexOf(comment), comment.leftMargin+10);
    // var locationOfComment = ;
    // var locationBelowParentComment = locationOfComment+1;
    
  },
  fetchSubComments: function(kids, current, a, comment, parentCommentLocation, newleftMargin){
    if(current == 0){
      this.updateDataSource(
                          this.insertInComments({"by":comment.by, "text":comment.text, "leftMargin":comment.leftMargin, loadingSubComments: true}, 
                                                [], 
                                                parentCommentLocation+1)
                          );
    }
    if(current < kids.length){
    fetch(api.HN_ITEM_ENDPOINT+kids[current]+'.json')
      .then((response) => response.json())
      .then((responseData) => {
        responseData.leftMargin = newleftMargin;
        if(responseData.kids){
          responseData.replies_count = responseData.kids.length;
        }
        this.fetchSubComments(kids, current+1, a.concat([responseData]), comment, parentCommentLocation, newleftMargin);
      })
      .done();
    }
    else{
      this.updateDataSource(
                          this.insertInComments({"by":comment.by, "text":comment.text, "leftMargin":comment.leftMargin, loadingSubComments: false}, 
                                                a, 
                                                parentCommentLocation+1)
                          );
    }
  },
  openPage: function(){
    this.props.navigator.push({
      title: this.props.post_title,
      component: Web_View,
      passProps: {url: this.state.post_url},
    });
  },
});

module.exports = Post;