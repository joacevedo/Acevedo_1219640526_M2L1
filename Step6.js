const httpServer = require('http');
const url = require('url');
const fs = require('fs');

/// read date from file
// Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data.json`,
    'utf-8'
);
const dataObj = JSON.parse(tempCourse); // string to JavaScript Object JSON

// Create Server
const server = httpServer.createServer(function (req, res) { // Call back function
    
    const urlParameter = url.parse(req.url, true);
    console.log(urlParameter.query);
    console.log(urlParameter.pathname);

    if(urlParameter.query.id){ //If there is query parameter named id read as string
        // Courses page
        if (urlParameter.pathname === '/' || urlParameter.pathname.toLowerCase() === '/courses') {
            res.writeHead(200, { //Every thing ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(urlParameter.query.id)]; //convert to numeric value
            res.end(` We received out first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            ${JSON.stringify(course)} //convert object back to string
            `)
        }
        else {
            res.writeHead(404, { // Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end('resource not found')
        }
    }
});

server.listen(8000, 'localhost', function() {
    console.log('Listening to requests on port 8000')
});