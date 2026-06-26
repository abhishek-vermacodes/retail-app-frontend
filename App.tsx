// import { AuthProvider } from './src/context/AuthContext';
// import RootNavigator from './src/navigation/RootNavigator';

// export default function App() {
//   return (
//     <AuthProvider>
//       <RootNavigator />
//     </AuthProvider>
//   );
// }

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RootNavigator />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
