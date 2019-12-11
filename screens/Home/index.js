import React, { Component } from 'react';
import { Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Header } from '../../components/Header'
import { Audio } from 'expo-av';

export default class Home extends Component {

    state = {
        isSoundOn: true
    }

    async componentWillMount() {
        this.backgroundMusic = new Audio.Sound();
        this.buttonFX = new Audio.Sound();
        try {
            await this.backgroundMusic.loadAsync(
                require("../../assets/music/Komiku_Mushrooms.mp3")
            );
            await this.buttonFX.loadAsync(
                require("../../assets/sfx/button.wav")
            );
            await this.backgroundMusic.setIsLoopingAsync(true);
            await this.backgroundMusic.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    } 

    onPlayPress = () => {
        if (this.state.isSoundOn){
            this.buttonFX.replayAsync();
            this.backgroundMusic.stopAsync();
        } 
        this.props.navigation.navigate('Game', { isSoundOn: this.state.isSoundOn });
    };

    onLeadershipPress = () => {
        console.log("onLeadershipPress event handler");
    };

    onToggleSound = () => {
        this.setState({ isSoundOn: !this.state.isSoundOn })

        if (this.state.isSoundOn) {
            this.backgroundMusic.stopAsync();
        } else {
            this.backgroundMusic.setIsLoopingAsync(true);
            this.backgroundMusic.playAsync();
        }
    }


    render() {

        const imageSource = this.state.isSoundOn
            ? require("../../assets/icons/speaker-on.png")
            : require("../../assets/icons/speaker-off.png");

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }} />
                <Header />
                <TouchableOpacity onPress={this.onPlayPress} style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginTop: 80,
                    }}
                >
                    <Image
                        source={require("../../assets/icons/play_arrow.png")}
                        style={styles.playIcon}
                    />
                    <Text style={styles.play}>PLAY!</Text>
                </TouchableOpacity>
                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginTop: 20,
                    }}
                >
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
                <View style={{ flex: 1 }} />
                <View style={styles.bottomContainer}>
                    <View> 
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
            </SafeAreaView>
        );
    }
}