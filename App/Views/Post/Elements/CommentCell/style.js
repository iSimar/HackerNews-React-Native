'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    padding:10,
  },
  commentBy: {
    fontSize: 13,
    textAlign: 'left',
    color: '#FF6600'
  },
  commentText: {
    fontSize: 13,
    textAlign: 'left',
    color: '#000000'
  },
});