import Head from 'next/head';

export default function Seo() {
  return (
    <Head>
      <title>성수스낵</title>
      {/* 모바일 입력시 화면확대 방지 */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, 
    user-scalable=0"
      />
      <meta
        name="author"
        content="_PLANX"
      />
      <meta
        name="description"
        content="성수스낵"
      />
      <meta
        property="og:title"
        content="성수스낵"
      />
      <meta
        property="og:site_name"
        content="성수스낵"
      />
      <meta
        property="og:description"
        content="성수스낵"
      />
      <meta
        property="og:type"
        content="website"
      />
      {/* <meta
        property="og:url"
        content="https://www.ttorang.site/"
      />
      <meta
        property="og:image"
        content="/images/thumbnail.png"
      />
      <link
        rel="icon"
        href="/images/favicon.ico"
      /> */}
    </Head>
  );
}
