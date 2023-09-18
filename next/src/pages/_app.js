// pages/_app.js
import '../styles/globals.css'; // Import your global CSS styles
// import '../src/App.css'; // Import App.css from the src folder

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
