import React, { Component } from "react";
import { SafeAreaView, Animated, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Header } from "../../components/Header";
import styles from "./styles";
import { generateRGB, mutateRGB } from '../../utilities'
import { Audio } from 'expo-av';

export default class Game extends Component {
    state = {
        points: 0,
        timeLeft: 15,
        rgb: generateRGB(),
        size: 2,
        gameState: "PLAYING",
        isSoundOn: this.props.navigation.getParam('isSoundOn' || true),
        shakeAnimation: new Animated.Value(0)
    };

    async componentWillMount() {
        this.generateNewRound();
        this.interval = setInterval(() => {
            if (this.state.gameState === "PLAYING"){
                if (this.state.timeLeft <= 0){
                    if (this.state.isSoundOn) this.loseFX.replayAsync();
                    this.backgroundMusic.stopAsync();
                    this.setState({gameState: "LOST"})
                } else {
                    this.setState(state => ({ timeLeft: state.timeLeft - 1 }))
                }
            }
        }, 1000);

        this.backgroundMusic = new Audio.Sound();
        this.buttonFX = new Audio.Sound();
        this.tileCorrectFX = new Audio.Sound();
        this.tileWrongFX = new Audio.Sound();
        this.pauseInFX = new Audio.Sound();
        this.pauseOutFX = new Audio.Sound();
        this.loseFX = new Audio.Sound();

        try {
            await this.backgroundMusic.loadAsync(
                require('../../assets/music/Komiku_BattleOfPogs.mp3'),
            );
            await this.buttonFX.loadAsync(require('../../assets/sfx/button.wav'));
            await this.tileCorrectFX.loadAsync(
                require('../../assets/sfx/tile_tap.wav'),
            );
            await this.tileWrongFX.loadAsync(
                require('../../assets/sfx/tile_wrong.wav'),
            );
            await this.pauseInFX.loadAsync(require('../../assets/sfx/pause_in.wav'));
            await this.pauseOutFX.loadAsync(
                require('../../assets/sfx/pause_out.wav'),
            );
            await this.loseFX.loadAsync(require('../../assets/sfx/lose.wav'));

            await this.backgroundMusic.setIsLoopingAsync(true);

            if (this.state.isSoundOn) {
                await this.backgroundMusic.playAsync();
            }
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    generateSizeIndex = () => {
        return Math.floor(Math.random() * this.state.size);
    };

    generateNewRound = () => {
        const RGB = generateRGB();
        const mRGB = mutateRGB(RGB);
        const { points } = this.state;
        this.setState({
            diffTileIndex: [this.generateSizeIndex(), this.generateSizeIndex()],
            diffTileColor: `rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`,
            rgb: RGB,
            size: Math.min(Math.max(Math.round(Math.sqrt(points)), 2), 5)
        });
    };

    onTilePress = (rowIndex, columnIndex) => {
        const { diffTileIndex, points, timeLeft, shakeAnimation } = this.state;
        if (rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]) {
            // good tile
            if (this.state.isSoundOn) this.tileCorrectFX.replayAsync();
            this.setState({ points: points + 1, timeLeft: timeLeft + 2 });
            this.generateNewRound();
        } else {
            // wrong tile
            Animated.sequence([
                Animated.timing(this.state.shakeAnimation, {
                    toValue: 50,
                    duration: 100
                }),
                Animated.timing(this.state.shakeAnimation, {
                    toValue: -50,
                    duration: 100
                }),
                Animated.timing(this.state.shakeAnimation, {
                    toValue: 50,
                    duration: 100
                }),
                Animated.timing(this.state.shakeAnimation, {
                    toValue: -50,
                    duration: 100
                }),
                Animated.timing(this.state.shakeAnimation, {
                    toValue: 0,
                    duration: 100
                })
            ]).start();
            if (this.state.isSoundOn) this.tileWrongFX.replayAsync();
            this.setState({ timeLeft: timeLeft - 1 });
        }
    }

    onBottomBarPress = async () => {
        switch (this.state.gameState) {
            case 'PLAYING': {
                if (this.state.isSoundOn) this.pauseInFX.replayAsync();
                this.setState({ gameState: "PAUSED" });
                break;
            }
            case "PAUSED": {
                if (this.state.isSoundOn) this.pauseOutFX.replayAsync();
                this.setState({ gameState: "PLAYING" });
                break;
            }
            case "LOST": {
                await this.setState({ points: 0, timeLeft: 15, size: 2 });
                if (this.state.isSoundOn) this.backgroundMusic.replayAsync();
                this.generateNewRound();
                this.setState({
                    gameState: "PLAYING",
                })
                break;
            }
        }
    };

    onExitPress = () => {
        if (this.state.isSoundOn) this.buttonFX.replayAsync();
        this.props.navigation.goBack();
    };

    render() {
        const { rgb, size, diffTileIndex, diffTileColor, gameState, shakeAnimation} = this.state;
        const { width } = Dimensions.get("window");
        const bottomIcon =
            gameState === "PLAYING"
                ? require("../../assets/icons/pause.png")
                : gameState === "PAUSED"
                    ? require("../../assets/icons/play.png")
                    : require("../../assets/icons/replay.png");

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Header />
                </View>

                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Animated.View
                        style={{
                            height: width * 0.875,
                            width: width * 0.875,
                            flexDirection: "row",
                            left: shakeAnimation
                        }}
                    >
                        {gameState === "PLAYING" ? (Array(size)
                            .fill()
                            .map((val, columnIndex) => (
                                <View
                                    style={{ flex: 1, flexDirection: "column" }}
                                    key={columnIndex}
                                >
                                    {Array(size)
                                        .fill()
                                        .map((val, rowIndex) => (
                                            <TouchableOpacity
                                                key={`${rowIndex}.${columnIndex}`}
                                                style={{
                                                    flex: 1,
                                                    backgroundColor:
                                                        rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]
                                                            ? diffTileColor
                                                            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                                                    margin: 2
                                                }}
                                                onPress={() => this.onTilePress(rowIndex, columnIndex)}
                                            />
                                        ))}
                                </View>
                            ))) : gameState === "PAUSED" ? (
                            <View style={styles.pausedContainer}>
                                <Image
                                    source={require("../../assets/icons/mug.png")}
                                    style={styles.pausedIcon}
                                />
                                <Text style={styles.pausedText}>GAME IS PAUSED</Text>
                            </View>
                            ) : (
                                <View style={styles.pausedContainer}>
                                    <Image
                                        source={require("../../assets/icons/dead.png")}
                                        style={styles.pausedIcon}
                                    />
                                    <Text style={styles.pausedText}>GAME OVER</Text>
                                    <TouchableOpacity onPress={this.onExitPress}>
                                        <Image
                                            source={require("../../assets/icons/escape.png")}
                                            style={styles.exitIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                    </Animated.View>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomSectionContainer}>
                            <Text style={styles.counterCount}>
                                {this.state.points}
                            </Text>
                            <Text style={styles.counterLabel}>
                                Points
                            </Text>
                            <View style={styles.bestContainer}>
                                <Image source={require('../../assets/icons/trophy.png')} style={styles.bestIcon} />
                                <Text style={styles.bestLabel}>
                                    0
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bottomSectionContainer}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.onBottomBarPress}>
                                <Image source={bottomIcon} style={styles.pausedIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomSectionContainer}>
                            <Text style={styles.counterCount}>
                                {this.state.timeLeft}
                            </Text>
                            <Text style={styles.counterLabel}>
                                Seconds left
                            </Text>
                            <View style={styles.bestContainer}>
                                <Image source={require('../../assets/icons/clock.png')} style={styles.bestIcon} />
                                <Text style={styles.bestLabel}>
                                    0
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> 
            </SafeAreaView>
        );
    }
}