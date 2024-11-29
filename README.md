# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。

上から順に機能を解説します。

- 未完了タスクのお知らせ機能
  既存のメッセージ機能から名前を抜き乗ったもの。未完了タスクの数を知ることができる。
- ソート機能
  追加順、期日、優先度をドロップダウンウィンドウで選択でき、昇順と降順をラジオボタンで選択してソートできる。
- 絞り込み機能
  全て、取り組み中、提出済みのタブからそれぞれの条件に応じたTodoリストを表示できる。
- Todoリストを表示する機能
  チェックボックスを押すことでタスクの完了、削除ボタンでタスクの削除、編集ボタンでタスクの編集ができる。
  通常の文字の色は黒、期日1日前は黄色、期限切れは赤色、完了は青色となる。チェックボックスを押した際に期限内なら"提出済み"、
  期限切れ以降なら"遅れて提出済み"と表示される。
  編集ボタンを押した際の編集画面は後述する新しいタスクの追加画面とほぼ同じである。
- 表示されているタスクの削除と新しいタスクの追加
  表示されているタスクの削除では、絞り込み機能で表示されているTodoリストに含まれているタスクをすべて削除することができ、
  削除する前にモーダルウィンドウで警告が出る。削除できるタスクがない場合、灰色になってボタンを押せない
  新しいタスクの追加では、モーダルウィンドウで名前(必須)、優先度(デフォルトで3)、期限(任意)の3要素を設定してタスクを追加できる。

デプロイ先:https://yyf999999999.github.io/react-todo-app/

今回の開発で初めて取り組んだこと、学んだこと

- Reactコンポーネントの設計
- useStateを用いた状態管理
- Tailwind CSSを用いたスタイリング
- JSXの基本構文

今後の課題

- ユーザー機能の復活
- キャッシュを削除してしまった際のデータメモ用文字列

## 開発履歴

制作時間：13時間(学校での時間を含む)

- 2024年10月24日：プロジェクト開始、Todoリストを表示する機能の追加、メッセージ機能の追加
- 2024年10月31日：新しいタスクの追加機能の追加、完了済みタスクの削除機能の追加、タスクの個別作事機能の追加、localStorageの追加
- 2024年11月27日：新しいタスクの追加機能の修正、編集機能の追加、Todoリストの整形、絞り込み機能の追加
- 2024年11月28日：完了済みタスクの削除機能を表示されているタスクの削除機能に変更、ソート機能の追加

## ライセンス

MIT License

Copyright (c) 2024 靴下

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
