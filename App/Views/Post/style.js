/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

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
    marginLeft:10,
    marginRight:10,
    marginBottom:5,
  },
  foot: {
    flex:2
  },
  title:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  text:{
    fontSize: 14,
    marginBottom: 3,
},
  source:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  loadingText:{
    color: '#FF6600',
    marginTop: 5,
    fontSize: 15,
  },
  commentTitle: {
    marginTop: 10,
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
  },
  postDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
});