/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');
var {
  View,
  WebView,
} = React;

var styles = require('./style');

var Web = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.url}/>
      </View>
    );
  }
});

module.exports = Web;