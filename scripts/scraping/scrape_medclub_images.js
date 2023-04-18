const fs = require("fs");
const path = require("path");
const Axios = require("axios");

const CONSULTA_SPECIALITIES_URL =
  "https://api.medclub.com.br/v1/appuse/procedimento/?ie_telemedicina=false&cd_cidade=1735&ie_tipo_procedimento=CO";

async function main() {
  const response = await Axios.get(CONSULTA_SPECIALITIES_URL);
  const specialities = response.data;
  for (const speciality of specialities) {
    try {
      await downloadImage(speciality.aq_foto, speciality.slug + ".png");
    } catch (error) {
      console.log("could not download image", speciality.aq_foto);
    }
  }
}

async function downloadImage(url, filename) {
  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  const dir = path.join(__dirname, "scraped_images");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const filePath = path.join(__dirname, "scraped_images", filename);
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filePath))
      .on("error", reject)
      .once("close", () => resolve(filePath));
  });
}

main();
