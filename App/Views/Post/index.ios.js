'use strict';

var React = require('react-native');

var {
  Text,
  View,
  TouchableHighlight,
  WebView
} = React;

var styles = require('./style');

var api = require("../../Network/api.js");

var RefreshableListView = require("../../Components/RefreshableListView");
var Comment = require("./Elements/Comment");

var Web = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1}}>
        <WebView url={this.props.url}/>
      </View>
    );
  }
});

module.exports = React.createClass({
  render: function(){
    return(
        <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
        					           header={this.renderListViewHeader}
                             onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                             backgroundColor={'#F6F6EF'}
                             loadMoreText={'Load More...'}/>
    );
  },
  renderListViewRow: function(row){
  	if(row.count==this.props.post.kids.length){
      return(
        <View style={{paddingBottom: 20}}>
          <Comment data={row}/>
        </View>
      );
    }
    return(
  		<Comment data={row}/>
  	);
  },
  renderListViewHeader: function(){
  	return(
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>
				{this.props.post.title}
			</Text>
			<TouchableHighlight onPress={() => this.pushSourceWebpage()}
								underlayColor='#F6F6EF'>
				<Text style={styles.headerSourceLabel}>
					(Source)
				</Text>
			</TouchableHighlight>
			<Text style={styles.headerPostText}>
				{this.props.post.text}
			</Text>
			<Text style={styles.headerPostDetailsLine}>
				Posted by {this.props.post.by} | {this.props.post.score} Points
			</Text>
			<View style={styles.separator}/>
			<Text style={styles.headerCommentTitle}>
				{this.props.post.descendants} Comments:
			</Text>
		</View>
    );
  },
  listViewOnRefresh: function(page, callback){
    if(!this.props.post.kids){
      callback([], {allLoaded: tryue})
    }
    else if(page!=1){
      this.fetchCommentsUsingKids(this.props.post.kids, this.state.lastIndex, 3, callback);
    }
    else{
  	 this.fetchCommentsUsingKids(this.props.post.kids, 0, 3, callback);
    }
  },
  fetchCommentsUsingKids: function(kids, startIndex, amountToAdd, callback){
    var rowsData = [];
    var endIndex = (startIndex + amountToAdd) < kids.length ? (startIndex + amountToAdd) : kids.length;
    function iterateAndFetch(){
        if (startIndex < endIndex){
            fetch(api.HN_ITEM_ENDPOINT+kids[startIndex]+".json")
            .then((response) => response.json())
            .then((item) => {
                item.count = startIndex+1;
                rowsData.push(item);
                startIndex++;
                iterateAndFetch();
            })
            .done();
        }
        else {
            callback(rowsData, {allLoaded: endIndex==kids.length});
            return;
        }
    }
    iterateAndFetch();
    this.setState({lastIndex: endIndex});
  },
  pushSourceWebpage: function(){
  	this.props.navigator.push({
  		title: this.props.post.title,
  		passProps: {url: this.props.post.url},
  		component: Web
    });
  }
});