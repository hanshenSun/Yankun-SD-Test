import "reflect-metadata"
import { api } from "@shapediver/viewer"

const modelViewUrl = 'https://sdr7euc1.eu-central-1.shapediver.com'; // PLEASE ADD YOUR MODEL VIEW URL HERE
const ticket = '31c5a58b82869d47e63e72cc6db96df36d1f190c352beb3b2fe2ae3585d3d86c6b02fd82bb04dd3e06215e6e03c69b37190f9de9bf32a8ffaf872bd6486dc667a8b280e7e93336e8e5cc2ba435640f6931c2976dc294cad786aa816af94d2f647306b8cae3d7a9-48cb8393cc258a37c0b4ccfafb3e52d9'; // PLEASE ADD YOUR TICKET HERE


(async () => {

  const container = document.getElementById("container")
  container.setAttribute("style",`width:${window.innerWidth}px`)
  container.setAttribute("style",`height:${window.innerHeight/2}px`)


  // create a title
  const h1 = document.createElement("H1");
  const text = "TO TEST SOME KARAMBA HERE!!!";
  h1.innerHTML = text;
  const firstChild = document.body.firstChild;
  await document.body.insertBefore(h1, firstChild);
  
  // create a viewer
  const viewer = await api.createViewer({ canvas: <HTMLCanvasElement>document.getElementById('canvas'), id: 'myViewer' });
  // create a session
  const session = await api.createSession({ ticket, modelViewUrl, id: 'mySession'});

  // // read out the parameter with the specific name
  const loadParameter = session.getParameterByName('Load')[0];

  // // update the value
  var input = document.querySelector("input")
  var rangeValue = document.getElementById("rangeValue")
  var newLoad = input.value

  input.addEventListener("input", async()=>{
    rangeValue.innerHTML = input.value
    newLoad = input.value
    console.log(input.value);
    loadParameter.value = newLoad
  // and customize the scene
    await session.customize();
  })
  

  // console.log(colorParameter.value);
})();


