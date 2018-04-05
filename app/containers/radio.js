/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  TabBarIOS,
  SegmentedControlIOS,
  WebView
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Container, Header, Tab, Tabs, Body, Title} from 'native-base';
import * as color from '../components/color';
import * as font from '../components/font';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AudioPlayer from '../components/audioPlayer'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import * as Animatable from 'react-native-animatable'



class Radio extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      segmentedIndex: 0,
      webLoad: false,
      animation: ''
    }
  }

  showContent = () => {
    let content = null
    if (this.state.segmentedIndex === 1) {
      content = 
        <View style={styles.contentBox}>
          {
            this.state.webLoad ?
            <View style={styles.spinBox}>
              <Image source={require('../../assets/icons/spin.gif')} style={{width: 30, height: 30}}/>
            </View> : null
          }
          <Animatable.View animation={this.state.animation} style={{flex: 1}} duration={3000}>
            <WebView 
              source={{uri: 'http://www.rveritas-asia.org/languages/bengali/bengali-archive'}}
              //onLoad={}
              onLoad={() => this.setState({webLoad: false, animation: 'fadeIn'})}
              onLoadStart={() => this.setState({webLoad: true})}
              //renderLoading:
              //javaScriptEnabled={false}
              injectJavaScript={() => console.log()}
            />
          </Animatable.View>
        </View>  
    } else {
      content = 
      <View style={styles.contentBox}>
        <View style={styles.scheduleBox}>
        </View>
        <AudioPlayer />

      </View>
    }
    return content
  }

  render() {
    return (
      <Container style={{backgroundColor: '#353b48a7'}}>
        <View style={styles.segmentBox}>
          <SegmentedControlTab
            tabTextStyle={{fontFamily: font.cabin_bold, color: color.wht}}
            activeTabTextStyle={{fontFamily: font.cabin_bold, color: color.bg}}
            tabStyle={{backgroundColor: 'transparent', borderColor: color.wht}}
            activeTabStyle={{backgroundColor: color.wht, borderColor: color.wht}}
            values={['Live Streaming', 'Daily Program']}
            selectedIndex={this.state.segmentedIndex}
            onTabPress={(value) => 
              { //console.log(value)
                this.setState({segmentedIndex: value})
              }
            }/>
        </View>
        {
          this.showContent()
        }

      </Container>
    );
  }
}

const styles=StyleSheet.create({
  // code go here
  segmentBox: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 5,
  },
  contentBox: {
    flex: 5
  },
  spinBox: {
    flex: 10000, // do extra
    justifyContent: 'center',
    alignItems: 'center'
  },
  scheduleBox: {
    flex: 5
  }
})

function mapStateToProps(state) {
  return {
    langRedData: state.langRedData,

  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    //changeTab,
    //showScore,
    //setFontInfo,
    //storeScore,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Radio);

