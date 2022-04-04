import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {

    target: process.env.MY_API,
    changeOrigin: true,
    cookieDomainRewrite:process.env.MY_FRONTEND_DOMAIN,

    pathRewrite: {
      "^/api/revalidate": '/api/revalidate',
      "^/api/": '/api/v1/',
    },
  });
