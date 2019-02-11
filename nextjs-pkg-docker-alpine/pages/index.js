// pages/index.js

// Imports
import React from 'react';
import getConfig from 'next/config';

// get the config as specified in next.config.js and loaded in server.js line 11
const { publicRuntimeConfig } = getConfig();

const { API_URL } = publicRuntimeConfig; // pull out the variable from the config

// Export the HTML content when requested
export default () => (
  <div>
    <h1> Hello World </h1>
    <a href="/about">About</a>
  </div>
);
