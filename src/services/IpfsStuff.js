import { create } from "ipfs-http-client";
import bart from "./bart.png";
import Axios from "axios";
const ipfsClient = create("https://ipfs.infura.io:5001");

const getBase64 = (url) => {
  return Axios.get(url, {
    responseType: "arraybuffer",
  }).then((response) => Buffer.from(response.data, "binary"));
};

export async function ipfsUpload(tokenId) {
  try {
    let test = await getBase64(bart);
    const addedImage = await ipfsClient.add(test);
    const metadata = {
      name: "Kekw",
      description: "A collection of KEKWs",
      image: "https://ipfs.io/ipfs/" + addedImage.path,
      attributes: [{ type: "ID", value: tokenId }],
    };

    const addedMetadata = await ipfsClient.add(JSON.stringify(metadata));
    return addedMetadata.path;
  } catch (err) {
    console.log("Error Occured: ");
    console.log(err);
  }
}
