import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

export const getPage = async (pageId) => {
  const meta = await notion.pages.retrieve({
    page_id: pageId,
  });

  const { results: content } = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return {
    meta,
    content,
  };
};

export const getDatabaseEntries = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return results || [];
};
