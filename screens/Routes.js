import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import Home from './Home/index'
import Game from "./Game";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Gmame: {
            screen: Game
        }
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);