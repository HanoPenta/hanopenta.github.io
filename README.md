# 八乃ぺんた 3D Model Studio

八乃ぺんたの3Dモデル制作依頼サイトです。ViteとThree.jsで構成したマルチページサイトで、プライベートプレビューを前提にしています。

## ページ

- Home: 縦長トップ、About、方式比較、News、Works、Portfolio、Profile、Contact導線
- News: お知らせ一覧
- Works: カテゴリで絞り込める制作一覧
- Portfolio: 制作判断を伝えるケーススタディ
- Contact: 推奨方式と相談メモを作るプロジェクトプランナー

## 開発

```sh
npm install
npm run dev
```

本番ビルドは `npm run build`、出力先は `dist/` です。`.openai/hosting.json` に同一サイトを更新するためのプロジェクト情報を保存し、ビルド後は静的サイトとして配信します。`server/index.js` はホスト互換の最小Workerとして同梱しています。

`main` ブランチへのpushをトリガーに、`.github/workflows/deploy-pages.yml` がGitHub Pagesへ自動デプロイします。

## 3Dビューワー

トップの3DモデルはThree.jsで生成するデモモデルです。カーソル追従、瞬き、アイドルモーションを実装しています。カメラトラッキングは対応ブラウザでは顔位置、その他では映像内の動きを使用し、映像は保存しません。

実モデルへの差し替え時は `src/viewer.js` のモデル生成部分をGLB/VRMローダーへ置き換えてください。
