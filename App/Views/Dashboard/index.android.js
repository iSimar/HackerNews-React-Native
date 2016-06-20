'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import ToolbarAndroid from 'ToolbarAndroid';
import TabBar from "../../Components/TabBar";
import api from "../../Network/api.js";
import RefreshableListView from "../../Components/RefreshableListView";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topStoryIDs: null,
      lastIndex: 0
    };
  }

  render() {
    return (
      <TabBar
        structure={[
          {
            title: 'Ask HN',
            iconName: 'comment',
            renderContent: () => {
              return (
                <View style={{ flex: 1 }}>
                  <ToolbarAndroid style={styles.toolbar}
                    title={'Ask HN'}
                    titleColor={'#FFFFFF'}/>
                  <RefreshableListView renderRow={(row) => this.renderListViewRow(row, 'Ask Story') }
                    onRefresh={(page, callback) => this.listViewOnRefresh(page, callback, api.HN_ASK_STORIES_ENDPOINT) }
                    backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'Show HN',
            iconName: 'eye',
            renderContent: () => {
              return (
                <View style={{ flex: 1 }}>
                  <ToolbarAndroid style={styles.toolbar}
                    title={'Show HN'}
                    titleColor={'#FFFFFF'}/>
                  <RefreshableListView renderRow={(row) => this.renderListViewRow(row, 'Show Story') }
                    onRefresh={(page, callback) => this.listViewOnRefresh(page, callback, api.HN_SHOW_STORIES_ENDPOINT) }
                    backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'Front Page',
            iconName: 'star',
            renderContent: () => {
              return (
                <View style={{ flex: 1 }}>
                  <ToolbarAndroid style={styles.toolbar}
                    title={'Top Stories'}
                    titleColor={'#FFFFFF'}/>
                  <RefreshableListView renderRow={(row) => this.renderListViewRow(row, 'Top Story') }
                    onRefresh={(page, callback) => this.listViewOnRefresh(page, callback, api.HN_TOP_STORIES_ENDPOINT) }
                    backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'New',
            iconName: 'level-up',
            renderContent: () => {
              return (
                <View style={{ flex: 1 }}>
                  <ToolbarAndroid style={styles.toolbar}
                    title={'New Stories'}
                    titleColor={'#FFFFFF'}/>
                  <RefreshableListView renderRow={(row) => this.renderListViewRow(row, 'New Story') }
                    onRefresh={(page, callback) => this.listViewOnRefresh(page, callback, api.HN_NEW_STORIES_ENDPOINT) }
                    backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },
          {
            title: 'Jobs',
            iconName: 'suitcase',
            renderContent: () => {
              return (
                <View style={{ flex: 1 }}>
                  <ToolbarAndroid style={styles.toolbar}
                    title={'Jobs'}
                    titleColor={'#FFFFFF'}/>
                  <RefreshableListView renderRow={(row) => this.renderListViewRow(row, 'Job Post') }
                    onRefresh={(page, callback) => this.listViewOnRefresh(page, callback, api.HN_JOB_STORIES_ENDPOINT) }
                    backgroundColor={'#F6F6EF'}/>
                </View>
              );
            }
          },]}
        selectedTab={2}
        activeTintColor={'#ff8533'}
        iconSize={20}/>
    );
  }

  renderListViewRow(row, pushNavBarTitle) {
    return (
      <TouchableHighlight underlayColor={'#f3f3f2'}
        onPress={() => this.selectRow(row, pushNavBarTitle) }>
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
  }

  listViewOnRefresh(page, callback, api_endpoint) {
    if (page != 1 && this.state.topStoryIDs) {
      this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
    }
    else {
      let obj = this;
      fetch(api_endpoint)
        .then((response) => response.json())
        .then((topStoryIDs) => {
          obj.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
          obj.setState({ topStoryIDs: topStoryIDs });
        })
        .done();
    }
  }

  fetchStoriesUsingTopStoryIDs(topStoryIDs, startIndex, amountToAdd, callback) {
    var rowsData = [];
    var endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;
    function iterateAndFetch() {
      if (startIndex < endIndex) {
        fetch(api.HN_ITEM_ENDPOINT + topStoryIDs[startIndex] + ".json")
          .then((response) => response.json())
          .then((topStory) => {
            topStory.count = startIndex + 1;
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
    this.setState({ lastIndex: endIndex });
  }
  selectRow(row, pushNavBarTitle) {
    this.props.navigator.push({
      id: 'Post',
      title: pushNavBarTitle + ' #' + row.count,
      post: row,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  },
  rowContainer: {
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