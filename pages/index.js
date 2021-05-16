import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import BlogCard from "../components/BlogCard";
import { getDatabaseEntries } from "../utils/notion";

export default function Home({ blogs }) {
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
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </Box>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const entries = await getDatabaseEntries();

  return {
    props: {
      blogs: entries,
    },
    revalidate: 15,
  };
}
