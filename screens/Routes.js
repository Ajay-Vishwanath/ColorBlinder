import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import Home from './Home/index'

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        },
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);