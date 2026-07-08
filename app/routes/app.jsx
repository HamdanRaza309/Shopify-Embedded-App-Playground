import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const authContext = await authenticate.admin(request);

  const {
    // admin,
    session,
    // cors,
    // redirect,
    // billing,
  } = authContext;

  // console.log("[Server] Authentication Context:", authContext);
  console.log("[Server] Shopify Session:", session);
  // console.log("[Server] Admin API Client:", admin);
  // console.log("[Server] CORS Helpers:", cors);
  // console.log("[Server] Redirect Helpers:", redirect);
  // console.log("[Server] Billing Helpers:", billing);


  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "", developer: "Hamdan Raza" };
};

export default function App() {
  const loaderData = useLoaderData();

  console.log("[Client] Loader Data:", loaderData);

  return (
    <AppProvider embedded apiKey={loaderData.apiKey}>
      <s-app-nav>
        <s-link href="/app">Home</s-link>
        <s-link href="/app/additional">Additional page</s-link>
      </s-app-nav>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
