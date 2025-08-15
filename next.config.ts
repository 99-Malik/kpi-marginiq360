// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Remove `.svg` from Next's default asset loader
    config.module.rules.forEach((rule: any) => {
      if (rule.test?.test?.(".svg")) {
        rule.exclude = /\.svg$/i;
      }
    });

    // Add SVGR for files inside src/svgs
    config.module.rules.push({
      test: /\.svg$/i,
      include: /src\/svgs/, // only process svgs from this folder
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            svgProps: { fill: "currentColor", stroke: "currentColor" },
            titleProp: true,
            svgo: true,
            svgoConfig: {
              multipass: true,
              plugins: [
                { name: "preset-default", params: { overrides: { removeViewBox: false } } },
                { name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
