import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  people,
  match,
  changeInvite,
  skill,
} from "../src/data.js";
test("双向供需互补，学习匹配不冒充双向匹配", () => {
  const me = initialState().profile;
  assert.deepEqual(match(me, people[0]), {
    take: "摄影",
    give: "Python",
    bidirectional: true,
    score: 2,
  });
  assert.equal(match(me, people[1]).give, "Excel");
  assert.equal(match(me, people[6]).score, 1);
  assert.equal(match(me, people[6]).bidirectional, false);
  assert.equal(match(me, people[2]).score, 0);
});
test("编辑技能、学习方式与删除后立即重新计算", () => {
  const me = initialState().profile;
  me.learn = [skill("英语", "语言")];
  assert.equal(match(me, people[2]).bidirectional, true);
  assert.equal(match(me, people[0]).bidirectional, false);
  assert.equal(match(me, people[2], "线下").score, 0);
  me.teach = [];
  assert.equal(match(me, people[2]).score, 1);
  me.learn = [];
  assert.equal(match(me, people[2]).score, 0);
});
test("规范化名称匹配，支持 Python 大小写", () => {
  const me = initialState().profile;
  me.teach[0].name = " python ";
  assert.equal(match(me, people[0]).bidirectional, true);
});
test("邀请状态遵守单向状态机，完成后不可撤回或再次接受", () => {
  let i = { status: "待确认", progress: 0 };
  assert.equal(changeInvite(i, "完成"), i);
  i = changeInvite(i, "接受");
  assert.equal(i.status, "进行中");
  assert.equal(changeInvite(i, "撤回"), i);
  i = changeInvite(i, "完成");
  assert.equal(i.status, "已完成");
  assert.equal(i.progress, 100);
  assert.equal(changeInvite(i, "接受"), i);
  assert.equal(changeInvite({ status: "待确认" }, "撤回").status, "已撤回");
  assert.equal(changeInvite({ status: "待确认" }, "拒绝").status, "已拒绝");
});
