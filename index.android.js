import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  WebView,
  BackAndroid
} from 'react-native';

import {
  Constants,
} from 'exponent';

var _navigator;

var ToolbarAndroid = require('ToolbarAndroid');
var Dashboard = require('./App/Views/Dashboard/index.android.js');
var Post = require('./App/Views/Post/index.android.js');


BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

var HackerNews = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1, paddingTop: Constants.statusBarHeight}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: Constants.statusBarHeight,
            backgroundColor: '#FF6600'
          }}
        />

        <Navigator
          style={styles.container}
          tintColor='#FF6600'
          initialRoute={{id: 'Dashboard'}}
          renderScene={this.navigatorRenderScene}/>
      </View>
    );
  },
  navigatorRenderScene: function(route, navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'Dashboard':
        return (<Dashboard navigator={navigator} />);
      case 'Post':
        return (<Post navigator={navigator}
                      title={route.title}
                      post={route.post}/>);
      case 'Web':
          return (
            <View style={{flex: 1}}>
                <ToolbarAndroid style={styles.toolbar}
                                title={route.title}
                                navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
                                onIconClicked={navigator.pop}
                                titleColor={'#FFFFFF'}/>
                <WebView source={{uri: route.url}}
                         javaScriptEnabled={true}/>
            </View>
          );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  }
});

AppRegistry.registerComponent('main', () => HackerNews);

module.exports = HackerNews;
