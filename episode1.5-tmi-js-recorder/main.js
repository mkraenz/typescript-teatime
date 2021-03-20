const client = new tmi.Client({
  connection: { reconnect: true },
  channels: ["fadeoutsama"],
});

client.connect();

let records = [];
let recording = false;

function handleAdmin(tags, message) {
  if (message.includes("!rec-on")) {
    console.log("rec start");
    recording = true;
  } else {
    if (message.includes("!rec-off")) {
      console.log("rec stopped");
      console.log(records);
      recording = false;
      // escape to avoid XSS
      document.querySelector("#output").innerHTML = _.escape(records.join(" "));
      records = [];
    }
  }
}

client.on("message", (channel, tags, message, self) => {
  const itsMe = tags["username"] === "fadeoutsama";
  if (itsMe) {
    handleAdmin(tags, message);
  }

  if (recording) {
    records.push(message);
  }
});
