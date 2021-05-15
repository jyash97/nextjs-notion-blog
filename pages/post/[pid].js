import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import Link from "next/link";

import NotionRenderer from "../../components/NotionRenderer";

const Post = ({ meta, content }) => {
  if (meta?.status === 404) {
    return (
      <Box maxW="container.md" mx="auto">
        <Text fontSize="3xl" fontWeight="bold" color="red.500">
          Post Not available
        </Text>
      </Box>
    );
  }

  const nameType = meta.properties.Name.type;
  const pageTitle = meta.properties.Name[nameType].map(block => block.plain_text).join(" ");

  return (
    <>
      <Head>
        <title>Blog | {pageTitle}</title>
      </Head>

      <Box maxW="container.md" mx="auto" p="5">
        <NotionRenderer content={meta.properties.Name} />
        <NotionRenderer
          content={meta.properties.Created}
          wrapperProps={{
            mb: 10,
          }}
        />
        {content.map((block) => (
          <NotionRenderer content={block} key={block.id} />
        ))}

        <Box color="gray.300" as={Link} href="/">
          Back to home
        </Box>
      </Box>
    </>
  );
};

export default Post;

export async function getServerSideProps(context) {
  const { params } = context;
  if (params.pid) {
    const { Client } = await import("@notionhq/client");
    const notion = new Client({
      auth: process.env.NOTION_AUTH_KEY,
    });

    // Fetch page meta info
    const page = await notion.pages.retrieve({
      page_id: params.pid,
    });

    // Fetch page content
    const { results: content } = await notion.blocks.children.list({
      block_id: params.pid,
      page_size: 100,
    });

    return {
      props: {
        meta: page,
        content,
      },
    };
  }
  return {
    props: {
      meta: {
        status: 404,
      },
    },
  };
}
