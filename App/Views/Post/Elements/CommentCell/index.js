'use strict';

var React = require('react-native');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var styles = require("./style");

var UtilFuncs = require("../../../../Utils/functions.js");

var CommentCell = React.createClass({
  render: function() {
    if(this.props.comment.loadingSubComments){
      return (
        <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
            <Text style={styles.commentBy}>
              {this.props.comment.by}:
            </Text>
            <Text style={styles.commentText}>
              {UtilFuncs.htmlToString(this.props.comment.text)} 
            </Text>
            <Text style={styles.showRepliesLink}>
              Loading Replies...
            </Text>
        </View>
      );
    }
    if(this.props.comment.replies_count){
      return (
        <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
            <Text style={styles.commentBy}>
              {this.props.comment.by}:
            </Text>
            <Text style={styles.commentText}>
              {UtilFuncs.htmlToString(this.props.comment.text)} 
            </Text>
            <TouchableHighlight 
              onPress={this.props.onSelectShowReplies}
              underlayColor='#F6F6EF'>
              <Text style={styles.showRepliesLink}>
                Show Replies ({this.props.comment.replies_count})
              </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
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