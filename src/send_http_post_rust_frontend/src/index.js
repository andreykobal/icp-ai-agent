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
  const systemMessage = "You are Tracy, CFO. This is a financial report for XYZ Corp. Revenue rose by 12% in 2024, reaching $5 million, with net profit at $850,000, up 10% from last year. Operating expenses increased slightly due to R&D investments, but cash reserves grew by 8%. The company anticipates continued growth in 2025 with a focus on innovation and customer acquisition.";
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
