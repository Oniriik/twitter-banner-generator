const {getFollowers, getProfileImageUrl, updateBanner} = require("./twitterController")
const {saveImage, createBanner} = require("./imageController");
const CronJob = require("cron").CronJob

let lastUser ={}

console.log('starting node app')
const job = new CronJob('* * * * *', async function() {
    console.log('start generating banner')
    generateBanner()
})

job.start()

async function generateBanner() {
    const follower = await getFollowers()
    if (follower?.id != lastUser.id ){
        const url = await getProfileImageUrl(follower.id)
        await saveImage(follower.id, url)
        await createBanner(follower.id)
        await updateBanner()
        lastUser = follower
        console.log('Banner updated')
    }
    else{
        console.log('Already up to date')
    }
}
