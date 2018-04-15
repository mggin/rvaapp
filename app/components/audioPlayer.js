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
  Alert,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import _ from 'lodash'
import LinearGradient from 'react-native-linear-gradient';
import Audio from 'react-native-video';
import { langData } from './languagesData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { controlRadio } from '../../redux/actions'

const {height, width} = Dimensions.get('window');
let barNum = 28
let barHeight = 50
let fontSize = 15
let controlSize = 50
let btnSize = 30
if (width === 768 || height === 1024) {
  barNum += 10
} else if (width >= 768 || height >= 1024) {
  barNum += 28
  barHeight += 50
  controlSize += 20
  btnSize += 10
}
class AudioPlayer extends Component<Props> {
  state = {
      count: 0,
      repeatBar: null,
      nodeJump: false,
      loading: false,
    }

  repeatNote = () => {
    setInterval( this.countChange, 200)
  }
  countChange = () => {
    if (this.refs.playerRef) {
      this.setState({count: 1})
    }
  }
  renderRow = () => {
    const row = []
    let marginLeft = 1
    for (let item in _.range(0,barNum)) {
      let height = Math.floor(Math.random() * barHeight)
      row.push(
        <LinearGradient
          colors={['#e1b12c', '#96c93d96', '#96c93d96']}
          key={item}
          style={{ width: 6, height, backgroundColor: '#fbc531', borderRadius: 100, marginLeft}}/>
        )
      }
    return row;
  }
  pauseAction = () => {
    clearInterval(this.state.repeatedBar)
    this.props.controlRadio()
  }
  playAction = () => {
    this.state.repeatedBar = setInterval( this.countChange, 200)
    this.props.controlRadio()
  }
  renderControlBtn = () => {
    const btnSty = {width: btnSize, height: btnSize}
    if (this.state.loading && this.props.langRedData.streaming) {
      return (
        <View>
          <Image source={require('../../assets/icons/spin.gif')} style={btnSty}/>
        </View> )

    } else if (this.props.langRedData.streaming) {
      return (
        <TouchableOpacity onPress={this.pauseAction}>
          <Image source={require('../../assets/icons/pause.png')} style={btnSty}/>
        </TouchableOpacity> )
    } else {
      return (
        <TouchableOpacity onPress={this.playAction}>
          <Image source={require('../../assets/icons/play.png')} style={btnSty}/>
        </TouchableOpacity> )
    }
    return <Image source={require('../../assets/icons/play.png')} />
  }

  _onBuffer = (value) => {
    //this.setState({buffering: true})
    if (!value) {
      this.setState({loading: true})
    } else {
      this.setState({loading: false})
    }
  }
  _onLoadStart = () => {
    this.setState({loading: true})
  }
  _onLoad = () => {
    this.setState({loading: false})
  }
  render() {
    return (
      <View style={styles.container} ref="playerRef">
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.controlBox}>
            <View style={styles.controlHolder}>
            { this.renderControlBtn() }
            </View>
          </View>
          <View style={styles.nodeBox}>
            { this.renderRow() }
          </View>
          <Audio
            controls={true}
            paused={!this.props.langRedData.streaming}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onBuffer={this._onBuffer} 
            playInBackground={true} 
            ignoreSilentSwitch={"ignore"}
            source={{uri: this.props.langRedData.currentLang.streaming_url}}
           />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353b48a7',
  },
  controlBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#000000'

  },
  controlHolder: {
    width: controlSize,
    height: controlSize,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeBox: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: '#F5FCFF',
  }
});

function mapStateToProps(state) {
  return {
    langRedData: state.langRedData,

  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    controlRadio,
    //showScore,
    //setFontInfo,
    //storeScore,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AudioPlayer);

