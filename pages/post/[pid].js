import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import NotionRenderer from "../../components/NotionRenderer";
import { getDatabaseEntries, getPage } from "../../utils/notion";

const Post = ({ meta, content }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box p={10} textAlign="center">
        Fetching Post...
      </Box>
    );
  }

  const nameType = meta.properties.Name.type;
  const pageTitle = meta.properties.Name[nameType]
    .map((block) => block.plain_text)
    .join(" ");

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

export async function getStaticPaths() {
  const entries = await getDatabaseEntries();

  return {
    paths: entries.map((entry) => ({
      params: {
        pid: entry.id,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  try {
    if (params.pid) {
      const pageInfo = await getPage(params.pid);

      return {
        props: {
          ...pageInfo,
        },
        revalidate: 1,
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    notFound: true,
  };
}
