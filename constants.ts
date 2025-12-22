
import { WaterCycleStage, QuizQuestion } from './types';

export const WATER_CYCLE_STAGES: WaterCycleStage[] = [
  {
    id: 'evaporation',
    name: 'التبخر',
    description: 'الشمس تسخن مياه البحار والمحيطات، فيتحول الماء السائل إلى بخار خفيف يرتفع إلى السماء.',
    icon: 'sunny',
    color: 'orange',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYDQoCfqPAnfX2a7FERhXShb7dmroGxDNSJV0aRJ9VfFdcpQeAKP-m4EQKGPmabiTaNicjtlnRhcAjl3Yd8v3bw86JqROhrVNUVCyCreGrA2WkoEzCMMOyo_YuFBkZ1JFRfjS912qV1ZCtPzCCFexPGVaLpWkUj3hwSgHneZ_acHc2cPBrHAWE4Eu7OPxCQp5rdchUnkoOkx2NipdocVZmf32lzkiusbZOkr0uhe-xazqnSFjCEsKX3Ba2SSUYfieZsinqb100zAA'
  },
  {
    id: 'condensation',
    name: 'التكاثف',
    description: 'عندما يرتفع البخار يبرد، ويتحول مرة أخرى إلى قطرات ماء صغيرة تتجمع لتشكل الغيوم البيضاء.',
    icon: 'cloud',
    color: 'blue',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC16uUBlk6EZEwdq8qWzgF7A9oaXwHTCkwtbNaGqwXmqR38Q3gUk6KzL8JgqD4hzDmz79F80dkaf0a4jypuGY_GkayXlzCVqNOcxtJgmb2qHQEU9oDcbpyQFfdFicMULGIq6MQK6nemvTvx8fZcJgJ-tUKDO5vhoSFEWihxhIGI_tan4-7MWvAFaW74qBkwDBVzwYcK9JIPJXxK_5ZHeIss7g6ommgeYKnQndhAwG3Wmm9ZeI8DSWTuAjr_NL1Ss9yvTHeQ8sWLmgE'
  },
  {
    id: 'precipitation',
    name: 'التساقط',
    description: 'عندما تصبح الغيوم ثقيلة جداً بالماء، يسقط الماء منها على شكل مطر، ثلج، أو برد.',
    icon: 'rainy',
    color: 'indigo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2KxS9meh6M0lxMBxZHFEJmjUEjnOBD4ytgrNv7M_P-f3uuUBz9TYQKn6sF1Vc0lpAJqv0gDcROKwdzpTpt-Tf1shTNXcGVrYLdQVqvjzeSBcYrS0jGph3ovToLBVgnaOgGir9bnPJ8kOJ_wwKAmHWqBEFMQBRdhHSCReeFmZLUbtOkjwnqkNLZl17XzgTzUbhePTXJDMah6rFfkyTZ3ycycYiCwYSLJtp4yOSfEDQQTYVSf1GE7Y5aqmeadu3g6M5NUXTBV8F74A'
  },
  {
    id: 'runoff',
    name: 'الجريان',
    description: 'الماء المتساقط يجري على سطح الأرض ويشكل الجداول والأنهار التي تصب في البحار.',
    icon: 'water',
    color: 'teal',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsr7RF3CSZPuFtE0_b8C84XyXn9kVPEMMewJYZFuNFvAbxLMids-jaCKnWFDaqWzFWBS7SCfDRL2B7t53Lvo6AYXHS_4I__oG3z15u5wY0UYDCYhhF3XrZiyospX6aNRwX7Nem241vj2IBXyWFyeEy-4lN6DSjwvcNQ4OlAW4gsJ4MUbhoqXbTK4ZuzyTH3wZIgRgxS1RmflLJavYYI_hEuMoO-VGfqQAIaQ4k23ElYIrGSwBTPBCkiLAklTuXantlFEwsFjF2788'
  },
  {
    id: 'infiltration',
    name: 'التسرب',
    description: 'جزء من الماء يمتصه التراب ويدخل إلى باطن الأرض ليصبح مياهاً جوفية.',
    icon: 'grass',
    color: 'amber',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUQk6X5R1MM_w5FuOjlPE6cFmmdEk8NSVkEcOkzF1lvKao18HzUs0KCs5rflQEwexTZ_MEWqmHQjhaxCFOtpHnUD15SOxCcFYMKtr4ENBuwQSBSHR_CAcKKa07bnDKj7mM27ZY2kZDvEMd3E4fQo35fsV1GzrLt8034NnLug3BzpWuOL1MzRQ3AbuxY-9MXb4ZE7OxwbIm_CslQvQSE9m338bLl5BD7PEp89PDW0lwCqMR-flZ35h186Ima6um4U8ivqQit6ZQBig'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "من هو المحرك الرئيسي لدورة الماء والذي يسخن مياه البحار؟",
    options: ["القمر", "الرياح", "الشمس"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "ماذا يحدث لبخار الماء عندما يرتفع عالياً ويبرد؟",
    options: ["يختفي", "يتحول لغيوم (تكاثف)", "يسقط فوراً"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "أي من هذه الأشكال يعتبر نوعاً من الهطول؟",
    options: ["الثلج", "البخار", "الرمل"],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "أين تذهب مياه الأمطار التي يمتصها التراب؟",
    options: ["تطير للسماء", "تصبح مياهاً جوفية", "تتحول لصخور"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "ماذا نسمي الماء الذي يجري فوق الأرض ليصل للبحار؟",
    options: ["تبخر", "جريان سطحي", "تجميد"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "كيف تساعد الأشجار والنباتات في دورة الماء؟",
    options: ["تمنع المطر", "تطلق بخار الماء (نتح)", "تأكل الماء"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "هل كمية الماء على كوكب الأرض تتغير أم تبقى ثابتة وتدور؟",
    options: ["تنقص باستمرار", "تزيد كل يوم", "تبقى ثابتة وتدور"],
    correctAnswer: 2
  }
];
