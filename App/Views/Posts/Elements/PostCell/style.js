'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6EF',
  },
  postCount: {
    fontSize: 20,
    textAlign: 'right',
    margin: 10,
    color: 'gray',
    marginLeft: 15,
  },
  postTitle: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    color: '#000000'
  },
});