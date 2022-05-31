import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { defaultTheme } from 'components/ThemeToggle'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      //?????????????? 이거 잘되다 도대체 오ㅔㅐ 안바뀌니ㅡㄴㄴ걸까 ^^ 정말 좋다 기분이 좋다
      // <Html data-theme={defaultTheme}>
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
