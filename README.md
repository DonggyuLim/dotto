# Decentrailized-Lotto

This is a simple web3 lotto application built with [Next.js](https://nextjs.org/).
**Live demo is [here](????).**

## ๐ป Tech Stack

- [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
- [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![NextJS](https://img.shields.io/badge/NextJS-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
- [![RecoilJS](https://img.shields.io/badge/RECOILJS-blue.svg)](https://recoiljs.org)
- [![CosmJS](https://img.shields.io/badge/COSMJS-orange.svg)](https://github.com/cosmos/cosmjs)
- [![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
- [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
- [![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org)
- [![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
- [![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white)](https://www.digitalocean.com/)
- [![Archway](https://img.shields.io/badge/ARCHWAY-yellow.svg)](https://archway.io/)

## โจ Core Concepts of DecentralLotto

- **๐ช Familiarity** : ๋ก๋๋ ์ ๊ตญ๋ฏผ์ด ๋งค์ฃผ ์ฆ๊ธฐ๋ ๊ฐํธํ๊ณ  ์ฌ์ด ๊ตญ๋ฏผ ๊ฒ์์. ์ด๋ฌํ ํน์ฑ์ ์ด๋ ค ๋ฐ๊ณ  ๋จ์ํ UI๊ตฌ์ฑ๊ณผ CSS ์ ๋๋ฉ์ด์๋ฑ์ ํ์ฉ ํด ์ฌ์ฉ์์๊ฒ ์น์ํจ์ ์ฃผ๋ ค๊ณ  ํ์์ผ๋ฉฐ keplr ์ง๊ฐ ๋ก๊ทธ์ธ ๋ฐ ๋จ์ํ ๋ฒํผํด๋ฆญ ๋ช๋ฒ ๋ง์ผ๋ก ๋ฐ๋ก ๋ก๋ ๊ฒ์์ ์ฆ๊ธธ ์ ์๊ฒ ๊ตฌํํ์์.
- **๐ Integrity** : ๊ธฐ์กด์ ๋ก๋ ์์คํ์ ์ค์๊ฐ ์ถ์ฒจ๋ ์๋ ๋ฟ๋๋ฌ ๋ฒํธ ์ถ์ฒจ๋ฐฉ์์ ์์ด์๋ ๊ทธ ์ ๋ขฐ์ฑ์ ๊ณ์์ ์ผ๋ก ์์ฌ์ด ์ ๊ธฐ๋์์. ๋ฐ์ดํฐ ์ ํ์ฑ ๋ฐ ์ผ๊ด์ฑ์ ๋ณด์ฅํ๋ ๋ธ๋ก์ฒด์ธ ๊ธฐ์ ์ ๊ธฐ์กด ๋ก๋์ ํ๊ณ๋ฅผ ๊ทน๋ณตํ  ์ ์๋๋ก ๋์.
- **๐ Economic** : ๊ธฐ์กด ๋ณต๊ถ์ ์์ต๊ตฌ์กฐ๋ / ๋ณต๊ถ ํ๋งค์ก = ๋น์ฒจ๊ธ + ๊ธฐ๊ธ ์ ๋ฆฝ๊ธ + ์ฌ์๋น / ๋ก ๋ณต๊ถ์ ํ๋งค์ก ๋๋น ๋น์ฒจ๊ธ์ ๋น์จ(ํ๊ธ์จ)์ ๋๋ต 50% ๋ฟ์ด ๋์ง ์์. DecentralLotto๋ ์์ฃผ ์์ archway chain์ ์์๋ฃ๋ฅผ ์ ์ธํ๋ฉด ํ๋งค์ก ๋๋น ๋๋ต 100%์ ๊ฐ๊น์ด ๋น์ฒจ๊ธ์ด ์ง๊ธ๋จ. ์ด๋ ์ํ์ผ๋ก์จ ๊ตฌ๋งค์๋ค์ ์์๋ฅผ ์ผ์ผํฌ ํ์คํ ์์์. ๋ํ archway๋ ์ง๋ถ์ฆ๋ช(PoS)๋ฐฉ์์ผ๋ก ์์์ฆ๋ช(PoW) ๋ฐฉ์์ ๋นํด ์ ์ ์๋์ง ๋ฐ ๋ฆฌ์์ค๊ฐ ์๋น๋จ.

## ๐งญ Roadmap

## -

## -

## โจ๏ธ Development / Front-end

To start development, we should install our packages first.

```
npm install
```

After the installation is completed, write env file.

```
cp .env.example .env.local
```

And Then we can run the app by:

```
npm run dev
```

and it will start at `http://localhost:3000`.

## ๐ Build

To create a production build, we need to run the below command first:

```
npm run build
```

After this step, we can run the app in `production` mode by:

```
npm start
```

## ๐ Hosting platforms

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)]()

## โ๏ธ License

The Affero GNU General Public License 3.0.
