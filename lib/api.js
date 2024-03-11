const BLOG_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  date
  description
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFULL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFULL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractBlogEntries(fetchResponse) {
  return fetchResponse?.data?.blogPostCollection?.items;
}

export async function getAllBlogs() {
  // For this demo set the default limit to always return 3 articles.

  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  const blogs = await fetchGraphQL(
    `query {
        blogPostCollection {
            items {
              ${BLOG_GRAPHQL_FIELDS}
            }
          }
        }`
  );
  return extractBlogEntries(blogs);
}

export async function getBlog(slug) {
  const blog = await fetchGraphQL(
    `query {
        blogPostCollection(where:{slug: "${slug}"}) {
            items {
              ${BLOG_GRAPHQL_FIELDS}
            }
          }
        }`
  );
  return extractBlogEntries(blog)[0];
}
