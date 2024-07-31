const Client = require("../models/clientModel");
const Group = require("../models/groupModel");
const cron = require('node-cron');



async function checkForExpiredGroups() {

  try {
    const clients = await Client.find();

    for (const client of clients) {
      const currentDate = new Date();

      client.groupsExpiry = client.groupsExpiry.filter(group => group.expiry > currentDate);
      
      await client.save();
    }

    const groups = await Group.find();

    for (const group of groups) {
      const currentDate = new Date();

      group.members = group.members.filter(member => member.expiry > currentDate);

      await group.save();
    }

    console.log('Expired Members removed Successfully');

  } catch (error) {
    console.error('Error executing cron job', error);
  }
}

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running the expired groups check...');
  checkForExpiredGroups();
});


// For Testing
// cron.schedule('*/2 * * * *', () => {
//   checkForExpiredGroups();
// });