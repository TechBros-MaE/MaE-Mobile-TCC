import React, { useEffect, useRef } from 'react';
import { View, Animated, TextInput, StyleSheet } from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function ProgressGraph({
    percentage = 50,
    radius = 40,
    strokeWidth = 10,
    duration = 500,
    delay = 4000,
    textColor,
    max = 100,
}) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef();
    const inputRef = useRef();
    const color = valueFrequency(percentage);
    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;

    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true,
        }).start();
    };
    
    useEffect(() => {
        animation(percentage);
        animatedValue.addListener((v) => {
            if (circleRef?.current) {
                const maxPerc = (100 * v.value) / max;
                const strokeDashoffset = 
                    circleCircumference - (circleCircumference * maxPerc) / 100;
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }

            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`,
                });
            }
        })

        return () => {
            animatedValue.removeAllListeners();
        };
    }, [max, percentage]);

    return (
        <View>
            <Svg 
                width={radius * 2} 
                height={radius * 2} 
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <AnimatedInput
                ref={inputRef}
                underlineColorAndroid='transparent'
                editable={false}
                defaultValue='0'
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: textColor ?? color},
                    { fontWeight: '900', textAlign: 'center' },
                ]}
            />
        </View>
    )
}

function valueFrequency(value) {
    if (value < 70) {
      return String('#ff0000');
    } else if (value < 80) {
      return String('#ffd700');
    } else {
      return String('#32cd32');
    }
  }