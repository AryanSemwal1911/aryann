const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Paths
const frontendPath = path.join(__dirname, '../frontend');
const videoPath = path.join(__dirname, '../video');

console.log('\n' + '='.repeat(60));
console.log('🚀 SERVER STARTING...');
console.log('='.repeat(60));
console.log('📁 Backend path:', __dirname);
console.log('📁 Frontend path:', frontendPath);
console.log('📁 Video path:', videoPath);

// Check if folders exist
if (fs.existsSync(frontendPath)) {
    console.log('✅ Frontend folder found');
    console.log('   Files:', fs.readdirSync(frontendPath).join(', '));
} else {
    console.log('❌ Frontend folder NOT found!');
}

if (fs.existsSync(videoPath)) {
    console.log('✅ Video folder found');
    console.log('   Files:', fs.readdirSync(videoPath).join(', '));
} else {
    console.log('❌ Video folder NOT found!');
}

// IMPORTANT: Serve static files
app.use(express.static(frontendPath));
app.use('/video', express.static(videoPath));

// DEBUG ROUTE - Sabse pehle ye define karo
app.get('/debug', (req, res) => {
    const frontendExists = fs.existsSync(frontendPath);
    const videoExists = fs.existsSync(videoPath);
    
    const debug = {
        serverTime: new Date().toLocaleString(),
        backendPath: __dirname,
        frontendPath: frontendPath,
        frontendExists: frontendExists,
        frontendFiles: frontendExists ? fs.readdirSync(frontendPath) : [],
        videoPath: videoPath,
        videoExists: videoExists,
        videoFiles: videoExists ? fs.readdirSync(videoPath) : [],
        nodeVersion: process.version,
        platform: process.platform
    };
    
    console.log('🔍 Debug route accessed');
    res.json(debug);
});

// TEST ROUTE
app.get('/test', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Page</title>
            <style>
                body { 
                    font-family: Arial; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    color: white;
                }
                .container {
                    text-align: center;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                }
                h1 { font-size: 48px; margin: 0; }
                p { font-size: 18px; }
                button {
                    padding: 12px 30px;
                    font-size: 16px;
                    background: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    margin: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>✅ SERVER WORKING!</h1>
                <p>Port: ${PORT}</p>
                <p>Time: ${new Date().toLocaleTimeString()}</p>
                <button onclick="window.location.href='/'">Go to Login</button>
                <button onclick="window.location.href='/debug'">Debug Info</button>
            </div>
        </body>
        </html>
    `);
});

// HOME ROUTE
app.get('/', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        console.log('🏠 Serving index.html');
        res.sendFile(indexPath);
    } else {
        console.log('❌ index.html not found!');
        res.status(404).send(`
            <h1>❌ index.html not found!</h1>
            <p>Looked at: ${indexPath}</p>
            <p>Frontend folder contains: ${fs.existsSync(frontendPath) ? fs.readdirSync(frontendPath).join(', ') : 'Folder not found'}</p>
            <a href="/test">Go to Test Page</a>
        `);
    }
});

// BIRTH YEAR PAGE
app.get('/birthyear.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'birthyear.html'));
});

// VIDEO PAGE
app.get('/video-page', (req, res) => {
    res.sendFile(path.join(frontendPath, 'video.html'));
});

// Catch all route for debugging
app.use((req, res) => {
    console.log('404 Not Found:', req.url);
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>URL: ${req.url}</p>
        <p>Try these:</p>
        <ul>
            <li><a href="/test">/test</a></li>
            <li><a href="/debug">/debug</a></li>
            <li><a href="/">/ (home)</a></li>
        </ul>
    `);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(60));
    console.log(`✅ SERVER RUNNING ON PORT ${PORT}`);
    console.log('='.repeat(60));
    console.log(`📍 http://localhost:${PORT}/test`);
    console.log(`📍 http://localhost:${PORT}/debug`);
    console.log(`📍 http://localhost:${PORT}/`);
    console.log('='.repeat(60));
});