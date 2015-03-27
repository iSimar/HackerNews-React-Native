'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
  head: {
    margin:10,
  },
  foot: {
    flex:2
  },
  title:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600'
  },
  text:{
    fontSize: 14,
    marginBottom: 5,
},
  source:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  commentTitle: {
    margin: 10,
    color: 'gray',
  },
  commentsLoading: {
    marginLeft: 10,
    color: '#FF6600',
  },
  commentListView:{
    color: '#000000',
    margin: 0,
    padding: 0,
    backgroundColor: '#F6F6EF',
  }
});