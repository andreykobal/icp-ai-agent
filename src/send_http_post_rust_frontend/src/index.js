import { send_http_post_rust_backend } from "../../declarations/send_http_post_rust_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const userPrompt = document.getElementById("userPrompt").value.trim();
  if (!userPrompt) return;

  button.setAttribute("disabled", true);

  // Display user's message
  displayMessage(userPrompt, "user-message");
  document.getElementById("userPrompt").value = "";  // Clear input field

  // Backend request parameters
  const systemMessage = "You are Nastya, 18 years old.";
  const temperature = 0.7;
  const top_p = 0.9;
  const maxTokens = 128;
  const stream = false;

  try {
    const response = await send_http_post_rust_backend.send_http_post_request(
      systemMessage,
      userPrompt,
      temperature,
      top_p,
      maxTokens,
      stream
    );

    const responseJson = JSON.parse(response);
    const assistantMessage = responseJson.choices[0].message.content;

    // Display assistant's message
    displayMessage(assistantMessage, "bot-message");
  } catch (error) {
    displayMessage(`Error: ${error.message}`, "bot-message");
  } finally {
    button.removeAttribute("disabled");
  }
});

function displayMessage(text, className) {
  const messageContainer = document.createElement("div");
  messageContainer.className = className;
  messageContainer.innerText = text;

  const messagesContainer = document.getElementById("messagesContainer");
  messagesContainer.appendChild(messageContainer);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to the latest message
}
