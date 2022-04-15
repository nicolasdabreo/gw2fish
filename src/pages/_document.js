import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=PT+Serif:400,700|Open+Sans:300,400,600,700&display=swap' rel='stylesheet' type='text/css' />
        {
          process.env.ENV !== 'dev' &&
            <script data-name='BMC-Widget' data-cfasync='false' src='https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js' data-id='dabreo' data-description='Support me on Buy me a coffee!' data-message='' data-color='#5F7FFF' data-position='Right' data-x_margin='18' data-y_margin='18' />
        }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
