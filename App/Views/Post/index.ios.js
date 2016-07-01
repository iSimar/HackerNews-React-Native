'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  WebView
} = React;

var api = require("../../Network/api.js");

var RefreshableListView = require("../../Components/RefreshableListView");
var Comment = require("./Elements/Comment");

var Web = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1}}>
        <WebView source={{uri: this.props.url}}/>
      </View>
    );
  }
});

module.exports = React.createClass({
  render: function(){
    return(
        <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
        					           renderHeader={this.renderListViewHeader}
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
      {this.renderPostText()}
      {this.renderSourceButton()}
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
  renderPostText: function(){
    if(!this.props.post.text){
      return null;
    }
    return(
      <Text style={styles.headerPostText}>
        {this.fixPostText(this.props.post.text)}
      </Text>
    );
  },
  renderSourceButton: function(){
    if(!this.props.post.url){
      return null;
    }
    return(
      <TouchableHighlight onPress={() => this.pushSourceWebpage()}
                          underlayColor='#F6F6EF'>
        <Text style={styles.headerSourceLabel}>
          (Source)
        </Text>
      </TouchableHighlight>
    );
  },
  listViewOnRefresh: function(page, callback){
    if(!this.props.post.kids){
      callback([], {allLoaded: true})
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
                if(!item.deleted){
                  rowsData.push(item);
                }
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
  },
  fixPostText: function(str){
      return String(str).replace(/<p>/g, '\n\n')
                  .replace(/&#x2F;/g, '/')
                  .replace('<i>', '')
                  .replace('</i>', '')
                  .replace(/&#x27;/g, '\'')
                  .replace(/&quot;/g, '\"')
                  .replace(/&gt;/g, '>')
                  .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1");
  }
});

var styles = StyleSheet.create({
  headerContainer: {
    flex:1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
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
    paddingBottom: 10,
  },
  headerSourceLabel:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
    paddingBottom: 10,
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
