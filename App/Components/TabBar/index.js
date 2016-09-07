/*
 * Component Name: TabBar
 * Author: Simar Singh (github/iSimar)
 * Description: This component is used for render a TabBar
 * 
 * Dependencies:
 *  -> react-native-vector-icons 1.0.3 (https://github.com/oblador/react-native-vector-icons)
 *      - This library is used for fontawesome icons on the TabBar. For iOS only use
 *        fontawesome.ttf and add RNVectorIcons.xcodeproj to Libraries.
 *
 * Properties:
 *  -> structure
 *      - its and array of objects that define the properties of each TabBar
 *      - an object inside the array should look like {title: <string>, iconName: <string>
 *                                                     renderContent: <function>}
 *
 * Example:
 *  -> <TabBar structure={[{
 *                           title: 'Tab 1',
 *                           iconName: 'star',
 *                           renderContent: () => {return(<View><Text>Tab 1</Text></View>});}
 *                         }]}
 *             selectedTab={0}/>
 */
import React from 'react';

import {
  View,
    TabBarIOS,
    StyleSheet,
    Platform
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./customTabBar.android.js');

import { FontAwesome as Icon } from '@exponent/vector-icons';

module.exports = React.createClass({
  getInitialState: function(){
    return {
      structure: this.props.structure,
      selectedTab: this.props.selectedTab,
      iconSize: this.props.iconSize ? this.props.iconSize : 30,
      activeTintColor: this.props.activeTintColor ? this.props.activeTintColor : null
    };
  },
    render: function(){
    return (
        <TabNavigator>
          {this.state.structure.map((tabProps, tabIndex) =>
            <TabNavigator.Item
              selected={tabIndex == this.state.selectedTab}
              title={tabProps.title}
              key={tabIndex}
              selectedTitleStyle={{color: '#ff6600'}}
              renderIcon={() => <Icon name={tabProps.iconName} size={25} color="#888" />}
              renderSelectedIcon={() => <Icon name={tabProps.iconName} size={25} color="#ff6600" />}
              onPress={() => { this.setState({selectedTab: tabIndex}); }}>
              {tabProps.renderContent()}
            </TabNavigator.Item>
          )}
        </TabNavigator>
    );
    }
});

var styles = StyleSheet.create({
});
