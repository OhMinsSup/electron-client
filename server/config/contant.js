module.exports = {
    ZOOM_API: 'https://api.zoom.us/v2',
    CLIENT_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://zoom-sdk.netlify.app'
}