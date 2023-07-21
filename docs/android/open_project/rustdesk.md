## rustdesk-android

```
rust environment
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh，select default -next
flutter environment
sudo snap install flutter --classic
flutter doctor

1、don't use newest code，i clone tmp tag
2、download the app-release.apk，uzip, copy the arm64-v8a to the main folder
3、config the keystore
4、ndk {
abiFilters "arm64-v8a"
}
5、cd rustdesk
cargo install --path .
RUST_LOG=debug flutter_rust_bridge_codegen --rust-input src/mobile_ffi.rs --dart-output flutter/lib/generated_bridge.dart
6、cd flutter
flutter build apk
```
注意:
不能直接cargo install flutter_rust_bridge，必须使用以下版本
https://github.com/SoLongAndThanksForAllThePizza/flutter_rust_bridge

## rustdesk server端
<https://luotianyi.vc/6542.html>  
## flutter版本对应关系
<https://github.com/Impact-I/reFlutter/blob/main/src/Enginer.info>  