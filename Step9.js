const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./replaceTemplate')

/// read date from file
// Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data.json`,
    'utf-8'
);

///
// Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/templateCourse-1.html`,
    'utf-8'
);

// function replaceTemplate(htmlStr, course) {
// const replaceTemplate = (htmlStr, course)=> {
//     let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
//     output = output.replace(/{%IMAGE%}/g, course.image);
//     output = output.replace(/{%FROM%}/g, course.from);
//     output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
//     output = output.replace(/{%CREDITS%}/g, course.credits);
//     output = output.replace(/{%DESCRIPTION%}/g, course.description);
//     output = output.replace(/{%ID%}/g, course.id);
//     return output;
// }

const dataObj = JSON.parse(tempCourse); // string to JavaScript Object JSON


// Create Server
// const server = httpServer.createServer(function (req, res) { // Call back function
const server = httpServer.createServer( (req, res) =>{ // Call back function
    
    const urlParameter = url.parse(req.url, true); 
    console.log(urlParameter.query); // Convert to String
    console.log(urlParameter.pathname); // Convert to String

    if(urlParameter.query.id){ //If there is query parameter named id read as string
        // Courses page
        if (urlParameter.pathname === '/' || urlParameter.pathname.toLowerCase() === '/courses') {
            res.writeHead(200, { //Every thing ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(urlParameter.query.id)]; //convert to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course); // function that will replace the course values in the HTML
            // res.end(` We received out first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            // ${JSON.stringify(course)} //convert object back to string
            // `)
            res.end(courseHTML);
        }
    }
    else {
            res.writeHead(404, { // Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end('resource not found')
        }
    });

// Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000')
});