import axios from "axios";

const apiURL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

async function getUsers() {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}


export { getUsers };
