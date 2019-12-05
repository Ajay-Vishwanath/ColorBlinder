import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Header } from '../../components/Header'

export default class Home extends Component {

    onPlayPress = () => {
        console.log("onPlayPress event handler");
    };


    render() {
        return (
            <View style={styles.container}>
                <Header />
                <TouchableOpacity onPress={this.onPlayPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require("../../assets/icons/play_arrow.png")}
                        style={styles.playIcon}
                    />
                    <Text style={styles.play}>PLAY!</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require("../../assets/icons/trophy.png")}
                        style={styles.trophyIcon}
                    />
                    <Text style={styles.hiscore}>Hi-score: 0</Text>
                </View>
            </View>
        );
    }
}