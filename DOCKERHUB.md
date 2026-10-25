# Rallly 日本語版

[Rallly](https://github.com/lukevella/rallly) を基にした非公式の改変版です。初期表示の日本語化、日本語の使い方ガイド、Googleカレンダーへのリンクなどを追加しています。改変内容の告知日：2026-10-26。

## ライセンスとソースコード

AGPL-3.0-or-later。元プロジェクトの著作権表示を維持しています。適用法で認められる範囲で無保証です。

- ソース・ビルド・実行手順：https://github.com/t-syunya/rallly-ja
- ライセンス全文：https://github.com/t-syunya/rallly-ja/blob/main/LICENSE
- 改変通知：https://github.com/t-syunya/rallly-ja/blob/main/NOTICE.md

イメージには `/app/LICENSE` と `/app/NOTICE.md` を同梱しています。ビルド元のコミットSHAは次のコマンドで確認できます（`yourname/rallly-ja:latest` は利用するイメージに置き換えてください）。

```sh
docker image inspect yourname/rallly-ja:latest --format '{{ index .Config.Labels "org.opencontainers.image.revision" }}'
```

対応するソースは `https://github.com/t-syunya/rallly-ja/tree/<コミットSHA>` です。「Code → Download ZIP」または `git clone` で無料で取得できます。可変タグの `latest` ではなく、利用中のイメージのコミットを参照してください。

運用時にはDBや認証などの設定が必要です。詳細は上記リポジトリのREADMEと [セルフホスト用ドキュメント](https://support.rallly.co/self-hosting) を参照してください。
