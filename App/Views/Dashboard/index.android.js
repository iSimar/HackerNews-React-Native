'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var api = require("../../Network/api.js");

var RefreshableListView = require("../../Components/RefreshableListView");

module.exports = React.createClass({
  getInitialState: function(){
    return {
        topStoryIDs: null,
        lastIndex: 0
    };
  },
  render: function(){
    return(
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={'Top Stories'}
                        titleColor={'#FFFFFF'}/>
        <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
                             onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                             backgroundColor={'#F6F6EF'}
                             loadMoreText={'Load More...'}/>
      </View>
    );
  },
  renderListViewRow: function(row){
      return(
          <TouchableHighlight underlayColor={'#f3f3f2'}
                              onPress={()=>this.selectRow(row)}>
            <View style={styles.rowContainer}>
                <Text style={styles.rowCount}>
                    {row.count}
                </Text>
                <View style={styles.rowDetailsContainer}>
                    <Text style={styles.rowTitle}>
                        {row.title}
                    </Text>
                    <Text style={styles.rowDetailsLine}>
                        Posted by {row.by} | {row.score} Points | {row.descendants} Comments
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </View>
          </TouchableHighlight>
      );
  },
  listViewOnRefresh: function(page, callback){
      if (page != 1 && this.state.topStoryIDs){
          this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
      }
      else {
        fetch(api.HN_TOP_STORIES_ENDPOINT)
        .then((response) => response.json())
        .then((topStoryIDs) => {
            this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
            this.setState({topStoryIDs: topStoryIDs});
        })
        .done();
      }
  },
  fetchStoriesUsingTopStoryIDs: function(topStoryIDs, startIndex, amountToAdd, callback){
      var rowsData = [];
      var endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;
      function iterateAndFetch(){
          if (startIndex < endIndex){
              fetch(api.HN_ITEM_ENDPOINT+topStoryIDs[startIndex]+".json")
              .then((response) => response.json())
              .then((topStory) => {
                  topStory.count = startIndex+1;
                  rowsData.push(topStory);
                  startIndex++;
                  iterateAndFetch();
              })
              .done();
          }
          else {
              callback(rowsData);
              return;
          }
      }
      iterateAndFetch();
      this.setState({lastIndex: endIndex});
  },
  selectRow: function(row){
    this.props.navigator.push({
      id: 'Post',
      title: "Top Story #"+row.count,
      post: row,
    });
  }
});

var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    toolbar: {
      height: 56,
      backgroundColor: '#FF6600'
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    } 
});