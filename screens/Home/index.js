import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Header } from '../../components/Header'

export default class Home extends Component {

    state = {
        isSoundOn: true
    }

    onPlayPress = () => {
        console.log("onPlayPress event handler");
    };

    onLeadershipPress = () => {
        console.log("onLeadershipPress event handler");
    };

    onToggleSound = () => {
        this.setState({ isSoundOn: !this.state.isSoundOn })
    }


    render() {

        const imageSource = this.state.isSoundOn
            ? require("../../assets/icons/speaker-on.png")
            : require("../../assets/icons/speaker-off.png");

        return (
            <View style={styles.container}>
                <Header />
                <TouchableOpacity onPress={this.onPlayPress} style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginTop: 80,
                    }}>
                    <Image
                        source={require("../../assets/icons/play_arrow.png")}
                        style={styles.playIcon}
                    />
                    <Text style={styles.play}>PLAY!</Text>
                </TouchableOpacity>
                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marignTop: 20,
                    }}>
                    <Image
                        source={require("../../assets/icons/trophy.png")}
                        style={styles.trophyIcon}
                    />
                    <Text style={styles.hiscore}>Hi-score: 0</Text>
                </View>
                <TouchableOpacity
                    onPress={this.onLeadershipPress} 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 80,
                    }}
                >
                    <Image 
                        source={require("../../assets/icons/leaderboard.png")}
                        style={styles.leaderboardIcon}
                    />
                    <Text style={styles.leaderboard}>Leaderboard</Text>
                </TouchableOpacity>
                <View style={styles.bottomContainer}>
                    <Text style={[styles.copyrightText, { color: "#E64C3C" }]}>
                        Music: Komiku
                    </Text>
                    <Text style={[styles.copyrightText, { color: "#F1C431" }]}>
                        SFX: SubspaceAudio
                    </Text>
                    <Text style={[styles.copyrightText, { color: "#3998DB" }]}>
                        Development: RisingStack
                    </Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={this.onToggleSound}>
                    <Image source={imageSource} style={styles.soundIcon} />
                </TouchableOpacity>
            </View>
        );
    }
}