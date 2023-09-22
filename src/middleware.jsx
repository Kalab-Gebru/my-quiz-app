// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/", "/user"] };