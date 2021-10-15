import "reflect-metadata"
import { api } from "@shapediver/viewer"
import { create, ShapeDiverResponseExportDefinition, ShapeDiverResponseOutputDefinition, ShapeDiverResponseExportDefinitionType, ShapeDiverRequestCustomization, ShapeDiverResponseExport, ShapeDiverResponseOutput } from "@shapediver/sdk.geometry-api-sdk-v2"
import { getSessionId, submitAndWaitForCustomization, submitAndWaitForExport } from "./geometry-backend-sdk-utils"

const modelViewUrl = 'https://sdr7euc1.eu-central-1.shapediver.com'; // PLEASE ADD YOUR MODEL VIEW URL HERE
// const ticket = '31c5a58b82869d47e63e72cc6db96df36d1f190c352beb3b2fe2ae3585d3d86c6b02fd82bb04dd3e06215e6e03c69b37190f9de9bf32a8ffaf872bd6486dc667a8b280e7e93336e8e5cc2ba435640f6931c2976dc294cad786aa816af94d2f647306b8cae3d7a9-48cb8393cc258a37c0b4ccfafb3e52d9'; // PLEASE ADD YOUR TICKET HERE
const ticket = '34d72c43a37f596c6f09b63297307f25f444c1c4dbf27d1ae253d46abb02cece3633ec627870ff7ba76713d942eb8f57dc76da557a96642bf87c29f13b4984f569993b95a4b3b905fbc122ba6a9c2de397517c171a0c95296b38cbaaeee6cf5f8940baeb9fe5045ea889de01bee474671b7eca20fe0fc665-865f66f009a5170bcaa550618d0e638a';

// compute API inputs and enter
var loadInputText = document.getElementById("loadInputText") as HTMLInputElement
var submit = document.getElementById("enter")

// cross section index
var crossSectionText = document.getElementById("columnType") as HTMLInputElement
console.log(crossSectionText)
var submit_crossSection = document.getElementById("enter_col")
var columnName = document.getElementById("selectColumn")
columnName.style.fontSize = "15px"
columnName.style.color = "Grey"


// load input
var input = document.getElementById("load") as HTMLInputElement
// load input display
var rangeValue = document.getElementById("rangeValue")


// test case selection input
var ddInput = document.querySelector("select")


// width input
var width = document.getElementById("width") as HTMLInputElement
// width input display
var widthValue = document.getElementById("widthValue")


// length input
var length = document.getElementById("length") as HTMLInputElement
// length input display
var lengthValue = document.getElementById("lengthValue")


// posts input
var posts = document.getElementById("posts") as HTMLInputElement
// posts input display
var postsValue = document.getElementById("postsValue")



console.log(`Initial load ${input.value}`)
rangeValue.innerHTML = String(input.value);

console.log(`Initial length ${length.value}`)
lengthValue.innerHTML = String(length.value);

console.log(`Initial length ${width.value}`)
widthValue.innerHTML = String(width.value);

console.log(`Initial length ${posts.value}`)
postsValue.innerHTML = String(posts.value);


(async () => {

  const container = document.getElementById("container")
  container.setAttribute("style", `width:${window.innerWidth}px`)
  container.setAttribute("style", `height:${window.innerHeight / 1.25}px`)

  // load json file
  const resp = await fetch("json_test.JSON")
  const stuff = await resp.json()
  console.log(stuff)

  // background style
  document.body.style.backgroundColor = "#FFC600"



  // create a title
  const h1 = document.createElement("H1");
  const text = "TO TEST SOME KARAMBA HERE!!!";
  h1.innerHTML = text;
  const firstChild = document.body.firstChild;
  await document.body.insertBefore(h1, firstChild);


  // create data output display
  const h3 = document.createElement("H3")
  const msg = " "
  h3.innerHTML = msg
  h3.style.color = "RED"
  await document.body.insertBefore(h3, container)


  // create a viewer
  const viewer = await api.createViewer({ canvas: <HTMLCanvasElement>document.getElementById('canvas'), id: 'myViewer' });
  // create a session
  const session = await api.createSession({ ticket, modelViewUrl, id: 'mySession' });
  // create sdk
  const sdk = await create(modelViewUrl)
  // create sdk session
  const SDKsession = await sdk.session.init(ticket)


  // select input
  const paramInput = Object.keys(SDKsession.parameters).map(id => SDKsession.parameters[id])
  const loadInput = paramInput.find(p => p.type === "Float")

  // select output
  const paramOutput = Object.keys(SDKsession.outputs).map(id => SDKsession.outputs[id] as ShapeDiverResponseOutputDefinition)
  const meshOutput = paramOutput.find(d => d.name === "SDOutput")
  const dataOutput = paramOutput.find(c => c.name === "DataOutput")

  // // read out the parameter with the specific name
  const loadParameter = session.getParameterByName('Load')[0];
  const lengtharameter = session.getParameterByName('Length')[0];
  const widtharameter = session.getParameterByName('Width')[0];
  const postsharameter = session.getParameterByName('Num_posts')[0];
  const caseParameter = session.getParameterByName('Rendering Setting')[0];
  const typeParameter = session.getParameterByName('TextInput')[0];

  console.log(session.parameters)
  console.log(typeParameter)

  // // update the value
  const updateLoadValue = async () => {
    rangeValue.innerHTML = input.value
    var newLoad = input.value
    loadParameter.value = newLoad
    // and customize the scene
    await session.customize();
  };

  // // update the length value
  const updateLengthValue = async () => {
    lengthValue.innerHTML = length.value
    var newLoad = length.value
    lengtharameter.value = newLoad
    // and customize the scene
    await session.customize();
  };

  // // update the width value
  const updateWidthhValue = async () => {
    widthValue.innerHTML = width.value
    var newLoad = width.value
    widtharameter.value = newLoad
    // and customize the scene
    await session.customize();
  };

  // // update the width value
  const updatePostsValue = async () => {
    postsValue.innerHTML = posts.value
    var newLoad = posts.value
    postsharameter.value = newLoad
    // and customize the scene
    await session.customize();
  };

  // update test case
  const updateTestCase = async () => {
    var ddSelections = ddInput.options
    var selectedIndex = ddSelections.selectedIndex
    console.log(selectedIndex)
    caseParameter.value = String(selectedIndex)
    await session.customize();
  }

  // update SDK input
  const printResult = async () => {
    var inputValue = Number(loadInputText.value)
    console.log(inputValue)
    const customizationBody: ShapeDiverRequestCustomization = {
      [loadInput.id]: inputValue
    }
    const customizationResult = await submitAndWaitForCustomization(sdk, SDKsession, customizationBody)
    const resultContent = (customizationResult.outputs[meshOutput.id] as ShapeDiverResponseOutput).content[0].href + ".sdtf"
    const datadisp = (customizationResult.outputs[dataOutput.id] as ShapeDiverResponseOutput).content[0].data
    h3.innerHTML = datadisp
    window.open(resultContent);
  }

  // crossSection index
  const crossSection = async () => {
    var sel = crossSectionText.value
    console.log(sel)
    for (let key in stuff) {
      var cur_sel = stuff[key]
      if (cur_sel.includes(sel)) {
        var final_sel = key
        columnName.innerHTML = cur_sel
        break
      }
    }
    typeParameter.value = String(final_sel)
    await session.customize();
  }


  //input.addEventListener("onchange", updateSliderValueHandler)
  input.onchange = updateLoadValue
  length.onchange = updateLengthValue
  width.onchange = updateWidthhValue
  posts.onchange = updatePostsValue
  ddInput.onchange = updateTestCase
  submit.onclick = printResult
  submit_crossSection.onclick = crossSection



  // console.log(colorParameter.value);
})();
