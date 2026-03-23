# @booze/mb-form-expo

Expo-oriented layer on top of [`@booze/cl-form-rn`](../client/cl-form-rn): Material icons, Booze theme (`boozeNativeFormTheme`), and `MbFormProvider`.

- Wrap the app (or a subtree) with **`MbFormProvider`** so themed controls resolve tokens.
- Pass **`items`** into **`CatalogSelector`** from the app (e.g. mock catalog); the package does not import app data.
