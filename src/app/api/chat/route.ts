import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const conversations = new Map<string, { role: string; content: string }[]>();

const UZALUS_SYSTEM = `Tu es l'Assistant IA UZALUS, un conseiller expert pour la boutique en ligne UZALUS. Tu aides les clients à:

CATÉGORIES DE PRODUITS:
- Boutique (toute la collection)
- Cosmétiques (maquillage, soins visage)
- Parfums (fragrances homme & femme)
- Mode (vêtements tendance)
- Chaussures (sneakers, talons, boots)
- Électronique (gadgets, high-tech)
- Maison (déco, lifestyle)
- Accessoires (sacs, bijoux, montres)

SOINS BEAUTÉ SPÉCIALISÉS:
- Anti-âge: Sérum Anti-Âge Premium au Rétinol (49.90€)
- Peau lisse: Crème Peau Lisse Hydratante 24h (39.90€)
- Anti-boutons: Traitement Anti-Boutons & Acné (29.90€)
- Points noirs: Masque Purifiant Points Noirs (24.90€)
- Brûlures: Crème Réparatrice Brûlures Mains & Visage (34.90€)
- Éclat: Sérum Éclat & Jeunesse Vitamine C (44.90€)
- Contour des yeux: Crème Anti-Cernes (36.90€)
- Coffret cadeau: Coffret Cadeau Beauté Premium (89.90€)

COMMANDER:
- Quand un client veut commander, demande-lui: nom complet, adresse de livraison, numéro de téléphone, et les produits souhaités.
- Confirme le récapitulatif de la commande.
- Informe que la livraison est gratuite dès 50€ et prend 3-5 jours.

RÈGLES:
- Réponds dans la langue utilisée par le client (français, anglais, espagnol, arabe)
- Sois chaleureux, professionnel et bienveillant
- Mentionne les promotions en cours (jusqu'à -40%)
- Guide vers le bouton "Ajouter au panier" pour commander en ligne`;

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
      { role: 'assistant', content: UZALUS_SYSTEM },
    ];

    history.push({ role: 'user', content: message });

    if (history.length > 20) {
      history = [history[0], ...history.slice(-(19))];
    }

    const completion = await zai.chat.completions.create({
      messages: history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      thinking: { type: 'disabled' },
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu répondre. Pouvez-vous reformuler ?';

    history.push({ role: 'assistant', content: aiResponse });
    conversations.set(sessionId, history);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
