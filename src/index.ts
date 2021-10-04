import "reflect-metadata"
import { api } from "@shapediver/viewer"

const modelViewUrl = 'https://sddev2.eu-central-1.shapediver.com'; // PLEASE ADD YOUR MODEL VIEW URL HERE
const ticket = 'f458732383d032fe0a479dea5e134da634c557e8d50f69621ce3f7fbd34f84c65a8b607585489f5877443f8292841a6e952c08990690cf127d169d202b098f66ee5368af94d02270f3d6d769de8e416608f80d0994b3d898a41be5f4f38a0c428699d1d7f9d9c4-6e86fe6d52d13f8f55b7b873bd75a0e6'; // PLEASE ADD YOUR TICKET HERE

(async () => {
  // create a viewer
  const viewer = await api.createViewer({ canvas: <HTMLCanvasElement>document.getElementById('canvas'), id: 'myViewer' });
  // create a session
  const session = await api.createSession({ ticket, modelViewUrl, id: 'mySession'});

  // read out the parameter with the specific name
  const lengthParameter = session.getParameterByName('Length')[0];
  // update the value
  lengthParameter.value = 6;
  // and customize the scene
  await session.customize();
  console.log(lengthParameter.value);
})();