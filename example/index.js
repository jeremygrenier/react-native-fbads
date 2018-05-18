/**
 * Sample React Native FBAds App
 *
 * @flow
 */

import React from "react";
import { AppRegistry, StyleSheet, Text, TouchableOpacity, ScrollView, View } from "react-native";

import FullAd from "./components/FullAd";
import { NativeAdsManager, InterstitialAdManager, BannerView, AdSettings } from "../";
import { ADS_ID } from "./Constants";

AdSettings.addTestDevice(AdSettings.currentDeviceHash);

class MainApp extends React.Component {
    constructor(props) {
        super(props);

        this.adsManager = new NativeAdsManager(ADS_ID.native);
    }

    showFullScreenAd = () => {
        InterstitialAdManager.showAd(ADS_ID.interstitial)
            .then(console.log)
            .catch(console.log);
    };

    onBannerAdPress = () => console.log("Ad clicked!");
    onBannerAdError = event => console.log("Ad error :(", event.nativeEvent);

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.p}>
                    One of the coolest features about native ads is that they nicely integrate with the general app look
                    & feel
                </Text>
                <View style={styles.separator} />
                <FullAd adsManager={this.adsManager} />
                <View style={styles.separator} />
                <TouchableOpacity onPress={this.showFullScreenAd}>
                    <Text>Show interstitial ad</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <BannerView
                    type="large"
                    placementId={ADS_ID.banner}
                    onPress={this.onBannerAdPress}
                    onError={this.onBannerAdError}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    p: {
        marginBottom: 10,
        marginHorizontal: 40,
        textAlign: "center"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        marginTop: 30
    },
    separator: {
        height: 20
    }
});

AppRegistry.registerComponent("MainApp", () => MainApp);
