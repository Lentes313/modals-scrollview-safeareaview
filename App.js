import { View, Text, ScrollView, StyleSheet, Modal, Button, Alert } from 'react-native';
import { useState } from 'react';
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

const TOPICS = [
  {
    id: 'modal',
    title: 'Modal',
    summary:
      'Muestra contenido encima de la pantalla actual sin salir de ella. Se controla con un estado booleano y la prop visible.',
  },
  {
    id: 'scrollview',
    title: 'ScrollView',
    summary:
      'Contenedor que permite desplazarse cuando el contenido es más alto que la pantalla. Renderiza todos sus hijos a la vez.',
  },
  {
    id: 'safeareaview',
    title: 'SafeAreaView',
    summary:
      'Mantiene el contenido dentro de los límites seguros del dispositivo: sin taparse con el notch, la barra de estado o la barra de gestos.',
  },
];

// Textos del ejemplo de ScrollView de la presentación.
const SCROLL_LINES = [
  { text: 'Scroll me plz', size: 96 },
  { text: 'If you like', size: 96 },
  { text: 'Scrolling down', size: 96 },
  { text: "What's the best", size: 96 },
  { text: 'Framework around?', size: 96 },
  { text: 'Expo', size: 80 },
];

export default function App() {
  // 1. Estado que controla si el modal está abierto o cerrado.
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Componentes de Expo</Text>
          <Text style={styles.headerSubtitle}>Modals · ScrollView · SafeAreaView</Text>
        </View>

        {/* El header queda fijo y solo esta parte se desplaza.
            contentContainerStyle da estilo al contenido interno (padding),
            style se aplica al contenedor del ScrollView. */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {TOPICS.map((topic) => (
            <View key={topic.id} style={styles.card}>
              <Text style={styles.cardTitle}>{topic.title}</Text>
              <Text style={styles.cardText}>{topic.summary}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Ejemplo de Modal</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Presiona el botón para abrir un modal transparente con animación slide.
            </Text>
            <View style={styles.buttonWrapper}>
              {/* 3. El botón abre el modal cambiando el estado a true. */}
              <Button
                title="Show Modal"
                color={COLORS.primary}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Ejemplo de ScrollView</Text>
          <View style={styles.card}>
            {SCROLL_LINES.map((line) => (
              <Text key={line.text} style={[styles.bigText, { fontSize: line.size }]}>
                {line.text}
              </Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 2. Componente Modal. Se muestra cuando modalVisible es true. */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Se llama con el botón "atrás" de Android.
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Hello, I am a Modal!</Text>
            <Text style={styles.modalText}>
              Aparezco encima de la pantalla sin cambiar de vista. El fondo oscuro es
              rgba(0, 0, 0, 0.5) gracias a transparent={'{true}'}.
            </Text>
            <Button
              title="Close Modal"
              color={COLORS.primary}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.muted,
  },
  buttonWrapper: {
    marginTop: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  modalText: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
  },
  bigText: {
    fontWeight: '800',
    color: COLORS.primary,
  },
});
