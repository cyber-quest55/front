import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "cicd.com.irricontrol",
  appName: "Irricontrol",
  webDir: "dist",

  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "rgba(0,0,0,0)",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },

    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
