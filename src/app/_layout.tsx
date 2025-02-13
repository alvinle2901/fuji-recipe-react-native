import { useCallback } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../../global.css';

// Initialize Apollo Client
const httpLink = createHttpLink({
  uri: 'https://fuji-recipe-be.onrender.com/',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Initialize use-query client
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useApolloClientDevTools(client);

  // Load fonts
  const [fontsLoaded] = useFonts({
    fin_thin: require('../../assets/finland_rounded_thin.ttf'),
    epic_fusion: require('../../assets/EpicFusion.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <RootSiblingParent>
            <Stack >
              <Stack.Screen name="+not-found" />
            </Stack>
          </RootSiblingParent>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
