# DataDome Bypass Server

A Node.js HTTP server that generates valid DataDome cookies for a target URL.

## How it works

Sends a POST request to `/bypass` with the required parameters.
The server processes the DataDome fingerprint challenge and returns a valid cookie.

## Endpoint

POST /bypass

Request body:
{
  "ua": "Mozilla/5.0 ...",
  "targetUrl": "https://example.com",
  "hash": "datadome_hash_value",
  "proxy": "http://user:pass@host:port"
}

Response:
{
  "success": true,
  "data": { ...cookie data }
}

## Stack

Node.js · Express

## Setup

cp .env.example .env
npm install
node server.js
