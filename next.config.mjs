/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // 根据当前是否为dev环境，设置basePath
    basePath: process.env.NODE_ENV === 'development' ? '' : '/Test-page',
};

export default nextConfig;
