import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = anthropicApiKey
  ? new Anthropic({ apiKey: anthropicApiKey })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!anthropic) {
      return NextResponse.json(
        { error: 'Missing ANTHROPIC_API_KEY' },
        { status: 500 }
      );
    }

    const { productText } = await request.json();

    if (!productText || typeof productText !== 'string') {
      return NextResponse.json(
        { error: 'Product text is required' },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a nutrition expert analyzing food products for trans fats. Analyze the following product name or ingredient list and determine if it likely contains trans fats.

Product/Ingredients: ${productText}

Provide your response in the following JSON format:
{
  "hasTransFat": boolean,
  "confidence": "high" | "medium" | "low",
  "reasons": ["reason 1", "reason 2", ...],
  "ingredients": ["ingredient 1", "ingredient 2", ...] (list any trans-fat-containing ingredients found),
  "recommendation": "a brief recommendation for the user"
}

Trans fat indicators include:
- Partially hydrogenated oils (vegetable oil, soybean oil, etc.)
- Hydrogenated oils
- Shortening
- Margarine (some types)
- Fried foods (especially from restaurants)
- Baked goods (cookies, crackers, pastries, pie crusts)
- Microwave popcorn
- Frozen pizza
- Non-dairy creamers
- Stick margarine

Respond ONLY with valid JSON, no additional text.`
        }
      ]
    });

    const responseText = message.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim();

    let analysis: unknown;
    try {
      analysis = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Invalid JSON from Claude:', responseText);
      return NextResponse.json(
        { error: 'Invalid response from AI model' },
        { status: 500 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing product:', error);
    return NextResponse.json(
      { error: 'Failed to analyze product' },
      { status: 500 }
    );
  }
}
