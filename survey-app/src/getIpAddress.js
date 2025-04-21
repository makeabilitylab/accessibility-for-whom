//getIpAddress.js

import axios from 'axios';

async function getIpAddress() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
}

export default getIpAddress;