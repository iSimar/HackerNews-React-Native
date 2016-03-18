'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var api = require("../../Network/api.js");

var Post = require("../Post/index.ios.js");

var TabBar = require("../../Components/TabBar");
var RefreshableListView = require("../../Components/RefreshableListView");
var ActivityView = require("react-native-activity-view");

module.exports = React.createClass({
  getInitialState: function(){
    return {
        topStoryIDs: null,
        lastIndex: 0
    };
  },
  render: function(){
    return(
      <TabBar structure={[{
                            title: 'Ask HN',
                            iconName: 'comment',
                            renderContent: () => {return(
                              <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Ask Story')}
                                                   onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_ASK_STORIES_ENDPOINT)}
                                                   backgroundColor={'#F6F6EF'}
                                                   style={styles.listview}/>
                            );}
                          },
                          {
                            title: 'Show HN',
                            iconName: 'eye',
                            renderContent: () => {return(
                              <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Show Story')}
                                                   onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_SHOW_STORIES_ENDPOINT)}
                                                   backgroundColor={'#F6F6EF'}
                                                   style={styles.listview}/>
                            );}
                          },
                          {
                            title: 'Front Page',
                            iconName: 'star',
                            renderContent: () => {return(
                              <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Top Story')}
                                                   onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_TOP_STORIES_ENDPOINT)}
                                                   backgroundColor={'#F6F6EF'}
                                                   style={styles.listview}/>
                            );}
                          },
                          {
                            title: 'New',
                            iconName: 'level-up',
                            renderContent: () => {return(
                              <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'New Story')}
                                                   onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_NEW_STORIES_ENDPOINT)}
                                                   backgroundColor={'#F6F6EF'}
                                                   style={styles.listview}/>
                            );}
                          },
                          {
                            title: 'Jobs',
                            iconName: 'suitcase',
                            renderContent: () => {return(
                              <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Job Post')}
                                                   onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_JOB_STORIES_ENDPOINT)}
                                                   backgroundColor={'#F6F6EF'}
                                                   style={styles.listview}/>
                            );}
                          }]}
              selectedTab={2}
              activeTintColor={'#ff8533'}
              iconSize={25}/>
    );
  },
  renderListViewRow: function(row, pushNavBarTitle){
      return(
          <TouchableHighlight underlayColor={'#f3f3f2'}
                              onPress={()=>this.selectRow(row, pushNavBarTitle)}>
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
  listViewOnRefresh: function(page, callback, api_endpoint){
      if (page != 1 && this.state.topStoryIDs){
          this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
      }
      else {
        fetch(api_endpoint)
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
  selectRow: function(row, pushNavBarTitle){
    this.props.navigator.push({
      title: pushNavBarTitle+' #'+row.count,
      component: Post,
      passProps: {post: row},
      backButtonTitle: 'Back',
      rightButtonTitle: 'Share',
      onRightButtonPress: () => {
        ActivityView.show({
          text: row.title, 
          url: row.url
        });
      },
    });
  }
});

var styles = StyleSheet.create({
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
    listview: {
      marginBottom:49
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    } 
}); 
