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
        this.fetchComments(responseData.kids, 0, responseData.kids.length, []);
        // this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(),
        //         commentsLoaded: true,
        //       });
        // for (var i = 0; i <= responseData.kids.length; i++) {
        //   if(i==responseData.kids.length){
              
        //   }
        //   else{
        //     this.fetchComment(responseData.kids[i]);
        //   }
        // }
      })
      .done();
  },
  fetchComments: function(kids, current, end, a){
    if(current != end){
    fetch(api.HN_ITEM_ENDPOINT+kids[current]+'.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(a),
          commentsLoaded: true,
        });
        this.fetchComments(kids, current+1, end, a.concat([responseData]));
      })
      .done();
    }
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
          <View style={styles.separator}/>
          <Text style={styles.commentTitle}>Comments:</Text>
          </View>
      </View>
    );
  },
  renderCommentCell: function(comment){
    return(
        <CommentCell comment={comment} />
    );
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