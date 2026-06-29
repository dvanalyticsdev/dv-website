const PORT = 8788;

async function sendChatRequest(message, history = []) {
  const url = `http://localhost:${PORT}/api/chat`;
  const start = Date.now();
  console.log(`\nSending message to server: "${message}"`);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        page: 'home',
        history,
      }),
    });

    const duration = Date.now() - start;
    console.log(`Server response status: ${response.status} (took ${duration}ms)`);
    const data = await response.json();
    if (!response.ok) {
      console.error('Server error details:', JSON.stringify(data, null, 2));
    } else {
      console.log('Server response:');
      console.log(`Answer:\n${data.answer}\n`);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

async function run() {
  const welcomeMsg = "Hi! I'm Eva, your Agentify AI Guide. I can help you with anything on our site—from details on our training programs and career roadmaps, to enterprise AI services, office locations, and our mission. What can I help you find today?";
  
  // Test greeting with Eva as a website assistant
  await sendChatRequest('Hello!', [
    { role: 'assistant', content: welcomeMsg },
    { role: 'user', content: 'Hello!' }
  ]);
}

// Give a short delay to ensure the server is listening
setTimeout(run, 1500);
