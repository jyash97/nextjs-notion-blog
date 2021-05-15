import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import BlogCard from "../components/BlogCard";

export default function Home({ results }) {
  return (
    <>
      <Head>
        <title>Notion Starter blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box as="header" p="10" textAlign="center" mb="10" bg="blue.50">
          <Text
            bgGradient="linear(to-l, cyan.600, purple.600)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            Welcome to Notion Starter Blog
          </Text>
        </Box>
        <Box maxW="container.md" mx="auto">
          {results.map((result) => (
            <BlogCard blog={result} key={result.id} />
          ))}
        </Box>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { Client } = await import("@notionhq/client");
  const notion = new Client({
    auth: process.env.NOTION_AUTH_KEY,
  });

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return {
    props: {
      results: results || [],
    },
  };
}
