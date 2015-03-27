'use strict';

var React = require('react-native');

var {
  Text,
  View,
} = React;

var styles = require("./style");

var UtilFuncs = require("../../../../Utils/functions.js");

var CommentCell = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
          <Text style={styles.commentBy}>
            {this.props.comment.by}:
          </Text>
          <Text style={styles.commentText}>
            {UtilFuncs.htmlToString(this.props.comment.text)} 
          </Text>
      </View>
    );
  }
});

module.exports = CommentCell;