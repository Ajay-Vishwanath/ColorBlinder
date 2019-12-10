import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Header } from "../../components/Header";
import styles from "./styles";
import { generateRGB, mutateRGB } from '../../utilities'

export default class Game extends Component {
    state = {
        points: 0,
        timeLeft: 15,
        rgb: generateRGB(),
        size: 2,
        gameState: "PLAYING"
    };

    componentWillMount() {
        this.generateNewRound();
        this.interval = setInterval(() => {
            if (this.state.gameState === "PLAYING"){
                if (this.state.timeLeft === 0){
                    this.setState({gameState: "LOST"})
                } else {
                    this.setState(state => ({ timeLeft: state.timeLeft - 1 }))
                }
            }
        }, 1000);
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
        const { diffTileIndex, points, timeLeft } = this.state;
        if (rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]) {
            // good tile
            this.setState({ points: points + 1, timeLeft: timeLeft + 2 });
            this.generateNewRound();
        } else {
            // wrong tile
            this.setState({ timeLeft: timeLeft - 1 });
        }
    }

    onBottomBarPress = async () => {
        switch (this.state.gameState) {
            case 'PLAYING': {
                this.setState({ gameState: "PAUSED" });
                break;
            }
            case "PAUSED": {
                this.setState({ gameState: "PLAYING" });
                break;
            }
            case "LOST": {
                await this.setState({ points: 0, timeLeft: 15, size: 2 });
                this.generateNewRound();
                this.setState({
                    gameState: "PLAYING",
                })
                break;
            }
        }
    };

    onExitPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        const { rgb, size, diffTileIndex, diffTileColor, gameState} = this.state;
        const { height } = Dimensions.get("window");
        const bottomIcon =
            gameState === "PLAYING"
                ? require("../../assets/icons/pause.png")
                : gameState === "PAUSED"
                    ? require("../../assets/icons/play.png")
                    : require("../../assets/icons/replay.png");

        return (
            <View style={styles.container}>
                <Header />

                <View
                    style={{
                        height: height / 2.5,
                        width: height / 2.5,
                        flexDirection: "row"
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
                </View>

                <View style={styles.bottomContainer}>
                    <View style={{ flex: 1 }}>
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
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.onBottomBarPress}>
                            <Image source={bottomIcon} style={styles.pausedIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
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
        );
    }
}