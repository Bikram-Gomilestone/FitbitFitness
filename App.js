import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Modal, ImageBackground, StatusBar } from 'react-native';
import qs from 'qs';
import config from './config.js';

import { WebView } from 'react-native-webview';
import WebviewScreen from './WebviewScreen.js';

// function OAuth(client_id, cb) {
//   Linking.addEventListener('url', handleUrl);
//   function handleUrl(event) {
//     console.log(event.url);
//     Linking.removeEventListener('url', handleUrl);
//     const [, query_string] = event.url.match(/\#(.*)/);
//     console.log(query_string);
//     const query = qs.parse(query_string);
//     console.log(`query: ${JSON.stringify(query)}`);
//     cb(query.access_token);
//   }
//   const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
//     client_id,
//     response_type: 'token',
//     scope: 'social settings heartrate nutrition sleep activity profile location weight',
//     redirect_uri: 'https://gomilestone.com',
//     expires_in: '31536000',
//     prompt: 'consent'
//   })}`;
//   console.log(oauthurl);
//   this.setState({url: oauthurl})
//   // Linking.openURL(oauthurl)
//   //   .catch(err => console.error('Error processing linking', err));
//   // return oauthurl;
// }


// function getData(access_token) {
//   fetch('https://api.fitbit.com/1/user/-/activities/list.json?afterDate=2019-01-01&sort=asc&offset=0&limit=2', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//     // body: `root=auto&path=${Math.random()}`
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log(`res: ${JSON.stringify(res)}`);
//     })
//     .catch(err => {
//       console.error('Error: ', err);
//     });
// }
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      setVisible: true,
      token: '',
      steps: '',
      calorie: '',
      distance: ''
    }
  }
  componentDidMount() {
    if (this.state.token != null) {


    }
    // OAuth(config.client_id, getData);
    // 2022-04-25
  }

  OAuth = (client_id) => {
    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      client_id,
      response_type: 'token',
      scope: 'social settings heartrate nutrition sleep activity profile location weight',
      redirect_uri: 'fitbit://fit',
      expires_in: '31536000',
      prompt: 'consent'
    })}`;
    console.log(oauthurl);
    this.setState({ url: oauthurl })
  }

  getData = (access_token) => {
    fetch('https://api.fitbit.com/1/user/-/activities/date/2022-04-29.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      // body: `root=auto&path=${Math.random()}`
    })
      .then(res => res.json())
      .then(res => {
        let distArray = res.summary.distances;
        let newArr = [];
        let totalDistance = 0;
        distArray.forEach(element => {
          newArr.push(element.distance)
        });
        newArr.forEach(element => {
          totalDistance = totalDistance + element
        });
        // console.log("Distance",totalDistance);
        this.setState({ calorie: res.summary.caloriesOut, steps: res.summary.steps, distance: totalDistance })
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  render() {
    return (
      this.state.setVisible ?
        <Modal
          visible={this.state.setVisible}
          onRequestClose={() => alert("call")}
        >
          <ImageBackground
            style={{ flex: 1, width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}
            source={require('./assets/fitbit.jpg')}>
            <TouchableOpacity
              style={{ borderWidth: 2, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'white' }}
              onPress={() => {
                this.OAuth(config.client_id)
                this.setState({ setVisible: false })
              }}
            >
              <Text style={{ color: 'white', fontSize: 24, margin: 15 }}>Login To Fitbit Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderWidth: 2, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop: 50, borderColor: 'white' }}
              onPress={() => {
                this.getData(this.state.token)
              }}
            >
              <Text style={{ color: 'white', fontSize: 24, margin: 15 }}>Get User's Data</Text>
            </TouchableOpacity>
            {this.state.token != '' ?
              <View style={{ flexDirection: 'column', marginTop: 100, borderWidth: 2, borderColor: 'white', width: '60%', height: 150, borderRadius: 20 }}>
                <Text style={{ fontSize: 20, margin: 10, color: 'white' }}>{`Steps : ${this.state.steps}`}</Text>
                <Text style={{ fontSize: 20, margin: 10, color: 'white' }}>{`Calorie : ${this.state.calorie}`}</Text>
                <Text style={{ fontSize: 20, margin: 10, color: 'white' }}>{`Distance : ${this.state.distance}`}</Text>
              </View>
              : null}
          </ImageBackground>
        </Modal>
        :
        <WebviewScreen closeModal={() => { this.setState({ setVisible: true }) }} url={this.state.url} getToken={(data) => { this.setState({ token: data }) }} />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00a8b5',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    margin: 10,
  },
});