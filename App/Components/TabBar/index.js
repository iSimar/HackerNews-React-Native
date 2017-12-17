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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './customTabBar.android.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        structure: this.props.structure,
        selectedTab: this.props.selectedTab,
        iconSize: this.props.iconSize ? this.props.iconSize : 30,
        activeTintColor: this.props.activeTintColor ? this.props.activeTintColor : null
      };
    }
    render(){
      if (Platform.OS == 'android'){
          return(
            <ScrollableTabView
              renderTabBar={() => <CustomTabBar />}
              onChangeTab={(o)=>{}}
              tabBarPosition={'bottom'}
              initialPage={this.state.selectedTab}>
              {this.state.structure.map((tabProps, tabIndex) => 
                  <View style={{flex:1}}
                        tabLabel={tabProps.title+'!$#'
                                  +tabProps.iconName+'!$#'
                                  +this.state.iconSize}
                        key={tabIndex}>
                      {tabProps.renderContent()}
                  </View>
              ) }
            </ScrollableTabView>
          );
        }
        return(
          <TabBarIOS
            tintColor={this.state.activeTintColor}
            translucent={true}>
            {this.state.structure.map((tabProps, tabIndex) => 
              <Icon.TabBarItem
                title={tabProps.title}
                iconName={tabProps.iconName}
                iconSize={this.state.iconSize}
                selected={tabIndex == this.state.selectedTab}
                onPress={() => {this.setState({selectedTab: tabIndex});}}
                key={tabIndex}>
                {tabProps.renderContent()}
                  </Icon.TabBarItem>
            ) }
          </TabBarIOS>
        );
    }
}
const styles = StyleSheet.create({
});
