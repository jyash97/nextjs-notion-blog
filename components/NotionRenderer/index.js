import React from "react";
import { Box } from "@chakra-ui/react";

const componentTypes = {
  title: "h1",
  rich_text: "p",
  paragraph: "p",
  heading_1: "h1",
  heading_2: "h2",
  heading_3: "h3",
};

const getStyleProps = (type) => {
  switch (type) {
    case "heading_1": {
      return {
        color: "gray.700",
        fontSize: "3xl",
        fontWeight: "extrabold",
        mb: 4
      };
    }
    case "heading_2": {
      return {
        color: "gray.700",
        fontSize: "2xl",
        fontWeight: "bold",
        mb: 3
      };
    }
    case "heading_3": {
      return {
        color: "gray.700",
        fontSize: "xl",
        fontWeight: "bold",
      };
    }
    case "paragraph": {
      return {
        color: "gray.600",
        mb: 3
      };
    }
    case "title": {
      return {
        color: "blue.600",
        fontSize: "4xl",
        fontWeight: "extrabold",
      };
    }
    case "created_time": {
      return {
        color: "gray.400",
      };
    }
    default:
      return {};
  }
};

const Annotations = ({ text, annotations }) => {
  const styles = {
    fontWeight: annotations.bold ? "bold" : "inherit",
    borderBottom: annotations.underline ? "1px solid" : "none",
    fontStyle: annotations.italic ? "italic" : "none",
    textDecoration: annotations.strikethrough ? "line-through" : "",
    color: annotations.color === "default" ? "" : annotations.color,
  };

  if (annotations.code) {
    return <pre style={styles}>{text.content}</pre>;
  }

  if (text.link) {
    return (
      <Box as="a" textDecoration="underline" color="blue.400" target="_blank" style={styles} href={text.link.url}>
        {text.content}
      </Box>
    );
  }

  return <span style={styles}>{text.content}</span>;
};

// TODO: Create a better reusable component. Note: Only supports text component.
const NotionRenderer = ({ content, wrapperProps = {} }) => {
  const { type } = content;
  const Component = componentTypes[type];

  switch (type) {
    case "rich_text":
    case "paragraph":
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "rich_text":
    case "rich_text":
    case "title": {
      const contentAccessor =
        content.object === "block" ? content[type].text : content[type];
      return (
        <Box as={Component} {...getStyleProps(content.type)} {...wrapperProps}>
          {contentAccessor.map(({ text, annotations }) => {
            return (
              <Annotations
                text={text}
                annotations={annotations}
                key={`${text}${JSON.stringify(annotations)}`}
              />
            );
          })}
        </Box>
      );
    }
    case "created_time": {
      return (
        <Box as="p" {...getStyleProps(content.type)} {...wrapperProps}>
          {new Date(content[type]).toLocaleString()}
        </Box>
      );
    }
    case "unsupported": {
      return null;
    }
    default:
      return type;
  }
};


export default NotionRenderer;
