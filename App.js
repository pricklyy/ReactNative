import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInSrceen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} options={{gestureEnabled:false}} />
                <Stack.Screen name='Login' component={SignInScreen} options={{ gestureEnabled:false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
