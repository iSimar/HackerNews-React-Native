'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  ListView,
} = React;

var styles = require("./style");
var api = require("../../Network/api.js");

//View Elements
var PostCell = require("./Elements/PostCell");

var ViewReactClass = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(api.REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results.collection1),
          loaded: true
        });
      })
      .done();
  },
  render: function() {
    if(!this.state.loaded){
      return(
        <View style={styles.container}>
        <Text style={styles.loadingText}>
          Fetching Posts...
        </Text>
      </View>
      );
    }
    return (
      this.renderListView()
    );
  },
  renderListView: function(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPostCell}
        style={styles.listView}/>
    );
  },
  renderPostCell: function(post){
    return(
      <PostCell post={post}/>
    );
  },

});

var Mock_Data = {
  "results": {
    "collection1": [
      {
        "count": "1.",
        "title": {
          "text": "React Native is now open source",
          "href": "https://github.com/facebook/react-native"
        }
      },
    ]
  }
}
module.exports = ViewReactClass;