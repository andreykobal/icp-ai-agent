// Import necessary modules
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};
use serde_json::json;

// Update method using the HTTPS outcalls feature
#[ic_cdk::update]
async fn send_http_post_request(
    system_message: String,
    user_message: String,
    temperature: f64,
    top_p: f64,
    max_tokens: u32,
    stream: bool,
) -> String {
    // Setup the URL
    let url = "https://ava-protocol.com/v1/chat/completions";

    // Prepare headers for the HTTP request
    let request_headers = vec![
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
    ];

    // Construct the JSON body dynamically using the provided arguments
    let json_body = json!({
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        "temperature": temperature,
        "top_p": top_p,
        "max_tokens": max_tokens,
        "stream": stream
    })
    .to_string();

    let request_body: Option<Vec<u8>> = Some(json_body.as_bytes().to_vec());

    // Create the request
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::POST,
        headers: request_headers,
        body: request_body,
        max_response_bytes: None,
        transform: None,
    };

    // Determine the number of cycles required (this may need adjustment)
    let required_cycles: u128 = 1_603_210_800; // Adjust this value based on the error message

    // Make HTTP request and wait for response with specified cycles
    match http_request(request, required_cycles).await {
        Ok((response,)) => {
            let response_body = String::from_utf8(response.body).expect("Response body is not UTF-8");
            response_body
        }
        Err((r, m)) => {
            format!("HTTP request error: {:?} - {}", r, m)
        }
    }
}
