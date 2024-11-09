// Import necessary modules
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};

// Update method using the HTTPS outcalls feature
#[ic_cdk::update]
async fn send_http_post_request() -> String {
    // Setup the URL
    let url = "https://ava-protocol.com/v1/chat/completions";

    // Prepare headers for the HTTP request
    let request_headers = vec![
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
    ];

    // Construct the JSON body
    let json_body = r#"
    {
        "messages": [
            {"role": "system", "content": "You are Nastya, 18 years old."},
            {"role": "user", "content": "What is your name?"}
        ],
        "temperature": 0.7,
        "top_p": 0.9,
        "max_tokens": 128,
        "stream": false
    }
    "#;

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
