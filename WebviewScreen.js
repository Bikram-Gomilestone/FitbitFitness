import React from 'react';
import { View, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebviewScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBackButtonPressAndroid = () => {
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  };

  fetchToken = (data) => {
    console.log("URL FROM WEBVIEW ====>", data)
    let temptoken = data.split('=')
    let token = temptoken[1].split('&user_id')
    this.props.getToken(token[0])
    this.props.closeModal()
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <WebView
          source={{ uri: `${this.props.url}` }}
          onNavigationStateChange={(res) => {
            console.log('response =====>' + JSON.stringify(res));
            if (res.url.includes("access_token=")) {
              this.fetchToken(res.url)
            }
          }}
        />
      </View>)
  }
}