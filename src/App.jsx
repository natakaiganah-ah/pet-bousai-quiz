import { useState } from "react";

const questions = [
  { id: 1, category: "健康管理", priority: "S", points: 8, headline: "動物病院に今すぐ相談を！", question: "ワクチン接種・寄生虫の予防・駆除を定期的に行っていますか？", praise: "素晴らしい！感染症予防はペットの命を守る最重要ケアです🎉", advice: "ワクチンや寄生虫予防は、避難所での集団感染リスクを大幅に下げます。かかりつけ動物病院に今すぐ相談を！" },
  { id: 2, category: "健康管理", priority: "S", points: 8, headline: "まず1件、決めておきましょう！", question: "かかりつけ動物病院を決めていますか？", praise: "完璧です！いざというときに頼れる先生がいるのは最大の安心です🏥", advice: "災害時は通常の病院が使えなくなることも。事前にかかりつけ医を決め、連絡先を防災手帳に書いておきましょう。" },
  { id: 4, category: "食料・水", priority: "S", points: 8, headline: "今日から少しずつ備えましょう！", question: "ペットフードと水を最低5日分以上備蓄していますか？", praise: "完璧な備えです！5日分以上あれば大きな災害でも安心です🌟", advice: "人間の備蓄と同様に、ペットも最低5日分（できれば7日以上）が必要です。療法食や薬も含めて備蓄を見直しましょう。" },
  { id: 5, category: "移動・収容", priority: "S", points: 8, headline: "普段からの積み重ねで慣れておきましょう！", question: "キャリーバッグ・ケージをペットが日頃から使い慣れていますか？", praise: "さすが！慣れたキャリーは避難時のパニックを防ぐ重要な安全装置です🐾", advice: "初めてキャリーに入れられると動物はパニックになります。普段から寝床や食事場所として使い慣れさせておくことが命を守ります。" },
  { id: 6, category: "健康管理", priority: "A", points: 6, headline: "動物病院に今すぐ相談を！", question: "不妊去勢手術を行っていますか？", praise: "グッジョブ！避難所での不意の繁殖トラブルも防げます👍", advice: "避難所では多くの動物が密集します。不妊去勢手術は健康管理だけでなく、避難所でのトラブル防止にも重要です。" },
  { id: 7, category: "所有者明示", priority: "A", points: 6, headline: "すぐできます！今日中に確認を！", question: "迷子札・首輪を常に装着していますか？", praise: "よくできました！迷子札は一番手軽で確実な身元証明です🏷️", advice: "災害時に迷子になると再会が困難になります。迷子札には名前・連絡先を必ず記載。定期的に文字が消えていないか確認を。" },
  { id: 8, category: "所有者明示", priority: "A", points: 6, petType: "dog", headline: "毎年の更新を忘れずに！", question: "【犬のみ】鑑札・狂犬病予防注射済票を装着していますか？", praise: "完璧です！法律上も必要な大切な証明書です🎖️", advice: "狂犬病予防注射済票は法律で義務付けられています。装着していないと避難所で受け入れを断られるケースも。毎年の更新を忘れずに！" },
  { id: 9, category: "避難の準備", priority: "A", points: 6, question: "ペットを連れて避難できる場所（避難所・親族や知人の家も含む）を事前に確認していますか？", headline: "今すぐ「どこに行けるか」を考えてみましょう！", praise: "素晴らしい！いざというとき、行き先が決まっているだけで気持ちが全然違います🗺️", advice: "地域によってはペット同行OKの避難所がないこともあります。まず「自宅が使えなくなったらどこへ行くか」を家族で話し合っておきましょう。避難所だけでなく、ペットを受け入れてくれる親族・知人の家、近くのペットホテルなど、複数の選択肢をリストアップしておくと安心です。" },
  { id: 10, category: "避難の準備", priority: "A", points: 6, headline: "一枚にまとめることが命を守ります！", question: "ペット防災手帳を作成していますか？", praise: "素晴らしい！防災手帳があれば避難先でも適切なケアができます📔", advice: "ペット防災手帳には写真・ワクチン記録・服薬情報・かかりつけ医の連絡先をまとめます。なた海岸動物病院でも相談できます！" },
  { id: 11, category: "ペット情報", priority: "A", points: 6, headline: "スマホで今すぐ撮影できます！", question: "ペットの全身写真を印刷・スマホに保存していますか？（迷子対策）", praise: "よくできました！写真は迷子・保護時の最速の身元証明になります📸", advice: "スマホだけでなく印刷物も準備を。スマホが壊れたり電池切れでも紙の写真があれば大丈夫です。" },
  { id: 12, category: "しつけ・慣らし", priority: "B", points: 4, petType: "dog", headline: "毎日少しずつ練習しましょう！", question: "【犬のみ】「待て」「おいで」「お座り」等の基本コマンドを覚えていますか？", praise: "えらい！基本コマンドは避難時の安全管理に直結します🐕", advice: "基本コマンドが入っていると、パニック時も落ち着かせやすくなります。毎日の短いトレーニングで少しずつ覚えさせましょう。" },
  { id: 13, category: "しつけ・慣らし", priority: "B", points: 4, petType: "dog", headline: "毎日少しずつ練習しましょう！", question: "【犬のみ】不必要に吠えないようしつけていますか？", praise: "すごい！避難所での吠えは他の方への大きなストレスになります。よく躾できていますね👏", advice: "避難所では吠える犬は入場を断られることも。吠え癖がある場合は今から少しずつトレーニングを始めましょう。" },
  { id: 14, category: "しつけ・慣らし", priority: "B", points: 4, headline: "散歩やドッグランで少しずつ慣らしましょう！", question: "人や他の動物に慣らしていますか？", praise: "完璧！社会化されたペットは避難所でも安心して過ごせます🤝", advice: "避難所では見知らぬ人や動物が密集します。普段から散歩・ドッグランなどで社会化を進めておきましょう。" },
  { id: 15, category: "しつけ・慣らし", priority: "B", points: 4, headline: "今から練習を始めましょう！", question: "決められた場所で排泄できるようになっていますか？", praise: "よくできました！トイレトレーニングは避難所生活の必須スキルです✅", advice: "避難所でのトイレの失敗は他の被災者とのトラブルの元になります。今から決まった場所でできるよう練習しましょう。" },
  { id: 16, category: "しつけ・慣らし", priority: "B", points: 4, petType: "cat", headline: "安全のために切り替えを検討しましょう！", question: "【猫のみ】できる限り室内で飼育していますか？", praise: "室内飼育は猫の安全のベストプラクティスです🏠 素晴らしい！", advice: "屋外に慣れた猫は災害時に逃げ出すリスクが高く、捕まえることも困難です。室内飼育に切り替えることを検討してください。" },
  { id: 17, category: "住まいの防災", priority: "B", points: 4, headline: "ホームセンターで今日から対策できます！", question: "家具・ケージの固定・転倒防止をしていますか？", praise: "ナイス！家具転倒はペットが下敷きになる大きな危険です。よく対策できています🔧", advice: "地震の揺れで家具が倒れると、ケージごとペットが下敷きになることがあります。L字金具や突っ張り棒で固定しましょう。" },
  { id: 18, category: "避難の準備", priority: "B", points: 4, headline: "今日から少しずつ揃えましょう！", question: "避難グッズをまとめ、持ち出しやすい場所に置いていますか？", praise: "完璧！いざというとき、1分以内に持ち出せることが命を救います⚡", advice: "避難グッズは玄関付近など、すぐ持ち出せる場所に置きましょう。年に1回は中身を確認・更新することも大切です。" },
  { id: 19, category: "避難の準備", priority: "B", points: 4, headline: "今すぐ候補を考えてみましょう！", question: "緊急時の預け先・連絡先を決めていますか？", praise: "さすがの備えです！頼れる人・場所があると精神的にも楽になります📞", advice: "入院・仕事・けが等で自分がペットを世話できない状況も想定を。友人・親族・ペットホテルなど複数の選択肢を準備しておきましょう。" },
  { id: 20, category: "健康管理", priority: "C", points: 2, headline: "日頃のケアが避難所での信頼につながります！", question: "定期的にシャンプーや身体を清潔に保っていますか？", praise: "清潔ケアもバッチリですね！避難所での衛生管理にもつながります🛁", advice: "清潔なペットは避難所でも受け入れられやすくなります。日頃からのケアを続けましょう。" },
  { id: 21, category: "住まいの防災", priority: "C", points: 2, headline: "係留場所を今すぐ見直しましょう！", question: "屋外飼育の場合、外塀やガラス窓の近くを避けていますか？", praise: "細かいところまで気を配っていますね！さすがです👀", advice: "地震時にガラスや塀が崩れるとペットが怪我をします。屋外飼育の場合は係留場所を見直しましょう。" },
  { id: 22, category: "衛生・ケア", priority: "C", points: 2, headline: "多めに備蓄しておくと安心です！", question: "ペットシーツ・排泄処理用具を備蓄していますか？", praise: "衛生用品の備蓄もバッチリ！細かい備えが避難生活の質を上げます✨", advice: "避難所での衛生管理は非常に重要です。ペットシーツ・ビニール袋を多めに備蓄しておきましょう。" },
  { id: 23, category: "衛生・ケア", priority: "C", points: 2, headline: "少しずつ揃えていきましょう！", question: "ウェットティッシュ・タオル・ブラシなどケア用品を備蓄していますか？", praise: "完璧なケア用品の備えです！ウェットティッシュは本当に多用途で役立ちますよ🧴", advice: "避難所では水が使えないことも多いです。ウェットティッシュは体の清拭・目耳の掃除など多用途に使えます。" },
  { id: 24, category: "衛生・ケア", priority: "C", points: 2, headline: "使い古しのタオルでも代用できます！", question: "お気に入りのおもちゃや匂いのついた用品を避難グッズに入れていますか？", praise: "ペットの心のケアまで考えられていて素晴らしい！💝 見逃しがちなポイントです", advice: "慣れた匂いの物があるとペットの不安が和らぎます。使い古したタオルやぬいぐるみを一つ避難袋に入れておきましょう。" },
];

const totalPoints = questions.reduce((s, q) => s + q.points, 0);

const priorityLabel = { S: "最重要", A: "重要", B: "標準", C: "あると良い" };
const priorityColor = { S: "#c0392b", A: "#e67e22", B: "#27ae60", C: "#2980b9" };
const priorityBg   = { S: "#fdecea", A: "#fff4e5", B: "#eafaf1", C: "#e8f4fd" };
const priorityIcon = { S: "🚨", A: "⚠️", B: "📋", C: "💡" };

export default function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [q.id]: answer });
    setFeedback({ answer, praise: q.praise, advice: q.advice });
  };

  const handleBack = () => {
    if (current === 0) return;
    setFeedback(null);
    setCurrent(current - 1);
  };

  const handleNext = () => {
    setFeedback(null);
    if (current + 1 >= questions.length) setShowResult(true);
    else setCurrent(current + 1);
  };

  const handleSkip = () => {
    setAnswers({ ...answers, [q.id]: "skip" });
    setFeedback(null);
    if (current + 1 >= questions.length) setShowResult(true);
    else setCurrent(current + 1);
  };

  const calcScore = () => {
    let earned = 0, possible = 0;
    questions.forEach((q) => {
      const a = answers[q.id];
      if (a === "skip") return;
      possible += q.points;
      if (a === "yes") earned += q.points;
      else if (a === "unknown") earned += Math.floor(q.points * 0.3);
    });
    return possible === 0 ? 0 : Math.round((earned / possible) * 100);
  };

  const getGrade = (score) => {
    if (score >= 90) return { label: "防災マスター🏆", color: "#f39c12", msg: "完璧な備えです！あなたのペットは最高の守護者のもとにいます。" };
    if (score >= 75) return { label: "防災上級者⭐", color: "#27ae60", msg: "すごい！あとひと頑張りで完璧な備えになります。" };
    if (score >= 50) return { label: "防災中級者👍", color: "#2980b9", msg: "良いスタートです！特に【最重要】【重要】の項目を重点的に改善しましょう。" };
    if (score >= 30) return { label: "防災初級者📋", color: "#e67e22", msg: "今日からでも遅くない！まずは【最重要】項目から始めましょう。" };
    return { label: "要対策⚠️", color: "#c0392b", msg: "ペットの命を守るために、今すぐ【最重要】の備えから始めましょう。一つずつで大丈夫です！" };
  };

  const getWeakPoints = () =>
    questions.filter(q => answers[q.id] !== "yes" && (q.priority === "S" || q.priority === "A")).slice(0, 3);

  // ===== 結果画面 =====
  if (showResult) {
    const score = calcScore();
    const grade = getGrade(score);
    const weakPoints = getWeakPoints();
    const yesCount = Object.values(answers).filter(a => a === "yes").length;

    // 優先度別に未達項目を集計
    const byPriority = ["S","A","B","C"].map(p => ({
      p,
      label: priorityLabel[p],
      color: priorityColor[p],
      bg: priorityBg[p],
      icon: priorityIcon[p],
      total: questions.filter(q => q.priority === p).length,
      done: questions.filter(q => q.priority === p && answers[q.id] === "yes").length,
      skipped: questions.filter(q => q.priority === p && answers[q.id] === "skip").length,
    }));

    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)", padding:"20px", fontFamily:"'Helvetica Neue',Arial,sans-serif" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <div style={{ background:"white", borderRadius:20, padding:28, boxShadow:"0 8px 32px rgba(0,0,0,0.12)", textAlign:"center" }}>
            <div style={{ fontSize:44, marginBottom:6 }}>🐾</div>
            <h2 style={{ color:"#2d6a4f", fontSize:20, marginBottom:4 }}>診断完了！</h2>
            <p style={{ color:"#666", fontSize:13, marginBottom:20 }}>あなたのペット防災スコア</p>

            {/* 円グラフ */}
            <div style={{ position:"relative", width:150, height:150, margin:"0 auto 20px" }}>
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="64" fill="none" stroke="#e8f5e9" strokeWidth="13"/>
                <circle cx="75" cy="75" r="64" fill="none" stroke={grade.color} strokeWidth="13"
                  strokeDasharray={`${2*Math.PI*64*score/100} ${2*Math.PI*64}`}
                  strokeLinecap="round" transform="rotate(-90 75 75)"/>
              </svg>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                <div style={{ fontSize:38, fontWeight:900, color:grade.color, lineHeight:1 }}>{score}</div>
                <div style={{ fontSize:13, color:"#888" }}>点</div>
              </div>
            </div>

            <div style={{ display:"inline-block", background:grade.color, color:"white", borderRadius:20, padding:"6px 20px", fontWeight:700, fontSize:17, marginBottom:10 }}>
              {grade.label}
            </div>
            <p style={{ color:"#444", fontSize:14, marginBottom:24, lineHeight:1.6 }}>{grade.msg}</p>

            {/* 集計 */}
            <div style={{ background:"#f8f9fa", borderRadius:12, padding:14, marginBottom:20, display:"flex", justifyContent:"space-around" }}>
              {[["やってる✅","#27ae60","yes"],["やってない❌","#e67e22","no"],["わからない🤔","#95a5a6","unknown"]].map(([lbl,col,val])=>(
                <div key={val} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:26, fontWeight:900, color:col }}>{Object.values(answers).filter(a=>a===val).length}</div>
                  <div style={{ fontSize:11, color:"#666" }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* 優先度別達成状況 */}
            <div style={{ marginBottom:20, textAlign:"left" }}>
              <p style={{ fontWeight:700, color:"#333", fontSize:14, marginBottom:10 }}>📊 優先度別の達成状況</p>
              {byPriority.map(({p,label,color,bg,icon,total,done})=>(
                <div key={p} style={{ background:bg, border:`2px solid ${color}`, borderRadius:10, padding:"10px 14px", marginBottom:8, display:"flex", alignItems:"center", gap:10 }}>
                  {/* ラベル */}
                  <div style={{ minWidth:80 }}>
                    <span style={{ background:color, color:"white", borderRadius:99, padding:"2px 10px", fontSize:12, fontWeight:700 }}>
                      {icon} {label}
                    </span>
                  </div>
                  {/* バー */}
                  <div style={{ flex:1 }}>
                    <div style={{ background:"rgba(0,0,0,0.08)", borderRadius:99, height:10 }}>
                      <div style={{ background:color, borderRadius:99, height:10, width:`${total>0?done/total*100:0}%`, transition:"width 0.5s" }}/>
                    </div>
                  </div>
                  {/* カウント */}
                  <div style={{ fontSize:13, fontWeight:700, color:color, minWidth:40, textAlign:"right" }}>{done}/{total}</div>
                </div>
              ))}
            </div>

            {/* 優先改善項目 */}
            {weakPoints.length > 0 && (
              <div style={{ background:"#fff3e0", border:"1px solid #ff9800", borderRadius:12, padding:16, marginBottom:20, textAlign:"left" }}>
                <p style={{ fontWeight:700, color:"#e65100", marginBottom:10, fontSize:14 }}>⚠️ 優先して取り組むべき項目</p>
                {weakPoints.map(wp=>(
                  <div key={wp.id} style={{ marginBottom:10, paddingBottom:10, borderBottom:"1px solid #ffe0b2" }}>
                    <div style={{ display:"flex", gap:6, marginBottom:4, flexWrap:"wrap" }}>
                      <span style={{ background:priorityColor[wp.priority], color:"white", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
                        {priorityIcon[wp.priority]} {priorityLabel[wp.priority]}
                      </span>
                      <span style={{ background:"#eee", color:"#555", borderRadius:99, padding:"2px 10px", fontSize:11 }}>{wp.category}</span>
                    </div>
                    <div style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{wp.advice}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background:"#e8f5e9", borderRadius:12, padding:14, marginBottom:20, fontSize:13, color:"#2d6a4f", lineHeight:1.6, textAlign:"left" }}>
              <strong>🏥 なた海岸動物病院より</strong><br/>
              ペット防災手帳の作り方や、マイクロチップ・ワクチンのご相談はお気軽にどうぞ。備えは早いほど安心です！
            </div>

            <button onClick={()=>{ setCurrent(0); setAnswers({}); setShowResult(false); setFeedback(null); }}
              style={{ background:"#2d6a4f", color:"white", border:"none", borderRadius:12, padding:"14px 32px", fontSize:16, fontWeight:700, cursor:"pointer", width:"100%" }}>
              もう一度チェックする
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== 問題画面 =====
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)", padding:"20px", fontFamily:"'Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ maxWidth:600, margin:"0 auto" }}>

        {/* ヘッダー */}
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <h1 style={{ color:"#2d6a4f", fontSize:19, fontWeight:900, margin:0 }}>🐾 ペット防災チェック</h1>
          <p style={{ color:"#555", fontSize:12, margin:"4px 0 0" }}>大分県版 | なた海岸動物病院</p>
        </div>

        {/* プログレスバー */}
        <div style={{ background:"white", borderRadius:12, padding:"12px 16px", marginBottom:14, boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:13 }}>
            <span style={{ color:"#666" }}>質問 {current+1} / {questions.length}</span>
            <span style={{ color:"#2d6a4f", fontWeight:700 }}>{progress}%完了</span>
          </div>
          <div style={{ background:"#e8f5e9", borderRadius:99, height:8 }}>
            <div style={{ background:"#2d6a4f", borderRadius:99, height:8, width:`${progress}%`, transition:"width 0.4s ease" }}/>
          </div>
        </div>

        {/* 問題カード */}
        <div style={{ background:"white", borderRadius:20, padding:24, boxShadow:"0 8px 32px rgba(0,0,0,0.10)", marginBottom:14 }}>

          {/* 優先度バナー（強調・中央揃え・幅狭め） */}
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: priorityBg[q.priority],
              border: `2px solid ${priorityColor[q.priority]}`,
              borderRadius: 99,
              padding: "7px 18px",
            }}>
              <span style={{ fontSize:18 }}>{priorityIcon[q.priority]}</span>
              <div style={{ fontWeight:900, fontSize:15, color:priorityColor[q.priority] }}>
                {priorityLabel[q.priority]}
              </div>
              <div style={{ width:1, height:14, background:priorityColor[q.priority], opacity:0.3 }}/>
              <div style={{ fontSize:12, color:"#888" }}>
                {q.priority === "S" && "命・健康に直結する最優先項目"}
                {q.priority === "A" && "必ず確認したい項目"}
                {q.priority === "B" && "避難生活の質を高める標準項目"}
                {q.priority === "C" && "余裕があれば揃えておくと安心"}
              </div>
              <div style={{ background:priorityColor[q.priority], color:"white", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
                {q.category}
              </div>
            </div>
          </div>

          <p style={{ color:"#222", fontSize:16, fontWeight:600, lineHeight:1.7, marginBottom:20 }}>
            {q.question}
          </p>

          {!feedback ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { value:"yes",     label:"✅ やってる",                      bg:"#e8f5e9", border:"#27ae60", color:"#1b5e20" },
                { value:"no",      label:"❌ やってない",                    bg:"#ffebee", border:"#e53935", color:"#b71c1c" },
                { value:"unknown", label:"🤔 わからない・あまりできていない", bg:"#fff8e1", border:"#f9a825", color:"#e65100" },
              ].map(opt=>(
                <button key={opt.value} onClick={()=>handleAnswer(opt.value)}
                  style={{ background:opt.bg, border:`2px solid ${opt.border}`, borderRadius:12, padding:"15px 18px", fontSize:15, fontWeight:600, color:opt.color, cursor:"pointer", textAlign:"left" }}>
                  {opt.label}
                </button>
              ))}
              {q.petType === "dog" && (
                <button onClick={handleSkip}
                  style={{ background:"#f3f0ff", border:"2px dashed #9b59b6", borderRadius:12, padding:"15px 18px", fontSize:15, fontWeight:600, color:"#6c3483", cursor:"pointer", textAlign:"left" }}>
                  🐱 猫を飼っているのでスキップ
                </button>
              )}
              {q.petType === "cat" && (
                <button onClick={handleSkip}
                  style={{ background:"#f3f0ff", border:"2px dashed #9b59b6", borderRadius:12, padding:"15px 18px", fontSize:15, fontWeight:600, color:"#6c3483", cursor:"pointer", textAlign:"left" }}>
                  🐶 犬を飼っているのでスキップ
                </button>
              )}
            </div>
          ) : (
            <div>
              {feedback.answer === "yes" ? (
                <div style={{ background:"#e8f5e9", border:"2px solid #27ae60", borderRadius:12, padding:14, marginBottom:14 }}>
                  <p style={{ color:"#1b5e20", fontSize:15, fontWeight:600, margin:0, lineHeight:1.6 }}>{feedback.praise}</p>
                </div>
              ) : (
                <div style={{ background:"#fff8e1", border:"2px solid #f9a825", borderRadius:12, padding:14, marginBottom:14 }}>
                  <p style={{ color:"#e65100", fontSize:13, fontWeight:700, marginBottom:6 }}>
                    {feedback.answer === "no" ? `❌ まだできていないんですね。${q.headline || "一つずつ取り組んでいきましょう！"}` : `🤔 まずは確認してみましょう。${q.headline || ""}`}
                  </p>
                  <p style={{ color:"#5d4037", fontSize:14, margin:0, lineHeight:1.7 }}>{feedback.advice}</p>
                </div>
              )}

              {/* 次へ */}
              <button onClick={handleNext}
                style={{ width:"100%", background:"#2d6a4f", color:"white", border:"none", borderRadius:12, padding:"14px 10px", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:10 }}>
                {current+1 >= questions.length ? "結果を見る 🎉" : "次の質問へ →"}
              </button>
              {/* 戻るボタン群 */}
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={handleBack} disabled={current===0}
                  style={{ flex:1, background: current===0 ? "#f0f0f0" : "#ecf0f1", color: current===0 ? "#bbb" : "#555", border:"2px solid #ddd", borderRadius:10, padding:"10px 8px", fontSize:13, fontWeight:600, cursor: current===0 ? "not-allowed":"pointer" }}>
                  ← 一つ前に戻る
                </button>
                <button onClick={()=>{ setFeedback(null); setCurrent(0); }} disabled={current===0}
                  style={{ flex:1, background: current===0 ? "#f0f0f0" : "#fef9f0", color: current===0 ? "#bbb" : "#b7770d", border: current===0 ? "2px solid #ddd" : "2px solid #f0c040", borderRadius:10, padding:"10px 8px", fontSize:13, fontWeight:600, cursor: current===0 ? "not-allowed":"pointer" }}>
                  ⏮ 最初に戻る
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign:"center", color:"#999", fontSize:12 }}>残り {questions.length - current - 1} 問</p>
      </div>
    </div>
  );
}
