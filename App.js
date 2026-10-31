import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1B1F2A',
  muted: '#6B7280',
  primary: '#2F6FED',
  primaryLight: '#E6EEFF',
  border: '#E5E7EB',
};

export default function App() {
  return (
    // SafeAreaProvider va una sola vez en la raíz de la app.
    <SafeAreaProvider>
      {/* SafeAreaView agrega el padding necesario para que el contenido
          no quede debajo del notch, la barra de estado o la barra de gestos. */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Componentes de Expo</Text>
          <Text style={styles.headerSubtitle}>Modals · ScrollView · SafeAreaView</Text>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.muted,
  },
});
