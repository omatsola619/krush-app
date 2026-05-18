import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { colors } from '../../constants/colors';
import { border, radius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

// Custom Tab Bar Button
function TabBarButton({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const isCenter = route.name === 'play';

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

        if (isCenter) {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              style={styles.centerBtnWrap}
            >
              <View style={styles.centerBtn}>
                <Text style={styles.centerIcon}>🪑</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabBtn}
          >
            <Text style={{ color: isFocused ? colors.brand : colors.textInactive, fontSize: 20 }}>
              {route.name === 'index' ? '🏠' : route.name === 'matches' ? '❤️' : route.name === 'friends' ? '👥' : '👤'}
            </Text>
            <Text style={[styles.tabLabel, { color: isFocused ? colors.brand : colors.textInactive }]}>
              {label}
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
      <Tabs.Screen name="matches" options={{ title: 'Matches' }} />
      <Tabs.Screen name="play" options={{ title: 'Play' }} />
      <Tabs.Screen name="friends" options={{ title: 'Friends' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="modal" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.bgPrimary,
    borderTopWidth: border.default,
    borderTopColor: colors.borderDefault,
    paddingBottom: spacing.sm, // safe area padding
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xs,
  },
  tabLabel: {
    ...typography.micro,
    marginTop: 4,
  },
  centerBtnWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brand,
    borderWidth: border.ring,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32, // floats 16px above bar
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  centerIcon: {
    fontSize: 24,
    color: colors.white,
  },
});
