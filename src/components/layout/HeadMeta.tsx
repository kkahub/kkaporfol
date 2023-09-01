import Head from "next/head";

export default function HeadMeta({ title, description, url, image }) {
  return (
    <Head>
      <title>{title || "프론트엔드 개발자 김근애 포트폴리오"}</title>
      <meta
        name="description"
        content={
          description ||
          "김근애의 프론트엔드 개발, 웹퍼블리싱 포트폴리오 사이트입니다."
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:title"
        content={title || "프론트엔드 개발자 김근애 포트폴리오"}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://jungleehabit.com"} />
      <meta property="og:image" content={image} />
      <meta
        property="og:article:author"
        content="프론트엔드 개발자 김근애 포트폴리오"
      />
    </Head>
  );
}
