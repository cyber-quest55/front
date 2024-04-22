1. colocar o my-upload-key.keystore dentro da pasta android/app
2. adicionar dentro do arquivo gradle.properties as variaveis do keystore, no fim do arquivo
  MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
  MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
  MYAPP_UPLOAD_STORE_PASSWORD=123123
  MYAPP_UPLOAD_KEY_PASSWORD=123123

3. adicionar dentro do android/build.gradle no buildscripts.allprojects.repositories o indice maven { url 'https://jitpack.io' }

4. adicionar dentro do android/app/build.gradle no android.signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
  }

  e no buildTypes.release {
      minifyEnabled false
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
      signingConfig signingConfigs.release
  }

5. e no android.app/main/AndroidManifest.xml 

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA"/>

6. nvm use 18.1

7. yarn build-android

Caso queira gerar o aab, ./gradlew bundleRelease na pasta android
