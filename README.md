
<h1 align="center" style="font-weight: bold;">Image_Processor</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>
</p>


<p align="center">It is a Image processor that takes csv as an input and in that it takes products and convert the input urls to smaller urls thus reducing the soze of the images .</p>


<p align="center">
<a href="https://image-processing-9e2g.onrender.com/">📱 Visit this Project</a>
</p>

<h2 id="technologies">💻 Technologies</h2>

- Node js
- Axios
- Cloudinary
- Multer
- Express
- Mongodb
- Sharp 

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://github.com/)
- [Git 2](https://github.com)

<h3>Cloning</h3>

How to clone the project

```bash
git clone https://github.com/naksh1414/Image_Processing.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your AWS Credentials

```yaml
DB_URL=Your databse Url
CLOUDINARY_CLOUD_NAME=Your Cloudinary cloud name 
CLOUDINARY_API_KEY=Your Cloudinary api key
CLOUDINARY_API_SECRET=Your Cloudinary api secret 
PORT=4000
```

<h3>Starting</h3>

How to start project

```bash
cd image_processing
npm run dev 
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /upload</kbd>     | Uploads the csv File and save it to the Backend  
| <kbd>POST /process-image/:serialNumber</kbd>     | Reduces the size of Input Images
| <kbd>GET /status/:requestId</kbd>     | Checks the Status of the Products 
| <kbd>GET /status/serial/:serialNumber</kbd>     | Checks the Status of the particular Products 


```
