'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import Dashboard from './App/Views/Dashboard/index.ios.js';

class HackerNews extends React.Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          title: 'Hacker News',
          component: Dashboard,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
});

AppRegistry.registerComponent('HackerNews', () => HackerNews);
