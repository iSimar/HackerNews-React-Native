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
    marginRight:10,
    marginTop:5,
    padding:10,
  },
  commentBy: {
    fontSize: 13,
    marginBottom: 3,
    textAlign: 'left',
    color: '#FF6600'
  },
  commentText: {
    fontSize: 13,
    textAlign: 'left',
    color: '#000000'
  },
  showRepliesLink:{
    marginTop: 3,
    fontSize: 13,
    textAlign: 'right',
    color: '#FF6600',
  },
});