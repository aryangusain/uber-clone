import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
        <KeyboardAvoidingView 
          style={{flex: 1}}
          behavior={Platform.OS === "android" ? "height": "padding"}  
          keyboardVerticalOffset={Platform.OS === "android"? 0: -64} 
        >
            <Stack.Navigator>
              <Stack.Screen 
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

