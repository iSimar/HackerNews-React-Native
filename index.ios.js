'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var PostsView = require('./App/Views/Posts');

var HackerNews = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Hacker News - Top Stories',
          component: PostsView,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('HackerNews', () => HackerNews);

module.exports = HackerNews;