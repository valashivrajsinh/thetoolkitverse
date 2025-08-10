
/**
 * Updates the page's title, meta description, and canonical URL for SEO purposes.
 * @param title The new title of the page.
 * @param description The new meta description for the page.
 */
export const updateSeoTags = (title: string, description: string) => {
  // Update page title
  document.title = title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  // Update or create canonical URL link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  // This correctly forms the full canonical URL for SPAs, including hash for HashRouter.
  canonicalLink.setAttribute('href', window.location.href);
};
