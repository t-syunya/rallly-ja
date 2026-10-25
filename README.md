<div align="center">

<img src="./assets/images/app-icon.svg" width="96" height="96" alt="" />

# Rallly

> このリポジトリはRalllyの非公式な日本語改変版です。改変内容の告知日：2026-10-26。[改変通知とソースの案内](NOTICE.md)を参照してください。

**Schedule group meetings, without the back-and-forth**

[**Website**](https://rallly.co) · [**Documentation**](https://support.rallly.co) · [**Discord**](https://discord.gg/uzg4ZcHbuM)

[![Actions Status](https://github.com/lukevella/rallly/actions/workflows/ci.yml/badge.svg)](https://github.com/lukevella/rallly/actions)
[![Crowdin](https://badges.crowdin.net/rallly/localized.svg)](https://crowdin.com/project/rallly)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-orange.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Discord](https://img.shields.io/badge/-Join%20Chat-7289DA?logo=discord&logoColor=white)](https://discord.gg/uzg4ZcHbuM)
[![Donate](https://img.shields.io/badge/-Donate%20with%20Paypal-blue?logo=paypal)](https://www.paypal.com/donate/?hosted_button_id=7QXP2CUBLY88E)

</div>

<img src="./assets/images/screenshot.png" alt="A Rallly poll showing participants' availability across four time slots" />

Rallly is an open-source scheduling tool that helps you find the best date and time to meet. Create a poll with a few options, share the link, and let your participants vote on when they're available. No more back-and-forth emails.

## ✨ Features

- 📅 **Date & time polls** — Propose multiple options and find what works for everyone
- 🗳️ **No account needed to vote** — Participants just open the link and respond
- 📊 **Availability grid** — See everyone's responses at a glance
- 💬 **Comments** — Discuss the details right on the poll
- 🔔 **Notifications** — Get notified when participants respond
- ✅ **Finalize a date** — Pick the winning option and notify everyone
- 🌍 **10+ languages** — Community-translated via [Crowdin](https://crowdin.com/project/rallly)
- 🔒 **Open source & self-hostable** — Own your data

## ☁️ Cloud version

The quickest way to get started is the hosted version. Create your first poll in seconds, no installation required.

**[Try Rallly free →](https://rallly.co)**

## 🐳 Self-hosting

### 日本語版について

このリポジトリのWebアプリ（`pnpm build` / `pnpm start`）は、初回アクセス時に日本語で表示されます。既存の言語設定がある場合は、その設定が優先されます。日本語に切り替えるには、設定画面の言語選択を利用するか、ブラウザーの `rallly_locale` Cookieを削除してください。

日本語の画面文言は `apps/web/public/locales/ja/app.json`、メールは `packages/emails/locales/ja/emails.json`、ランディングページは `apps/landing/public/locales/ja/` で管理しています。変数、タグ、ICUメッセージ形式を維持して編集してください。

ランディングページ（`pnpm build:landing`）もトップページは日本語です。英語は `/en`、その他の言語は各言語コードのURLで表示できます。ブログ記事や法務文書の本文は原文のままです。

### 配布時のライセンス対応

ライセンスは元の **AGPLv3またはそれ以降** を維持します。`LICENSE` 本文は変更しません。イメージには `LICENSE` と `NOTICE.md` を同梱し、画面には改変版のソースリンクを表示します。

Docker Hubで配布する前に、次を確認してください。

1. `https://github.com/t-syunya/rallly-ja` とビルド元コミットのソースを、ログイン不要でダウンロードできる状態にする。非公開のままでは、このリンクによるソース提供はできません。公開操作の前には秘密情報が履歴に含まれていないことも確認してください。
2. Docker Hubの説明欄へ [DOCKERHUB.md](DOCKERHUB.md) の内容を掲載する。イメージの配布場所にも、対応するソースの取得方法を案内します。
3. 配布した各イメージに対応するソースとビルド・実行に必要なファイルを維持する。タグを動かしても、過去の配布イメージのコミットを削除しないでください。

公開ワークフローではコミットSHAをイメージの `org.opencontainers.image.revision` ラベルと画面のソースリンクへ設定します。手動のDockerビルドでは、クリーンなコミットから `--build-arg SOURCE_REVISION=$(git rev-parse HEAD)` を指定してください。未指定時は開発用として `main` を参照するため、そのまま配布しないでください。自分でさらに改変して配布・運用する場合は、ソースの提供先とリンクもその版に合わせて更新してください。

### Docker Hubへの自動公開

GitHub Actionsの「Build and Publish Container Image」で、Webアプリのセルフホスト用イメージを `linux/amd64`・`linux/arm64` 向けにビルドし、Docker Hubへ公開します。

リポジトリの Settings → Secrets and variables → Actions で、次のRepository secretsを設定してください。アクセストークンをソースコードへ記載する必要はありません。

| Secret             | 設定内容                                                       |
| ------------------ | -------------------------------------------------------------- |
| `DOCKER_NAMESPACE` | Docker Hubのイメージ名全体（例：`yourname/rallly-ja`）         |
| `DOCKER_USERNAME`  | Docker Hubのユーザー名                                         |
| `DOCKER_PASSWORD`  | 対象イメージへの書き込み権限を持つDocker Hubのアクセストークン |

mainへのpushやマージだけでは公開しません。`v4.16.1` などのタグをpushした場合に `4.16.1`・`4.16`・`4`・`latest`・`sha-<コミット>` を公開します。プレリリースタグ（例：`v4.16.1-rc.1`）は完全なバージョンタグとSHAタグを公開し、`latest` は更新しません。

手動で公開する場合は、Actions →「Build and Publish Container Image」→「Run workflow」で対象ブランチまたはタグを選んで実行してください。mainを選ぶと `latest`・`main`・`sha-<コミット>` を公開します。

Docker Hub側にも対象リポジトリを作成してください。公開イメージとして使う場合は、Docker Hub側の公開範囲もPublicに設定します。実行例は `docker pull yourname/rallly-ja:latest` です。

非公開GitHubリポジトリではGitHubのビルド証明をスキップします。元プロジェクトの本番デプロイ用ワークフローは、このリポジトリでは実行されません。

Prefer to run your own instance? Rallly ships as a Docker image and can be self-hosted in minutes.

See the [self-hosting docs](https://support.rallly.co/self-hosting) for installation and [configuration options](https://support.rallly.co/self-hosting/configuration-options).

## 🛠️ Built with

[Next.js](https://github.com/vercel/next.js/) · [Prisma](https://github.com/prisma/prisma) · [tRPC](https://github.com/trpc/trpc) · [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)

## 🤝 Contributing

Contributions are welcome! Have a look at the [contributing guide](CONTRIBUTING.md) to get started with local development and find out how you can help.

- 🌐 **Translators** — Help [translate Rallly](https://support.rallly.co/contribute/translations) into your language
- 🔐 **Security** — Found a vulnerability? See our [security policy](SECURITY.md)
- 🤝 **Community** — Please read our [Code of Conduct](CODE_OF_CONDUCT.md)

## 📜 License

Rallly is open-source under the GNU Affero General Public License Version 3 (AGPLv3) or any later version. See [LICENSE](LICENSE) for more detail.

## 💚 Sponsors

Thank you to our sponsors for making this project possible.

[Become a sponsor &rarr;](https://github.com/sponsors/lukevella)

<br />

<a href="https://vercel.com/open-source-program">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge-2026.svg" height="40" />
</a>
