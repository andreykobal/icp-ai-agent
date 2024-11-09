import { send_http_post_rust_backend } from "../../declarations/send_http_post_rust_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  // Retrieve the user prompt from the input field
  const userPrompt = document.getElementById("userPrompt").value.toString();
  button.setAttribute("disabled", true);

  // Hardcoded values for the backend request
  const systemMessage = "You are Nastya, 18 years old.";
  const temperature = 0.7;
  const top_p = 0.9;
  const maxTokens = 128;
  const stream = false;

  try {
    // Call the send_http_post_request method on the backend canister
    const response = await send_http_post_rust_backend.send_http_post_request(
      systemMessage,
      userPrompt,
      temperature,
      top_p,
      maxTokens,
      stream
    );

    // Display the response
    document.getElementById("response").innerText = response;
  } catch (error) {
    document.getElementById("response").innerText = `Error: ${error.message}`;
  } finally {
    button.removeAttribute("disabled");
  }

  return false;
});
