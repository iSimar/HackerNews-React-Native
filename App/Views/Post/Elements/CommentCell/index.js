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
    if(this.props.comment.text.indexOf("<pre><code>") > -1){
      return this.routineForCommentWithCode();
    }

    return this.render_CommentCell();
  },
  render_CommentCell: function(){
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
    else if(this.props.comment.replies_count){
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
    else{
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
  },
  routineForCommentWithCode: function(){
   var codeIndexStart = this.props.comment.text.indexOf("<pre><code>")+11;
   var codeIndexEnd = this.props.comment.text.indexOf("</code></pre>");
   var head = this.props.comment.text.slice(0, codeIndexStart-11);
   var middle = this.props.comment.text.slice(codeIndexStart, codeIndexEnd);
   var foot = this.props.comment.text.slice(codeIndexEnd+13, this.props.comment.text.length);
   if(this.props.comment.loadingSubComments){
      return (
          <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
              <Text style={styles.commentBy}>
                {this.props.comment.by}:
              </Text>
              <Text style={styles.commentText}>
                {UtilFuncs.htmlToString(head)} 
              </Text>
              <Text style={styles.commentCode}>
                {UtilFuncs.htmlToString(middle)} 
              </Text>
              <Text style={styles.commentText}>
                {UtilFuncs.htmlToString(foot)} 
              </Text>
              <Text style={styles.showRepliesLink}>
                Loading Replies...
              </Text>
          </View>
        );
    }
    else if(this.props.comment.replies_count){
      return (
          <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
              <Text style={styles.commentBy}>
                {this.props.comment.by}:
              </Text>
              <Text style={styles.commentText}>
                {UtilFuncs.htmlToString(head)} 
              </Text>
              <Text style={styles.commentCode}>
                {UtilFuncs.htmlToString(middle)} 
              </Text>
              <Text style={styles.commentText}>
                {UtilFuncs.htmlToString(foot)} 
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
    else{
      return (
        <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
            <Text style={styles.commentBy}>
              {this.props.comment.by}:
            </Text>
            <Text style={styles.commentText}>
              {UtilFuncs.htmlToString(head)} 
            </Text>
            <Text style={styles.commentCode}>
              {UtilFuncs.htmlToString(middle)} 
            </Text>
            <Text style={styles.commentText}>
              {UtilFuncs.htmlToString(foot)} 
            </Text>
        </View>
        );
    }
  },
});

module.exports = CommentCell;