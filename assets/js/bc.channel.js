////// BROADCAST //////

const bc = new BroadcastChannel("frontChannel");

function toSendFront(name, data, type, status) {
  try {
    var dataPost = { name, data, type, status };
    bc.postMessage(dataPost);
  } catch (error) {
    console.log(error);
  }
}
