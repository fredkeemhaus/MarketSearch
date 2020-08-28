import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking
} from "react-native";
import styled from "styled-components";
import assets from "./config/assets";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync
} from "expo-ads-admob";

const MarketContainer = styled.ScrollView`
  width: 100%;
`;

const MarketWrap = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
`;

const MarketImage = styled.Image`
  width: 150px;
  height: 80px;
`;

const TextInputWrap = styled.View`
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const SearchAction = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TextInputBox = styled.TextInput`
  flex: 5;
  height: 100%;
  font-size: 16px;
`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      marketCheck: 1
    };
  }

  marketPress = phase => {
    this.setState({
      marketCheck: phase === 1 ? 1 : phase === 2 ? 2 : phase === 3 ? 3 : 4
    });
  };

  goMarket = marketCheck => {
    const { searchTerm } = this.state;
    if (_.isNil(searchTerm)) {
      alert("검색어를 입력해주세요.");
    } else {
      if (marketCheck === 1) {
        Linking.openURL(`https://www.daangn.com/search/${searchTerm}`);
      } else if (marketCheck === 2) {
        Linking.openURL(
          `https://m.bunjang.co.kr/search/products?q=${searchTerm}`
        );
      } else if (marketCheck === 3) {
        Linking.openURL(`https://www.hellomarket.com/search?q=${searchTerm}`);
      } else if (marketCheck === 4) {
        Linking.openURL(
          `https://m.joongna.com/search-list?searchword=${searchTerm}`
        );
      }
    }
  };

  render() {
    console.log(this.state);
    const { searchTerm, marketCheck } = this.state;
    return (
      <View
        style={{
          height: "100%",
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 40
        }}
      >
        <MarketContainer>
          <MarketWrap onPress={() => this.marketPress(1)}>
            <MarketImage resizeMode="contain" source={assets.dangeunLogo} />
            {marketCheck === 1 ? (
              <Feather name="check-circle" size={30} color="black" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={30}
                color="gray"
              />
            )}
          </MarketWrap>
          <MarketWrap onPress={() => this.marketPress(2)}>
            <MarketImage resizeMode="contain" source={assets.bungaeLogo} />
            {marketCheck === 2 ? (
              <Feather name="check-circle" size={30} color="black" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={30}
                color="gray"
              />
            )}
          </MarketWrap>
          <MarketWrap onPress={() => this.marketPress(3)}>
            <MarketImage resizeMode="contain" source={assets.helloLogo} />
            {marketCheck === 3 ? (
              <Feather name="check-circle" size={30} color="black" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={30}
                color="gray"
              />
            )}
          </MarketWrap>
          <MarketWrap onPress={() => this.marketPress(4)}>
            <MarketImage resizeMode="contain" source={assets.joongoLogo} />
            {marketCheck === 4 ? (
              <Feather name="check-circle" size={30} color="black" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={30}
                color="gray"
              />
            )}
          </MarketWrap>
          <View style={{ marginTop: 20 }}>
            <Text>검색하실 마켓을 선택 후, 아래 검색어를 입력해주세요.</Text>
          </View>
        </MarketContainer>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-9486850272416310/8780213462" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        </View>
        <TextInputWrap>
          <TextInputBox
            placeholder={"검색하실 물품을 입력하세요."}
            onChangeText={searchTerm => {
              this.setState({ searchTerm });
            }}
          />
          <SearchAction onPress={() => this.goMarket(marketCheck)}>
            <AntDesign name="search1" size={24} color="black" />
          </SearchAction>
        </TextInputWrap>
        <StatusBar style="auto" />
      </View>
    );
  }
}
