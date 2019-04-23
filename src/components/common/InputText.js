import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const InputText = ({name, label, value, disabled, multiline, onChange, placeholder, error, password, keyboardType, style}) => {
  return(
    <View style={style}>
      <TextInput
        label={label}
        value={value}
        disabled={disabled}
        multiline={multiline}
        onChangeText={text => onChange(name, text)}
        placeholder={placeholder}
        error={error}
        secureTextEntry={password}
        keyboardType={keyboardType}
      />
    </View>
  )
}

InputText.prototype = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  multiline: PropTypes.string,
  error: PropTypes.bool.isRequired,
  password: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  keyboardType: PropTypes.string
}

InputText.defaultProps = {
  password: false,
  keyboardType: 'default',
  multiline: false,
  disabled: false
}

export default InputText;