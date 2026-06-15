import { Tabs, useRouter } from 'expo-router';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../constants/theme';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();
  const tabs = [
    { name: 'index', icon: 'home' as const, label: 'Home' },
    { name: 'calendar', icon: 'calendar-month' as const, label: 'Calendar' },
    { name: '__fab__', icon: 'add' as const, label: '' },
    { name: 'closet', icon: 'checkroom' as const, label: 'Closet' },
    { name: 'boards', icon: 'grid-view' as const, label: 'Boards' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => {
        if (tab.name === '__fab__') {
          return (
            <View key="fab" style={styles.fabContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.fabButton,
                  pressed && { transform: [{ scale: 0.9 }] },
                ]}
                onPress={() => router.push('/outfit-builder')}
              >
                <MaterialIcons name="add" size={32} color={Colors.onSecondaryContainer} />
              </Pressable>
            </View>
          );
        }

        const routeIndex = state.routes.findIndex((r: any) => r.name === tab.name);
        const isFocused = state.index === routeIndex;

        return (
          <Pressable
            key={tab.name}
            style={styles.tabItem}
            onPress={() => {
              if (!isFocused) {
                navigation.navigate(tab.name);
              }
            }}
          >
            <MaterialIcons
              name={tab.icon}
              size={28}
              color={isFocused ? Colors.primaryFixedDim : Colors.surfaceVariant}
              style={isFocused ? { transform: [{ scale: 1.1 }] } : undefined}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="closet" />
      <Tabs.Screen name="boards" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.onSurface,
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 4,
    borderColor: Colors.onSurface,
  },
});
