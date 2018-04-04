# Ext JS Alternative Infinity Grid

## Getting started
### Prerequisite
- Install [Python3](https://www.python.org/downloads/) (^3.6.4)
- Install [Sencha Cmd](https://www.sencha.com/products/sencha-cmd) (^6.5.3)
- Download [Sencha Ext JS](https://www.sencha.com/products/extjs) (^6.5.3).  We recommend
 extracting Ext JS into a `"sencha-sdks"` folder in your home directory.

On Windows the "~" part of the path will be replaced by something like "C:\Users\Me\".

### Install the server
Install the server python dependencies:

    $ pip install Flask flask-mysql flask-restful flask-cors webargs
	
Load MySQL Dump in database (server/example_dump.sql) and set the correct configuration values ​​to connect to mysql in the file example_server.py

### Build the client
Install the Ext JS framework for the application:

    $ cd client
    $ sencha app install ~/sencha-sdks
    or
    $ sencha app upgrade ~/sencha-sdks/ext-<version of the sdk>

Note: If you use `sencha app install ~/sencha-sdks` here, the version of the SDK inside ~/sencha-sdks will
have to mach the version specified in `workspace.json`.

Development build:

    $ sencha app build --development

Production build:

    $ sencha app build --production

### Run the app

    $ cd server
    $ python example_server.py

Open your browser on http://localhost:5000/articles