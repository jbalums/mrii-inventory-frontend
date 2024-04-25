import Echo from "laravel-echo";

import Pusher from "pusher-js";

let token = null;
if (typeof window == "object") {
	token = window.localStorage.getItem("token");
}

window.Pusher = Pusher;

// var notificationService = new Pusher("f843752b321309b04c52", {
// 	cluster: "ap1",
// });

// const notificationEcho = new Echo({
// 	broadcaster: "pusher",
// 	key: `f843752b321309b04c52`, // Your WebSocket key
// 	cluster: `c410936fe9be283a1de4`, // Your Pusher cluster
// 	encrypted: true,
// });

export default notificationService;
