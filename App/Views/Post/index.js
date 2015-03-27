'use strict';

var React = require('react-native');

var {
  View,
  Text,
} = React;

var styles = require('./style');

var Post = React.createClass({
  render: function() {
    return (
      <View>
      <Text>Hello World!</Text>
      </View>
    );
  }
});

module.exports = Post;