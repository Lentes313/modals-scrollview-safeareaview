# Modals, ScrollView y SafeAreaView en Expo

App de práctica que usa los tres componentes vistos en la presentación **"Modals, ScrollView and SafeAreaView in Expo"**. Se prueba en el teléfono con **Expo Go**.

## Cómo correrla

```bash
npm install
npx expo start
```

Escanea el código QR con Expo Go (misma red Wi-Fi). Si no conecta, usa `npx expo start --tunnel`.

## Qué hace la app

| Pantalla | Componentes |
|---|---|
| Pantalla principal con encabezado fijo y contenido desplazable | `SafeAreaProvider`, `SafeAreaView`, `ScrollView` |
| Botón **Show Modal**: modal transparente con animación `slide` y fondo `rgba(0, 0, 0, 0.5)` | `Modal`, `Button`, `useState` |
| Cada tarjeta abre un modal de pantalla completa con puntos clave y el código de ejemplo | `Modal` > `SafeAreaView` > `ScrollView` |
| El código se desplaza de lado en vez de cortarse | `ScrollView horizontal` |
| Ejemplo "Scroll me plz … Expo" de la presentación | `ScrollView` |

## Pasos (un commit por paso)

1. **SafeAreaView**: `SafeAreaProvider` en la raíz y `SafeAreaView` con `flex: 1` para que el encabezado no quede debajo del notch ni de la barra de estado.
2. **ScrollView**: el encabezado queda fijo y solo el contenido se desplaza. Se usa `contentContainerStyle` para el padding interno.
3. **Modal**: estado `modalVisible` con `useState(false)`, `<Modal animationType="slide" transparent visible={modalVisible} onRequestClose={...}>` y los botones *Show Modal* / *Close Modal*.
4. **Modal de detalle**: cada tarjeta es un `Pressable` que guarda el tema elegido en el estado `selectedTopic`. El modal se muestra cuando `selectedTopic !== null` y adentro lleva `SafeAreaView` y `ScrollView`.
5. **ScrollView horizontal** para los bloques de código.

## Notas

- **SafeAreaView**: el `SafeAreaView` que viene en `react-native` está deprecado y solo agrega márgenes en iOS. Por eso se usa el de `react-native-safe-area-context`, que funciona en iOS y Android y es el que recomienda Expo.
- **Modal y áreas seguras**: un `Modal` se dibuja fuera del árbol normal de la app, así que el modal de pantalla completa lleva su propio `SafeAreaProvider`.
- **onRequestClose**: en Android se llama con el botón "atrás". En la presentación solo muestra un `Alert`; aquí además cierra el modal (`setModalVisible(false)`), si no el botón "atrás" no haría nada.

## Buenas prácticas

- Usar los modales con moderación, para confirmaciones, avisos o formularios cortos.
- `ScrollView` renderiza todos sus hijos a la vez; para listas largas es mejor `FlatList`.
- Envolver siempre las pantallas en `SafeAreaView` para que se vean bien en cualquier dispositivo.
