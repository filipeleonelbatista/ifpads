import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Button({ children, text, transparent = false, onPress, ...rest }) {
  return (
    <TouchableOpacity onPress={onPress} style={children ? styles.buttonChildren : transparent ? styles.buttonTransparent : styles.button}
      {...rest}>
      {children ? children : <Text style={transparent ? styles.textButtonTransparent : styles.textButton} >{text}</Text>}
    </TouchableOpacity>
  );
}

export function ButtonNav({ children, text, selected = false, onPress, ...rest }) {
  return (
    <TouchableOpacity onPress={onPress} style={selected ? styles.buttonNavActive : styles.buttonNav}
      {...rest}>
      <Text style={selected ? styles.buttonNavTextActive : styles.buttonNavText}>{text}</Text>
    </TouchableOpacity>
  );
}

export function ButtonRounded({ children, transparent = false, onPress, ...rest }) {
  return (
    <View style={styles.containerButtonRounded}>
      <TouchableOpacity onPress={onPress} style={transparent ? styles.buttonRounded : styles.buttonRoundedBlue}
        {...rest}>
        {children}
      </TouchableOpacity>
    </View>
  );
}

const buttonBase = {
  paddingHorizontal: 28,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  marginVertical: 8,
}

const buttonFontBase = {
  fontWeight: 'bold',
  fontSize: 14,
}

export const styles = StyleSheet.create({
  button: {
    ...buttonBase,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  buttonChildren: {
    ...buttonBase,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
    flexDirection: 'row',
  },
  buttonTransparent: {
    ...buttonBase,
    backgroundColor: 'transparent',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  textButtonTransparent: {
    ...buttonFontBase,
    color: '#566DEA',
  },
  textButton: {
    ...buttonFontBase,
    color: '#FFF',
  },
  buttonNavActive: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: '#6CA6FD',
  },
  buttonNav: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNavTextActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#566DEA',
  },
  buttonNavText: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#566DEA4D',
  },
  containerButtonRounded: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  buttonRounded: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRoundedBlue: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#566DEA",
    alignItems: 'center',
    justifyContent: 'center',
  },
});