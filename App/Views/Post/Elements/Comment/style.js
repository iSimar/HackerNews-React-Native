'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  commentInnerContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    padding:10,
  },
  commentOuterContainer: {

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
  showRepliesButtonText:{
    marginTop: 10,
    fontSize: 13,
    textAlign: 'right',
    color: '#FF6600',
    textAlign: 'right',
  }
});