export const photo = (id, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
export const images = {
  camera: photo("photo-1452780212940-6f5c0d14d848"),
  coast: photo("photo-1476514525535-07fb3b4ae5f1"),
  guitar: photo("photo-1510915361894-db8b60106cb1"),
  code: photo("photo-1498050108023-c5249f4df085"),
  design: photo("photo-1455390582262-044cdead277a"),
  coffee: photo("photo-1495474472287-4d71bcdd2085"),
  run: photo("photo-1476480862126-209bfaa8edc8"),
  city: photo("photo-1519608487953-e999c86e7455"),
  desk: photo("photo-1513542789411-b6a5d4f31634"),
  book: photo("photo-1481627834876-b7833e8f5570"),
  yoga: photo("photo-1544367567-0f2fcb009e0b"),
  film: photo("photo-1485846234645-a62644f84728"),
};
const avatarIds = [
  "photo-1534528741775-53994a69daeb",
  "photo-1500648767791-00dcc994a43e",
  "photo-1524504388940-b1c1722653e1",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1524250502761-1ac6f2e30d43",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1524504388940-b1c1722653e1",
  "photo-1534528741775-53994a69daeb",
];
export const categories = [
  "全部",
  "摄影",
  "编程",
  "音乐",
  "语言",
  "设计",
  "运动",
  "效率",
];
export const skill = (name, category, intro = "", mode = "均可") => ({
  id: crypto.randomUUID(),
  name,
  category,
  intro: intro || `一起从基础开始，用实际练习掌握${name}。`,
  level: "熟练",
  mode,
});
export const people = [
  {
    id: "chen",
    name: "小陈",
    alias: "小陈同学",
    bio: "用镜头收集生活里的小确幸 📷",
    city: "上海",
    teach: [
      skill(
        "摄影",
        "摄影",
        "从构图、光线到调色，陪你拍出自己的第一组生活照片。",
      ),
    ],
    learn: [skill("Python", "编程")],
    tags: ["周末拍照", "城市漫游"],
    cover: images.coast,
  },
  {
    id: "zhou",
    name: "小周",
    alias: "小周不跑调",
    bio: "吉他和日落，都想分享给你。",
    city: "上海",
    teach: [skill("吉他", "音乐")],
    learn: [skill("Excel", "效率")],
    tags: ["民谣", "音乐现场"],
    cover: images.guitar,
  },
  {
    id: "wu",
    name: "小吴",
    alias: "Wendy 小吴",
    bio: "把英语变成日常，而不是考试。",
    city: "杭州",
    teach: [skill("英语", "语言", "用生活话题练口语，告别不敢开口。", "线上")],
    learn: [skill("Python", "编程")],
    tags: ["英语角", "旅行"],
    cover: images.book,
  },
  {
    id: "yu",
    name: "阿予",
    alias: "阿予的设计日常",
    bio: "给日常加一点好看的颜色。",
    city: "上海",
    teach: [skill("设计", "设计")],
    learn: [skill("摄影", "摄影")],
    tags: ["平面设计", "手帐"],
    cover: images.design,
  },
  {
    id: "lin",
    name: "林野",
    alias: "林野跑跑",
    bio: "下班后，一起去公园充电。",
    city: "北京",
    teach: [skill("跑步", "运动", "", "线下")],
    learn: [skill("Excel", "效率")],
    tags: ["户外", "慢跑"],
    cover: images.run,
  },
  {
    id: "an",
    name: "阿安",
    alias: "阿安剪片中",
    bio: "普通生活也可以剪成电影。",
    city: "深圳",
    teach: [skill("视频剪辑", "设计", "", "线上")],
    learn: [skill("Python", "编程")],
    tags: ["Vlog", "电影"],
    cover: images.film,
  },
  {
    id: "tang",
    name: "小棠",
    alias: "小棠看世界",
    bio: "一起练习观察，一起发现美。",
    city: "成都",
    teach: [skill("摄影", "摄影")],
    learn: [skill("英语", "语言")],
    tags: ["胶片", "咖啡"],
    cover: images.camera,
  },
  {
    id: "mi",
    name: "米粒",
    alias: "米粒慢生活",
    bio: "舒展身体，也舒展心情。",
    city: "上海",
    teach: [skill("瑜伽", "运动")],
    learn: [skill("Excel", "效率")],
    tags: ["瑜伽", "自然"],
    cover: images.yoga,
  },
].map((p, i) => ({ ...p, avatar: photo(avatarIds[i], 120) }));
const titles = [
  ["chen", "零基础摄影入门｜把普通日子拍成电影", "摄影", "coast", 128],
  ["zhou", "学会这 4 个和弦，就能弹唱喜欢的歌 🎸", "音乐", "guitar", 96],
  ["an", "Python 入门：我的第一个小项目", "编程", "code", 82],
  ["yu", "不懂设计也能做出好看的手帐", "设计", "desk", 215],
  ["tang", "周末带相机出门，收集一点快乐", "摄影", "camera", 163],
  ["wu", "每天 15 分钟，把英语聊进生活", "语言", "coffee", 74],
  ["lin", "第一次跑 5 公里，比想象中简单", "运动", "run", 58],
  ["yu", "配色灵感，藏在你路过的每一天", "设计", "design", 187],
  ["an", "手机剪辑，让旅行回忆动起来", "设计", "film", 101],
  ["mi", "下班后的 10 分钟舒展计划", "运动", "yoga", 67],
  ["zhou", "一把吉他，一整个惬意的下午", "音乐", "guitar", 89],
  ["wu", "Excel 实用技巧，告别重复操作", "效率", "book", 112],
];
export const seedPosts = titles.map(
  ([author, title, category, img, likes], i) => ({
    id: "post" + i,
    author,
    title,
    category,
    image: images[img],
    likes,
    body: `分享一点关于${category}的小经验。\n\n不需要一开始就准备好所有装备，最重要的是迈出第一步。先选择一个自己喜欢的小目标，花 20 分钟认真练习，再记录今天的新发现。\n\n我把基础知识和练习方法都整理好了。如果你也感兴趣，我们可以一起学习，交换彼此的技能！`,
    tags: [category, "技能交换", "一起成长"],
    comments:
      i === 0
        ? [{ name: "小棠", text: "光线真的太温柔了，想一起出去拍照！" }]
        : [],
  }),
);
export function initialState() {
  return {
    profile: {
      name: "小林",
      bio: "写代码，也想记录生活。一起解锁新技能 ✨",
      city: "上海",
      avatar: photo("photo-1472099645785-5658abf4ff4e", 120),
      teach: [skill("Python", "编程"), skill("Excel", "效率")],
      learn: [skill("摄影", "摄影"), skill("吉他", "音乐")],
    },
    posts: seedPosts,
    liked: [],
    saved: [],
    following: [],
    chats: {
      chen: [
        {
          id: "welcome",
          from: "them",
          text: "嗨，欢迎来到技友！我可以教你摄影，也想学一点 Python，一起交流吧～",
          time: "10:24",
          demo: true,
        },
      ],
    },
    invites: [
      {
        id: "sample-complete",
        person: "wu",
        give: "Python",
        take: "英语",
        mode: "线上",
        time: "2026-09-12T19:00",
        note: "一起练习入门知识",
        status: "已完成",
        progress: 100,
        rating: 5,
        review: "从不敢开口到可以自我介绍，谢谢你的耐心陪伴！",
        created: 1,
      },
    ],
    read: [],
    settings: {},
  };
}
const norm = (s) => s.trim().toLowerCase();
export function match(profile, person, mode = "全部") {
  if (mode === "全部") {
    const online = match(profile, person, "线上"),
      offline = match(profile, person, "线下");
    return offline.score > online.score ? offline : online;
  }
  const available = (s) =>
    mode === "全部" || s.mode === "均可" || s.mode === mode;
  const take = person.teach.find(
    (s) =>
      available(s) &&
      profile.learn.some((x) => norm(x.name) === norm(s.name) && available(x)),
  );
  const give = profile.teach.find(
    (s) =>
      available(s) &&
      person.learn.some((x) => norm(x.name) === norm(s.name) && available(x)),
  );
  return {
    take: take?.name,
    give: give?.name,
    bidirectional: !!(take && give),
    score: take && give ? 2 : take ? 1 : 0,
  };
}
export function changeInvite(invite, action) {
  const transitions = {
    接受: ["待确认", "进行中"],
    拒绝: ["待确认", "已拒绝"],
    撤回: ["待确认", "已撤回"],
    完成: ["进行中", "已完成"],
  };
  const rule = transitions[action];
  if (!rule || invite.status !== rule[0]) return invite;
  return {
    ...invite,
    status: rule[1],
    ...(action === "完成" ? { progress: 100 } : {}),
  };
}
