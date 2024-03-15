const BLOG_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  subTitle
  slug
  date
  image {
    url
  }
  description
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFULL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFULL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 3600,
        tags: ["blogs"],
      },
    }
  ).then((response) => response.json());
}

function extractBlogEntries(fetchResponse) {
  return fetchResponse?.data?.blogPostCollection?.items;
}

export async function getAllBlogs(limit = 20, isDraftMode = false) {
  const blogs = await fetchGraphQL(
    `query {
        blogPostCollection (where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
            items {
              ${BLOG_GRAPHQL_FIELDS}
            }
          }
        }`,
    isDraftMode
  );
  return extractBlogEntries(blogs);
}

export async function getBlog(slug, isDraftMode = false) {
  const blog = await fetchGraphQL(
    `query {
        blogPostCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    })  {
            items {
              ${BLOG_GRAPHQL_FIELDS}
            }
          }
        }`,
    isDraftMode
  );
  return extractBlogEntries(blog)[0];
}
