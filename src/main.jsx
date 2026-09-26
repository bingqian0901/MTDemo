import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  Code2,
  Compass,
  Edit3,
  Flower2,
  GraduationCap,
  Guitar,
  Heart,
  Home,
  ImagePlus,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  User,
  Users,
  X,
  Zap,
  Bookmark,
  Monitor,
  Footprints,
  Palette,
  Globe,
  Repeat2,
  Wifi,
  BatteryFull,
  Signal,
  CheckCheck,
} from "lucide-react";
import {
  people,
  categories,
  images,
  initialState,
  match,
  changeInvite,
} from "./data";
import "./style.css";
const KEY = "skillmate-demo-v1";
function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || initialState();
  } catch {
    return initialState();
  }
}
const uid = () => crypto.randomUUID();
const clock = () =>
  new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
const catIcons = {
  摄影: Camera,
  编程: Code2,
  音乐: Guitar,
  语言: Globe,
  设计: Palette,
  运动: Footprints,
  效率: Monitor,
};
const Context = createContext(null);
const Avatar = ({ p, size = "" }) => (
  <img className={"avatar " + size} src={p?.avatar} alt={p?.name || "用户"} />
);
const Btn = ({ children, onClick, secondary = false, ...props }) => (
  <button
    className={"btn " + (secondary ? "secondary" : "primary")}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
const Header = ({ title, action }) => {
  const { back } = useContext(Context);
  return (
    <header className="subhead">
      <button className="icon-button" aria-label="返回" onClick={back}>
        <ArrowLeft size={21} />
      </button>
      <b>{title}</b>
      {action || <span className="icon-spacer" />}
    </header>
  );
};
const Empty = ({ text = "这里还没有内容", action }) => (
  <div className="empty">
    <Flower2 size={38} />
    <h3>{text}</h3>
    <p>每一份小小的开始，都值得期待。</p>
    {action}
  </div>
);
function PostCard({ post }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const p = person(post.author);
  return (
    <article className="post-card">
      <button className="post-cover" onClick={() => go("post", post.id)}>
        <img src={post.image || images.desk} alt={post.title} loading="lazy" />
        <span className="image-tag">{post.category}</span>
        {post.category === "音乐" && <span className="play-dot">♪</span>}
      </button>
      <button className="post-title" onClick={() => go("post", post.id)}>
        {post.title}
      </button>
      <div className="post-meta">
        <button
          className="mini-author"
          onClick={() =>
            post.author === "me" ? navigate("我的") : go("person", post.author)
          }
        >
          <Avatar p={p} />
          <span>{p.alias}</span>
        </button>
        <button
          aria-label={"点赞 " + post.title}
          className={"like " + (db.liked.includes(post.id) ? "active" : "")}
          onClick={() => toggle("liked", post.id)}
        >
          <Heart
            size={14}
            fill={db.liked.includes(post.id) ? "currentColor" : "none"}
          />
          {post.likes + Number(db.liked.includes(post.id))}
        </button>
      </div>
    </article>
  );
}
function HomePage() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const [feed, setFeed] = useState("为你推荐");
  const posts =
    feed === "关注"
      ? db.posts.filter((p) => db.following.includes(p.author))
      : feed === "最新发布"
        ? [...db.posts].sort((a, b) => (b.created || 0) - (a.created || 0))
        : db.posts;
  return (
    <>
      <header className="brand-header">
        <div className="brand">
          <span className="brand-mark">
            <Repeat2 size={24} />
          </span>
          <div>
            <strong>
              技友<span>SkillMate</span>
            </strong>
            <small>以你所长，换我所爱</small>
          </div>
        </div>
        <button
          className="icon-button notification"
          aria-label="通知"
          onClick={() => {
            setMsgTab("交换通知");
            navigate("消息");
          }}
        >
          <Bell size={22} />
          <i />
        </button>
      </header>
      <div className="home-intro">
        <div className="eyebrow">
          HELLO, {db.profile.name} <span>✦</span>
        </div>
        <h1>
          今天想解锁
          <br />
          什么
          <span>
            新技能？
            <svg viewBox="0 0 165 10">
              <path d="M3 7 Q80 0 162 5" />
            </svg>
          </span>
        </h1>
        <p>分享你的擅长，让热爱发生交换。</p>
        <div className="intro-art">
          <div className="orbit o1" />
          <div className="orbit o2" />
          <span className="art-chip camera">
            <Camera />
          </span>
          <span className="art-chip music">
            <Guitar />
          </span>
          <span className="art-chip code">
            <Code2 />
          </span>
          <Sparkles className="art-spark" />
          <span className="art-plus">✦</span>
        </div>
      </div>
      <button className="search-home" onClick={() => navigate("发现")}>
        <Search size={19} />
        <span>搜搜想学的技能，找到你的搭子</span>
        <span className="search-shortcut">探索</span>
      </button>
      <div className="category-icons">
        {Object.entries(catIcons)
          .slice(0, 6)
          .map(([c, Icon], i) => (
            <button key={c} onClick={() => discover(c)}>
              <span className={"category-circle c" + i}>
                <Icon size={23} />
              </span>
              {c === "音乐" ? "吉他" : c === "语言" ? "英语" : c}
            </button>
          ))}
      </div>
      <button
        className="match-banner"
        onClick={() => {
          setMutual(true);
          setCategory("全部");
          setQuery("");
          navigate("发现");
        }}
      >
        <div className="banner-icon">
          <Users size={23} />
          <i>✦</i>
        </div>
        <div>
          <strong>你的技能，刚好是 TA 想学的</strong>
          <p>今日技能搭子已就位，来认识一下</p>
        </div>
        <span className="round-arrow">
          <ArrowUpRight size={20} />
        </span>
      </button>
      <div className="feed-nav">
        {["为你推荐", "关注", "最新发布"].map((t) => (
          <button
            className={feed === t ? "selected" : ""}
            key={t}
            onClick={() => setFeed(t)}
          >
            {t}
            {feed === t && <span />}
          </button>
        ))}
        <button
          className="feed-filter"
          aria-label="筛选内容"
          onClick={() => navigate("发现")}
        >
          <SlidersHorizontal size={17} />
        </button>
      </div>
      <div className="recommend-note">
        <Sparkles size={13} /> 为你推荐
        {db.profile.learn.map((s) => s.name).join("、") || "新技能"}与生活灵感
      </div>
      {posts.length ? (
        <div className="masonry">
          {[0, 1].map((col) => (
            <div className="masonry-col" key={col}>
              {posts
                .filter((_, i) => i % 2 === col)
                .map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
            </div>
          ))}
        </div>
      ) : (
        <Empty text="关注喜欢的伙伴，发现更多灵感" />
      )}
      <div className="end-note">每一份热爱，都有回响 ✦</div>
    </>
  );
}
function PersonCard({ p }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const m = match(db.profile, p, mode);
  return (
    <article className="person-card">
      <button className="person-top" onClick={() => go("person", p.id)}>
        <Avatar p={p} size="large" />
        <div>
          <b>{p.alias}</b>
          <p>{p.bio}</p>
          <small>
            <MapPin size={11} />
            {p.city} ·{" "}
            {p.teach[0].mode === "均可" ? "线上 / 线下" : p.teach[0].mode}
          </small>
        </div>
        <ChevronRight size={18} />
      </button>
      <div className="skill-row">
        <span className="skill-label">TA 能教</span>
        {p.teach.map((s) => (
          <span className="chip purple" key={s.id}>
            {s.name}
          </span>
        ))}
        <span className="skill-label space-left">想学</span>
        {p.learn.map((s) => (
          <span className="chip peach" key={s.id}>
            {s.name}
          </span>
        ))}
      </div>
      {m.score > 0 && (
        <div className={"match-reason " + (!m.bidirectional ? "one-way" : "")}>
          <Sparkles size={14} />
          <div>
            <b>{m.bidirectional ? "双向契合" : "学习需求匹配"}</b>
            <p>
              {m.bidirectional
                ? `你教 TA ${m.give}，TA 教你${m.take}。`
                : `TA 可以教你${m.take}，先聊聊学习计划吧。`}
            </p>
          </div>
        </div>
      )}
      <div className="person-actions">
        <button onClick={() => go("person", p.id)}>
          查看主页 <ArrowUpRight size={14} />
        </button>
        <button
          className="small-primary"
          onClick={() => (m.bidirectional ? invite(p.id) : openChat(p.id))}
        >
          {m.bidirectional ? "发起交换" : "私信聊聊"}
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}
function Discover() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const results = people
    .filter(
      (p) =>
        (category === "全部" || p.teach.some((s) => s.category === category)) &&
        (!query ||
          [p.name, p.alias, ...p.teach.map((s) => s.name)].some((v) =>
            v.toLowerCase().includes(query.toLowerCase()),
          )) &&
        (mode === "全部" ||
          p.teach.some((s) => s.mode === "均可" || s.mode === mode)) &&
        (!mutual || match(db.profile, p, mode).bidirectional),
    )
    .sort(
      (a, b) =>
        match(db.profile, b, mode).score - match(db.profile, a, mode).score,
    );
  return (
    <div className="page-pad">
      <div className="page-heading">
        <div>
          <div className="eyebrow">FIND YOUR PEOPLE</div>
          <h1>
            发现你的技能搭子<span className="purple-text">.</span>
          </h1>
        </div>
        <Sparkles className="purple-text" />
      </div>
      <label className="search-input">
        <Search size={19} />
        <input
          placeholder="想学什么？摄影、吉他、Python…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button aria-label="清空搜索" onClick={() => setQuery("")}>
            <X size={16} />
          </button>
        )}
      </label>
      <div className="pills">
        {categories.map((c) => (
          <button
            className={category === c ? "active" : ""}
            key={c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="filter-line">
        <button
          className={mutual ? "purple-text" : ""}
          onClick={() => setMutual(!mutual)}
        >
          <Repeat2 size={15} />
          {mutual ? "只看双向契合" : "和我匹配"}
          {mutual && <Check size={13} />}
        </button>
        <button onClick={() => setModal({ type: "filter" })}>
          <SlidersHorizontal size={15} />
          {mode === "全部" ? "筛选" : mode}
        </button>
      </div>
      {!db.profile.teach.length || !db.profile.learn.length ? (
        <div className="info-card">
          <Sparkles />
          <h3>完善技能档案，找到与你互补的学习搭子。</h3>
          <Btn onClick={() => setModal({ type: "publish" })}>完善技能档案</Btn>
        </div>
      ) : (
        <div className="discovery-banner">
          <span className="sparkle-box">
            <Sparkles size={22} />
          </span>
          <div>
            <b>好的相遇，是彼此成就</b>
            <p>根据你的技能供需，发现互补的伙伴</p>
            <small>本地规则匹配 · 非 AI 推断</small>
          </div>
        </div>
      )}
      <div className="section-title">
        <h3>{mutual ? "双向契合的伙伴" : "为你发现"}</h3>
        <small>{results.length} 位技能伙伴</small>
      </div>
      {results.length ? (
        results.map((p) => <PersonCard key={p.id} p={p} />)
      ) : (
        <Empty
          text="暂时没有符合条件的伙伴"
          action={
            <Btn
              secondary
              onClick={() => {
                setQuery("");
                setCategory("全部");
                setMode("全部");
                setMutual(false);
              }}
            >
              清除筛选
            </Btn>
          }
        />
      )}
    </div>
  );
}
function PersonPage({ id }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const p = person(id),
    m = match(db.profile, p);
  return (
    <>
      <Header title="技能伙伴" />
      <div
        className="profile-cover"
        style={{ backgroundImage: `url(${p.cover})` }}
      >
        <span>LET’S GROW TOGETHER</span>
      </div>
      <div className="page-pad person-detail">
        <div className="profile-top">
          <Avatar p={p} size="xl" />
          <button
            className={
              "follow-btn " + (db.following.includes(id) ? "following" : "")
            }
            onClick={() => toggle("following", id)}
          >
            {db.following.includes(id) ? "已关注" : "+ 关注"}
          </button>
        </div>
        <h1>{p.alias}</h1>
        <p className="muted">{p.bio}</p>
        <div className="profile-tags">
          <span>
            <MapPin size={13} />
            {p.city}
          </span>
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h3 className="section-heading">
          TA 能教你什么 <span>SHARE</span>
        </h3>
        {p.teach.map((s) => (
          <div className="teach-card" key={s.id}>
            <img src={p.cover} alt={s.name} />
            <div>
              <b>{s.name}</b>
              <span className="chip purple">{s.level}</span>
              <p>{s.intro}</p>
              <small>
                {s.mode === "均可" ? "线上 / 线下" : s.mode} · 友好入门
              </small>
            </div>
          </div>
        ))}
        <h3 className="section-heading">
          TA 想学什么 <span>LEARN</span>
        </h3>
        {p.learn.map((s) => (
          <div className="learn-card" key={s.id}>
            <BookOpen size={20} />
            <div>
              <b>{s.name}</b>
              <p>{s.intro}</p>
            </div>
          </div>
        ))}
        {m.bidirectional ? (
          <div className="big-match">
            <Sparkles />
            <h3>我们刚好可以互相学习！</h3>
            <div className="exchange-visual">
              <span>
                你教 TA<b>{m.give}</b>
              </span>
              <Repeat2 />
              <span>
                TA 教你<b>{m.take}</b>
              </span>
            </div>
            <p>从一次小小的技能交换，开启新的可能。</p>
          </div>
        ) : (
          <div className="info-card">
            <b>{m.take ? "学习需求匹配" : "兴趣伙伴"}</b>
            <p>
              {m.take
                ? `TA 能教你${m.take}，尚未发现双向互补技能。`
                : "可以先交流兴趣与学习目标。"}
            </p>
          </div>
        )}
        <h3 className="section-heading">TA 的技能笔记</h3>
        <div className="masonry">
          {db.posts
            .filter((x) => x.author === id)
            .map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
        </div>
      </div>
      <div className="sticky-actions">
        <Btn secondary onClick={() => openChat(id)}>
          <MessageCircle size={18} />
          私信聊聊
        </Btn>
        <Btn onClick={() => invite(id)}>
          <Repeat2 size={18} />
          {m.bidirectional ? "发起技能交换" : "聊聊学习计划"}
        </Btn>
      </div>
    </>
  );
}
function PostDetail({ id }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const post = db.posts.find((p) => p.id === id);
  const [comment, setComment] = useState("");
  if (!post) return <Empty />;
  const p = person(post.author);
  return (
    <>
      <Header
        title="技能笔记"
        action={
          <button
            className="icon-button"
            aria-label="收藏笔记"
            onClick={() => toggle("saved", id)}
          >
            <Bookmark
              fill={db.saved.includes(id) ? "currentColor" : "none"}
              size={20}
            />
          </button>
        }
      />
      <button
        className="post-author-line"
        onClick={() =>
          post.author === "me" ? navigate("我的") : go("person", p.id)
        }
      >
        <Avatar p={p} />
        <div>
          <b>{p.alias}</b>
          <small>一起分享，一起成长</small>
        </div>
        <ChevronRight size={18} />
      </button>
      <img
        className="detail-image"
        src={post.image || images.desk}
        alt={post.title}
      />
      <div className="page-pad">
        <h2 className="detail-title">{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <div className="post-tags">
          {post.tags.map((t) => (
            <span key={t}>#{t} </span>
          ))}
        </div>
        <div className="post-controls">
          <button
            className={db.liked.includes(id) ? "active" : ""}
            onClick={() => toggle("liked", id)}
          >
            <Heart
              size={19}
              fill={db.liked.includes(id) ? "currentColor" : "none"}
            />
            {post.likes + Number(db.liked.includes(id))} 喜欢
          </button>
          <button
            className={db.saved.includes(id) ? "purple-text" : ""}
            onClick={() => toggle("saved", id)}
          >
            <Bookmark
              size={19}
              fill={db.saved.includes(id) ? "currentColor" : "none"}
            />
            {db.saved.includes(id) ? "已收藏" : "收藏"}
          </button>
          <span>
            <MessageCircle size={18} />
            {post.comments.length}
          </span>
        </div>
        <h3 className="section-heading">
          聊一聊 <small>{post.comments.length} 条评论</small>
        </h3>
        {post.comments.length ? (
          post.comments.map((c, i) => (
            <div className="comment" key={i}>
              <span className="letter-avatar">{c.name.slice(0, 1)}</span>
              <div>
                <b>{c.name}</b>
                <p>{c.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="muted">留下第一条鼓励吧～</p>
        )}
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!comment.trim()) return;
            update((d) => ({
              ...d,
              posts: d.posts.map((x) =>
                x.id === id
                  ? {
                      ...x,
                      comments: [
                        ...x.comments,
                        { name: db.profile.name, text: comment.trim() },
                      ],
                    }
                  : x,
              ),
            }));
            setComment("");
            notify("评论已发布");
          }}
        >
          <input
            placeholder="说点什么，给热爱一点回应…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
          />
          <button aria-label="发送评论">
            <Send size={18} />
          </button>
        </form>
      </div>
      {post.author !== "me" && (
        <div className="sticky-actions">
          <Btn secondary onClick={() => go("person", p.id)}>
            查看作者主页
          </Btn>
          <Btn onClick={() => go("person", p.id)}>
            <GraduationCap size={19} />向 TA 学习
          </Btn>
        </div>
      )}
    </>
  );
}
function InviteCard({ i, compact = false }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const p = person(i.person);
  return (
    <div className="invite-card">
      <div className="invite-title">
        <span>
          <Repeat2 size={16} />
          技能交换邀约
        </span>
        <span className={"status s" + i.status}>{i.status}</span>
      </div>
      <button className="invite-partner" onClick={() => go("person", i.person)}>
        <Avatar p={p} />
        <b>{p.alias}</b>
        <ChevronRight size={15} />
      </button>
      <div className="exchange-visual">
        <span>
          我教<b>{i.give}</b>
        </span>
        <Repeat2 size={19} />
        <span>
          我学<b>{i.take}</b>
        </span>
      </div>
      <p className="invite-time">
        {i.mode}交流 · {i.time.replace("T", " ")}
      </p>
      {!compact && (
        <>
          <p className="muted">{i.note}</p>
          {i.status === "进行中" && (
            <div className="progress">
              <span style={{ width: i.progress + "%" }} />
            </div>
          )}
        </>
      )}
      <button className="invite-link" onClick={() => go("invite", i.id)}>
        查看邀约详情 <ArrowRight size={15} />
      </button>
    </div>
  );
}
function Messages() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const ids = Object.keys(db.chats);
  return (
    <div className="page-pad">
      <div className="page-heading">
        <div>
          <div className="eyebrow">BETTER TOGETHER</div>
          <h1>每一次交流，都是开始</h1>
        </div>
        <MessageCircle className="purple-text" />
      </div>
      <div className="segmented">
        {["聊天", "交换通知"].map((t) => (
          <button
            className={msgTab === t ? "active" : ""}
            key={t}
            onClick={() => setMsgTab(t)}
          >
            {t}
            {t === "交换通知" &&
              db.invites.some((i) => i.status === "待确认") && <i />}
          </button>
        ))}
      </div>
      <div className="demo-note">
        <span />
        本地演示空间 · 消息不会发送给真实用户
      </div>
      {msgTab === "聊天" ? (
        ids.length ? (
          ids.map((id) => {
            const p = person(id),
              list = db.chats[id],
              last = list.at(-1),
              inv = db.invites.filter((i) => i.person === id).at(-1);
            return (
              <button
                className="conversation"
                key={id}
                onClick={() => openChat(id)}
              >
                <div className="avatar-wrap">
                  <Avatar p={p} size="large" />
                  {!db.read.includes(id) && <i />}
                </div>
                <div>
                  <b>{p.alias}</b>
                  <p>
                    {last?.text ||
                      (inv
                        ? `[技能交换] ${inv.give} ⇄ ${inv.take}`
                        : "打个招呼，开始交流吧")}
                  </p>
                </div>
                <small>{last?.time || "刚刚"}</small>
              </button>
            );
          })
        ) : (
          <Empty text="和喜欢的技能伙伴打个招呼吧" />
        )
      ) : (
        <>
          <div className="section-title">
            <h3>发出的邀约 · {db.invites.length}</h3>
            <small>暂无收到的邀约</small>
          </div>
          {[...db.invites].reverse().map((i) => (
            <InviteCard i={i} key={i.id} />
          ))}
        </>
      )}
    </div>
  );
}
function Chat({ id }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const p = person(id),
    [text, setText] = useState(""),
    end = useRef(null);
  const list = db.chats[id] || [],
    invites = db.invites.filter((i) => i.person === id);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [list.length, invites.length]);
  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    update((d) => ({
      ...d,
      chats: {
        ...d.chats,
        [id]: [
          ...(d.chats[id] || []),
          { id: uid(), from: "me", text: text.trim(), time: clock() },
        ],
      },
    }));
    setText("");
  };
  return (
    <>
      <Header
        title={p.alias}
        action={
          <button
            className="icon-button"
            aria-label="查看伙伴资料"
            onClick={() => go("person", id)}
          >
            <User size={20} />
          </button>
        }
      />
      <div className="chat-skills">
        <span>
          TA 能教 <b>{p.teach.map((s) => s.name).join(" / ")}</b>
        </span>
        <span>
          想学 <b>{p.learn.map((s) => s.name).join(" / ")}</b>
        </span>
      </div>
      <div className="chat-body">
        <div className="demo-note">本地 Demo · 下方带标记的回复为模拟内容</div>
        {list.map((m) => (
          <div key={m.id} className={"message " + m.from}>
            {m.from === "them" && <Avatar p={p} />}
            <div>
              <div className="bubble">{m.text}</div>
              <small>
                {m.demo ? "模拟演示 · " : ""}
                {m.time}
                {m.from === "me" && <CheckCheck size={12} />}
              </small>
            </div>
            {m.from === "me" && <Avatar p={db.profile} />}
          </div>
        ))}
        {invites.map((i) => (
          <InviteCard key={i.id} i={i} compact />
        ))}
        <button
          className="simulate-reply"
          onClick={() =>
            update((d) => ({
              ...d,
              chats: {
                ...d.chats,
                [id]: [
                  ...(d.chats[id] || []),
                  {
                    id: uid(),
                    from: "them",
                    text: "很高兴一起学习！可以先告诉我你的基础，我们一起安排一个小目标吧。",
                    time: clock(),
                    demo: true,
                  },
                ],
              },
            }))
          }
        >
          Demo：生成一条模拟回复
        </button>
        <div ref={end} />
      </div>
      <div className="chat-composer">
        <button className="chat-invite" onClick={() => invite(id)}>
          <Repeat2 size={15} />
          发起技能交换
        </button>
        <form onSubmit={send}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
            placeholder="聊聊你想学的技能…"
            aria-label="聊天消息"
          />
          <button aria-label="发送消息" disabled={!text.trim()}>
            <Send size={19} />
          </button>
        </form>
      </div>
    </>
  );
}
function InviteDetail({ id }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const i = db.invites.find((x) => x.id === id);
  if (!i) return <Empty />;
  return (
    <>
      <Header title="交换详情" />
      <div className="page-pad">
        <div className="invite-hero">
          <span className="sparkle-box">
            <Repeat2 size={29} />
          </span>
          <h2>
            {i.status === "已完成"
              ? "又解锁了一项新技能！"
              : i.status === "进行中"
                ? "一起学习的旅程开始了"
                : i.status === "待确认"
                  ? "期待一场双向奔赴"
                  : "期待下一次相遇"}
          </h2>
          <p>
            {i.status === "待确认"
              ? "邀约已保存，等待伙伴确认"
              : i.status === "进行中"
                ? "按照约定的小目标，慢慢进步吧"
                : "每一份热爱都值得被分享"}
          </p>
        </div>
        <InviteCard i={i} />
        {i.status === "待确认" && (
          <>
            <div className="info-card">
              <small>DEMO 演示操作</small>
              <h3>体验对方回应后的完整流程</h3>
              <p>以下操作仅改变当前浏览器的本地记录。</p>
              <Btn onClick={() => act(id, "接受")}>模拟对方接受邀约</Btn>
              <button className="text-button" onClick={() => act(id, "拒绝")}>
                模拟对方拒绝邀约
              </button>
            </div>
            <Btn secondary onClick={() => act(id, "撤回")}>
              撤回邀约
            </Btn>
          </>
        )}
        {i.status === "进行中" && (
          <>
            <div className="info-card">
              <h3>
                学习进度 <span className="purple-text">{i.progress}%</span>
              </h3>
              <input
                aria-label="学习进度"
                className="range"
                type="range"
                min="0"
                max="100"
                step="10"
                value={i.progress}
                onChange={(e) =>
                  update((d) => ({
                    ...d,
                    invites: d.invites.map((x) =>
                      x.id === id
                        ? { ...x, progress: Number(e.target.value) }
                        : x,
                    ),
                  }))
                }
              />
              <p>拖动更新进度，完成约定内容后留下学习收获。</p>
            </div>
            <Btn onClick={() => act(id, "完成")}>
              <Check size={18} />
              完成交换并评价
            </Btn>
          </>
        )}
        {i.status === "已完成" &&
          (i.rating ? (
            <div className="review-card">
              <div className="stars">
                {"★".repeat(i.rating)}
                {"☆".repeat(5 - i.rating)}
              </div>
              <h3>我的学习收获</h3>
              <p>{i.review || "完成了一次很棒的技能交换！"}</p>
            </div>
          ) : (
            <Btn onClick={() => setModal({ type: "review", id })}>
              为这次学习写评价
            </Btn>
          ))}
        <div className="spacer" />
        <Btn secondary onClick={() => openChat(i.person)}>
          <MessageCircle size={18} />
          进入聊天
        </Btn>
      </div>
    </>
  );
}
function SkillList({ kind }) {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  return (
    <>
      {db.profile[kind].map((s) => (
        <div className="my-skill" key={s.id}>
          <span className={"skill-symbol " + (kind === "learn" ? "warm" : "")}>
            {s.image ? (
              <img className="skill-thumb" src={s.image} alt={s.name} />
            ) : (
              React.createElement(catIcons[s.category] || BookOpen, {
                size: 21,
              })
            )}
          </span>
          <div>
            <b>{s.name}</b>
            <p className="skill-description">{s.intro}</p>
            <small>
              {s.level} · {s.mode === "均可" ? "线上 / 线下" : s.mode}
            </small>
          </div>
          <button
            aria-label={"编辑" + s.name}
            onClick={() => setModal({ type: "skill", kind, skill: s })}
          >
            <Edit3 size={16} />
          </button>
          <button
            aria-label={"删除" + s.name}
            onClick={() =>
              setModal({ type: "delete", kind, id: s.id, name: s.name })
            }
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </>
  );
}
function MyPage() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const completed = db.invites.filter((i) => i.status === "已完成"),
    ongoing = db.invites.filter((i) => i.status === "进行中");
  return (
    <div className="page-pad my-page">
      <div className="my-topbar">
        <span>MY SKILLMATE</span>
        <button
          className="icon-button"
          aria-label="个人设置"
          onClick={() => go("settings")}
        >
          <Settings size={21} />
        </button>
      </div>
      <div className="my-identity">
        <Avatar p={db.profile} size="xl" />
        <div>
          <h1>
            {db.profile.name}
            <span className="tiny-badge">技能分享者</span>
          </h1>
          <p>{db.profile.city} · 成长进行时</p>
        </div>
        <button
          className="icon-button"
          aria-label="编辑资料"
          onClick={() => setModal({ type: "profile" })}
        >
          <Edit3 size={19} />
        </button>
      </div>
      <p className="my-bio">{db.profile.bio}</p>
      <div className="growth-stats">
        <div>
          <b>{db.profile.teach.length + db.profile.learn.length}</b>
          <span>已发布技能</span>
        </div>
        <div>
          <b>{completed.length}</b>
          <span>已完成交换</span>
        </div>
        <div>
          <b>{ongoing.length}</b>
          <span>正在学习</span>
        </div>
      </div>
      <div className="section-title">
        <h3>我的技能档案</h3>
        <button onClick={() => setModal({ type: "publish" })}>
          添加技能 <Plus size={14} />
        </button>
      </div>
      <div className="skills-panel">
        <h4>
          <span className="dot purple-dot" />
          我能教的 <small>SHARE MY PASSION</small>
        </h4>
        <SkillList kind="teach" />
        {!db.profile.teach.length && (
          <p className="muted">分享你的第一项技能吧</p>
        )}
        <h4>
          <span className="dot orange-dot" />
          我想学的 <small>EXPLORE SOMETHING NEW</small>
        </h4>
        <SkillList kind="learn" />
        {!db.profile.learn.length && (
          <p className="muted">添加想学的技能，开始寻找搭子</p>
        )}
      </div>
      <div className="section-title">
        <h3>我的技能交换</h3>
        <Repeat2 size={17} />
      </div>
      <div className="segmented">
        {["待确认", "进行中", "已完成"].map((t) => (
          <button
            key={t}
            className={exchangeTab === t ? "active" : ""}
            onClick={() => setExchangeTab(t)}
          >
            {t} <small>{db.invites.filter((i) => i.status === t).length}</small>
          </button>
        ))}
      </div>
      {db.invites.filter((i) => i.status === exchangeTab).length ? (
        db.invites
          .filter((i) => i.status === exchangeTab)
          .map((i) => <InviteCard key={i.id} i={i} />)
      ) : (
        <Empty
          text={
            exchangeTab === "进行中"
              ? "新的学习旅程，等你开启"
              : "这里还没有交换记录"
          }
          action={
            <button className="text-button" onClick={() => navigate("发现")}>
              去发现技能伙伴 →
            </button>
          }
        />
      )}
      <div className="section-title">
        <h3>我的学习记录</h3>
        <small>{completed.length} 次成长</small>
      </div>
      {completed.map((i) => (
        <button
          className="learning-record"
          key={i.id}
          onClick={() => go("invite", i.id)}
        >
          <span>
            <GraduationCap size={22} />
          </span>
          <div>
            <b>
              {i.take} · 与{person(i.person).name}一起学习
            </b>
            <p>
              {i.rating
                ? "★".repeat(i.rating) + " " + (i.review || "完成学习")
                : "学习已完成，来记录收获吧"}
            </p>
          </div>
          <ChevronRight size={17} />
        </button>
      ))}
      <div className="section-title">
        <h3>我的技能笔记</h3>
        <button onClick={() => setModal({ type: "note" })}>
          写笔记 <Edit3 size={14} />
        </button>
      </div>
      <div className="masonry">
        {db.posts
          .filter((p) => p.author === "me")
          .map((p) => (
            <PostCard post={p} key={p.id} />
          ))}
      </div>
      {!db.posts.some((p) => p.author === "me") && (
        <p className="muted centered">记录一点热爱，分享给同频的人。</p>
      )}
      <button className="collection-link" onClick={() => go("saved")}>
        <Bookmark size={18} />
        我的收藏{" "}
        <span>
          {db.saved.length}
          <ChevronRight size={16} />
        </span>
      </button>
    </div>
  );
}
function SettingsPage() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  return (
    <>
      <Header title="个人设置" />
      <div className="page-pad">
        <div className="info-card">
          <Flower2 className="purple-text" size={32} />
          <h2>技友 SkillMate</h2>
          <p>以你所长，换我所爱。</p>
          <small>VERSION 1.0 · INTERACTIVE DEMO</small>
        </div>
        <h3 className="section-heading">关于这个演示</h3>
        <p className="post-body">
          所有伙伴、聊天和交换均为虚拟演示数据。匹配根据双方技能供需和学习形式在浏览器本地计算，不调用
          AI 或真实通讯服务。\n\n操作保存在当前浏览器的 localStorage
          中。图片仅在本地预览，外部示例照片来自
          Unsplash，需要网络加载。不同设备之间不会同步。
        </p>
        <Btn secondary onClick={() => setModal({ type: "reset" })}>
          <Trash2 size={18} />
          重置演示数据
        </Btn>
      </div>
    </>
  );
}
function Sheet() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement;
    const timer = setTimeout(
      () => document.querySelector(".sheet-close")?.focus(),
      60,
    );
    const handler = (e) => {
      if (e.key === "Escape") setModal(null);
      if (e.key === "Tab") {
        const list = [
          ...document.querySelectorAll(
            ".sheet button,.sheet input,.sheet textarea,.sheet select",
          ),
        ].filter((el) => !el.disabled && el.offsetParent !== null);
        const first = list[0],
          last = list.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [!!modal]);
  if (!modal) return null;
  return (
    <div className="modal-overlay" onClick={() => setModal(null)}>
      <section
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={modal.type === "publish" ? "发布菜单" : "编辑与操作"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />
        <button
          className="sheet-close icon-button"
          aria-label="关闭弹窗"
          onClick={() => setModal(null)}
        >
          <X size={20} />
        </button>
        <SheetBody
          key={
            modal.type +
            (modal.kind || "") +
            (modal.id || modal.skill?.id || "")
          }
        />
      </section>
    </div>
  );
}
function SheetBody() {
  const {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  } = useContext(Context);
  const [form, setForm] = useState(() => {
    if (modal.type === "invite") {
      const m = match(db.profile, person(modal.id));
      const tomorrow = new Date(Date.now() + 86400000);
      tomorrow.setHours(19, 0, 0, 0);
      return {
        give: m.give || "",
        take: m.take || "",
        mode: match(db.profile, person(modal.id), "线上").bidirectional
          ? "线上"
          : "线下",
        time: new Date(
          tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 16),
        note: "你好！我们的技能刚好互补，一起学习吧～",
      };
    }
    if (modal.type === "skill")
      return (
        modal.skill || {
          name: "",
          category: "摄影",
          level: modal.kind === "teach" ? "熟练" : "零基础",
          intro: "",
          mode: "均可",
          image: "",
        }
      );
    if (modal.type === "profile") return db.profile;
    if (modal.type === "review") return { rating: 5, review: "" };
    return { title: "", category: "摄影", body: "", tags: "", image: "" };
  });
  const [saving, setSaving] = useState(false);
  const change = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const field = (label, key, placeholder, textarea = false) => (
    <label className="form-field">
      {label}
      {textarea ? (
        <textarea
          required
          value={form[key]}
          placeholder={placeholder}
          onChange={(e) => change(key, e.target.value)}
          maxLength={key === "body" ? 5000 : 500}
        />
      ) : (
        <input
          required
          value={form[key]}
          placeholder={placeholder}
          onChange={(e) => change(key, e.target.value)}
          maxLength={key === "title" ? 70 : 40}
        />
      )}
    </label>
  );
  const select = (label, key, options) => (
    <label className="form-field">
      {label}
      <select value={form[key]} onChange={(e) => change(key, e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
  const upload = (
    <label className={"upload " + (form.image ? "has-image" : "")}>
      {form.image ? (
        <img src={form.image} alt="本地图片预览" />
      ) : (
        <>
          <ImagePlus size={27} />
          <b>添加一张展示图片</b>
          <small>仅在此浏览器保存 · 自动压缩</small>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        aria-label="上传图片"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (!file.type.startsWith("image/")) {
            notify("请选择图片文件");
            return;
          }
          setSaving(true);
          const img = new Image();
          const url = URL.createObjectURL(file);
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const scale = Math.min(1, 900 / img.width, 900 / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas
              .getContext("2d")
              .drawImage(img, 0, 0, canvas.width, canvas.height);
            change("image", canvas.toDataURL("image/jpeg", 0.72));
            URL.revokeObjectURL(url);
            setSaving(false);
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            setSaving(false);
            notify("图片读取失败，请换一张图片");
          };
          img.src = url;
        }}
      />
    </label>
  );
  if (modal.type === "publish")
    return (
      <>
        <div className="eyebrow">SHARE & GROW</div>
        <h2>
          你的擅长，值得被看见<span className="purple-text"> ✦</span>
        </h2>
        <p className="muted">分享一点热爱，收获更多可能。</p>
        {[
          {
            kind: "teach",
            icon: GraduationCap,
            title: "发布我能教的",
            sub: "把你的一技之长，分享给需要的人",
            color: "purple",
          },
          {
            kind: "learn",
            icon: BookOpen,
            title: "发布我想学的",
            sub: "种下一颗好奇心，找到陪伴的搭子",
            color: "peach",
          },
          {
            kind: "note",
            icon: Edit3,
            title: "分享技能笔记",
            sub: "记录灵感，让成长有迹可循",
            color: "green",
          },
        ].map((o) => (
          <button
            className="publish-option"
            key={o.kind}
            onClick={() =>
              setModal({
                type: o.kind === "note" ? "note" : "skill",
                kind: o.kind,
              })
            }
          >
            <span className={o.color}>
              <o.icon size={25} />
            </span>
            <div>
              <b>{o.title}</b>
              <p>{o.sub}</p>
            </div>
            <ArrowUpRight size={20} />
          </button>
        ))}
        <div className="demo-note">每个人，都有值得分享的一技之长</div>
      </>
    );
  if (modal.type === "filter")
    return (
      <>
        <h2>找到更合拍的伙伴</h2>
        <h4>学习方式</h4>
        <div className="pills">
          {["全部", "线上", "线下"].map((v) => (
            <button
              key={v}
              className={mode === v ? "active" : ""}
              onClick={() => setMode(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <h4>技能互补</h4>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={mutual}
            onChange={(e) => setMutual(e.target.checked)}
          />
          只看双向契合的伙伴
        </label>
        <Btn onClick={() => setModal(null)}>查看匹配结果</Btn>
      </>
    );
  if (modal.type === "delete" || modal.type === "reset")
    return (
      <>
        <h2>
          {modal.type === "reset"
            ? "重新开始这段体验？"
            : `删除「${modal.name}」？`}
        </h2>
        <p className="muted">
          {modal.type === "reset"
            ? "将清除本机新增内容、聊天和学习记录，并恢复初始演示数据。"
            : "删除后会立即重新计算技能匹配，已有交换记录仍会保留。"}
        </p>
        <Btn
          onClick={() => {
            if (modal.type === "reset") {
              setDb(initialState());
              navigate("首页");
              setQuery("");
              setCategory("全部");
              setMode("全部");
              setMutual(false);
            } else
              update((d) => ({
                ...d,
                profile: {
                  ...d.profile,
                  [modal.kind]: d.profile[modal.kind].filter(
                    (s) => s.id !== modal.id,
                  ),
                },
              }));
            setModal(null);
            notify(
              modal.type === "reset"
                ? "已恢复初始演示数据"
                : "技能已删除，匹配已更新",
            );
          }}
        >
          {modal.type === "reset" ? "确认重置" : "确认删除"}
        </Btn>
      </>
    );
  if (modal.type === "invite") {
    const p = person(modal.id);
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (new Date(form.time) <= new Date()) {
            notify("请选择未来的交流时间");
            return;
          }
          const valid =
            db.profile.teach.some(
              (s) => s.name.toLowerCase() === form.give.toLowerCase(),
            ) &&
            p.learn.some(
              (s) => s.name.toLowerCase() === form.give.toLowerCase(),
            ) &&
            p.teach.some(
              (s) => s.name.toLowerCase() === form.take.toLowerCase(),
            ) &&
            db.profile.learn.some(
              (s) => s.name.toLowerCase() === form.take.toLowerCase(),
            );
          if (!valid) {
            notify("请选择双方互补的技能");
            return;
          }
          const relevant = [
            db.profile.teach.find(
              (s) => s.name.toLowerCase() === form.give.toLowerCase(),
            ),
            p.learn.find(
              (s) => s.name.toLowerCase() === form.give.toLowerCase(),
            ),
            p.teach.find(
              (s) => s.name.toLowerCase() === form.take.toLowerCase(),
            ),
            db.profile.learn.find(
              (s) => s.name.toLowerCase() === form.take.toLowerCase(),
            ),
          ];
          if (relevant.some((s) => s.mode !== "均可" && s.mode !== form.mode)) {
            notify("所选技能不支持这种学习方式，请调整");
            return;
          }
          const id = uid();
          update((d) => ({
            ...d,
            invites: [
              ...d.invites,
              {
                ...form,
                id,
                person: modal.id,
                status: "待确认",
                progress: 0,
                created: Date.now(),
              },
            ],
            chats: { ...d.chats, [modal.id]: d.chats[modal.id] || [] },
          }));
          setModal(null);
          openChat(modal.id);
          notify("邀约已发送，期待一起成长！");
        }}
      >
        <div className="eyebrow">LET’S EXCHANGE</div>
        <h2>和{p.name}，交换一份热爱</h2>
        <p className="muted">约定一个小目标，让学习真正发生。</p>
        {select(
          "我可以教 TA",
          "give",
          db.profile.teach
            .filter((s) =>
              p.learn.some(
                (x) => x.name.toLowerCase() === s.name.toLowerCase(),
              ),
            )
            .map((s) => s.name),
        )}
        {select(
          "我希望向 TA 学习",
          "take",
          p.teach
            .filter((s) =>
              db.profile.learn.some(
                (x) => x.name.toLowerCase() === s.name.toLowerCase(),
              ),
            )
            .map((s) => s.name),
        )}
        {select("学习方式", "mode", ["线上", "线下"])}
        <label className="form-field">
          期望交流时间
          <input
            type="datetime-local"
            required
            value={form.time}
            onChange={(e) => change("time", e.target.value)}
          />
        </label>
        {field("说一句邀约留言", "note", "你好，一起交流吧！", true)}
        <Btn type="submit">
          <Send size={17} />
          发送交换邀约
        </Btn>
        <div className="demo-note">仅创建本地演示邀约，不会发送给真实用户</div>
      </form>
    );
  }
  if (modal.type === "skill")
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim() || !form.intro.trim()) return;
          const name = form.name.trim();
          if (
            db.profile[modal.kind].some(
              (s) =>
                s.id !== modal.skill?.id &&
                s.name.toLowerCase() === name.toLowerCase(),
            )
          ) {
            notify("这个技能已在档案中，可以直接编辑");
            return;
          }
          update((d) => ({
            ...d,
            profile: {
              ...d.profile,
              [modal.kind]: modal.skill
                ? d.profile[modal.kind].map((s) =>
                    s.id === modal.skill.id ? { ...form, name } : s,
                  )
                : [...d.profile[modal.kind], { ...form, name, id: uid() }],
            },
          }));
          setModal(null);
          notify("技能档案已更新，新的匹配已为你准备好");
        }}
      >
        <div className="eyebrow">MY SKILL PROFILE</div>
        <h2>
          {modal.skill
            ? "编辑技能"
            : modal.kind === "teach"
              ? "分享我的一技之长"
              : "解锁一个新技能"}
        </h2>
        {field("技能名称", "name", "例如：摄影、Python、吉他")}
        {select("技能分类", "category", categories.slice(1))}
        {select(
          modal.kind === "teach" ? "熟练程度" : "当前基础",
          "level",
          modal.kind === "teach"
            ? ["熟练", "精通", "入门"]
            : ["零基础", "入门", "进阶"],
        )}
        {field(
          modal.kind === "teach" ? "技能介绍与可教授内容" : "我的学习目标",
          "intro",
          modal.kind === "teach"
            ? "你可以带伙伴学会什么？"
            : "你希望达到什么小目标？",
          true,
        )}
        {select("期望学习方式", "mode", ["均可", "线上", "线下"])}
        {modal.kind === "teach" && upload}
        <Btn type="submit" disabled={saving}>
          {saving ? "图片处理中…" : "保存技能，寻找新伙伴"}
        </Btn>
      </form>
    );
  if (modal.type === "note")
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.title.trim() || !form.body.trim()) return;
          const id = uid();
          update((d) => ({
            ...d,
            posts: [
              {
                ...form,
                id,
                author: "me",
                title: form.title.trim(),
                image: form.image || images.desk,
                tags: [
                  ...new Set([
                    form.category,
                    ...form.tags.split(/[,，\s]+/).filter(Boolean),
                  ]),
                ],
                likes: 0,
                comments: [],
                created: Date.now(),
              },
              ...d.posts,
            ],
          }));
          setModal(null);
          navigate("首页");
          go("post", id);
          notify("技能笔记已发布！");
        }}
      >
        <div className="eyebrow">LITTLE NOTES, BIG IDEAS</div>
        <h2>记下今天的小小发现</h2>
        {upload}
        {field("笔记标题", "title", "给你的热爱起个名字")}
        {select("技能分类", "category", categories.slice(1))}
        {field("正文内容", "body", "分享你的心得、经验或学习过程…", true)}
        <label className="form-field">
          技能标签
          <input
            value={form.tags}
            onChange={(e) => change("tags", e.target.value)}
            placeholder="用空格分隔，如：摄影 周末日常"
            maxLength={100}
          />
        </label>
        <Btn type="submit" disabled={saving}>
          {saving ? "图片处理中…" : "发布技能笔记"}
        </Btn>
      </form>
    );
  if (modal.type === "profile")
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim() || !form.city.trim()) return;
          update((d) => ({
            ...d,
            profile: {
              ...d.profile,
              name: form.name.trim(),
              bio: form.bio.trim(),
              city: form.city.trim(),
            },
          }));
          setModal(null);
          notify("个人资料已保存");
        }}
      >
        <h2>让大家认识你</h2>
        {field("昵称", "name", "你的昵称")}
        {field("个人签名", "bio", "写一句关于你的话", true)}
        {field("所在城市", "city", "例如：上海")}
        <Btn type="submit">保存资料</Btn>
      </form>
    );
  if (modal.type === "review")
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update((d) => ({
            ...d,
            invites: d.invites.map((i) =>
              i.id === modal.id
                ? { ...i, rating: form.rating, review: form.review.trim() }
                : i,
            ),
          }));
          setModal(null);
          notify("评价已保存，成长值得被记录");
        }}
      >
        <div className="review-illustration">
          <GraduationCap size={37} />
          <Sparkles size={20} />
        </div>
        <h2 className="centered">为这次学习，留下一点星光</h2>
        <p className="muted centered">
          每一份真诚的反馈，都是下一次成长的起点。
        </p>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              aria-label={n + "星"}
              onClick={() => change("rating", n)}
            >
              <Star
                size={34}
                fill={form.rating >= n ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
        {field(
          "我的学习收获",
          "review",
          "学会了什么？有什么想对伙伴说的？",
          true,
        )}
        <Btn type="submit">提交评价，记录成长</Btn>
      </form>
    );
  return null;
}

function App() {
  const [db, setDb] = useState(read),
    [tab, setTab] = useState("首页"),
    [stack, setStack] = useState([]),
    [modal, setModal] = useState(null),
    [toast, setToast] = useState(""),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("全部"),
    [mode, setMode] = useState("全部"),
    [mutual, setMutual] = useState(false),
    [msgTab, setMsgTab] = useState("聊天"),
    [exchangeTab, setExchangeTab] = useState("进行中");
  const scroller = useRef(null),
    touchStart = useRef(null);
  const page = stack.at(-1);
  const person = (id) =>
    id === "me"
      ? { ...db.profile, id: "me", alias: db.profile.name }
      : people.find((x) => x.id === id);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
    } catch {
      setToast("本地存储空间不足，请减少图片后重试");
    }
  }, [db]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3200);
      return () => clearTimeout(t);
    }
  }, [toast]);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [tab, stack.length, page?.id]);
  const update = (fn) => setDb((prev) => fn(prev));
  const notify = setToast;
  const go = (type, id) => setStack((s) => [...s, { type, id }]);
  const back = () => setStack((s) => s.slice(0, -1));
  const navigate = (t) => {
    setTab(t);
    setStack([]);
  };
  const openChat = (id) => {
    update((d) => ({
      ...d,
      chats: { ...d.chats, [id]: d.chats[id] || [] },
      read: [...new Set([...d.read, id])],
    }));
    go("chat", id);
  };
  const toggle = (field, id) =>
    update((d) => ({
      ...d,
      [field]: d[field].includes(id)
        ? d[field].filter((x) => x !== id)
        : [...d[field], id],
    }));
  const discover = (c) => {
    setCategory(c);
    setQuery("");
    setMutual(false);
    navigate("发现");
  };
  const invite = (id) => {
    const m = match(db.profile, person(id));
    if (!m.bidirectional) {
      notify("目前尚无双向互补技能，先私信聊聊吧");
      openChat(id);
      return;
    }
    setModal({ type: "invite", id });
  };
  const act = (id, action) => {
    update((d) => ({
      ...d,
      invites: d.invites.map((i) =>
        i.id === id ? changeInvite(i, action) : i,
      ),
    }));
    notify(
      action === "接受"
        ? "Demo 模拟：对方已接受邀约"
        : action === "拒绝"
          ? "Demo 模拟：对方已拒绝邀约"
          : `已${action}交换`,
    );
    if (action === "完成") setModal({ type: "review", id });
  };
  const context = {
    db,
    tab,
    modal,
    query,
    category,
    mode,
    mutual,
    msgTab,
    exchangeTab,
    person,
    update,
    notify,
    go,
    back,
    navigate,
    openChat,
    toggle,
    discover,
    invite,
    act,
    setModal,
    setQuery,
    setCategory,
    setMode,
    setMutual,
    setMsgTab,
    setExchangeTab,
    setDb,
  };
  let content = page ? (
    page.type === "person" ? (
      <PersonPage id={page.id} />
    ) : page.type === "post" ? (
      <PostDetail key={page.id} id={page.id} />
    ) : page.type === "chat" ? (
      <Chat key={page.id} id={page.id} />
    ) : page.type === "invite" ? (
      <InviteDetail id={page.id} />
    ) : page.type === "settings" ? (
      <SettingsPage />
    ) : page.type === "saved" ? (
      <>
        <Header title="我的收藏" />
        <div className="page-pad masonry">
          {db.posts
            .filter((p) => db.saved.includes(p.id))
            .map((p) => (
              <PostCard post={p} key={p.id} />
            ))}
        </div>
        {!db.saved.length && <Empty text="把喜欢的灵感收进这里" />}
      </>
    ) : (
      <MyPage />
    )
  ) : tab === "首页" ? (
    <HomePage />
  ) : tab === "发现" ? (
    <Discover />
  ) : tab === "消息" ? (
    <Messages />
  ) : (
    <MyPage />
  );
  return (
    <Context.Provider value={context}>
      <div className="desktop-stage">
        <div className="desktop-caption">
          <span className="desktop-logomark">
            <Repeat2 size={25} />
          </span>
          <b>SkillMate</b>
          <span>让热爱，彼此连接。</span>
        </div>
        <div className="phone">
          <div className="status-bar">
            <b>9:41</b>
            <span className="dynamic-island" />
            <div>
              <Signal size={14} />
              <Wifi size={14} />
              <BatteryFull size={19} />
            </div>
          </div>
          <main
            inert={modal ? true : undefined}
            onTouchStart={(e) => {
              if (
                e.target.closest("input,textarea,select,.pills,.category-icons")
              )
                return;
              touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
              };
            }}
            onTouchEnd={(e) => {
              const a = touchStart.current;
              touchStart.current = null;
              if (!a || page || modal) return;
              const dx = e.changedTouches[0].clientX - a.x,
                dy = e.changedTouches[0].clientY - a.y;
              if (Math.abs(dx) > 90 && Math.abs(dy) < 45) {
                const tabs = ["首页", "发现", "消息", "我的"];
                const i = tabs.indexOf(tab) + (dx < 0 ? 1 : -1);
                if (tabs[i]) navigate(tabs[i]);
              }
            }}
            ref={scroller}
            className={
              "app-scroll " +
              (page ? "subpage " : "") +
              (page?.type === "chat" ? "chat-scroll" : "")
            }
            key={tab + "-" + (page?.type || "") + "-" + (page?.id || "")}
          >
            {content}
          </main>
          {!page && (
            <nav
              inert={modal ? true : undefined}
              className="tabbar"
              aria-label="主导航"
            >
              {[
                { name: "首页", icon: Home },
                { name: "发现", icon: Compass },
                { name: "发布", icon: Plus },
                { name: "消息", icon: MessageCircle },
                { name: "我的", icon: User },
              ].map(({ name, icon: Icon }) => (
                <button
                  className={
                    (tab === name ? "active " : "") +
                    (name === "发布" ? "publish-tab" : "")
                  }
                  key={name}
                  onClick={() =>
                    name === "发布"
                      ? setModal({ type: "publish" })
                      : navigate(name)
                  }
                >
                  <span>
                    <Icon size={22} strokeWidth={tab === name ? 2.4 : 1.7} />
                    {name === "消息" && !db.read.includes("chen") && <i />}
                  </span>
                  <small>{name}</small>
                </button>
              ))}
            </nav>
          )}
          <div className="home-indicator" />
          <Sheet />
          {toast && (
            <div role="status" className="toast">
              <Check size={16} />
              {toast}
            </div>
          )}
        </div>
        <div className="desktop-foot">
          <span />
          交互演示 · 本地数据保存<span className="foot-divider">/</span>DESIGNED
          FOR SHARING
        </div>
      </div>
    </Context.Provider>
  );
}
createRoot(document.getElementById("root")).render(<App />);
