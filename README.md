# Decentrailized-Lotto

This is a simple web3 lotto application built with [Next.js](https://nextjs.org/).
**Live demo is [here](????).**

## 💻 Tech Stack

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

## ✨ Core Concepts of DecentralLotto

- **👪 Familiarity** : 로또는 전국민이 매주 즐기는 간편하고 쉬운 국민 게임임. 이러한 특성을 살려 밝고 단순한 UI구성과 CSS 애니메이션등을 활용 해 사용자에게 친숙함을 주려고 하였으며 keplr 지갑 로그인 및 단순한 버튼클릭 몇번 만으로 바로 로또 게임을 즐길 수 있게 구현하였음.
- **🔒 Integrity** : 기존의 로또 시스템은 실시간 추첨도 아닐 뿐더러 번호 추첨방식에 있어서도 그 신뢰성에 계속적으로 의심이 제기되었음. 데이터 정확성 및 일관성을 보장하는 블록체인 기술은 기존 로또의 한계를 극복할 수 있도록 도움.
- **📈 Economic** : 기존 복권의 수익구조는 / 복권 판매액 = 당첨금 + 기금 적립금 + 사업비 / 로 복권의 판매액 대비 당첨금의 비율(환급율)은 대략 50% 뿐이 되지 않음. DecentralLotto는 아주 작은 archway chain의 수수료를 제외하면 판매액 대비 대략 100%에 가까운 당첨금이 지급됨. 이는 상품으로써 구매자들의 수요를 일으킬 확실한 요소임. 또한 archway는 지분증명(PoS)방식으로 작업증명(PoW) 방식에 비해 적은 에너지 및 리소스가 소비됨.

## 🧭 Roadmap

## -

## -

## ⌨️ Development / Front-end

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

## 🚀 Build

To create a production build, we need to run the below command first:

```
npm run build
```

After this step, we can run the app in `production` mode by:

```
npm start
```

## 🚀 Hosting platforms

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)]()

## ⚖️ License

The Affero GNU General Public License 3.0.
