/**
 * Ideally we'd want to also make changes to the frontend so that it starts a new conversation
 * before sending messages. But since this exercise focuses more on the backend, I applied as
 * little changes to the frontend code as I could.
 */
const conversationID = "fd16a0f9-78d5-48af-82f6-9f2d372de7e0"; // Example only

function sendMessage(userID, message) {
  $.ajax({
    url: `http://localhost:3000/conversations/${conversationID}/messages`,
    type: "post",
    data: {
      diagramID,
      userID,
      message,
    },
    success: async (response) => {
      for (const reply of response.reply) {
        await delay(100);

        switch (reply.type) {
          case "text": {
            addBotMessage(reply.text);
            break;
          }
          case "url": {
            addBotMessage("LINK: " + reply.url);
            break;
          }
          default: {
            addBotMessage(
              `I don't know how to handle that reply (${reply.type})`,
            );
            break;
          }
        }
      }
    },
    error: (err) => {
      console.error("Error while sending message", err);
    },
  });
}
