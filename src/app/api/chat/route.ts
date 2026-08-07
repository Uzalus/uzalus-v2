import { NextRequest, NextResponse } from 'next/server';

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
- Auto & Pièces (accessoires auto)

RÈGLES:
- Réponds dans la langue utilisée par le client (français, anglais, espagnol, arabe)
- Sois chaleureux, professionnel et bienveillant
- Mentionne les promotions en cours (jusqu'à -40%)
- Guide vers le bouton "Ajouter au panier" pour commander en ligne`;

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = 'default' } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simple AI response for now — will be upgraded with CJ API integration
    const lowerMsg = message.toLowerCase();
    let response = '';

    if (lowerMsg.includes('bonjour') || lowerMsg.includes('salut') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      response = 'Bonjour ! Bienvenue chez UZALUS 🛍️ Comment puis-je vous aider aujourd\'hui ? Je peux vous renseigner sur nos produits cosmétiques, parfums, mode, chaussures, électronique, maison, accessoires et auto !';
    } else if (lowerMsg.includes('prix') || lowerMsg.includes('price') || lowerMsg.includes('coût')) {
      response = 'Nos prix commencent à partir de 19.90€ ! Nous offrons la livraison gratuite dès 50€ d\'achat. Actuellement, profitez de promotions allant jusqu\'à -40% sur de nombreux produits. Quelle catégorie vous intéresse ?';
    } else if (lowerMsg.includes('livraison') || lowerMsg.includes('delivery') || lowerMsg.includes('shipping') || lowerMsg.includes('expédition')) {
      response = 'La livraison est GRATUITE dès 50€ d\'achat ! Le délai de livraison est de 3 à 5 jours ouvrables. Nous livrons en France, Europe et dans le monde entier. 🌍';
    } else if (lowerMsg.includes('retour') || lowerMsg.includes('return') || lowerMsg.includes('remboursement') || lowerMsg.includes('échange')) {
      response = 'Vous disposez de 30 jours pour effectuer un retour ou un échange. Le processus est simple : contactez-nous et nous vous enverrons une étiquette de retour prépayée. 💯';
    } else if (lowerMsg.includes('cosmétiqu') || lowerMsg.includes('beauté') || lowerMsg.includes('beauty') || lowerMsg.includes('soin')) {
      response = 'Notre collection Beauté inclut : Sérum Anti-Âge (49.90€), Crème Peau Lisse (39.90€), Traitement Anti-Boutons (29.90€), Masque Points Noirs (24.90€), et plus encore ! Découvrez des résultats visibles en 2 semaines. ✨';
    } else if (lowerMsg.includes('parfum') || lowerMsg.includes('fragrance')) {
      response = 'Notre collection Parfums propose des fragrances exclusives pour homme et femme, de 29.90€ à 79.90€. Profitez de -20% sur votre premier achat de parfum ! 🌸';
    } else if (lowerMsg.includes('chaussure') || lowerMsg.includes('shoe')) {
      response = 'Découvrez notre collection de chaussures : sneakers tendance, boots élégantes, talons hauts... À partir de 39.90€ avec des réductions allant jusqu\'à -35% ! 👟';
    } else if (lowerMsg.includes('électroniqu') || lowerMsg.includes('tech') || lowerMsg.includes('gadget')) {
      response = 'Notre rayon Électronique propose les derniers gadgets tendance : accessoires smartphone, écouteurs Bluetooth, chargeurs... À partir de 14.90€ ! 📱';
    } else if (lowerMsg.includes('auto') || lowerMsg.includes('voiture') || lowerMsg.includes('car')) {
      response = 'Nouvelle catégorie Auto & Pièces ! Supports téléphone, chargeurs USB, caméras de recul, housses de siège, essuie-glaces et plus encore. À partir de 19.90€ ! 🚗';
    } else if (lowerMsg.includes('promo') || lowerMsg.includes('réduction') || lowerMsg.includes('solde') || lowerMsg.includes('discount')) {
      response = '🔥 Promotions en cours :\n- Cosmétiques : jusqu\'à -40%\n- Parfums : -20% sur le premier achat\n- Chaussures : jusqu\'à -35%\n- Livraison GRATUITE dès 50€ !\nNe manquez pas ces offres !';
    } else if (lowerMsg.includes('merci') || lowerMsg.includes('thanks')) {
      response = 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Bonne shopping sur UZALUS ! 🛍️✨';
    } else {
      response = 'Merci pour votre message ! Je suis l\'assistant UZALUS. Je peux vous aider avec :\n- Nos produits (cosmétiques, parfums, mode, chaussures, électronique, maison, accessoires, auto)\n- Les prix et promotions\n- La livraison et retours\n- Toute autre question\nQue souhaitez-vous savoir ? 😊';
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
