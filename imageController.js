const axios = require("axios")
const sharp = require("sharp")
const Jimp = require("jimp")
const fs = require("fs")
const fsPromises = fs.promises


async function saveImage(name, url) {
    const {data} = await axios.get(url, {
        responseType: "arraybuffer"
    })

    await sharp(data).resize(100, 100).toFile(`./images/${name}.png`)
}

async function createBanner(id) {
    const banner = await Jimp.read("./banner.png")
    const image = await Jimp.read(`./images/${id}.png`)
    const mask = await Jimp.read('./mask.png');

    image.mask(mask)

    banner.composite(image, 1099, 234);

    await banner.writeAsync("./final.png");

}

module.exports = {saveImage, createBanner}