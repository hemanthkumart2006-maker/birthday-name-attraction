// ====================================================================
// PERSONAL BIRTHDAY CONFIGURATION
// Customize everything in this file easily for your special person!
// ====================================================================

// Easy top-level audio path configuration
export const VOICE_MESSAGE_AUDIO = "/voice.mp3";

export const birthdayConfig = {
  // Recipient details
  name: "Hemanth",
  birthdayDate: "August 25",
  signature: "With love & endless warmth",

  // Cinematic Intro Settings
  intro: {
    badge: "A SPECIAL JOURNEY",
    tagline: "Preparing something special just for you...",
    subtext: "Turn up your volume, relax, and get ready for a little magic ✨",
    skipText: "SKIP INTRO ⏩",
  },

  // Main Story (preserved & configurable)
  story: `I destroyed everything ordinary to build this cinematic universe exclusively for you. You aren't just a year older; you are stepping into a year with limitless potential. Every rule can be broken, every goal can be shattered. Get ready for surprising joy, glowing memories, and a year full of magic.`,

  // Handwritten Letter
  letter: {
    heading: "A Letter For You",
    subtitle: "Written from the heart, made just for today",
    paragraphs: [
      "Dear Hemanth,",
      "I wanted to make something a little different for you this year — something that lasts longer than ordinary words.",
      "We've shared so many moments together, big and small. Looking back, it's funny how those quiet, simple moments end up becoming the memories we hold closest to our hearts.",
      "Thank you for your kindness, your energy, your genuine smile, and for simply being who you are in a world that often forgets to slow down and appreciate the good things.",
      "I hope this year brings you genuine happiness, exciting new adventures, good health, peace of mind, and countless reasons to smile every single day.",
      "Happy Birthday!",
    ],
    closing: "With love,",
    author: "Your Friend"
  },

  // Memory Universe (Floating Memory Cards)
  memories: [
    {
      id: 1,
      image: "/Photos/1.png",
      title: "A Beautiful Day",
      date: "Memory 01",
      description: "One of those quiet, sunny days when everything felt easy and full of laughter. Moments like these always stay timeless.",
      tag: "Special Moment ✨"
    },
    {
      id: 2,
      image: "/Photos/2.png",
      title: "One of My Favorite Moments",
      date: "Memory 02",
      description: "A spontaneous snapshot capturing the real, joyful spirit that makes every day brighter whenever you're around.",
      tag: "Pure Joy 💫"
    },
    {
      id: 3,
      image: "/Photos/3.png",
      title: "A Memory I'll Always Keep",
      date: "Memory 03",
      description: "The best memories are the ones that make you smile the moment you look back at them. Here is to so many more.",
      tag: "Timeless 🌟"
    },
    {
      id: 4,
      image: "/Photos/4.png",
      title: "Another Beautiful Chapter",
      date: "Memory 04",
      description: "Every step of this journey has had its own magic. Watching you grow and shine is always a celebration.",
      tag: "Unforgettable 🌌"
    },
    {
      id: 5,
      image: "/Photos/5.png",
      title: "Today & Forever",
      date: "Memory 05",
      description: "Today isn't just another day on the calendar; it's a celebration of your story, your presence, and everything you bring to the world.",
      tag: "Happy Birthday 🎂"
    }
  ],

  // Catch the Stars Mini Game Configuration
  catchTheStars: {
    targetStars: 10,
    title: "CATCH THE STARS",
    subtitle: "A quiet moment in the cosmos — click or tap floating stars to collect them ✨",
    completedTitle: "YOU FOUND THEM ALL ✨",
    waitingText: "There's something waiting for you...",
    hiddenMessage: "Some people are stars in our lives.\nYou're one of mine.",
    continueButtonText: "CONTINUE JOURNEY 💫",
    replayButtonText: "PLAY AGAIN 🔄"
  },

  // Voice Message Section
  voiceMessage: {
    title: "A Message I'd Rather Say Than Write",
    subtitle: "Some things are easier to say than type.",
    audioSrc: VOICE_MESSAGE_AUDIO,
    playButtonText: "🎙 PLAY MY MESSAGE",
    completionMessage: "Thank you for listening. ❤️",
    fallbackText: "Personal voice message ready! You can drop an audio file named 'voice.mp3' in the root directory anytime."
  },

  // Secret Star Easter Egg Messages (Scattered in the Galaxy)
  secretStars: [
    {
      id: 1,
      top: "15%",
      left: "8%",
      color: "#00f0ff",
      hint: "A quiet wish",
      message: "You probably didn't know this, but your positivity has lifted up so many people around you without you even realizing."
    },
    {
      id: 2,
      top: "22%",
      left: "88%",
      color: "#ff00ea",
      hint: "A hidden thought",
      message: "Here's one more thing I wanted you to know: your patience and kindness never go unnoticed."
    },
    {
      id: 3,
      top: "45%",
      left: "92%",
      color: "#fcd34d",
      hint: "A gentle reminder",
      message: "Take pride in how far you have come, and keep believing in all the great things waiting ahead of you."
    },
    {
      id: 4,
      top: "78%",
      left: "6%",
      color: "#38bdf8",
      hint: "A secret smile",
      message: "Some memories don't need photographs — they just live warmly in our minds forever."
    },
    {
      id: 5,
      top: "85%",
      left: "82%",
      color: "#a855f7",
      hint: "A special note",
      message: "Never stop dreaming big. You have what it takes to turn every dream into reality."
    },
    {
      id: 6,
      top: "12%",
      left: "52%",
      color: "#4ade80",
      hint: "A quiet blessing",
      message: "May this upcoming year be the kindest, happiest, and most memorable one yet."
    },
    {
      id: 7,
      top: "65%",
      left: "50%",
      color: "#fb7185",
      hint: "A little secret",
      message: "You found this hidden star! Keep shining just as bright as you always do."
    }
  ],

  // Secret Mystery Box
  secretBox: {
    title: "A LITTLE SECRET",
    subtitle: "You found something I didn't want you to miss.",
    buttonText: "OPEN THE BOX",
    revealTitle: "A Hidden Keepsake ✨",
    revealNote: "Some surprises don't shout; they simply wait quietly for you to find them. Thank you for making this world brighter just by being in it.",
    image: "/Photos/1.png"
  },

  // Interactive Moon Note
  moon: {
    title: "The Silent Watcher",
    quote: "Some nights are worth remembering.",
    note: "Under the same sky, celebrating the same wonderful person. May all your quiet wishes come true tonight."
  },

  // Interactive Planet Note
  planet: {
    name: "MEMORY PLANET",
    status: "STATUS: FULL OF GOOD MEMORIES",
    description: "Orbiting through time, preserving every single laugh, every great conversation, and every shared milestone."
  },

  // Interactive Birthday Cake
  cake: {
    title: "MAKE A BIRTHDAY WISH",
    prompt: "Click the candles to blow them out one by one...",
    wishedTitle: "WISH SENT TO THE UNIVERSE! ✨",
    candlesCount: 4
  },

  // Final Cinematic Finale
  finale: {
    sequence: [
      { text: "One last thing...", delay: 2500 },
      { text: "Thank you for being you.", delay: 3000 },
      { text: "HAPPY BIRTHDAY", delay: 2500, highlight: true },
      { text: "HEMANTH", delay: 2500, isName: true },
      { text: "❤️", delay: 2500, isHeart: true },
      { text: "MADE WITH LOVE", delay: 3500 }
    ]
  },

  // Secret Final Ending (Activated via hidden ✦ symbol)
  secretEnding: {
    symbol: "✦",
    lines: [
      { text: "YOU FOUND THE LAST SECRET.", pause: 2600 },
      { text: "I didn't put this anywhere else...", pause: 2800 },
      { text: "Thank you for being part of my life.", pause: 3000 },
      { text: "Happy Birthday. ❤️", pause: 2800, isHighlight: true },
      { text: "Always remember how special you are.", pause: 3000 }
    ],
    closing: "— With Love",
    signature: "Your Friend"
  },

  // Easter Eggs Configuration
  easterEggs: {
    secretSequence: "birthday",
    unlockedTitle: "🌟 SECRET MODE UNLOCKED!",
    unlockedMessage: "You unlocked the hidden cosmic easter egg! You're officially the master of this universe."
  }
};
