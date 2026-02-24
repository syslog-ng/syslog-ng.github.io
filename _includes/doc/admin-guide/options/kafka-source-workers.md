- One **main worker** that fetches messages from the Kafka broker and stores them into an internal queue.
- A second worker that processes the queued messages and forwards them to the configured destination.

Although the source can operate using a single worker, this configuration typically results in a significant performance penalty compared to the default multi-worker setup.

Increasing the number of workers beyond two may further improve throughput, especially when the main worker can fetch messages at high speed. In such cases, you may also need to fine-tune related options such as single-worker-queue(), log-fetch-limit(), log-fetch-delay(), log-fetch-retry-delay() and log-fetch-queue-full-delay().
