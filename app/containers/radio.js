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
  _onLoad = () => {
    this.setState({webLoad: false, animation: 'fadeIn'})
  }
  _onLoadStart = () => {
    this.setState({webLoad: true})
  }


  showContent = () => {
    let runJS = `function removeElement(classList){
      for (let index = 0; index < classList.length; index++) {
        let elements = document.getElementsByClassName(classList[index]);
        while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
        }
      }
    } 
    let elementList = ['col-lg-12 col-md-12 col-sm-12 col-xs-12', 'bg-rva', 't3-spotlight t3-spotlight-1  row',
    'wrap t3-footer', 'col-sm-4', 'module-title yellow', 'container t3-mainbody', 'bg_whiteyellow' ];
    removeElement(elementList);
    document.getElementById('t3-mainnav').remove();
    let wrapBox = document.getElementsByClassName('t3-wrapper')[0];
    let scheduleBox = document.getElementsByClassName('col-sm-8 schedule')[0];
    let td = document.getElementsByTagName('td');
    let thead = document.getElementsByTagName('thead');
    let h3 = document.getElementsByTagName('h3');
    scheduleBox.setAttribute("style", "color: white; background-color: #2f3640; width: 100%; height: 100%; margin: 0px; fontWeight: bold");
    wrapBox.setAttribute('style', 'margin-top: -60px; backgroundColor: #000');
    thead[0].style.backgroundColor = 'transparent';
    for (let i = 0; i < td.length; i++) {
      td[i].setAttribute('style', 'padding: 10px 0px 10px; font-family:  Trebuchet MS; font-weight: bold; font-size: 13px; border-top: 0.5px solid white')
    }
    
    for (let j = 0; j < h3.length; j++) {
      h3[j].innerHTML = h3[j].innerText.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
      h3[j].setAttribute('style', 'color: #fbc531; font-family: Palatino; font-weight: bold; font-size: 16px');
    }
    
     `
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
              //style={{marginTop: -1000}}
              onLoad={this._onLoad}
              onLoadStart={this._onLoadStart}
              //renderLoading:
              javaScriptEnabled={false}
              //injectJavaScript={() => console.log()}
            />
          </Animatable.View>
        </View>  
    } else {
      content = 
      <View style={styles.contentBox}>
        <View style={styles.scheduleBox}>
        <WebView 
              source={{uri: this.props.langRedData.currentLang.schedule_url}}
              //onLoad={}
              style={{backgroundColor: '#000000'}}
              onLoad={this._onLoad}
              bounces={false}
              onLoadStart={this._onLoadStart}
              //renderLoading:
              //javaScriptEnabled={false}
              injectedJavaScript={runJS}
            />

        </View>
        <AudioPlayer />

      </View>
    }
    return content
  }

  _onTabPress = (value) => {
    this.setState({segmentedIndex: value})
  }

  render() {
    return (
      <Container style={{backgroundColor: '#2f3640'}}>
        <View style={styles.segmentBox}>
          <SegmentedControlTab
            tabTextStyle={{fontFamily: font.cabin_bold, color: color.wht}}
            activeTabTextStyle={{fontFamily: font.cabin_bold, color: color.bg}}
            tabStyle={{backgroundColor: 'transparent', borderColor: color.wht}}
            activeTabStyle={{backgroundColor: color.wht, borderColor: color.wht}}
            values={['Live Streaming', 'Daily Program']}
            selectedIndex={this.state.segmentedIndex}
            onTabPress={this._onTabPress}/>
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

