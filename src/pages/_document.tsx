import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <h1>{process.env.A}</h1>
        <NextScript />
      </body>
    </Html>
  );
}
