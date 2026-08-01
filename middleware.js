import { NextResponse } from "next/server";

// Paths that should redirect to their clean (query-stripped) version
// whenever a `scroll` query parameter is present. This is used to tell
// search engines there is one canonical URL per page, while still letting
// the homepage cards link with ?scroll=<id> for in-page scrolling
// (the scroll happens client-side via useSearchParams before this would
// ever apply to a same-tab client navigation — this middleware only
// matters for hard/server-side loads of the URL, e.g. a search engine
// crawler or a typed-in address).
const SCROLL_STRIP_PATHS = new Set([
  "/sri-lanka-travel-destinations",
  "/sri-lanka-tour-services",
  "/destinations",
]);

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  if (SCROLL_STRIP_PATHS.has(pathname) && searchParams.has("scroll")) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.search = ""; // explicitly drop ALL query params, including scroll
    return NextResponse.redirect(cleanUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sri-lanka-travel-destinations",
    "/sri-lanka-tour-services",
    "/destinations",
  ],
};
