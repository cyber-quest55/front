#!/bin/bash

# Diretórios e arquivos
gradleFilePath="android/app/build.gradle"
packageJsonPath="package.json"

# Extrai o versionCode atual do gradle
currentVersionCode=$(grep versionCode $gradleFilePath | awk '{ print $2 }')
# Calcula o novo versionCode
newVersionCode=$((currentVersionCode + 1))

# Extrai o versionName atual do gradle
currentVersionName=$(grep versionName $gradleFilePath | awk '{ print $2 }' | tr -d '"')
# Incrementa o último número do versionName por 1
baseVersionName=$(echo $currentVersionName | sed -E 's/([0-9]+)$//')
lastNumber=$(echo $currentVersionName | grep -oE '[0-9]+$')
newLastNumber=$((lastNumber + 1))
newVersionName="${baseVersionName}${newLastNumber}"

# Exibe as versões atuais
echo "Versão atual: $currentVersionName ($currentVersionCode)"
echo "Incrementando versionCode e versionName..."

# Sistema operacional específico sed in-place edit
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' -e "s/versionCode $currentVersionCode/versionCode $newVersionCode/" $gradleFilePath
  sed -i '' -e "s/versionName \"$currentVersionName\"/versionName \"$newVersionName\"/" $gradleFilePath
  sed -i '' -e "s/\"version\": \".*\"/\"version\": \"$newVersionName\"/" $packageJsonPath
else
  # Linux
  sed -i -e "s/versionCode $currentVersionCode/versionCode $newVersionCode/" $gradleFilePath
  sed -i -e "s/versionName \"$currentVersionName\"/versionName \"$newVersionName\"/" $gradleFilePath
  sed -i -e "s/\"version\": \".*\"/\"version\": \"$newVersionName\"/" $packageJsonPath
fi

# Confirma as mudanças
echo "Versão atualizada para: $newVersionName ($newVersionCode) em build.gradle e package.json"
