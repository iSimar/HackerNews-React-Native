'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
} = React;

var styles = require('./style');

var api = require("../../Network/api.js");

//Views
var Web_View = require("../Web");

var Post = React.createClass({
  getInitialState: function() {
    return {
      headLoaded:false,
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(api.HN_ITEM_ENDPOINT+this.props.post_id+'.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          post_text: responseData.text,
          post_url: responseData.url,
          loaded: true
        });
      })
      .done();
  },
  render: function() {
  	if(this.state.post_url == ""){
  	return (
     <ScrollView style={styles.container}>
        <View style={styles.head}>
        	<Text style={styles.title}>
        		{this.props.post_title}
        	</Text>
        	<Text style={styles.text}>
        		{this.state.post_text}
        	</Text>
        </View>
        <View style={styles.separator}/>
      </ScrollView>
    );
  	}
  	return (
     <ScrollView style={styles.container}>
        <View style={styles.head}>
        	<Text style={styles.title}>
        		{this.props.post_title}
        	</Text>
        	<TouchableHighlight 
        		onPress={() => this.openPage()}
        		underlayColor='#F6F6EF'>
        	<Text style={styles.source}>
        		(Source)
        	</Text>
        	</TouchableHighlight>
        	<Text style={styles.text}>
        		{this.state.post_text}
        	</Text>
        </View>
        <View style={styles.separator}/>
      </ScrollView>
    );
  },
  openPage: function(){
  	this.props.navigator.push({
      title: this.props.post_title,
      component: Web_View,
      passProps: {url: this.state.post_url},
    });
  },
});

module.exports = Post;