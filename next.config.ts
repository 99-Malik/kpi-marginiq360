// next.config.ts
import type { NextConfig } from "next";

function excludeSvgFromAssetRules(config: any) {
  const visit = (rule: any) => {
    if (rule?.test?.test?.(".svg")) {
      rule.exclude = Array.isArray(rule.exclude)
        ? [...rule.exclude, /\.svg$/i]
        : /\.svg$/i;
    }
    if (Array.isArray(rule?.oneOf)) rule.oneOf.forEach(visit);
    if (Array.isArray(rule)) rule.forEach(visit);
  };
  visit(config.module.rules);
}

const nextConfig: NextConfig = {
  webpack(config) {
    excludeSvgFromAssetRules(config);

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            // make the icon use the CSS `color` value
            svgProps: { fill: "currentColor", stroke: "currentColor" },
            svgo: true,
            svgoConfig: {
              plugins: [
                // keep viewBox so sizing works
                { name: "preset-default", params: { overrides: { removeViewBox: false } } },
                // remove any hard-coded fills so currentColor can apply
                { name: "removeAttrs", params: { attrs: "(fill)" } },
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
