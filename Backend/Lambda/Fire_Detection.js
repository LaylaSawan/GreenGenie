const axios = require('axios'); 

const BASE_URL = "http://thegreengenie.ca/"
const EC2_REQUEST = "http://ec2-3-134-114-3.us-east-2.compute.amazonaws.com:5000/?img=" + BASE_URL

exports.handler = async (event, context, callback) => {
  
  console.log(EC2_REQUEST + event['queryStringParameters']['img'])
  
  const res = await axios.get(EC2_REQUEST + event['queryStringParameters']['img'])
  
  return res;
};
