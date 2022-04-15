const bc = new BroadcastChannel("frontChannel");
function toSendFront(n, t, a, o) {
  try {
    var e = { name: n, data: t, type: a, status: o };
    bc.postMessage(e);
  } catch (n) {
    console.log(n);
  }
}
