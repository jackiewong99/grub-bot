# Grub Bot v1

Grub Bot was inspired by a _Capital_ _One_ coding challenge which I did not partake in. The challenge was to eliminate the indecisive part of finding a place to eat when searching the web. To summarize, the main requirements of the original challenge were to make a chat bot that narrows the selection of restaurants, fetches data from the [Yelp Fusion API](https://www.yelp.com/fusion 'Yelp Fusion API'), plots restaurants on a map, and utilizes the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API 'Geolocation API').

As the original challenge was beyond the scope of my skills, I only built a few of the main features and plan to iterate on this project in the future, hence naming it **v1**.

I hope you enjoy viewing/editing this project as much as I enjoyed building it!

You can view the project here: https://jackiewong99.github.io/grub-bot/

\* _This project is not responsive for mobile viewing or any other small to medium screen sizes_.

---

### **Frameworks:**

- [Node.js](https://nodejs.org/en/about/ 'Node.js')
- [Express.js](https://expressjs.com/ 'Express.js')

### **APIs:**

- [Yelp Fusion API](https://www.yelp.com/fusion 'Yelp Fusion API')
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API 'Geolocation API')

### **Proxy Server Hosting:**

- [Google Cloud Platform](https://cloud.google.com/ 'Google Cloud Platform')

##### _The full folder of icons can be found on the [Yelp Fusion API's](https://www.yelp.com/developers/display_requirements 'Yelp Fusion API') Display Requirements page_.

---

### **Running the project locally:**

Install all dependencies used in this project.

```
npm install
```

Change the value of **PROXY_ADDRESS** to _localhost:3000/businesses_.

```
const PROXY_ADDRESS = 'localhost:3000/businesses';
```

Open a new command line window and run the local dev server in the **server** directory.

```
cd server/
npm run dev
```

#### Styling:

Open another command line window and run **node-sass** to style the project and compile _scss_ to _css_.

```
npm run sass
```

If you are using [VS Code](https://code.visualstudio.com/ 'VS Code'), I recommend installing the _Live Server_ plugin which allows you to code without having to manually reload your project on any changes you make.
