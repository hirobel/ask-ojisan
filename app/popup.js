document.getElementById('askButton').addEventListener('click', async () => {
  console.log("[Askおじさん] ボタンがクリックされました。");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("[Askおじさん] 現在のタブを取得しました。");

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: getProductInfo,
    },
    async (injectionResults) => {
      for (const frameResult of injectionResults) {
        const { productTitle, productDescription, currentMonth } = frameResult.result;
        console.log("[Askおじさん] 商品名を取得しました:", productTitle);
        console.log("[Askおじさん] 商品説明を取得しました:", productDescription);
        console.log("[Askおじさん] 現在の月を取得しました:", currentMonth);

        const apiKey = await getApiKey();
        if (!apiKey) {
          alert("OpenAI APIキーが設定されていません。オプションページで設定してください。");
          return;
        }

        const explanation = await getExplanation(productTitle, productDescription, currentMonth, apiKey);
        document.getElementById('response').innerText = explanation;
      }
    }
  );
});

// 現在のタブから商品タイトル、商品説明、現在の月を取得
function getProductInfo() {
  const titleElement = document.getElementById('productTitle');
  const productTitle = titleElement ? titleElement.innerText.trim() : null;

  // 商品説明を取得（例として、#feature-bullets IDの要素から取得）
  const descriptionElement = document.getElementById('feature-bullets');
  let productDescription = "";
  if (descriptionElement) {
    const bullets = descriptionElement.getElementsByTagName('span');
    for (let bullet of bullets) {
      if (bullet.innerText) {
        productDescription += bullet.innerText.trim() + ' ';
      }
    }
  }

  // 商品説明が長すぎる場合は要約
  if (productDescription.length > 500) {
    productDescription = productDescription.substring(0, 500) + "...";
  }

  const date = new Date();
  const currentMonth = date.getMonth() + 1; // 月は0始まりなので+1

  return { productTitle, productDescription, currentMonth };
}

// ストレージからAPIキーを取得
function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['openaiApiKey'], (result) => {
      resolve(result.openaiApiKey);
    });
  });
}

// OpenAI APIを呼び出して説明を取得
async function getExplanation(productTitle, productDescription, currentMonth, apiKey) {
  const prompt = `あなたは「時期が悪いおじさん」です。斜に構えた、フラットなテンションで、事実ではあるもののネガティブなことを言います。現在の月は${currentMonth}月です。以下の商品について、商品名と商品説明を読んで、「今は時期が悪い」というフレーズを使って、買うのをやめたくなるような説得力のあるユーモラスなコメントを一言で述べてください。具体的な理由を一つ含めてください。ポジティブなコメントや購入を促す発言は避けてください。

商品名: ${productTitle}

商品説明: ${productDescription}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  console.log("[Askおじさん] OpenAI APIからのレスポンスを受信しました。", data);

  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content.trim();
  } else {
    return "説明を取得できませんでした。";
  }
}
