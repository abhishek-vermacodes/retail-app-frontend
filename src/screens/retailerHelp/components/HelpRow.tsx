import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import React from 'react';
import styles from '../retailerHelp.styles';

interface HelpRowProps {
  title: string;
  icon: string;
  onPress?: () => void;
  isAccordion?: boolean;
  isExpanded?: boolean;
}

export const HelpRow = ({
  title,
  icon,
  onPress,
  isAccordion = false,
  isExpanded = false,
}: HelpRowProps) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.rowLeft}>
      <View style={styles.iconContainer}>
        <FontAwesome6 name={icon as any} size={16} color="#ff6a32" />
      </View>
      <Text style={styles.rowText}>{title}</Text>
    </View>
    {isAccordion ? (
      <FontAwesome6
        name={isExpanded ? 'angle-up' : 'angle-down'}
        size={16}
        color="#ff6a32"
      />
    ) : (
      <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
    )}
  </TouchableOpacity>
);

export default HelpRow;
  