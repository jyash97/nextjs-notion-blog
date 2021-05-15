import React from "react";
import { Box } from "@chakra-ui/react";
import NotionRenderer from "./NotionRenderer";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  if (blog.object === "page") {
    return (
      <Link href={`/post/${blog.id}`}>
        <Box
          p="5"
          borderWidth="1px"
          borderRadius="sm"
          overflow="hidden"
          boxShadow="sm"
          borderColor="gray.200"
          my="4"
          cursor="pointer"
          _hover={{
            boxShadow: "md",
          }}
        >
          <NotionRenderer
            content={blog.properties.Name}
            wrapperProps={{
              color: "gray.800",
              fontSize: "xl",
              fontWeight: "bold",
            }}
          />
          <NotionRenderer
            wrapperProps={{
              color: "gray.500",
              fontSize: "sm",
            }}
            content={blog.properties.Created}
          />
          <NotionRenderer
            content={blog.properties.description}
            wrapperProps={{
              color: "gray.600",
              fontSize: "md",
              mt: 3,
            }}
          />
        </Box>
      </Link>
    );
  }

  return null;
};

export default BlogCard;
