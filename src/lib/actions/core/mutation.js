

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export const FetchServer=async(path)=>{
  const response = await fetch(`${baseUrl}${path}`)
  return response.json()

}

// console.log(baseUrl,"from env=========================")
export const mutationServer = async (path, data,method="POST") => {
  try {
    console.log('Posting to:', `${baseUrl}${path}`);

    const response = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const text = await response.text();

      console.error(`API error ${response.status}:`, text);

      return {
        ok: false,
        error: `Server error: ${response.status}`,
        details: text,
      };
    }

    const result = await response.json();

    return {
      ok: true,
      data: result,
    };
  } catch (error) {
    console.error('Fetch failed:', error);

    return {
      ok: false,
      error: error.message || 'Network error',
    };
  }
};