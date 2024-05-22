import type { Middleware, Context } from "@nuxt/types";

const authMiddleware: Middleware = ({ store, redirect }) => {
  if (store.state.auth.loggedIn) {
    return redirect("/");
  }
};

export default authMiddleware;
