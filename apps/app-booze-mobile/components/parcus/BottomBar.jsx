import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '@/constants/parcus-theme';
import LiHome from '@/assets/icons/LiHome';
import LiSearch from '@/assets/icons/LiSearch';
import LiUser from '@/assets/icons/LiUser';

const ACTIVE_COLOR = colors.brand.primary;
const INACTIVE_COLOR = '#A6A6A6';

const TABS = [
  { name: 'My Cards', icon: LiHome, route: '/(tabs)' },
  { name: 'Search', icon: LiSearch, route: '/(tabs)/search' },
  { name: 'Account', icon: LiUser, route: '/(tabs)/account' },
];

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname() ?? '';

  const isActive = (route) => {
    if (route === '/(tabs)') {
      return (
        pathname === '/(tabs)' ||
        pathname === '/' ||
        pathname === '/(tabs)/index' ||
        pathname.endsWith('/index')
      );
    }
    return pathname === route;
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const TabIcon = tab.icon;
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
          >
            <TabIcon
              width={25}
              height={24}
              color={active ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
            <Text
              style={[
                styles.tabText,
                active && styles.activeTabText,
                { color: active ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    height: Platform.select({ ios: 85, android: 60 }),
    backgroundColor: '#3C3C3C',
    paddingBottom: Platform.select({ ios: 25, android: 0 }),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: '400',
  },
  activeTabText: {
    fontWeight: '600',
  },
});
