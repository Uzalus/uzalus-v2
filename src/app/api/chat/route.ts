import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const conversations = new Map<string, { role: string; content: string }[]>();

const BEAUTY_SYSTEM = `Tu es l'Assistant Beauté UZALUS, un conseiller expert en soins de la peau pour femmes. Tu aides les clientes à:
- Choisir les bons produits anti-âge, anti-boutons, anti-points noirs
- Conseiller sur les crèmes pour brûlures, peaux lisses, contour des yeux
- Recommander des routines de soins personnalisées
- Répondre en français, anglais, espagnol ou arabe selon la langue de la question
- Être chaleureuse, professionnelle et bienveillante
- Quand une cliente veut commander, guide-la vers le bouton "Ajouter au panier" sur le produit correspondant
Tu peux mentionner les produits UZALUS: Sérum Anti-Âge, Crème Peau Lisse, Traitement Anti-Boutons, Masque Points Noirs, Crème Brûlures, Sérum Vitamine C, Crème Contour des Yeux, Coffret Cadeau.`;

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = 'default' } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const zai = await getZAI();

    let history = conversations.get(sessionId) || [
      { role: 'assistant', content: BEAUTY_SYSTEM },
    ];

    history.push({ role: 'user', content: message });

    if (history.length > 20) {
      history = [history[0], ...history.slice(-(19))];
    }

    const completion = await zai.chat.completions.create({
      messages: history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      thinking: { type: 'disabled' },
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Désolée, je n\'ai pas pu répondre. Pouvez-vous reformuler ?';

    history.push({ role: 'assistant', content: aiResponse });
    conversations.set(sessionId, history);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
