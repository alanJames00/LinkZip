
## LinkZip URL Shortening API Documentation

LinkZip is a minimalist and efficient URL shortening service designed for simplicity and speed. This documentation provides a comprehensive guide on how to use the API for shortening long URLs into clean and shareable links.

### Production URL

To access the LinkZip URL shortening service, please use the following production URL:

- **Production URL**: [https://lz.linkzip.co/](https://lz.linkzip.co/)

### API Endpoints

#### Endpoint: POST /shorten

- **Description**: Shorten a long URL into a compact, shareable link.

- **Request**:
  - **Method**: POST
  - **Endpoint**: `/shorten`
  - **Request Body**:
    - `url` (string, required): The original URL to be shortened.
    - `shorturl` (string, optional): A custom short URL, if desired.
    - `randomUrl` (string: `true` or `false`, optional): Generates a random short URL, if specified true.

- **Response**:
  - **Success (HTTP 200 OK)**:
    - JSON response with the shortened URL information.
  - **Error (HTTP 400 Bad Request or 500 Internal Server Error)**:
    - JSON response with an error message.

- **Example 1: For Custom ShortURL**:
  - **Request**:
    ```json
    {
      "url": "https://example.com",
      "shorturl": "mycustomshorturl"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Short URL created successfully",
      "original_url": "https://example.com",
      "short_url": "https://lz.linkzip.co/mycustomshorturl"
    }
    ```

- **Example 2: For Random Short URL**:
  - **Request**:
    ```json
    {
      "url": "https://example.com",
      "randomUrl":"true"
    }
    ```
  - **Response**:
    ```json
    {
      "info": "Short Url created successfully",
      "original_url": "https://example.com",
      "short_url": "https://lz.linkzip.co/8ae6de"
    }
    ```
#### Endpoint: GET /:url

- **Description**: Redirect to the original URL associated with the provided short URL.

- **Request**:
  - **Method**: GET
  - **Endpoint**: `/:url`
  - **URL Parameter**:
    - `url` (string, required): The short URL to redirect.

- **Response**:
  - **Success (HTTP 302 Found)**:
    - Redirects to the original URL associated with the short URL.
  - **Error (HTTP 404 Not Found)**:
    - JSON response with an error message if the short URL is not found.

- **Example**:
  - **Request**:
    - Accessing `https://lz.linkzip.co/mycustomshorturl` will redirect to the original URL associated with the short URL.

#### Endpoint: GET /

- **Description**: A simple welcome message for the LinkZip service.

- **Request**:
  - **Method**: GET
  - **Endpoint**: `/`

- **Response**:
  - **Success (HTTP 200 OK)**:
    - A plain text response containing the welcome message.


### How To Self-Host the API
We provide the ability to self-host the API for your own personal use or organization
