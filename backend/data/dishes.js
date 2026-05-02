const dishes = [
  {
    id: 1, name: "Chicken Biryani", category: "Pakistani",
    keywords: ["biryani","chicken biryani","briyani","rice"],
    description: "Aromatic basmati rice layered with spiced chicken and saffron.",
    emoji: "🍚", image: "/images/chicken_biryani.png",
    nutrition: { calories: 490, protein: 28, carbs: 52, fat: 18, fiber: 3, serving: "1 plate (350g)" },
    ingredients: [
      "500g chicken pieces","2 cups basmati rice","1 cup yogurt","2 onions (sliced)","2 tomatoes (chopped)",
      "1 tbsp ginger-garlic paste","1 tsp turmeric","1 tbsp biryani masala","1/2 tsp saffron in milk",
      "4 green cardamom","2 bay leaves","3 tbsp cooking oil","Salt to taste","Fresh cilantro & mint"
    ],
    steps: [
      "Marinate chicken with yogurt, ginger-garlic paste, turmeric, biryani masala and salt for 30 min.",
      "Soak basmati rice for 20 min, then parboil with bay leaves and cardamom until 70% cooked. Drain.",
      "Heat oil, fry sliced onions until deep golden. Remove half for garnish.",
      "Add marinated chicken to the pot, cook on medium heat for 15 min until chicken is done.",
      "Layer the parboiled rice over the chicken. Drizzle saffron milk and spread fried onions on top.",
      "Cover tightly with foil and lid. Cook on very low heat (dum) for 20 min.",
      "Gently mix layers, garnish with cilantro and mint. Serve hot with raita."
    ]
  },
  {
    id: 2, name: "Nihari", category: "Pakistani",
    keywords: ["nihari","nahari","stew","beef nihari"],
    description: "Slow-cooked beef stew simmered overnight with rich spices.",
    emoji: "🥘", image: "/images/nihari.png",
    nutrition: { calories: 550, protein: 35, carbs: 20, fat: 38, fiber: 2, serving: "1 bowl (300g)" },
    ingredients: [
      "500g beef shank with bone","2 onions (sliced)","2 tbsp nihari masala","1 tbsp ginger-garlic paste",
      "1 tbsp wheat flour","2 tbsp ghee","1 tsp red chili powder","1/2 tsp turmeric",
      "4 cups water","Salt to taste","Julienned ginger","Fresh cilantro","Green chilies","Lemon wedges"
    ],
    steps: [
      "Heat ghee, fry onions until deep golden brown.",
      "Add beef, ginger-garlic paste, turmeric and red chili. Sear on high for 5 min.",
      "Add nihari masala and 4 cups water. Bring to boil.",
      "Reduce heat to lowest, cover and simmer for 4-5 hours until meat falls off bone.",
      "Mix wheat flour in 1/4 cup water, stir into the stew to thicken.",
      "Simmer 15 more minutes. Adjust salt.",
      "Serve topped with julienned ginger, cilantro, green chilies and lemon."
    ]
  },
  {
    id: 3, name: "Haleem", category: "Pakistani",
    keywords: ["haleem","daleem"],
    description: "Thick stew of lentils, wheat and shredded meat slow-cooked to perfection.",
    emoji: "🫕", image: "/images/haleem.png",
    nutrition: { calories: 420, protein: 30, carbs: 40, fat: 15, fiber: 8, serving: "1 bowl (300g)" },
    ingredients: [
      "300g beef/mutton","1/2 cup chana dal","1/4 cup wheat","1/4 cup barley",
      "2 onions (fried)","1 tbsp ginger-garlic paste","1 tsp garam masala","1 tsp red chili powder",
      "3 tbsp ghee","Salt to taste","Julienned ginger","Lemon","Green chilies","Mint leaves"
    ],
    steps: [
      "Soak lentils, wheat and barley overnight. Boil until very soft.",
      "Separately cook the meat with ginger-garlic paste and spices until tender.",
      "Shred the cooked meat and combine with the lentil mixture.",
      "Blend partially for a thick consistency. Simmer on low for 1 hour.",
      "Temper with ghee and fried onions.",
      "Serve garnished with ginger, lemon, green chilies and mint."
    ]
  },
  {
    id: 4, name: "Chicken Karahi", category: "Pakistani",
    keywords: ["karahi","kadai","chicken karahi","kadhai"],
    description: "Wok-tossed chicken in a tomato-based spicy gravy.",
    emoji: "🍲", image: "/images/chicken_karahi.png",
    nutrition: { calories: 380, protein: 32, carbs: 12, fat: 24, fiber: 3, serving: "1 plate (250g)" },
    ingredients: [
      "500g chicken (bone-in)","4 tomatoes (chopped)","2 tbsp cooking oil","1 tbsp ginger (julienned)",
      "6 green chilies","1 tsp cumin seeds","1 tsp coriander powder","1 tsp red chili flakes",
      "1/2 tsp turmeric","Salt to taste","Fresh cilantro","1 tsp garam masala"
    ],
    steps: [
      "Heat oil in a wok (karahi). Add cumin seeds and let them splutter.",
      "Add chicken pieces, sear on high heat for 5 minutes.",
      "Add chopped tomatoes, turmeric, coriander powder and salt. Cook until tomatoes break down.",
      "Cover and cook on medium heat for 20 minutes until chicken is tender.",
      "Add ginger, green chilies and red chili flakes. Toss on high heat for 5 min.",
      "Finish with garam masala and fresh cilantro. Serve with naan."
    ]
  },
  {
    id: 5, name: "Seekh Kebab", category: "Pakistani",
    keywords: ["seekh","kebab","seekh kebab","kabab","skewer"],
    description: "Spiced minced meat grilled on skewers over charcoal.",
    emoji: "🥩", image: "/images/seekh_kebab.png",
    nutrition: { calories: 320, protein: 26, carbs: 8, fat: 22, fiber: 1, serving: "4 pieces (200g)" },
    ingredients: [
      "500g minced beef/lamb","1 onion (finely chopped)","2 green chilies (minced)",
      "1 tbsp ginger-garlic paste","1 tsp cumin powder","1 tsp coriander powder",
      "1 tsp red chili powder","1 tsp garam masala","2 tbsp fresh cilantro","1 egg","Salt to taste"
    ],
    steps: [
      "Mix all ingredients thoroughly with the mince. Knead for 5 minutes.",
      "Refrigerate for 30 minutes to firm up.",
      "Mold mixture onto metal skewers in long sausage shapes.",
      "Grill on charcoal or broil in oven at 220°C for 12-15 minutes, turning once.",
      "Serve with mint chutney, sliced onions and naan."
    ]
  },
  {
    id: 6, name: "Chapli Kebab", category: "Pakistani",
    keywords: ["chapli","chapli kebab","peshawari"],
    description: "Flat spiced patties from Peshawar with a crispy exterior.",
    emoji: "🥙", image: "/images/chapli_kebab.png",
    nutrition: { calories: 350, protein: 22, carbs: 14, fat: 24, fiber: 2, serving: "2 pieces (180g)" },
    ingredients: [
      "500g minced beef","1 onion (chopped)","2 tomatoes (chopped)","2 green chilies",
      "1 tbsp pomegranate seeds","1 tsp cumin seeds","1 tsp coriander seeds (crushed)",
      "1 egg","2 tbsp corn flour","1 tsp red chili flakes","Oil for shallow frying","Salt to taste"
    ],
    steps: [
      "Mix mince with onion, tomatoes, green chilies and all spices.",
      "Add egg and corn flour, mix well until combined.",
      "Shape into flat round patties about 1/2 inch thick.",
      "Shallow fry in hot oil for 4-5 minutes each side until crispy and cooked through.",
      "Serve with naan, chutney and salad."
    ]
  },
  {
    id: 7, name: "Daal Chawal", category: "Pakistani",
    keywords: ["daal","dal","chawal","lentils","daal chawal"],
    description: "Comforting yellow lentils tempered with spices, served over steamed rice.",
    emoji: "🍛", image: "/images/daal_chawal.png",
    nutrition: { calories: 380, protein: 16, carbs: 58, fat: 10, fiber: 12, serving: "1 plate (350g)" },
    ingredients: [
      "1 cup masoor dal (red lentils)","1 cup basmati rice","1 onion (chopped)","2 tomatoes",
      "1 tsp turmeric","1 tsp cumin seeds","2 dried red chilies","2 cloves garlic",
      "2 tbsp ghee","Salt to taste","Fresh cilantro","Lemon juice"
    ],
    steps: [
      "Wash and boil lentils with turmeric and salt until very soft and creamy.",
      "Cook basmati rice separately until fluffy.",
      "For tadka: heat ghee, add cumin seeds, dried red chilies and sliced garlic.",
      "Add chopped onion and tomatoes to the tadka, cook until soft.",
      "Pour the tadka over the cooked lentils and stir.",
      "Serve lentils over rice with lemon juice and cilantro."
    ]
  },
  {
    id: 8, name: "Aloo Gosht", category: "Pakistani",
    keywords: ["aloo","gosht","aloo gosht","potato","meat"],
    description: "Tender meat and potatoes in a rich, spiced curry.",
    emoji: "🥔", image: "/images/aloo_gosht.png",
    nutrition: { calories: 450, protein: 30, carbs: 28, fat: 26, fiber: 4, serving: "1 bowl (300g)" },
    ingredients: [
      "500g mutton/beef","3 potatoes (quartered)","2 onions (sliced)","2 tomatoes",
      "1 tbsp ginger-garlic paste","1 tsp turmeric","1 tsp red chili powder","1 tsp cumin powder",
      "1 tsp garam masala","3 tbsp oil","Salt to taste","Fresh cilantro"
    ],
    steps: [
      "Heat oil, fry onions until golden. Add ginger-garlic paste.",
      "Add meat, sear on high for 5 min. Add all dry spices and tomatoes.",
      "Add 2 cups water, cover and simmer for 45 min until meat is tender.",
      "Add quartered potatoes, cook for another 20 min until potatoes are soft.",
      "Finish with garam masala and cilantro. Serve with roti."
    ]
  },
  {
    id: 9, name: "Butter Chicken", category: "Pakistani",
    keywords: ["butter chicken","murgh makhani","butter"],
    description: "Creamy tomato-based chicken in a velvety butter sauce.",
    emoji: "🧈", image: "/images/butter_chicken.png",
    nutrition: { calories: 520, protein: 34, carbs: 18, fat: 36, fiber: 2, serving: "1 plate (300g)" },
    ingredients: [
      "500g chicken breast","1 cup yogurt","1 tbsp ginger-garlic paste","1 can tomato puree",
      "1/2 cup heavy cream","3 tbsp butter","1 tsp garam masala","1 tsp red chili powder",
      "1 tsp cumin powder","1 tbsp honey","1 tsp fenugreek leaves","Salt to taste"
    ],
    steps: [
      "Marinate chicken in yogurt, ginger-garlic paste, red chili and salt for 1 hour.",
      "Grill or pan-sear the chicken until charred. Cut into pieces.",
      "Melt butter, add tomato puree and all spices. Simmer 15 min.",
      "Add cream and honey, stir until smooth and silky.",
      "Add the grilled chicken pieces, simmer 10 min.",
      "Crush fenugreek leaves and stir in. Serve with naan or rice."
    ]
  },
  {
    id: 10, name: "Palak Paneer", category: "Pakistani",
    keywords: ["palak","paneer","spinach","saag"],
    description: "Cubes of fresh paneer in a creamy spinach puree.",
    emoji: "🥬", image: "/images/palak_paneer.png",
    nutrition: { calories: 340, protein: 18, carbs: 14, fat: 24, fiber: 5, serving: "1 bowl (250g)" },
    ingredients: [
      "250g paneer (cubed)","300g fresh spinach","1 onion","2 tomatoes","2 green chilies",
      "1 tbsp ginger-garlic paste","1 tsp cumin seeds","1/2 tsp garam masala",
      "2 tbsp cream","2 tbsp ghee","Salt to taste"
    ],
    steps: [
      "Blanch spinach in boiling water for 2 min, then ice bath. Blend to smooth puree.",
      "Heat ghee, add cumin seeds, then onion and ginger-garlic paste. Sauté until golden.",
      "Add tomatoes and green chilies, cook until soft.",
      "Add spinach puree and all spices. Simmer 10 min.",
      "Lightly fry paneer cubes until golden, add to the spinach.",
      "Finish with cream and garam masala. Serve with roti."
    ]
  },
  {
    id: 11, name: "Zinger Burger", category: "Fast Food",
    keywords: ["zinger","zinger burger","chicken burger","crispy burger"],
    description: "Crispy fried chicken fillet in a toasted bun with spicy mayo.",
    emoji: "🍔", image: "/images/zinger_burger.png",
    nutrition: { calories: 580, protein: 28, carbs: 48, fat: 32, fiber: 2, serving: "1 burger (280g)" },
    ingredients: [
      "2 chicken breast fillets","1 cup buttermilk","1 cup flour","1/2 cup cornstarch",
      "1 tsp paprika","1 tsp garlic powder","1 tsp cayenne pepper","2 burger buns",
      "Lettuce leaves","2 tbsp mayo","1 tbsp hot sauce","Oil for deep frying","Salt and pepper"
    ],
    steps: [
      "Marinate chicken in buttermilk, salt and pepper for at least 2 hours.",
      "Mix flour, cornstarch, paprika, garlic powder and cayenne in a bowl.",
      "Coat each fillet in the flour mixture, pressing firmly. Double dip for extra crunch.",
      "Deep fry at 180°C for 6-7 min until golden and cooked through (internal 75°C).",
      "Mix mayo with hot sauce for spicy mayo.",
      "Toast buns, layer lettuce, fried chicken and spicy mayo. Serve immediately."
    ]
  },
  {
    id: 12, name: "Beef Burger", category: "Fast Food",
    keywords: ["beef burger","burger","hamburger","cheeseburger"],
    description: "Juicy beef patty with melted cheese, lettuce and special sauce.",
    emoji: "🍔", image: "/images/image_cd6120.png",
    nutrition: { calories: 620, protein: 35, carbs: 42, fat: 36, fiber: 2, serving: "1 burger (300g)" },
    ingredients: [
      "300g ground beef","2 burger buns","2 slices cheddar cheese","Lettuce leaves",
      "2 tomato slices","Pickle slices","1 tbsp ketchup","1 tbsp mustard",
      "1 tbsp mayo","1/2 onion (sliced)","Salt and pepper","1 tbsp butter"
    ],
    steps: [
      "Season ground beef with salt and pepper. Form into 2 patties slightly larger than buns.",
      "Cook patties on a hot griddle for 4 min per side for medium-well.",
      "Place cheese on patties in the last minute, cover to melt.",
      "Toast buns with butter on the griddle.",
      "Mix ketchup, mustard and mayo for special sauce.",
      "Assemble: bottom bun, sauce, lettuce, patty with cheese, tomato, onion, pickles, top bun."
    ]
  },
  {
    id: 13, name: "Shawarma", category: "Fast Food",
    keywords: ["shawarma","shwarma","wrap","doner"],
    description: "Spiced grilled chicken wrapped in pita with garlic sauce and pickles.",
    emoji: "🌯", image: "/images/shawarma.png",
    nutrition: { calories: 480, protein: 32, carbs: 38, fat: 22, fiber: 3, serving: "1 wrap (300g)" },
    ingredients: [
      "500g chicken thigh","2 pita/tortilla wraps","1 tbsp shawarma spice mix",
      "1 tbsp lemon juice","2 tbsp yogurt","1 tbsp olive oil","Pickled turnips",
      "Sliced tomatoes","Shredded lettuce","3 tbsp garlic sauce/toum","French fries (optional)"
    ],
    steps: [
      "Marinate chicken with shawarma spice, lemon juice, yogurt and olive oil for 2 hours.",
      "Grill chicken on high heat until charred and cooked. Slice thinly.",
      "Warm pita wraps on the grill for 30 seconds.",
      "Spread garlic sauce on pita, add lettuce, sliced chicken, tomatoes, pickles.",
      "Add fries if desired. Roll tightly and slice in half.",
      "Serve immediately with extra garlic sauce."
    ]
  },
  {
    id: 14, name: "Pepperoni Pizza", category: "Fast Food",
    keywords: ["pizza","pepperoni","pepperoni pizza","pie"],
    description: "Classic pizza with tangy tomato sauce, mozzarella and pepperoni.",
    emoji: "🍕", image: "/images/pepperoni_pizza.png",
    nutrition: { calories: 560, protein: 24, carbs: 62, fat: 26, fiber: 3, serving: "2 slices (280g)" },
    ingredients: [
      "2 cups flour","1 tsp yeast","1 tsp sugar","3/4 cup warm water","1 tbsp olive oil",
      "1/2 cup pizza sauce","1.5 cups shredded mozzarella","Pepperoni slices",
      "1 tsp dried oregano","1 tsp garlic powder","Salt to taste"
    ],
    steps: [
      "Mix flour, yeast, sugar, water, olive oil and salt. Knead 8 min until smooth.",
      "Let dough rise for 1 hour in a warm place.",
      "Preheat oven to 250°C (480°F). Roll dough into a 12-inch circle.",
      "Spread pizza sauce evenly, leaving a 1-inch border.",
      "Add mozzarella and arrange pepperoni slices on top.",
      "Bake for 10-12 min until crust is golden and cheese is bubbly.",
      "Sprinkle oregano, slice and serve hot."
    ]
  },
  {
    id: 15, name: "French Fries", category: "Fast Food",
    keywords: ["fries","french fries","chips","potato fries"],
    description: "Crispy golden potato fries seasoned with salt.",
    emoji: "🍟", image: "/images/french_fries.png",
    nutrition: { calories: 365, protein: 4, carbs: 48, fat: 18, fiber: 4, serving: "1 serving (150g)" },
    ingredients: [
      "4 large potatoes","Oil for deep frying","Salt to taste",
      "Optional: paprika, garlic powder, parsley"
    ],
    steps: [
      "Peel and cut potatoes into uniform sticks (1/4 inch thick).",
      "Soak in cold water for 30 min to remove excess starch. Pat dry thoroughly.",
      "First fry at 150°C for 5-6 min until soft but not colored. Remove and cool 10 min.",
      "Second fry at 190°C for 3-4 min until golden and crispy.",
      "Drain on paper towels, season immediately with salt. Serve hot."
    ]
  },
  {
    id: 16, name: "Chicken Wings", category: "Fast Food",
    keywords: ["wings","chicken wings","hot wings","buffalo wings"],
    description: "Crispy fried chicken wings tossed in spicy buffalo sauce.",
    emoji: "🍗", image: "/images/chicken_wings.png",
    nutrition: { calories: 430, protein: 32, carbs: 14, fat: 28, fiber: 1, serving: "8 pieces (250g)" },
    ingredients: [
      "1 kg chicken wings","1 cup flour","1 tsp paprika","1 tsp garlic powder",
      "3 tbsp hot sauce","2 tbsp butter","1 tbsp honey","Oil for frying",
      "Celery sticks","Ranch/blue cheese dressing","Salt and pepper"
    ],
    steps: [
      "Pat wings dry. Season with salt, pepper, paprika and garlic powder.",
      "Coat in flour, shaking off excess.",
      "Deep fry at 180°C for 10-12 min until golden and cooked (internal 75°C).",
      "Melt butter, mix with hot sauce and honey for buffalo sauce.",
      "Toss fried wings in the buffalo sauce until evenly coated.",
      "Serve with celery sticks and ranch dressing."
    ]
  },
  {
    id: 17, name: "Chicken Nuggets", category: "Fast Food",
    keywords: ["nuggets","chicken nuggets","mcnuggets"],
    description: "Bite-sized breaded chicken pieces fried to golden perfection.",
    emoji: "🟫", image: "/images/chicken_nuggets.png",
    nutrition: { calories: 340, protein: 20, carbs: 28, fat: 18, fiber: 1, serving: "10 pieces (180g)" },
    ingredients: [
      "500g chicken breast","1 cup breadcrumbs","1/2 cup flour","2 eggs",
      "1 tsp garlic powder","1 tsp onion powder","1/2 tsp paprika",
      "Oil for frying","Salt and pepper","Ketchup and BBQ sauce for dipping"
    ],
    steps: [
      "Cut chicken breast into bite-sized nugget shapes.",
      "Season flour with garlic powder, onion powder, paprika, salt and pepper.",
      "Set up breading station: flour → beaten eggs → breadcrumbs.",
      "Coat each nugget: flour, then egg, then breadcrumbs. Press firmly.",
      "Deep fry at 180°C for 4-5 minutes until golden brown.",
      "Drain on paper towels. Serve with ketchup and BBQ sauce."
    ]
  },
  {
    id: 18, name: "Hot Dog", category: "Fast Food",
    keywords: ["hotdog","hot dog","sausage","frank","frankfurter"],
    description: "Grilled beef sausage in a soft bun with classic toppings.",
    emoji: "🌭", image: "/images/hot_dog.png",
    nutrition: { calories: 380, protein: 14, carbs: 32, fat: 22, fiber: 1, serving: "1 hot dog (180g)" },
    ingredients: [
      "4 beef frankfurters","4 hot dog buns","Ketchup","Yellow mustard",
      "Diced onions","Sweet relish","Sliced jalapeños (optional)","Shredded cheese (optional)"
    ],
    steps: [
      "Grill or boil frankfurters until heated through and slightly charred (about 5 min).",
      "Lightly toast hot dog buns on the grill or in a pan with butter.",
      "Place frankfurter in the bun.",
      "Top with your choice of ketchup, mustard, onions, relish and jalapeños.",
      "Serve immediately with fries or chips."
    ]
  },
  {
    id: 19, name: "Fish and Chips", category: "Fast Food",
    keywords: ["fish","chips","fish and chips","fish n chips","cod"],
    description: "Beer-battered crispy fish fillets with thick-cut chips.",
    emoji: "🐟", image: "/images/fish_and_chips.png",
    nutrition: { calories: 580, protein: 28, carbs: 56, fat: 28, fiber: 4, serving: "1 plate (350g)" },
    ingredients: [
      "2 cod/haddock fillets","1 cup flour","1/2 cup cold sparkling water","1 egg",
      "1 tsp baking powder","4 large potatoes","Oil for deep frying",
      "Salt and malt vinegar","Lemon wedges","Tartar sauce","Mushy peas (optional)"
    ],
    steps: [
      "Cut potatoes into thick chips. Soak in water 30 min, pat dry.",
      "First fry chips at 150°C for 6 min. Remove and set aside.",
      "Make batter: whisk flour, baking powder, egg and sparkling water until smooth.",
      "Season fish fillets with salt. Dip into batter, letting excess drip off.",
      "Deep fry fish at 180°C for 5-6 min until golden and crispy.",
      "Second fry chips at 190°C for 3-4 min until golden.",
      "Serve fish and chips with salt, malt vinegar, lemon and tartar sauce."
    ]
  },
  {
    id: 20, name: "Loaded Nachos", category: "Fast Food",
    keywords: ["nachos","loaded nachos","tortilla chips","mexican"],
    description: "Crispy tortilla chips loaded with cheese, salsa, guacamole and more.",
    emoji: "🧀", image: "/images/loaded_nachos.png",
    nutrition: { calories: 520, protein: 18, carbs: 48, fat: 30, fiber: 6, serving: "1 plate (300g)" },
    ingredients: [
      "200g tortilla chips","1 cup shredded cheddar","1/2 cup jalapeños","1/2 cup salsa",
      "1/4 cup sour cream","1 avocado (for guacamole)","200g ground beef (cooked, seasoned)",
      "1/2 can black beans (drained)","Diced tomatoes","Chopped green onions","Lime juice"
    ],
    steps: [
      "Preheat oven to 200°C (400°F).",
      "Spread tortilla chips on a baking sheet in a single layer.",
      "Top with seasoned ground beef, black beans, and shredded cheddar.",
      "Bake for 8-10 min until cheese is fully melted and bubbly.",
      "Mash avocado with lime juice and salt for guacamole.",
      "Top baked nachos with salsa, sour cream, guacamole, jalapeños, tomatoes and green onions.",
      "Serve immediately while chips are still crispy."
    ]
  }
];

module.exports = dishes;
