import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppNavigation from './src/navigation';

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

SplashScreen.preventAutoHideAsync();

export default function App() {
  useApolloClientDevTools(client);

  // Loading fonts
  const [fontsLoaded] = useFonts({
    fin_thin: require('./assets/finland_rounded_thin.ttf'),
    epic_fusion: require('./assets/EpicFusion.ttf'),
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
            <AppNavigation />
          </RootSiblingParent>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
