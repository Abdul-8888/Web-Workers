# Web-Workers
### Description
The developed project is a demo application to better understand the working and implementation of web workers. The application uses a free API from [OpenMeteo](https://github.com](https://open-meteo.com)https://open-meteo.com). It provides weather report of a region provied; longitude and latitude of the region, start date, end date and hourly time. Simple html, css and js are used for the app to get to the depth of the concept of web workers.

### Instructions
The application can be run in almost any code editor. Just clone the project and you are ready to go. Using simply html, css and js need no extra libraries, software or packages to install. Recommended editor is VS Code.

### Benefits
After the successful completion and testin of the app, it was found that web workers made work really efficient. Without using web workers, complex tasks on huge data took a lot of time but using web workers sped up the work by running independant tasks concurrently.

### Challenges
- Web workers have no DOM access so data need to be brought back to main thread to display on UI.
- It made code difficult to debug as the code was now in more js files than it was before.
- It is necessary to check if a web worker is needed or not as creating many web workers can lead to poor resource management.

### References
- [web.dev](https://web.dev/articles/workers-basics)
- [w3schools](https://www.w3schools.com/html/html5_webworkers.asp)

### Live Demo App
[Weather Archive](https://abdul-8888.github.io/Web-Workers)
