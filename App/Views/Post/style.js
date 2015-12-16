'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  headerContainer: {
    flex:1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerTitle:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  headerPostText:{
    fontSize: 14,
    marginBottom: 3,
  },
  headerSourceLabel:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
  },
  headerPostDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  headerCommentTitle: {
    color: 'gray',
    marginTop: 10
  },
});