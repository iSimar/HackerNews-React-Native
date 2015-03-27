'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
  head: {
    margin: 10,
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
});