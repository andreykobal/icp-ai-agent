# CFO AI Agent on ICP with Rust

This project implements a decentralized, on-chain AI CFO Agent hosted on the Internet Computer Protocol (ICP) using a Rust backend and a frontend interface. The agent provides a conversational interface for discussing financial matters, generating annual reports, and, in the future, will perform on-chain financial management tasks.

## Current Capabilities

1. **Annual Reports:** The AI can generate and deliver financial reports with insights into company performance, revenue, profit growth, expenses, and projections.
2. **Conversational Financial Assistant:** Users can interact with the AI in real time to discuss the financial status of the company, receiving insightful responses based on financial data.

## Future Features

The CFO AI Agent will support advanced on-chain accounting and offer enhanced features such as:
- **Financial Analysis:** Analyzing financial statements to provide actionable insights.
- **Invoice Management:** Sending invoices and tracking their status.
- **Automated Payments:** Paying invoices directly on-chain.

## Technical Overview

The project leverages the ICP’s HTTPS outcalls feature to send HTTP POST requests, allowing secure interactions between the Rust canister backend and the AI's API. The frontend, implemented in JavaScript, interacts with the backend canister to facilitate real-time user queries and display AI responses.

## Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/) installed
- [dfx (Dfinity SDK)](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) to deploy on ICP

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/cfo-ai-agent.git
   cd cfo-ai-agent
   ```

2. **Deploy on ICP**
   - Install dfx and start a local Internet Computer instance.
   - Deploy the canister with `dfx deploy`.

3. **Frontend Setup**
   - Link the frontend to your deployed canister and serve it locally.

### Usage

To interact with the AI CFO agent:
1. Enter financial questions or year-end queries into the input field on the frontend interface.
2. View the AI-generated responses based on the company's financial data.

### Example Usage

The CFO AI Agent can handle prompts like:
- "What was our net profit for 2024?"
- "Analyze XYZ Corp's revenue growth over the past year."
  
This interaction uses `send_http_post_request`, which is structured as follows:

```rust
async fn send_http_post_request(
    system_message: String,
    user_message: String,
    temperature: f64,
    top_p: f64,
    max_tokens: u32,
    stream: bool,
) -> String { /* function code here */ }
```

### Code Structure

- **Backend (Rust Canister)**: Implements HTTP POST requests using ICP's HTTPS outcall feature.
- **Frontend (JavaScript)**: Provides a web interface where users can interact with the CFO agent.

### Future Development

The following capabilities will be added:
- **Financial Analytics**: Comprehensive analysis of company financials.
- **Invoice Automation**: Handling and paying invoices.
- **On-chain Accounting**: Enabling robust on-chain accounting mechanisms.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License.
