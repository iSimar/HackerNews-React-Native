/*
 * Component Name: RefreshableListView
 * Author: Simar Singh (github/iSimar)
 * Description: This component is used to render a listview that can be
 *              pulled down to refresh
 * 
 * Dependencies:
 *  -> react-native-gifted-listview 0.0.7 (https://github.com/FaridSafi/react-native-gifted-listview)
 *
 * Properties:
 *  -> renderRow
 *      render function for rows or cells in the listview
 *  -> onRefresh
 *      used for filling the listview on ethier pull to refresh or pagination (load more),
 *      it is called with 2 arugments page number and callback. see react-native-gifted-listview docs.
 *  -> backgroundColor (optional)
 *      default = '#FFFFFF', background color of the listview
 *  -> loadMoreText (optional)
 *      default = '+', text used at the end of the listview - pagination
 *  -> renderHeader (optional)
 *      rendering not sticky header of the listview
 *  
 * Example:
 *  <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
 *                       renderHeader={this.renderListViewHeader}
 *                       onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
 *                       backgroundColor={'#F6F6EF'}
 *                       loadMoreText={'Load More...'}/>
 *  
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';

export default class RefreshableListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderRow: this.props.renderRow,
      backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFFFFF',
      loadMoreText: props.loadMoreText ? props.loadMoreText : 'Load More...',
      renderHeader: props.renderHeader ? props.renderHeader : null,
    };
  }

  onRefresh(page = 1, callback, options) {
    this.props.onRefresh(page, callback);
  }

  renderRow(row) {
    return this.state.renderRow(row);
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.backgroundColor }, this.props.style]}>
        <View style={styles.navBarSpace} />
        <GiftedListView
          rowView={this.renderRow.bind(this) }
          onFetch={this.onRefresh.bind(this) }
          enableEmptySections = {true}
          paginationAllLoadedView={this.renderPaginationAllLoadedView.bind(this) }
          paginationWaitingView={this.renderPaginationWaitingView.bind(this) }
          headerView={this.renderHeaderView.bind(this) }
          PullToRefreshViewAndroidProps={{
            colors: ['#F6F6EF'],
            progressBackgroundColor: '#FF6600',
          }}
          customStyles={{
            refreshableView: {
              backgroundColor: this.state.backgroundColor,
              justifyContent: 'flex-end',
              paddingBottom: 12,
            },
            paginationView: {
              backgroundColor: this.state.backgroundColor,
              height: 60
            }
          }}/>
      </View>
    );
  }
  renderPaginationAllLoadedView() {
    return (
      <View />
    );
  }
  renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableOpacity style={styles.paginationView}
        onPress={paginateCallback}>
        <Text style={styles.loadMoreText}>
          {this.state.loadMoreText}
        </Text>
      </TouchableOpacity>
    );
  }
  renderHeaderView() {
    if (this.state.renderHeader) {
      return this.props.renderHeader();
    }
    return (null);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBarSpace: {
    height: (Platform.OS !== 'android') ? 64 : 0,
  },
  rowContainer: {
    paddingRight: 15,
    paddingLeft: 10,
    flexDirection: 'row'
  },
  paginationView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  loadMoreText: {
    fontSize: 15,
    color: 'gray',
  }
});