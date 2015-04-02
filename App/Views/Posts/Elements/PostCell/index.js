/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var styles = require("./style");

var PostCell = React.createClass({
  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
      <View style={styles.container}>
        <Text style={styles.postCount}>
          {this.props.post.count}
        </Text>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.postTitle}>
            {this.props.post.title.text}
          </Text>
          <Text style={styles.postDetailsLine}>
            Posted by {this.props.post.username.text} | {(this.props.post.points).split(" ")[0]} Points | {(this.props.post.comments.text).split(" ")[0]} Comments
          </Text>
          <View style={styles.separator}/>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
});

module.exports = PostCell;