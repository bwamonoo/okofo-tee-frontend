// CustomTabIcon.js
import React from 'react';
import { Image } from 'react-native';

const CustomTabIcon = ({ focused, iconName, size, color }) => {
  return (
    <Image
      source={iconName}
      style={{
        width: size,
        height: size,
        tintColor: color, // Optional for monochrome images
      }}
    />
  );
};

export default CustomTabIcon;
