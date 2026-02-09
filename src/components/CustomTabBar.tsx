// import React from 'react';
// import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// const CustomTabBar = ({ state, navigation }: any) => {
//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.container}>
//         {state.routes.map((route: any, index: number) => {
//           const isFocused = state.index === index;

//           const onPress = () => navigation.navigate(route.name);

//           if (route.name === 'Center') {
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={onPress}
//                 style={styles.centerButton}
//                 activeOpacity={0.8}
//               >
//                 <Feather name="plus" size={24} color="#fff" />
//               </TouchableOpacity>
//             );
//           }

//           let iconName = 'home-outline';
//           if (route.name === 'Products') iconName = 'box';
//           if (route.name === 'Orders') iconName = 'shopping-cart';
//           if (route.name === 'Profile') iconName = 'person-outline';

//           return (
//             <TouchableOpacity key={index} onPress={onPress} style={styles.tab}>
//               {route.name === 'Products' ? (
//                 <Feather
//                   name="box"
//                   size={20}
//                   color={isFocused ? '#ff5b27' : '#888'}
//                 />
//               ) : route.name === 'Center' ? (
//                 ''
//               ) : route.name === 'Orders' ? (
//                 <Feather
//                   name="shopping-cart"
//                   size={20}
//                   color={isFocused ? '#ff5b27' : '#888'}
//                 />
//               ) : (
//                 <Icon
//                   name={iconName}
//                   size={20}
//                   color={isFocused ? '#ff5b27' : '#888'}
//                 />
//               )}

//               {isFocused && <Text style={styles.label}>{route.name}</Text>}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default CustomTabBar;

// const styles = StyleSheet.create({
//   wrapper: {
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//   },
//   container: {
//     marginHorizontal: 20,
//     paddingHorizontal: 10,
//     flexDirection: 'row',
//     backgroundColor: '#ffe3d9',
//     height: 80,
//     gap: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     borderRadius: 50,
//     borderColor: '#ff59275a',
//     borderWidth: 1,
//   },
//   tab: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     top: 0,
//   },
//   label: {
//     color: '#ff5b27',
//     fontSize: 10,
//     marginTop: 2,
//     fontFamily: 'Poppins-Regular',
//   },
//   centerButton: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ff5b27',
//     shadowColor: '#ff5b27',
//     width: 60,
//     height: 60,
//     borderRadius: 32,
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 12,
//   },
// });




import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const CustomTabBar = ({ state, navigation, role }: any) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);
          const color = isFocused ? '#ff5b27' : '#888';

          // CENTER BUTTON → ONLY RETAILER
          if (role === 'retailer' && route.name === 'Center') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.centerButton}
                activeOpacity={0.8}
              >
                <Feather name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            );
          }

          const renderIcon = () => {
            if (route.name === 'Home')
              return <Icon name="home-outline" size={20} color={color} />;

            if (route.name === 'Products')
              return <Feather name="box" size={20} color={color} />;

            if (route.name === 'Cart')
              return <Feather name="shopping-cart" size={20} color={color} />;

            if (route.name === 'Orders')
              return <Feather name="package" size={20} color={color} />;

            if (route.name === 'Profile')
              return <Icon name="person-outline" size={20} color={color} />;

            return null;
          };

          return (
            <TouchableOpacity key={index} onPress={onPress} style={styles.tab}>
              {renderIcon()}
              {isFocused && <Text style={styles.label}>{route.name}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#ffe3d9',
    height: 80,
    gap: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderRadius: 50,
    borderColor: '#ff59275a',
    borderWidth: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    top: 0,
  },
  label: {
    color: '#ff5b27',
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  centerButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5b27',
    shadowColor: '#ff5b27',
    width: 60,
    height: 60,
    borderRadius: 32,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
});
