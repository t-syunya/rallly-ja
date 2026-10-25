# Rallly 日本語版 — 改変通知

このソフトウェアは [Rallly](https://github.com/lukevella/rallly) を基にした非公式の改変版です。元プロジェクトの著作権表示とライセンスは引き続き適用されます。

2026-10-26 時点の改変内容：日本語を初期表示言語とする設定、日本語の画面・メール・ランディングページ、日本語の使い方ガイド、Googleカレンダーへのリンク、Docker Hub向けのビルド・公開設定など。個々の変更日と変更内容はGit履歴を参照してください。

改変版も GNU Affero General Public License version 3 またはそれ以降（AGPL-3.0-or-later）の下で提供します。ライセンス全文は同梱の `LICENSE` を参照してください。このソフトウェアは、適用法で認められる範囲で無保証で提供されます。

## 対応するソースコード

改変版のソース、依存関係のロックファイル、ビルド・実行手順、Dockerfile、DBマイグレーションは次のリポジトリで提供します。

https://github.com/t-syunya/rallly-ja

公式の公開ワークフローで生成したイメージでは、`org.opencontainers.image.revision` ラベルがビルド元コミットを示します。対応するソースは `https://github.com/t-syunya/rallly-ja/tree/<コミットSHA>` で取得できます。GitHubの「Code → Download ZIP」または `git clone` でダウンロードしてください。

この改変版をさらに変更して配布・運用する場合は、その版に対応するソースを提供し、画面上のソースリンクも更新してください。
