# Next.js Notion blog

Starter template for creating blog with Notion as CMS. Uses [Notion API](https://github.com/makenotion/notion-sdk-js). 

## Demo

https://www.loom.com/share/f8c68ab7e0c6462dadc3f9fc92252c64

## How to create blog?

1. Fork the repo. 
2. Create Notion auth token [here](https://www.notion.so/my-integrations).
3. Create a new database in Notion [ new page with a database ]. Learn more [here](https://developers.notion.com/docs).
4. Set environment variables:
    ```md
    NOTION_AUTH_KEY=your_key
    NOTION_DATABASE_ID=your_db_id

    ```


## Note

The API is still in beta and doesn't support many components like `quote`, `code` , `divider`, etc. 

