import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
} from '@telegram-apps/sdk-react';
import { useUserStore } from './stores/user';

/**
 * Initializes the application and configures its dependencies.
 */
export function init(): void {
  // Initialize SDK
  initSDK();

  // Check if all required components are supported.
  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  // Mount all components used in the project.
  backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();

  // Get the user data from initData
  // @ts-ignore
  const telegramUser = initData?.unsafe?.user;

  // Save the user data to Zustand store
  const { setUser } = useUserStore.getState();
  if (telegramUser) {
    setUser(telegramUser);  // Save the user info in the Zustand store
  }

  void viewport
    .mount()
    .catch((e) => {
      console.error('Something went wrong mounting the viewport', e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  // Define components-related CSS variables.
  miniApp.bindCssVars();
  themeParams.bindCssVars();
}
