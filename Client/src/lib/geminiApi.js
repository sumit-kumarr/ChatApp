export async function getGeminiResponse(message) {
  const apiKey = 'AIzaSyDC_T756pM450zJ4OaqhYimqfwlJivdtgw'; // Your Gemini API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: message }] }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('Gemini API response:', data);

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else if (data?.error) {
      return `Error: ${data.error.message || 'Unknown error from Gemini API.'}`;
    } else {
      return "Sorry, I couldn't understand that (no valid response).";
    }
  } catch (err) {
    console.error('Gemini API error:', err);
    return "Sorry, there was an error connecting to the chatbot.";
  }
} 