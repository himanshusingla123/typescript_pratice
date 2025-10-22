import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();
async function run()
{
    const teamName = "";
    const orgName = "advanced_computers";
    const res = await axios.get(`https://${orgName}.pam.okta.com/v1/teams/${teamName}/current_user`,
        {headers:{
            Authorization:`SSWS ${process.env.OKTA_API_TOKEN}`
        }}
    )

    const data = await res.data;
    console.log(data);
}