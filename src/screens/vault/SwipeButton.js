import React from "react";
import { StyleSheet, View, Image } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colorsCode from "../../utils/ColorsCode";
import FingerprintScanner from 'react-native-fingerprint-scanner';

const BUTTON_WIDTH = wp(90);
const BUTTON_HEIGHT = 78;
const BUTTON_PADDING = 3;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 4 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SwipeButton = ({ onToggle }) => {
  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,

        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          [colorsCode.colors.PRIMARY, colorsCode.colors.PRIMARY]
        ),
        transform: [{ translateX: X.value }],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0]
          // Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS]
              // Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
    icon: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0]
          // Extrapolate.CLAMP
        ),
      };
    }),
    text: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0, 1]
          // Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [-200, 0]
              // Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
  };

  const enableFaceId = async () => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        // this.setState({biometryType});
        if(biometryType=='Face ID')
      {
        FingerprintScanner.authenticate({}).then(() => {
          navigation.navigate("MyTab");
          // console.log("ready to send btc");
        })
      }
      else
      {
          Alert.alert("Face ID failed, kindly try again",[
            {
              text: "OK",
              onPress: () => enableFaceId(),
              style:"cancel"
            }
          ])
      }
      })
      .catch((error) => console.log('isSensorAvailable error => ', error));
  };

  return (
    <View>
      <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
        <AnimatedLinearGradient
          style={[AnimatedStyles.colorWave, styles.colorWave]}
          colors={[colorsCode.colors.PRIMARY, colorsCode.colors.PRIMARY]}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />

        <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
            <Animated.Image
              resizeMode="contain"
              style={[AnimatedStyles.icon, { width: 22, height: 22 }]}
              source={require("../.././../assets/icons/swipe.png")}
            />
          </Animated.View>
        </PanGestureHandler>
        <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}
              onPress={() => {
                enableFaceId();
            }}>
          Swipe to confirm
        </Animated.Text>
        <Animated.Text
          style={[
            AnimatedStyles.text,
            styles.swipeVerifyText,
            { position: "absolute", zIndex: 999 },
          ]}
        >
          Verifying Face ID...
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: colorsCode.COLOR_BLACK,
    borderRadius: 12,
    padding: BUTTON_PADDING,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  colorWave: {
    position: "absolute",
    left: 4,
    height: 70,
    borderRadius: 12,
  },
  swipeable: {
    position: "absolute",
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: 12,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Lato",
    zIndex: 2,
    color: colorsCode.colors.PRIMARY,
  },
  swipeVerifyText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Lato",
    zIndex: 2,
    color: colorsCode.COLOR_BLACK,
  },
});

export default SwipeButton;
