
# React with wordpress

WordPress Rest API is a huge step forward for frontend developers looking to combine the power of JavaScript tools like React.js with WordPress.

This is exactly what I want to do with this demo of the WordPress REST API in the work. I'll try to find out if this is really a game-changer and to deconstruct the hype surrounding it.

Over here i used WordPress as a backend, and WordPress REST API to feed data into Reactjs application.

## Demo
### Dashboard
![Logo](https://github.com/sohilchamadia8/React-with-wordpress/blob/main/user_login.gif)

### Post
![Logo](https://github.com/sohilchamadia8/React-with-wordpress/blob/main/posts.gif)


## Prerequisites

- You need to install and activate [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
- After that need to configure following things

```bash
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```
- Add the following in your wp-config.php Wordpress file. You can add your own secret key.

```bash
define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
define('JWT_AUTH_CORS_ENABLE', true);
```
- Now you can make a request to `/wp-json/jwt-auth/v1/token` REST API provided by the plugin.
- Once user is login then JWT Token will be send in the response.That will be used in furhter API request
## Installation


1. Clone this repo
```bash
git clone https://github.com/sohilchamadia8/React-with-wordpress.git
```
2. Install packages
```bash
npm i
``` 
3. Runs the application
```bash
npm start
``` 
## Configure

Add your wordPress siteUrl in `src/Appconfig.js`

```bash
export const Appconfig = {
    siteUrl: '<wordpress project siteUrl>' 
}
```

## Features

- Authentication with JWT ( Login Logout )
- Handing WordPress REST API
- CRUD operation using WordPress REST API
- Creating Dashboard using React to perform CRUD operation


## Authors

- [Sohil Chamadia](https://sohilchamadia8.wordpress.com/)

