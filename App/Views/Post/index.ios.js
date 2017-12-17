'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  WebView
} from 'react-native';
import api from "../../Network/api.js";
import RefreshableListView from "../../Components/RefreshableListView";
import Comment from "./Elements/Comment";

class Web extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: this.props.url }}/>
      </View>
    );
  }
}

export default class Post extends React.Component {
  render() {
    return (
      <RefreshableListView
        renderRow={(row) => this.renderListViewRow(row) }
        renderHeader={this.renderListViewHeader.bind(this) }
        onRefresh={(page, callback) => this.listViewOnRefresh(page, callback) }
        backgroundColor={'#F6F6EF'}
        loadMoreText={'Load More...'}/>
    );
  }
  renderListViewRow(row) {
    if (row.count == this.props.post.kids.length) {
      return (
        <View style={{ paddingBottom: 20 }}>
          <Comment data={row}/>
        </View>
      );
    }
    return (
      <Comment data={row}/>
    );
  }
  renderListViewHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {this.props.post.title}
        </Text>
        {this.renderPostText() }
        {this.renderSourceButton() }
        <Text style={styles.headerPostDetailsLine}>
          Posted by {this.props.post.by} | {this.props.post.score} Points
        </Text>
        <View style={styles.separator}/>
        <Text style={styles.headerCommentTitle}>
          {this.props.post.descendants} Comments:
        </Text>
      </View>
    );
  }
  renderPostText() {
    if (!this.props.post.text) {
      return null;
    }
    return (
      <Text style={styles.headerPostText}>
        {this.fixPostText(this.props.post.text) }
      </Text>
    );
  }
  renderSourceButton() {
    if (!this.props.post.url) {
      return null;
    }
    return (
      <TouchableHighlight onPress={() => this.pushSourceWebpage() }
        underlayColor='#F6F6EF'>
        <Text style={styles.headerSourceLabel}>
          (Source)
        </Text>
      </TouchableHighlight>
    );
  }
  listViewOnRefresh(page, callback) {
    if (!this.props.post.kids) {
      callback([], { allLoaded: true })
    }
    else if (page != 1) {
      this.fetchCommentsUsingKids(this.props.post.kids, this.state.lastIndex, 3, callback);
    }
    else {
      this.fetchCommentsUsingKids(this.props.post.kids, 0, 3, callback);
    }
  }
  fetchCommentsUsingKids(kids, startIndex, amountToAdd, callback) {
    var rowsData = [];
    var endIndex = (startIndex + amountToAdd) < kids.length ? (startIndex + amountToAdd) : kids.length;
    function iterateAndFetch() {
      if (startIndex < endIndex) {
        fetch(api.HN_ITEM_ENDPOINT + kids[startIndex] + ".json")
          .then((response) => response.json())
          .then((item) => {
            item.count = startIndex + 1;
            if (!item.deleted) {
              rowsData.push(item);
            }
            startIndex++;
            iterateAndFetch();
          })
          .done();
      }
      else {
        callback(rowsData, { allLoaded: endIndex == kids.length });
        return;
      }
    }
    iterateAndFetch();
    this.setState({ lastIndex: endIndex });
  }
  pushSourceWebpage() {
    this.props.navigator.push({
      title: this.props.post.title,
      passProps: { url: this.props.post.url },
      component: Web
    });
  }
  fixPostText(str) {
    return String(str).replace(/<p>/g, '\n\n')
      .replace(/&#x2F;/g, '/')
      .replace('<i>', '')
      .replace('</i>', '')
      .replace(/&#x27;/g, '\'')
      .replace(/&quot;/g, '\"')
      .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1");
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  headerPostText: {
    fontSize: 14,
    marginBottom: 3,
    paddingBottom: 10,
  },
  headerSourceLabel: {
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
