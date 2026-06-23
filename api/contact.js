export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { name, email } = req.body;

    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/leads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          name,
          email
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return res.status(500).json({
        error: errorText
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received.'
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
