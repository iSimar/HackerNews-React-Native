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

var ParseHTML = require("../ParseHTML");

var CommentCell = React.createClass({
  render: function() {
    if(this.props.comment.loadingSubComments){
      return (
        <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
            <Text style={styles.commentBy}>
              {this.props.comment.by}:
            </Text>
            <ParseHTML code = {this.props.comment.text} 
                     style = {styles.parseHTMLStyle}
                     customTagToStyle = {{
                                          '<pre>':{},
                                          '<code>': styles.commentCode
                                        }} />
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
            <ParseHTML code = {this.props.comment.text} 
                     style = {styles.parseHTMLStyle}
                     customTagToStyle = {{
                                          '<pre>':{},
                                          '<code>': styles.commentCode
                                        }} />
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
          <ParseHTML code = {this.props.comment.text} 
                     style = {styles.parseHTMLStyle}
                     customTagToStyle = {{
                                          '<pre>':{},
                                          '<code>': styles.commentCode
                                        }} />
      </View>
    );
  }
});

module.exports = CommentCell;