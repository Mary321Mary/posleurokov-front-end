
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
 const setGtag = () => {
  window.dataLayer = window.dataLayer || [];
  let gtag = () => { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'G-28XE9YMXXP');
 }
 return (
  <div>
   <Head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
     name="description"
     content="Все Кружки: для взрослых и детей"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <script
     type="text/javascript"
     src="https://vk.com/js/api/openapi.js?168"
    ></script>
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Все Кружки</title>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-28XE9YMXXP"></script>
    {setGtag()}
   </Head>
   <Component {...pageProps} />
  </div>
 )
}