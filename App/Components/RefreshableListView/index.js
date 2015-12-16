/*
 * Component Name: RefreshableListView
 * Author: Simar Singh (github/iSimar)
 * Description: This component is used to render a listview that can be
 *              pulled down to refresh
 * 
 * Dependencies:
 *  -> react-native-gifted-listview (https://github.com/FaridSafi/react-native-gifted-listview)
 *
 * Properties:
 *  -> rows
 *      an array that contains objects for each row.
 *
 *  -> rowPaddingTopBottom (optional, default=20)
 *     a value for padding (top & bottom only) for a row in the list view.
 *     
 *  -> backgroundColor (optional, default=#FFFFFF)
 *      the background color of the list view
 *
 *  -> cellUnderlayColor (optional, default=#F1F1F1)
 *      underlay color of the cell when tapped
 *
 * Example:
 *  -> <RefreshableListView rows={[{
 *                                      title: 'my title',
 *                                      subtitle: 'my subtitle',
 *                                      renderLeftIcon: () => {return(<Icon name='rocket' size={30}/>);}
 *                                  }]}
 *                          rowPaddingTopBottom={10}
 *                          backgroundColor={'#f8f8f8'}
 *                          cellUnderlayColor={'#000000'}/>
 *  
 */
var React = require('react-native');

var {
    Text,
    View,
    TouchableOpacity
} = React;

var styles = require('./style');

var GiftedListView = require('react-native-gifted-listview');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            renderRow: this.props.renderRow,
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFFFFF',
            loadMoreText: this.props.loadMoreText ? this.props.loadMoreText : '+',
            header: this.props.header ? this.props.header : null,
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
        if(this.state.header){
            return this.props.header();
        }
        return (<View />);
    }
});
