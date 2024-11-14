# Fujifilm Recipe App

A React Native app build on Expo, essential for Fujifilm camera owners & photoholic, helping you unlock the full potential of your photos. With unique film-inspired recipes tailored to specific Fujifilm camera models, you can easily recreate the classic film photography atmosphere without the need for post-processing.

Recipes are inspired from [FujiXWeekly](https://fujixweekly.com/)

<img src="https://i.ibb.co/DC0828r/Screenshot-20241111-153329-Fuji-Recipe-App.jpg" alt="Sample Image" width="30%">

Key Features:
- Recipe Library: Explore a wide variety of film recipes designed for different shooting conditions and photography styles.
- Create Your Own Recipes: Customize and save your own camera settings to always have your favorite profiles at your fingertips.
- Favorite Recipes: Bookmark your preferred recipes for quick access and easy organization.
- Easy Search & Filter: Quickly find the recipes you need.

Technical Features:

- Custom API made with NodeJS & Apollo GraphQL to hold the already-made recipes. [Link](https://github.com/alvinle2901/Fuji-Recipe-BE) to the API repo.
- [React Native Async Storage](https://reactnative.dev/docs/asyncstorage) to save the data to local
- Tanstack's [react-query](https://tanstack.com/query/latest) for state management
- [Firebase](https://firebase.google.com/) to save uploaded images on Firebase's Cloud Firestore
- [Formik](https://formik.org/docs/overview) & [Yup](https://github.com/jquense/yup) for form validation
- [TailwindCSS](https://tailwindcss.com/docs/installation) for UI implementation
- [Reanimated](https://reanimated-beta-docs.swmansion.com/) 2 for animations
- [Bottom Sheet](https://gorhom.github.io/react-native-bottom-sheet/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) to prettify the code

## Screenshots

<div style="display: flex; flex-direction: 'row'; padding: 20px;">
<img src="https://i.ibb.co/Y24BRJF/20241114-141622.png" width=30%>
<img src="https://i.ibb.co/Nrc5dt6/20241114-142128.png" width=30%>
<img src="https://i.ibb.co/LSry1z9/20241114-142204.png" width=30%>
<img src="https://i.ibb.co/hgcs6dY/20241114-142145.png" width=30%>
<img src="https://i.ibb.co/VWPGfFs/20241114-142217.png" width=30%>
<img src="https://i.ibb.co/kXdmfpM/20241114-142247.png" width=30%>
</div>

## APKs

You can find the apk to install [here](https://drive.google.com/file/d/1ZE3gAEZ7aEWygPgxAE2wXCyf98-KnT5R/view?usp=sharing)

## Steps to reproduce:

### Clone the repo

```shell
git clone https://github.com/alvinle2901/Fyrre-Magazine.git
```

### Install dependencies

```shell
npm install
```

### ESLint and Prettier fix

```shell
npm run fix:lintPrettier
```

### Start the app

```shell
npx expo start
```
