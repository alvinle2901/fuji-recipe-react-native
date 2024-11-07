import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigation from './src/navigation';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const httpLink = createHttpLink({
  uri: 'https://fuji-recipe-be.onrender.com/'
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  useApolloClientDevTools(client);

  const [fontsLoaded] = useFonts({
    fin_thin: require('./assets/finland_rounded_thin.ttf'),
    epic_fusion: require('./assets/EpicFusion.ttf')
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
