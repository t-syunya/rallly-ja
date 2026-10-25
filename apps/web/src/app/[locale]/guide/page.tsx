import type { Metadata } from "next";
import { Link } from "@/components/link";

export const metadata: Metadata = {
  title: "使い方ガイド",
  description:
    "日程調整の作成、回答、日程の確定とGoogleカレンダーへの登録方法。",
};

export default function GuidePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      lang="ja"
      className="mx-auto max-w-3xl space-y-10 px-4 py-10 leading-7"
    >
      <header className="space-y-4">
        <Link href="/new" className="text-primary underline underline-offset-4">
          日程調整を作成する
        </Link>
        <h1 className="font-bold text-3xl">使い方ガイド</h1>
        <p>
          候補の日程を共有し、参加者の回答を見て、みんなが集まりやすい日時を決めましょう。
        </p>
        <nav
          aria-label="ガイドの目次"
          className="flex flex-wrap gap-x-6 gap-y-2 text-primary underline underline-offset-4"
        >
          <a href="#organizer">主催者の操作</a>
          <a href="#participant">参加者の操作</a>
          <a href="#calendar">カレンダーへの登録</a>
          <a href="#help">困ったとき</a>
        </nav>
      </header>

      <section id="organizer" className="space-y-4">
        <h2 className="font-semibold text-xl">主催者：日程調整を作る</h2>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            タイトルを入力します。必要に応じて場所や説明も追加してください。
          </li>
          <li>
            カレンダーで候補の日付と時間を選びます。時間を指定しない場合は「終日」を選びます。日曜日は赤、土曜日は青で表示されます。
          </li>
          <li>
            「日程調整を作成」を押し、「共有」から参加者向けのリンクをコピーして送ります。管理用のリンクは参加者に共有しないでください。
          </li>
          <li>
            集まった回答を確認します。○が多い日を目安に、△の人の都合も考えて候補を選びます。
          </li>
          <li>
            「日程を確定」から日時を選び、内容と通知先を確認して確定します。メールアドレスを登録した参加者には、選択した場合に確定通知が送られます。
          </li>
        </ol>
        <p className="rounded-lg border bg-muted/40 p-4">
          ゲスト作成を許可している環境では、ログインせずに作成できます。ゲストの日程調整は、作成したブラウザーから管理します。日程の確定と通知にはアカウントへのログインが必要です。ゲストで作成した場合は、作成したブラウザーでログインし、画面の案内に従って日程調整を引き継いでください。
        </p>
      </section>

      <section id="participant" className="space-y-4">
        <h2 className="font-semibold text-xl">
          参加者：都合のよい日を回答する
        </h2>
        <ol className="list-decimal space-y-3 pl-6">
          <li>主催者から届いた参加者向けリンクを開きます。</li>
          <li>
            日付と時間を確認し、候補ごとに○・△・×を選びます。画面にタイムゾーンが表示されている場合は、地域も確認してください。
          </li>
          <li>
            「続ける」を押し、名前を入力します。通常はメールアドレスを入力する必要はありません。
          </li>
          <li>
            メール通知を希望する場合だけ、「通知用メールアドレスを追加（任意）」を開いて入力します。主催者がメール必須に設定した日程調整では、メール欄が最初から表示されます。
          </li>
          <li>内容を確認し、回答を保存します。</li>
        </ol>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="mb-2 text-left font-medium">
              回答の見方（例）
            </caption>
            <thead>
              <tr className="border-b">
                <th scope="col" className="p-2">
                  記号
                </th>
                <th scope="col" className="p-2">
                  意味
                </th>
                <th scope="col" className="p-2">
                  使う場面
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <th scope="row" className="p-2">
                  ○
                </th>
                <td className="p-2">参加可能</td>
                <td className="p-2">この日時なら参加できる</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="p-2">
                  △
                </th>
                <td className="p-2">必要なら参加可能</td>
                <td className="p-2">都合を調整すれば参加できる</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="p-2">
                  ×
                </th>
                <td className="p-2">不参加</td>
                <td className="p-2">この日時は参加できない</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="p-2">
                  —
                </th>
                <td className="p-2">未回答</td>
                <td className="p-2">まだ回答がない</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          △は主催者が許可した場合に表示されます。候補を押すたびに回答が切り替わる表示と、記号を直接選ぶ表示があります。
        </p>
        <p>
          回答後に変更したい場合は、同じブラウザーでリンクを開き、編集してください。
        </p>
      </section>

      <section id="calendar" className="space-y-4">
        <h2 className="font-semibold text-xl">
          確定した日程をカレンダーに登録する
        </h2>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            主催者が日程を確定したら、日程調整のリンクをもう一度開きます。
          </li>
          <li>
            確定画面の「Googleカレンダーに登録」を押します。確定通知メールが届いた場合は、メール内の同じリンクからも開けます。
          </li>
          <li>
            Googleカレンダーでタイトル・日時・場所を確認し、保存します。必要に応じてGoogleアカウントにログインしてください。
          </li>
        </ol>
        <p>
          リンクを開くだけでは自動登録されません。他のカレンダーを使う場合は、「カレンダーに追加」のメニューから選ぶか、ICSファイルをダウンロードしてください。
        </p>
        <p>
          メールを登録しなくても、確定画面からカレンダーに登録できます。未確定やキャンセル済みの予定は登録できません。
        </p>
      </section>

      <section id="help" className="space-y-4">
        <h2 className="font-semibold text-xl">困ったとき</h2>
        <details className="rounded-lg border p-4">
          <summary className="cursor-pointer font-medium">
            確定通知メールが届かない
          </summary>
          <p className="mt-3">
            メールアドレスと迷惑メールフォルダーを確認してください。通知は主催者が送信先に選んだ人に届きます。届かない場合も、日程調整のリンクから確定日時を確認できます。
          </p>
        </details>
        <details className="rounded-lg border p-4">
          <summary className="cursor-pointer font-medium">
            候補の日付が見つからない
          </summary>
          <p className="mt-3">
            月・週の移動ボタンや「過去の時間を非表示」の設定を確認してください。回答の受付が終了している場合は、主催者に相談してください。
          </p>
        </details>
        <details className="rounded-lg border p-4">
          <summary className="cursor-pointer font-medium">
            メールアドレスが必須と表示される
          </summary>
          <p className="mt-3">
            主催者がメール必須を設定しています。その日程調整では有効なメールアドレスが必要です。入力したくない場合は主催者に相談してください。
          </p>
        </details>
      </section>
    </main>
  );
}
