import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import AppNavigation from './src/navigation'
import { useFonts } from 'expo-font'
import { RootSiblingParent } from 'react-native-root-siblings'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    fin_thin: require('./assets/finland_rounded_thin.ttf'),
    epic_fusion: require('./assets/EpicFusion.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootSiblingParent>
        <AppNavigation />
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}
