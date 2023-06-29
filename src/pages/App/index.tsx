/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import notifee, { EventType, EventDetail, AndroidImportance } from '@notifee/react-native';
import messaging, { } from '@react-native-firebase/messaging';
import MapScreen from 'pages/MapScreen';
import { LocationPermissionsService } from 'services/LocationPermissionsService';
import { ThemeProvider } from 'theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserLocationStateContextProvider } from 'context/UserLocationStateContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Noti {
  notification: {
    title: string,
    body: string
  },
  data?: { [key: string]: string };
}



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onDisplayNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default5',
      name: 'Default Channel5',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });
    console.log("ChannelId => " + channelId);
  }

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("Token => " + fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  };

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage?.notification
    );

    Alert.alert(remoteMessage?.notification?.title + " " + remoteMessage?.notification?.body);
  });

  // const handleBackgroundNoti = () => {
  //   // check whether an initial notification is available
  //   messaging().
  //     getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from quit state:',
  //         remoteMessage?.notification
  //       );
  //       Alert.alert(remoteMessage?.notification?.title + " " + remoteMessage?.notification?.body);
  //     });
  // }


  useEffect(() => {
    getToken();
    // handleBackgroundNoti();
    onDisplayNotification();
    return notifee.onForegroundEvent(({ type, detail }: { type: EventType, detail: EventDetail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          Alert.alert(detail.notification?.title + " " + detail.notification?.body);
          break;
      }
    });

  }, []);

  const createLocalNotification = async (notification: Noti) => {
    const { title, body } = notification.notification;
    console.log("Title => " + title);
    console.log("Body => " + body);
    console.log("Notification => " + JSON.stringify(notification.data));
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
    }
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: 'default5',
        importance: AndroidImportance.HIGH,
      },
    });

  };

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    createLocalNotification(remoteMessage as Noti);
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    createLocalNotification(remoteMessage as Noti);
  });

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //     {/* <Button title="Local Notification" onPress={() => createLocalNotification()} /> */}
  //     <MapScreen />
  //   </SafeAreaView>
  // );
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <UserLocationStateContextProvider>
            <MapScreen />
            <LocationPermissionsService />
          </UserLocationStateContextProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

});

export default App;
