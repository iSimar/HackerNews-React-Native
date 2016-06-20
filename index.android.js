'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  WebView,
  BackAndroid
} from 'react-native';
import ToolbarAndroid from 'ToolbarAndroid';
import Dashboard from './App/Views/Dashboard/index.android.js';
import Post from './App/Views/Post/index.android.js';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }
  _navigator.pop();
  return true;
});

class HackerNews extends React.Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{ id: 'Dashboard' }}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'Dashboard':
        return (<Dashboard navigator={navigator} />);
      case 'Post':
        return (<Post navigator={navigator} title={route.title} post={route.post}/>);
      case 'Web':
        return (<View style={{ flex: 1 }}>
          <ToolbarAndroid style={styles.toolbar}
            title={route.title}
            navIcon={{ uri: "ic_arrow_back_white_24dp", isStatic: true }}
            onIconClicked={navigator.pop}
            titleColor={'#FFFFFF'}/>
          <WebView source={{ uri: route.url }} javaScriptEnabled={true}/>
        </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  }
});

AppRegistry.registerComponent('HackerNews', () => HackerNews);
