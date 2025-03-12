# POC for Qwerty3 AI Koncept.

Built using React + TypeScript + Vite.

This is an assistant that can be placed whereever you want it.  
Stand-alone - or embedded on your site.

The application is embedded like this

```
  <div id="sk-qwerty" data-shadow="true"></div>
```

You can add additional info into the assistant like this:

- Installation

Run `yarn install`

- For development

Create an env file named .env based on the .env.example file.

Create an index.html based on the index.html.example template.

To start the development server, run `yarn dev` so that the corresponding env file is used.

- Deployment

To build for production, run `yarn build` in order to build.
This will copy the build to the sitevision webapp source.
