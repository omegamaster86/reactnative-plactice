import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const list = queryGeneric({
  args: v.object({}),
  handler: async (ctx) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const add = mutationGeneric({
  args: v.object({ text: v.string() }),
  handler: async (ctx, { text }) => {
    const t = text.trim();
    if (!t) return;
    await ctx.db.insert("tasks", {
      text: t,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

export const toggle = mutationGeneric({
  args: v.object({ id: v.id("tasks"), completed: v.boolean() }),
  handler: async (ctx, { id, completed }) => {
    await ctx.db.patch(id, { completed });
  },
});

export const remove = mutationGeneric({
  args: v.object({ id: v.id("tasks") }),
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const edit = mutationGeneric({
  args: v.object({ id: v.id("tasks"), text: v.string() }),
  handler: async (ctx, { id, text }) => {
    const t = text.trim();
    if (!t) return;
    await ctx.db.patch(id, { text: t });
  },
});

