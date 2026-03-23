import { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import {
  resolveBarcodeToCatalog,
  normalizeUpc,
} from '@/utils/resolveBarcodeToCatalog';

const BARCODE_TYPES = ['ean13', 'ean8', 'upc_a', 'upc_e'];

export default function ScanLogScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [manualUpc, setManualUpc] = useState('');
  const lastScanAt = useRef(0);

  const goToSentiment = useCallback(
    (drink, rawBarcode) => {
      router.replace({
        pathname: '/(tabs)/log-sentiment',
        params: {
          catalogDrinkId: drink.id,
          drinkName: drink.name,
          upc: normalizeUpc(rawBarcode),
          abv: drink.abv != null ? String(drink.abv) : '',
        },
      });
    },
    [router],
  );

  const handleBarcode = useCallback(
    ({ data }) => {
      if (!data) return;
      const now = Date.now();
      if (now - lastScanAt.current < 2000) return;
      lastScanAt.current = now;

      const drink = resolveBarcodeToCatalog(data);
      if (drink) {
        goToSentiment(drink, data);
        return;
      }
      Alert.alert(
        'Unknown barcode',
        'This barcode is not in our demo catalog. Try manual entry below or pick from the catalog on the Log tab.',
      );
    },
    [goToSentiment],
  );

  const tryManualUpc = () => {
    const drink = resolveBarcodeToCatalog(manualUpc);
    if (drink) {
      goToSentiment(drink, manualUpc);
    } else {
      Alert.alert('Not found', 'No match for that code in the demo catalog.');
    }
  };

  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              router.back();
            } else {
              router.replace('/(tabs)/drink-log');
            }
          }}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Scan bottle</Text>
      <Text style={styles.sub}>
        Point the camera at the barcode. We only ask how you felt about it on
        the next screen.
      </Text>

      {isWeb ? (
        <View style={styles.webBox}>
          <Text style={styles.webNote}>
            Camera scanning works on iOS and Android. Enter a demo UPC from the
            catalog packaging (see Log tab for list in docs), or use the Log tab
            to pick a drink.
          </Text>
        </View>
      ) : !permission ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.brand.primary} />
        </View>
      ) : !permission.granted ? (
        <View style={styles.center}>
          <Text style={styles.sub}>Camera access is needed to scan barcodes.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
            <Text style={styles.primaryBtnText}>Allow camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cameraWrap}>
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES }}
            onBarcodeScanned={handleBarcode}
          />
        </View>
      )}

      <View style={styles.manual}>
        <Text style={styles.manualLabel}>Or enter barcode digits</Text>
        <TextInput
          value={manualUpc}
          onChangeText={setManualUpc}
          keyboardType="number-pad"
          placeholder="e.g. 08501010010000"
          placeholderTextColor={colors.text.tertiary}
          style={styles.input}
        />
        <TouchableOpacity style={styles.secondaryBtn} onPress={tryManualUpc}>
          <Text style={styles.secondaryBtnText}>Look up code</Text>
        </TouchableOpacity>
      </View>

      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topBar: {
    paddingHorizontal: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    paddingHorizontal: spacing.xl,
    marginBottom: 8,
  },
  sub: {
    ...typography.body2,
    color: colors.text.secondary,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  center: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: 12,
  },
  cameraWrap: {
    marginHorizontal: spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
    height: 280,
    borderWidth: 2,
    borderColor: colors.brand.primary,
  },
  camera: {
    flex: 1,
  },
  webBox: {
    marginHorizontal: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
  },
  webNote: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  manual: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    paddingBottom: Platform.select({ ios: 100, android: 80 }),
  },
  manualLabel: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    ...typography.body1,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: colors.background.secondary,
  },
  primaryBtn: {
    backgroundColor: colors.brand.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  primaryBtnText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.brand.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    ...typography.button,
    color: colors.brand.primary,
  },
});
