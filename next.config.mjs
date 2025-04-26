/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Enable static exports
    images: {
        unoptimized: true,
    },
    basePath: '/modplan', // Replace with your repository name
}

export default nextConfig;
