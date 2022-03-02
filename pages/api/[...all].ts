
import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {

    target: "http://my-nodejs-e-commerce-back-end.herokuapp.com",
    changeOrigin: true,
    cookieDomainRewrite:'localhost:3000',

    pathRewrite: {
      "^/api/": '/api/v1/',
    },
  });
