const bc = new BroadcastChannel("frontChannel");

function toSendFront(name, data, type, status) {
  try {
    const payload = {
      name,
      data,
      type,
      status,
    };

    bc.postMessage(payload);
  } catch (error) {
    console.error("Erro ao enviar via BroadcastChannel:", error);
  }
}
