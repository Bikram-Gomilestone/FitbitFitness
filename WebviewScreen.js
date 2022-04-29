import React from 'react';
import { View, TouchableOpacity, Image, BackHandler } from 'react-native';

import { WebView } from 'react-native-webview';

export default class WebviewScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBackButtonPressAndroid = () => {
    // this.props.navigation.navigate('ProfileMenu');
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
    // setTimeout()
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  };

  fetchToken = (data) => {
    let temptoken = data.split('=')
    let token = temptoken[1].split('&user_id')
    // console.log(token[0]);
    this.props.getToken(token[0])
    this.props.closeModal()
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <WebView
          source={{ uri: `${this.props.url}` }}
          onNavigationStateChange={(res) => {
            // this.fetchToken(res.url)
            // this.props.closeModal()
            // this.props.getData('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhCOTIiLCJzdWIiOiI5WTlLTFYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNjgyNzUxNTY4LCJpYXQiOjE2NTEyMTU1Njh9.GyXxtYgqE_WQiwc_Ksfi050BL8g4k9londa6V6ZBY-w')
            if (res.url != this.props.url) {
              // alert('call')
              this.fetchToken(res.url)
            }
            console.log(res);
          }}
          onError={(e)=>console.log("Error",e)}
        />
      </View>)
  }
}