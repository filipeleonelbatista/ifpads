import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'

export function Input({ passwordInputType = false, label, tip, error, onChangeText, placeholder, disabled = false, ...rest }) {

  const [showPassword, setShowPassword] = useState(true);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  if (passwordInputType) {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputGroup}>
          <TextInput
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={disabled ? styles.inputDisabledDate : styles.inputDate}
            onChangeText={text => onChangeText(text)}
            placeholder={placeholder}
            secureTextEntry={showPassword}
            {...rest}
          />
          <TouchableOpacity
            style={disabled ? styles.ButtonDisabledDate : styles.ButtonDate}
            onPress={disabled ? () => { } : handleToggleShowPassword}>
            {
              showPassword
                ? <FontAwesome5 name="eye" size={24} color="#fff" />
                : <FontAwesome5 name="eye-slash" size={24} color="#fff" />
            }
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        {tip && <Text style={styles.tip}>{tip}</Text>}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={disabled ? styles.inputDisabled : styles.input}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {tip && <Text style={styles.tip}>{tip}</Text>}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: '100%',
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputDate: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontFamily: 'Poppins_400Regular',
    borderRightWidth: 0,
  },
  inputDisabledDate: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F5FF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#0000004D',
    fontFamily: 'Poppins_400Regular',
    borderRightWidth: 0,
  },
  ButtonDate: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  ButtonDisabledDate: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
  },
  error: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#EB4335',
    marginVertical: 4,
  },
  tip: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0FF',
    marginVertical: 4,
  },
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  inputDisabled: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F5FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0000004D',
    fontFamily: 'Poppins_400Regular',
  },
});