import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { colors } from '../../constants/colors';
import { border, radius, spacing } from '../../constants/spacing';
import { typography, fontFamily } from '../../constants/typography';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

// Custom Tab Bar Button
function TabBarButton({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        
        // Filter out any hidden screens
        if (options.href === null) {
          return null;
        }

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Render standard tab button
        let IconComponent = Feather;
        let iconName: any = 'home';

        if (route.name === 'index') {
          iconName = 'home';
        } else if (route.name === 'friends') {
          IconComponent = FontAwesome5;
          iconName = 'door-open';
        } else if (route.name === 'profile') {
          iconName = 'user';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tabBtn}
          >
            <View style={styles.iconContainer}>
              <IconComponent 
                name={iconName} 
                size={22} 
                color={isFocused ? '#6C3CE1' : '#8E8E93'} 
              />
            </View>
            <Text style={[styles.tabLabel, { color: isFocused ? '#6C3CE1' : '#8E8E93', fontFamily: isFocused ? fontFamily.bold : fontFamily.medium }]}>
              {label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs 
      tabBar={props => <TabBarButton {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="friends" options={{ title: 'Rooms' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="modal" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 84 : 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingHorizontal: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 9,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
