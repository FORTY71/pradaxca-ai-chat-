const apiKey = "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
";

async function sendMessage() {
  const inputEl = document.getElementById("user-input");
  const message = inputEl.value.trim();
  if (!message) return;

  appendMessage("user", message);
  inputEl.value = "";

  appendMessage("bot", "⏳ Mengetik...");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Kamu adalah PradaxcaAI, asisten anime yang pintar dan menggemaskan." },
                   { role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    replaceLastBotMessage(reply);
  } catch (err) {
    replaceLastBotMessage("❌ Gagal mendapatkan balasan.");
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user" : "bot";
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function replaceLastBotMessage(text) {
  const chatBox = document.getElementById("chat-box");
  const messages = chatBox.getElementsByClassName("bot");
  if (messages.length > 0) {
    messages[messages.length - 1].innerText = text;
  }
}
