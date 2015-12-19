/*
 * Component Name: RefreshableListView
 * Author: Simar Singh (github/iSimar)
 * Description: This component is used to render a listview that can be
 *              pulled down to refresh
 * 
 * Dependencies:
 *  -> react-native-gifted-listview 0.0.6 (https://github.com/FaridSafi/react-native-gifted-listview)
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
var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} = React;

var GiftedListView = require('react-native-gifted-listview');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            renderRow: this.props.renderRow,
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFFFFF',
            loadMoreText: this.props.loadMoreText ? this.props.loadMoreText : '+',
            renderHeader: this.props.renderHeader ? this.props.renderHeader : null,
        };
    },
    onRefresh: function(page=1, callback, options){
        this.props.onRefresh(page, callback);
    },
    renderRow: function(row){
        return this.state.renderRow(row);
    },
    render: function(){
        return(
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
                <View style={styles.navBarSpace} />
                <GiftedListView rowView={this.renderRow}
                                onFetch={this.onRefresh}
                                paginationAllLoadedView={this.renderPaginationAllLoadedView}
                                paginationWaitingView={this.renderPaginationWaitingView}
                                headerView={this.renderHeaderView}
                                customStyles={{
                                                refreshableView: {
                                                    backgroundColor: this.state.backgroundColor
                                                },
                                                paginationView: {
                                                    backgroundColor: this.state.backgroundColor
                                                }
                                }}/>
            </View>
        );
    },
    renderPaginationAllLoadedView: function(){
        return(
            <View />
        );
    },
    renderPaginationWaitingView: function(paginateCallback) {
        return (
            <TouchableOpacity style={styles.paginationView}
                              onPress={paginateCallback}>
                <Text style={styles.loadMoreText}>
                    {this.state.loadMoreText}
                </Text>
           </TouchableOpacity>
        );
    },
    renderHeaderView: function(){
        if(this.state.renderHeader){
            return this.props.renderHeader();
        }
        return (null);
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBarSpace: {
        height: 64,
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