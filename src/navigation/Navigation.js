import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
//--------------------------------------------
//Importamos el navigation container
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//-------------------------------------------------
//Importamos los SCREEN
//-------------------------------------------------
import QdShow from '../screen/QdShow';
import Radio from '../screen/Radio';
import Selector from '../screen/Selector';
import Splash from '../screen/Splash';
import Programacion from '../screen/Programacion';

//
//Creamos el navigation
const Stack = createStackNavigator();

const Navigation = () => {
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen
          name="selector"
          component={Selector}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen
          name="programacion"
          component={Programacion}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />

        <Stack.Screen
          name="radio"
          component={Radio}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen
          name="qdshow"
          component={QdShow}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Navigation;
