Simple API with Azure Function for create, read and delete operations for blogs

## Install dependencies

```bash
npm install
```

> Assuming you are using VS Code and all necessary extensions are installed, if not follow Azure Functions documentation [here](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node?pivots=nodejs-model-v3#configure-your-environment)

<br>

## Start (Local)

-   Rename `local.settings.sample.json` to `local.settings.json`
-   Set "CosmosDbConnectionString" value in `local.settings.json` (MongoDB connection string will also work)
-   Start debugging (press F5)

## Test

API endpoint will be http://localhost:7071/api/blog

Test it using something like Postman/Insomnia

<br>

**POST** /api/blog

body

```json
{
	"title": "Title 1",
	"content": "ABCD"
}
```

**GET** /api/blog/{blogId}

**DELETE** /api/blog/{blogId}
