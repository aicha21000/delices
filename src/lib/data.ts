export type Product = {
    id: string;
    name: string;
    description: string;
    priceUnit: number;
    priceBox6: number;
    priceBox15: number;
    image: string;
    category: 'gateaux' | 'biscuits';
};

export const products: Product[] = [
    // Catégorie Prix: 2,50€ / 6: 14€ / 15: 35€
    {
        id: '1',
        name: 'Baklawa Royale',
        description: 'La reine des tables orientales. Des couches de pâte filo croustillante alternées avec des amandes grillées concassées, le tout arrosé d\'un miel pur parfumé à la fleur d\'oranger. Une texture parfaite entre le croquant et le fondant.',
        priceUnit: 2.50,
        priceBox6: 14.00,
        priceBox15: 35.00,
        image: '/images/baklawa.jpg',
        category: 'gateaux',
    },
    {
        id: '2',
        name: 'Gâteaux aux Amandes',
        description: 'La quintessence de l\'amande. Ces gâteaux moelleux révèlent toute la richesse de la poudre d\'amande, avec une texture fondante et un parfum délicat. Un classique raffiné de la pâtisserie orientale.',
        priceUnit: 2.50,
        priceBox6: 14.00,
        priceBox15: 35.00,
        image: '/images/gateaux-amandes.png',
        category: 'gateaux',
    },
    {
        id: '3',
        name: 'Makrout aux Dattes',
        description: 'L\'emblème de la pâtisserie traditionnelle. De la semoule fine dorée au four ou frite, fourrée d\'une pâte de dattes onctueuse parfumée à la cannelle et aux clous de girofle, le tout enrobé de miel.',
        priceUnit: 2.50,
        priceBox6: 14.00,
        priceBox15: 35.00,
        image: '/images/makrout.png',
        category: 'gateaux',
    },
    {
        id: '4',
        name: 'Tcharek Msaker',
        description: 'Les cornes de gazelle poudrées. Un croissant de lune fondant farci aux amandes, généreusement enrobé de sucre glace. Une élégance blanche qui cache un cœur riche et savoureux.',
        priceUnit: 2.50,
        priceBox6: 14.00,
        priceBox15: 35.00,
        image: '/images/tcharek.png',
        category: 'gateaux',
    },

    // Catégorie Prix: 2,00€ / 6: 12€ / 15: 30€
    {
        id: '5',
        name: 'Bradj',
        description: 'Le gâteau traditionnel algérien par excellence. Ces petits gâteaux farcis de pâte de dattes et parfumés à la fleur d\'oranger sont un délice fondant. Leur forme caractéristique et leur goût authentique en font une spécialité incontournable.',
        priceUnit: 2.00,
        priceBox6: 12.00,
        priceBox15: 30.00,
        image: '/images/bradj.png',
        category: 'gateaux',
    },
    {
        id: '6',
        name: 'Makrout au Four',
        description: 'La version dorée et croustillante du makrout traditionnel. Cuit au four pour une texture plus légère, ce losange de semoule fourré de pâte de dattes parfumée offre une alternative savoureuse au makrout frit.',
        priceUnit: 2.00,
        priceBox6: 12.00,
        priceBox15: 30.00,
        image: '/images/makrout-four.jpg',
        category: 'gateaux',
    },

    // Catégorie Prix: 1,50€ / 6: 6€ / 15: 20€
    {
        id: '7',
        name: 'Sablés Confiture',
        description: 'Le classique indémodable. Un biscuit sablé au beurre, friable à souhait, uni par un cœur généreux de confiture de fraise ou d\'abricot. Simple, efficace et terriblement addictif.',
        priceUnit: 1.50,
        priceBox6: 6.00,
        priceBox15: 20.00,
        image: '/images/sables-confiture.jpg',
        category: 'biscuits',
    },
    {
        id: '8',
        name: 'Sablés Chocolat',
        description: 'L\'alliance parfaite du sablé fondant et du chocolat intense. Ces biscuits au cacao pur offrent une texture friable et un goût chocolaté irrésistible. Un incontournable pour les amateurs de chocolat.',
        priceUnit: 1.50,
        priceBox6: 6.00,
        priceBox15: 20.00,
        image: '/images/sables-chocolat.png',
        category: 'biscuits',
    },
    {
        id: '9',
        name: 'Boule de Neige',
        description: 'Une douceur blanche comme neige. Ces boules fondantes à la noix de coco sont un nuage de plaisir en bouche. Légers et parfumés, ils sont parfaits pour accompagner un thé à la menthe.',
        priceUnit: 1.50,
        priceBox6: 6.00,
        priceBox15: 20.00,
        image: '/images/gateaux-coco.jpg',
        category: 'biscuits',
    },
    {
        id: '10',
        name: 'Cookies',
        description: 'Des cookies gourmands aux pépites de chocolat. Croustillants à l\'extérieur et moelleux à l\'intérieur, ces biscuits américanisés à la française raviront petits et grands.',
        priceUnit: 1.50,
        priceBox6: 6.00,
        priceBox15: 20.00,
        image: '/images/gateaux-fruits.png', // Temporaire
        category: 'biscuits',
    },
    {
        id: '11',
        name: 'Madeleine',
        description: 'La madeleine française revisitée. Ces petits gâteaux moelleux au parfum de citron et de fleur d\'oranger apportent une touche de douceur à vos pauses gourmandes.',
        priceUnit: 1.50,
        priceBox6: 6.00,
        priceBox15: 20.00,
        image: '/images/gateaux-citron.jpg', // Temporaire
        category: 'biscuits',
    },

    // Catégorie Prix: 1,00€ / 6: 6€ / 15: 15€
    {
        id: '12',
        name: 'Croquets aux Amandes',
        description: 'Le biscuit sec par excellence. Croquant, doré, aux éclats d\'amandes ou de raisins secs. C\'est le biscuit "de tous les jours" qui se trempe joyeusement dans le café au lait.',
        priceUnit: 1.00,
        priceBox6: 6.00,
        priceBox15: 15.00,
        image: '/images/croquets.png',
        category: 'biscuits',
    },
];
