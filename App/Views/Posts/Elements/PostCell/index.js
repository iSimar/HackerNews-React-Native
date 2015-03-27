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
          <Text style={styles.postTitle}>
            {this.props.post.title.text}
          </Text>
      </View>
      </TouchableHighlight>
    );
  }
});

module.exports = PostCell;