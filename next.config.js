// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
// const withTM = require('next-transpile-modules')(['react-d3-speedometer']);
// const babel = require('@babel/core');
// const lodashIsEmpty = require.resolve('lodash/isEmpty');
// const lodashIsNumber = require.resolve('lodash/isNumber');

// module.exports = withTM({
//   future: {
//     webpack5: true,
//   },
//   webpack(config, { isServer }) {
//     // Only do this in the server
//     if (isServer) {
//       // Transform the ES modules to CommonJS modules
//       const transformResult = babel.transformSync(`
//         import isEmpty from 'lodash-es/isEmpty';
//         import isNumber from 'lodash-es/isNumber';
//         export { isEmpty, isNumber };
//       `, {
//         plugins: ['@babel/plugin-transform-modules-commonjs'],
//       });

//       // Use the transformed modules instead of the original ES modules
//       config.resolve.alias = {
//         'lodash-es/isEmpty': lodashIsEmpty,
//         'lodash-es/isNumber': lodashIsNumber,
//         'react-d3-speedometer/dist/core/util': './util-cjs',
//       };

//       // Create a new module to replace the original 'util' module
//       config.module.rules.push({
//         test: /util-cjs\.js$/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               plugins: ['@babel/plugin-transform-modules-commonjs'],
//             },
//           },
//         ],
//       });

//       // Add the transformed modules to the new module
//       config.module.rules.push({
//         test: /util-cjs\.js$/,
//         use: [
//           {
//             loader: 'string-replace-loader',
//             options: {
//               search: /import \{(.*)\} from 'lodash-es';/g,
//               replace: `const { $1 } = require('babel-plugin-transform-modules-commonjs/lib/helpers');`,
//             },
//           },
//           {
//             loader: 'string-replace-loader',
//             options: {
//               search: /export \{(.*)\};/g,
//               replace: '',
//             },
//           },
//           {
//             loader: 'string-replace-loader',
//             options: {
//               search: /import.*\/svgToDataURL';/g,
//               replace: '',
//             },
//           },
//           {
//             loader: 'string-replace-loader',
//             options: {
//               search: /import.*\/isomorphic';/g,
//               replace: '',
//             },
//           },
//           {
//             loader: 'string-replace-loader',
//             options: {
//               search: /export default/g,
//               replace: 'module.exports =',
//             },
//           },
//           {
//             loader: 'string-replace-loader',
//             options: {
//               search: /import/g,
//               replace: 'const',
//             },
//           },
//         ],
//       });

//       // Add the transformed modules to the server bundle
//       config.externals.push(/lodash-es/);
//       config.externals.push(/react-d3-speedometer/);
//       config.externals.push(/esm-cjs/);

//       config.node = {
//         __dirname: true,
//         __filename: true,
//       };
//     }

//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
// });
