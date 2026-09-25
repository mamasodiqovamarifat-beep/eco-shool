import { PresentationData, Slide } from '../types/slide';

export const initialSlides: Slide[] = [
  // 1. Muqova
  {
    id: 'slide-1',
    stepNumber: 0,
    stepBadge: 'ECO-SCHOOLS XALQARO DASTURI',
    title: 'Bizning Yashil Maktabimiz Ekologik Loyihasi',
    subtitle: '7 Qadam tamoyili asosida barqaror va ekologik toza taʼlim maskani yaratish tashabbusi',
    description: 'Mazkur taqdimot maktabimizda ekologik madaniyatni yuksaltirish, tabiat resurslarini asrash va xalqaro "Yashil Bayroq" (Green Flag) mezonlariga erishish boʻyicha amalga oshirilgan ishlarni aks ettiradi.',
    bulletPoints: [
      'Maktab: Guliston shahar 1-son ixtisoslashgan maktab-internati Eko-jamoasi',
      'Yoʻnalish: Barqaror rivojlanish va resurslarni tejash',
      'Shior: "Toza atrof-muhit — sogʻlom kelajak poydevori"',
      'Oʻquv yili: 2025 – 2026'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_school_hero_1790352940234.jpg',
      caption: 'Maktabimizning yashil hududi va ekologik faoliyatidan lavha',
      alt: 'Eco School binosi va koʻkalamzorlashtirish'
    },
    stats: [
      { label: 'Eko-faollar soni', value: '120+', detail: 'oʻquvchi va ustozlar' },
      { label: 'Ekilgan daraxtlar', value: '450+', detail: 'mevali va manzarali' },
      { label: 'Saralangan chiqindi', value: '1.2 t', detail: 'qogʻoz va plastik' }
    ],
    layout: 'title',
    speakerNotes: 'Hosil boʻlgan taqdimotimizni ochib beruvchi titul slayd. Maktab nomi va jamoa aʼzolarini kiritish mumkin.'
  },

  // 2. Kirish va Missiya
  {
    id: 'slide-2',
    stepNumber: 0,
    stepBadge: 'KIRISH VA MISSIYA',
    title: 'Eco-Schools Nima va Uning Global Maqsadi',
    subtitle: 'Dunyoning 73 dan ortiq mamlakatlarida millionlab oʻquvchilarni birlashtirgan xalqaro harakat',
    description: 'Eco-Schools (Ekologik Maktablar) — Atrof-muhit boʻyicha taʼlim jamgʻarmasi (FEE) tomonidan boshqariladigan eng yirik global maktab dasturi hisoblanadi.',
    bulletPoints: [
      'Oʻquvchilarda ekologik masʼuliyat va atrof-muhitni asrash hissini shakllantirish',
      'Nazariy bilimlarni bevosita kundalik maktab amaliyotiga tatbiq etish',
      'Energiya, suv va qogʻoz sarfini sezilarli darajada kamaytirish',
      'Mahalliy hamjamiyat va ota-onalar bilan birgalikda yashil tashabbuslarni ilgari surish'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_school_hero_1790352940234.jpg',
      caption: 'Maktabimiz jamoasining xalqaro ekologik maqsadlari',
      alt: 'Eco-schools missiyasi'
    },
    stats: [
      { label: 'Aʼzo mamlakatlar', value: '73+', detail: 'dunyo boʻylab' },
      { label: 'Ishtirokchi maktablar', value: '59 000+', detail: 'global tarmoq' },
      { label: 'Qamrab olingan oʻquvchilar', value: '20 mln+', detail: 'yosh yetakchilar' }
    ],
    layout: 'split-media',
    speakerNotes: 'Ushbu slaydda Eco-Schools xalqaro nufuzi va dasturga aʼzo boʻlishning maktabimiz uchun ahamiyati haqida soʻz yuritiladi.'
  },

  // 3. Maqsad va vazifalar
  {
    id: 'slide-3',
    stepNumber: 0,
    stepBadge: 'LOYIHA MAQSADI',
    title: 'Maktabimizning Ekologik Maqsad va Vazifalari',
    subtitle: 'Kelgusi 12 oyga moʻljallangan ustuvor maqsadlar va kutilayotgan natijalar',
    description: 'Biz nafaqat oʻz maktabimiz hududini obod qilamiz, balki oʻquvchilar ongida ekologik tafakkurni rivojlantirib, har bir xonadonga yashil madaniyatni olib kiramiz.',
    bulletPoints: [
      'Elektr energiyasi va issiqlik sarfini 20% ga qisqartirish',
      'Chiqindilarni 100% saralab toʻplash (qogʻoz, plastik, batareyalar)',
      'Maktab hovlisida tomchilatib sugʻoriladigan "Yashil burchak" va parnik tashkil etish',
      'Oʻquvchilarda jamoaviy yetakchilik va fuqarolik masʼuliyatini oshirish'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Maqsadlarimiz — aniq oʻlchanadigan natijalar asosida',
      alt: 'Maqsadlar va vazifalar'
    },
    layout: 'standard',
    speakerNotes: 'Hakamlar yoki mehmonlarga loyihaning oʻlchanadigan (SMART) maqsadlarini tushuntirish kerak.'
  },

  // 4. 7 Qadam Yo'l xaritasi
  {
    id: 'slide-4',
    stepNumber: 0,
    stepBadge: 'YOʻL XARITASI',
    title: 'Eco-Schools 7 Qadam Dasturi Modeli',
    subtitle: 'Xalqaro metodologiya asosida bosqichma-bosqich yondashuv',
    description: 'Eco-Schools dasturining muvaffaqiyati uning sodda va mustahkam 7 bosqichli tuzilmasiga tayanadi. Biz ushbu 7 qadamning barchasini toʻliq bosib oʻtdik.',
    bulletPoints: [
      '1-Qadam: Eko-qoʻmita tuzish (Oʻquvchilar yetakchiligida)',
      '2-Qadam: Eko-audit oʻtkazish (Atrof-muhitni toʻliq tekshirish)',
      '3-Qadam: Harakatlar rejasini ishlab chiqish va tasdiqlash',
      '4-Qadam: Doimiy monitoring va natijalarni baholash',
      '5-Qadam: Oʻquv dasturi (darslar) bilan uzviy integratsiya',
      '6-Qadam: Jamiyatni xabardor qilish va keng jamoatchilikni jalb etish',
      '7-Qadam: Eko-kod yaratish va maktab hayotiga singdirish'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_committee_meeting_1790352963730.jpg',
      caption: '7 qadam xaritasi — bizning harakat dasturimiz',
      alt: '7 qadam yoʻl xaritasi'
    },
    layout: 'roadmap',
    speakerNotes: 'Bu umumiy mundarija slaydidir. Barcha 7 bosqich nomini koʻrsatib, tinglovchilarga umumiy tasavvur beriladi.'
  },

  // 5. 1-Qadam: Eko-qo'mita tuzish
  {
    id: 'slide-5',
    stepNumber: 1,
    stepBadge: '1-QADAM: EKO-QOʻMITA',
    title: 'Maktab Eko-Qoʻmitasini Tashkil Etish',
    subtitle: 'Oʻquvchilar, ustozlar va ota-onalardan iborat faol tashabbuskor jamoa',
    description: 'Eko-qoʻmita — Eco-Schools dasturining yuragi hisoblanadi. U barcha ekologik loyihalarni rejalashtirish, boshqarish va nazorat qilish uchun javobgardir.',
    bulletPoints: [
      'Qoʻmita aʼzolarining kamida 70% ini oʻquvchilar tashkil etadi',
      'Demokratik saylovlar asosida sinflardan vakillar saylandi',
      'Maktab maʼmuriyati, fan oʻqituvchilari va texnik xodimlar jalb etildi',
      'Ota-onalar qoʻmitasi va mahalla faollari bilan doimiy aloqa oʻrnatildi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_committee_meeting_1790352963730.jpg',
      caption: 'Eko-qoʻmitaning haftalik rejalashtirish yigʻilishidan lavha',
      alt: 'Eko-qoʻmita aʼzolari'
    },
    stats: [
      { label: 'Qoʻmita aʼzolari', value: '24 nafar', detail: '18 nafar oʻquvchi' },
      { label: 'Sinflar qamrovi', value: '5 - 11 sinf', detail: 'barcha bosqichlar' },
      { label: 'Yigʻilishlar davriyligi', value: 'Oyda 2 marta', detail: 'muntazam bayonnomalar' }
    ],
    layout: 'split-media',
    speakerNotes: 'Qoʻmitada bolalarning oʻzlari qaror qabul qilishi eng muhim mezon ekanligini taʼkidlang.'
  },

  // 6. 1-Qadam: Qo'mita tuzilmasi
  {
    id: 'slide-6',
    stepNumber: 1,
    stepBadge: '1-QADAM: EKO-QOʻMITA',
    title: 'Eko-Qoʻmita Tuzilmasi va Vazifalar Taqsimoti',
    subtitle: 'Har bir aʼzoning aniq javobgarlik sohasi va yoʻnalishlari belgilandi',
    description: 'Loyihaning samaradorligini taʼminlash uchun qoʻmita tarkibida maxsus ishchi guruhlar tashkil qilindi.',
    bulletPoints: [
      'Qoʻmita raisi va koordinatori: Oʻquvchilar yetakchisi va Biologiya ustozi',
      '"Energiya patrullari": Xonalarda chiroq va jihozlarni oʻchirish nazoratchilari',
      '"Suv posbonlari": Joʻmraklar va sugʻorish tizimi butunligini tekshiruvchilar',
      '"Chiqindi nazorati guruhi": Qutilarni saralash va qayta ishlashga joʻnatish masʼullari',
      '"Mediakor": Foto, video va ijtimoiy tarmoqlar orqali yoritish boʻlimi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_committee_meeting_1790352963730.jpg',
      caption: 'Vazifalar taqsimoti va masʼul patrullar kengashi',
      alt: 'Qoʻmita tuzilmasi'
    },
    layout: 'three-col',
    speakerNotes: 'Har bir guruh faoliyatini va ularning maktabdagi aniq amaliy vazifalarini koʻrsating.'
  },

  // 7. 1-Qadam: Yig'ilishlar va bayonnomalar
  {
    id: 'slide-7',
    stepNumber: 1,
    stepBadge: '1-QADAM: EKO-QOʻMITA',
    title: 'Eko-Qoʻmita Yigʻilishlari va Qabul Qilingan Qarorlar',
    subtitle: 'Barcha yigʻilishlar maxsus daftarga qayd etilib, ochiq eʼlon qilib boriladi',
    description: 'Demokratiya va ochiqlik tamoyili asosida har bir yigʻilish bayonnomasi maktabning Eko-burchagiga osib qoʻyiladi.',
    bulletPoints: [
      'Oʻquv yili davomida 16 ta rasmiy yigʻilish oʻtkazildi',
      'Har bir yigʻilishda oʻtgan haftadagi monitoring natijalari muhokama qilindi',
      'Oʻquvchilar tomonidan 35 dan ortiq yangi tashabbus va takliflar bildirildi',
      'Qabul qilingan qarorlar maktab direktori tomonidan qoʻllab-quvvatlandi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_committee_meeting_1790352963730.jpg',
      caption: 'Yigʻilish bayonnomalari va muhokama jarayonlari',
      alt: 'Yigʻilishlar'
    },
    stats: [
      { label: 'Oʻtkazilgan yigʻilishlar', value: '16 ta', detail: 'toʻliq bayonnomalar bilan' },
      { label: 'Koʻrib chiqilgan takliflar', value: '35 ta', detail: '80% amaliyotga kiritildi' }
    ],
    layout: 'split-media',
    speakerNotes: 'Oʻz rasmingizni yoki video lavhangizni qoʻyishingiz mumkin.'
  },

  // 8. 2-Qadam: Eko-audit
  {
    id: 'slide-8',
    stepNumber: 2,
    stepBadge: '2-QADAM: EKO-AUDIT',
    title: 'Atrof-Muhitni Baholash (Eko-Audit)',
    subtitle: 'Maktabimizning ekologik holati boʻyicha chuqur tahlil va inventarizatsiya',
    description: 'Harakat qilishdan avval hozirgi holatimizni bilish zarur edi. Eko-qoʻmita maktabning barcha burchaklarini maxsus nazorat varaqalari (checklist) orqali tekshirib chiqdi.',
    bulletPoints: [
      'Auditorlik guruhi: 15 nafar oʻquvchi va 3 nafar oʻqituvchi mutaxassis',
      'Oʻrganilgan sohalar: Energiya, Suv, Chiqindi, Koʻkalamzorlik, Transport, Oziq-ovqat',
      'Tekshiruv davomiyligi: 2 hafta davomida oʻlchovlar oʻtkazildi',
      'Audit natijalari asosida dolzarb muammolar va yoʻqotishlar aniqlandi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Oʻquvchilar maktab hovlisi va binolarida audit oʻtkazmoqda',
      alt: 'Eko-audit oʻtkazish'
    },
    layout: 'split-media',
    speakerNotes: 'Eko-audit 2-qadam boʻlib, u harakatlar rejasining asosi hisoblanadi.'
  },

  // 9. 2-Qadam: Energiya sarfi auditi
  {
    id: 'slide-9',
    stepNumber: 2,
    stepBadge: '2-QADAM: EKO-AUDIT',
    title: 'Elektr Energiyasi va Issiqlik Sarfi Tahlili',
    subtitle: 'Audit natijasida aniqlangan koʻrsatkichlar va yoʻqotish manbalari',
    description: 'Sinf xonalaridagi yoritish uskunalari, kompyuter sinflari va oshxona elektr sarfi hisoblagichlar orqali oʻrganildi.',
    bulletPoints: [
      'Sinf xonalarining 40% ida eski turdagi choʻgʻlanma lampalar mavjudligi aniqlandi',
      'Darsdan soʻng monitorlar va proyektorlar tarmoqdan uzilmay qolishi kuzatildi',
      'Koridorlarda quyosh tushib turgan paytda ham chiroqlar yoqilgan holatlar uchradi',
      'Xulosaga koʻra, energiyaning 25% qismi samarasiz sarflanayotgani maʼlum boʻldi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Elektr hisoblagichlar va yoritish tizimini oʻrganish jarayoni',
      alt: 'Energiya auditi'
    },
    stats: [
      { label: 'Oylik oʻrtacha sarf', value: '3,400 kVt', detail: 'auditdan oldingi holat' },
      { label: 'Eski lampalar ulushi', value: '42%', detail: 'almashtirilishi zarur' },
      { label: 'Potensial tejamkorlik', value: '25% - 30%', detail: 'LED va tartib hisobiga' }
    ],
    layout: 'standard',
    speakerNotes: 'Ushbu koʻrsatkichlarni maktabingizning haqiqiy maʼlumotlari bilan almashtirishingiz mumkin.'
  },

  // 10. 2-Qadam: Suv auditi
  {
    id: 'slide-10',
    stepNumber: 2,
    stepBadge: '2-QADAM: EKO-AUDIT',
    title: 'Suv Sarfi va Oqilona Foydalanish Auditi',
    subtitle: 'Har bir tomchi hisobda: maktabimizdagi suv taʼminoti holati',
    description: 'Suv resurslari — eng bebaho neʼmat. Eko-patrullar barcha joʻmraklar, hojatxonalar va maktab oshxonasidagi suv oqimini tekshirdi.',
    bulletPoints: [
      'Maktabdagi 34 ta krandan 5 tasida tomchilash va nosozlik aniqlandi',
      'Hovlini sugʻorishda oddiy shlangdan foydalanilib, koʻp suv bugʻlanib ketayotgan edi',
      'Bir oylik tekshiruvda nosoz kranlar tufayli kuniga taxminan 40 litr toza suv isrof boʻlgan',
      'Suv tejovchi aerator va tomchilatib sugʻorish oʻrnatish zarurligi belgilandi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Suv sarfini oʻlchash va kranlarni texnik koʻrikdan oʻtkazish',
      alt: 'Suv auditi'
    },
    stats: [
      { label: 'Kunlik suv sarfi', value: '1,800 L', detail: 'barcha ehtiyojlar uchun' },
      { label: 'Aniqlangan nosozliklar', value: '5 ta kran', detail: 'zudlik bilan bartaraf etildi' },
      { label: 'Kutilayotgan tejam', value: '35%', detail: 'aeratorlar oʻrnatilgach' }
    ],
    layout: 'split-media',
    speakerNotes: 'Suv isrofining oldini olish va oʻquvchilarga suvni tejash odatini oʻrgatish haqida ayting.'
  },

  // 11. 2-Qadam: Chiqindilar auditi
  {
    id: 'slide-11',
    stepNumber: 2,
    stepBadge: '2-QADAM: EKO-AUDIT',
    title: 'Chiqindilar Turlari va Hajmi Auditi',
    subtitle: 'Maktabda bir haftada qancha va qanday chiqindi hosil boʻladi?',
    description: '1 hafta davomida maktabdan chiqqan barcha chiqindilar turlari boʻyicha ajratib tortildi va maxsus audit jadvali tuzildi.',
    bulletPoints: [
      'Qogʻoz va karton chiqindilari — umumiy massaning 52% ini tashkil qildi (daftarlar, printer qogʻozi)',
      'Plastmassa idishlar va paketlar — 28% (suv idishlari, shirinlik oʻramlari)',
      'Oziq-ovqat va organik chiqindilar — 15% (oshxona va qoldiqlar)',
      'Boshqa chiqindilar — 5% (eskirgan jihozlar, batareyalar)'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Chiqindilarni saralash va tarozi orqali oʻlchash natijalari',
      alt: 'Chiqindi auditi'
    },
    stats: [
      { label: 'Haftalik umumiy hajm', value: '180 kg', detail: 'barcha binolardan' },
      { label: 'Qayta ishlanadigan qism', value: '80%', detail: 'poligonga tashlanmasligi mumkin' },
      { label: 'Plastik idishlar soni', value: '450 dona', detail: 'haftalik bir martalik idishlar' }
    ],
    layout: 'three-col',
    speakerNotes: 'Chiqindilarning 80 foizini qayta ishlash mumkinligi oʻquvchilarni hayratga soldi.'
  },

  // 12. 2-Qadam: Yashil maydon auditi
  {
    id: 'slide-12',
    stepNumber: 2,
    stepBadge: '2-QADAM: EKO-AUDIT',
    title: 'Biologik Xilma-xillik va Yashil Hudud Tahlili',
    subtitle: 'Maktabimiz hududidagi flora va fauna dunyosining xaritasi tuzildi',
    description: 'Maktab hovlisidagi har bir daraxt, buta va gulzor hisobga olindi hamda qushlar uchun sharoitlar oʻrganildi.',
    bulletPoints: [
      'Maktab hududida jami 85 tup katta daraxt va 120 ta manzarali butalar mavjud',
      'Hovlining 30% qismi foydalanilmayotgan boʻsh yer ekanligi aniqlandi',
      'Qushlar uchun inlar va ozuqa berish maydonchalari yetarli emasligi maʼlum boʻldi',
      'Boʻsh yerda tajriba oʻquv tomorqasi va parnik barpo etish gʻoyasi ilgari surildi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Oʻquvchilar tuproq va oʻsimlik turlarini oʻrganmoqda',
      alt: 'Biologik xilma-xillik'
    },
    layout: 'split-media',
    speakerNotes: 'Hovlini koʻkalamzorlashtirish boʻyicha imkoniyatlarni koʻrsatib oʻting.'
  },

  // 13. 3-Qadam: Harakatlar rejasi
  {
    id: 'slide-13',
    stepNumber: 3,
    stepBadge: '3-QADAM: HARAKATLAR REJASI',
    title: 'Strategik Harakatlar Rejasi (Action Plan)',
    subtitle: 'Audit natijalariga asoslangan, muddatlari va masʼullari aniq belgilangan dastur',
    description: 'Eko-auditda aniqlangan kamchiliklarni bartaraf etish boʻyicha maktabimizning 1 yillik harakatlar rejasi tasdiqlandi.',
    bulletPoints: [
      'Har bir tadbir boʻyicha aniq SMART koʻrsatkichlar belgilandi',
      'Vazifalarni bajarish uchun oʻquvchilar guruhi va rahbar oʻqituvchi tayinlandi',
      'Reja butun maktab jamoasiga maʼlum qilindi va qoʻllab-quvvatlandi',
      'Moliyaviy va resurs taʼminoti maktab maʼmuriyati va homiylar bilan kelishildi'
    ],
    actionItems: [
      { id: 'act-1', task: 'Barcha sinflarga 3 xil chiqindi qutilarini oʻrnatish', responsible: 'Chiqindi patruli guruhi', status: 'bajarildi' },
      { id: 'act-2', task: 'Yoʻlak va xonalarga LED tejamkor lampalarni toʻliq oʻrnatish', responsible: 'Xoʻjalik boʻlimi', status: 'bajarildi' },
      { id: 'act-3', task: 'Maktab tomorqasida tomchilatib sugʻorish tizimini qurish', responsible: 'Agro-toʻgarak aʼzolari', status: 'jarayonda' },
      { id: 'act-4', task: '"Plastiksiz hafta" xalqaro tanlovini oʻtkazish', responsible: 'Eko-qoʻmita kengashi', status: 'jarayonda' }
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_committee_meeting_1790352963730.jpg',
      caption: 'Harakatlar rejasi maktab eʼlonlar taxtasiga joylashtirildi',
      alt: 'Harakatlar rejasi'
    },
    layout: 'checklist',
    speakerNotes: 'Harakatlar rejasi barcha talablar bajarilishini taʼminlaydigan markaziy hujjatdir.'
  },

  // 14. 3-Qadam: Chiqindilarni saralash
  {
    id: 'slide-14',
    stepNumber: 3,
    stepBadge: '3-QADAM: AMALIY HARAKAT',
    title: 'Chiqindilarni Saralash va Qayta Ishlash Tizimi',
    subtitle: 'Qogʻoz, plastik va organik chiqindilar uchun maxsus tizim joriy etildi',
    description: 'Biz shunchaki chiqindi tashlamaymiz, balki ularni ikkilamchi xomashyoga aylantiramiz.',
    bulletPoints: [
      'Maktab binosida 24 ta alohida rangli ekologik quti oʻrnatildi (Yashil, Koʻk, Sariq)',
      'Oʻquvchilarga chiqindilarni toʻgʻri saralash boʻyicha tushuntirish mashgʻulotlari oʻtildi',
      'Toʻplangan makulatura har oy mahalliy qayta ishlash korxonasiga topshiriladi',
      'Tushgan mablagʻlar yangi koʻchatlar va kitoblar xarid qilishga sarflanmoqda'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Maktabimiz koridoridagi saralash stansiyalari',
      alt: 'Chiqindilarni saralash'
    },
    stats: [
      { label: 'Qayta ishlangan qogʻoz', value: '1,450 kg', detail: '25 tup daraxt saqlab qolindi' },
      { label: 'Toʻplangan plastik idishlar', value: '3,200 dona', detail: 'qayta eritishga yuborildi' },
      { label: 'Saralash foizi', value: '78%', detail: 'maktab boʻyicha' }
    ],
    layout: 'split-media',
    speakerNotes: 'Chiqindilarni saralash orqali oʻquvchilar qanchalik tabiatga foyda keltirayotganini koʻrsating.'
  },

  // 15. 3-Qadam: Energiya tejash
  {
    id: 'slide-15',
    stepNumber: 3,
    stepBadge: '3-QADAM: AMALIY HARAKAT',
    title: 'Energiyani Tejash va Yashil Texnologiyalar',
    subtitle: 'LED yoritish, sensorli boshqaruv va energiya intizomi',
    description: 'Maktabimiz energiya sarfini sezilarli qisqartirish uchun bir qator amaliy chora-tadbirlarni amalga oshirdi.',
    bulletPoints: [
      'Maktab binosidagi 180 ta eski chiroq zamonaviy LED panellarga almashtirildi',
      'Yoʻlak va hojatxonalarga harakat datchiklari (sensorlar) oʻrnatildi',
      'Har bir sinfda "Soʻnggi oʻquvchi chiroqni oʻchiradi" ekologik eslatmasi qoʻyildi',
      'Kompyuterlar avtomatik kutish (sleep) rejimiga oʻtkazildi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_school_hero_1790352940234.jpg',
      caption: 'Energiyani tejovchi uskunalar va tejamkorlik tadbirlari',
      alt: 'Energiya tejash'
    },
    stats: [
      { label: 'Elektr sarfi kamayishi', value: '28%', detail: 'oʻtgan yilga nisbatan' },
      { label: 'Oʻrnatilgan LED chiroqlar', value: '180 dona', detail: 'uzoq muddat xizmat qiladi' },
      { label: 'Tejalgan byudjet', value: '4.2 mln', detail: 'soʻm yillik tejov' }
    ],
    layout: 'standard',
    speakerNotes: 'Energiyani tejash orqali atmosferaga chiqadigan karbonat angidrid miqdori kamayishini taʼkidlang.'
  },

  // 16. 3-Qadam: Yashil Makon
  {
    id: 'slide-16',
    stepNumber: 3,
    stepBadge: '3-QADAM: AMALIY HARAKAT',
    title: '"Yashil Makon" Tashabbusi va Oʻquv Bogʻi',
    subtitle: 'Daraxt ekish, organik dehqonchilik va tomchilatib sugʻorish tajribasi',
    description: 'Oʻzbekiston boʻylab keng quloch yozgan "Yashil Makon" umummilliy loyihasiga maktabimiz munosib hissa qoʻshdi.',
    bulletPoints: [
      'Maktab hovlisiga 250 tup mevali (olma, nok, gilos) va manzarali daraxtlar ekildi',
      'Har bir sinfga maʼlum daraxtlar biriktirilib, "Mening daraxtim" loyihasi boshlandi',
      'Suvni 50% gacha tejaydigan avtomatik tomchilatib sugʻorish tizimi barpo etildi',
      'Dorivor oʻsimliklar (yalpiz, kiyikoʻt, moychechak) polizi yaratildi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_school_hero_1790352940234.jpg',
      caption: 'Oʻquvchilar va oʻqituvchilar koʻchat ekish tadbirida',
      alt: 'Yashil makon aksiyasi'
    },
    stats: [
      { label: 'Yangi ekilgan daraxtlar', value: '250 tup', detail: '95% koʻkarish koʻrsatkichi' },
      { label: 'Yashil maydon kengayishi', value: '+400 m²', detail: 'obodonlashtirildi' },
      { label: 'Tomchilatib sugʻorish', value: '180 metr', detail: 'quvur liniyasi' }
    ],
    layout: 'split-media',
    speakerNotes: 'Bu yerga oʻquvchilarning daraxt ekayotgan oʻz fotosuratlarini yoki videosini yuklashingiz mumkin.'
  },

  // 17. 4-Qadam: Monitoring va baholash
  {
    id: 'slide-17',
    stepNumber: 4,
    stepBadge: '4-QADAM: MONITORING',
    title: 'Monitoring va Natijalarni Baholash',
    subtitle: 'Rejalar qanchalik bajarilayotganini aniq raqamlar bilan kuzatish',
    description: 'Harakatlar rejasi shunchaki qogʻozda qolib ketmasligi uchun Eko-patrullar har haftalik oʻlchov va tekshiruvlar olib bordi.',
    bulletPoints: [
      'Haftalik hisoblagichlar koʻrsatkichlari maxsus elektron jadvalga kiritib borildi',
      'Har oyning soʻnggi jumasida "Oylik Eko-Reyting" natijalari eʼlon qilindi',
      'Eng tejamkor va eng toza sinflarga "Yashil Sinf" koʻchma kubogi topshirildi',
      'Kutilmagan kamchiliklar zudlik bilan aniqlanib, harakatlar rejasiga tuzatishlar kiritildi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Eko-patrullar haftalik monitoring koʻrsatkichlarini tekshirmoqda',
      alt: 'Monitoring jarayoni'
    },
    layout: 'standard',
    speakerNotes: 'Monitoring — bu jarayonning oʻzgarishini koʻrsatuvchi eng xolis baholash mexanizmidir.'
  },

  // 18. 4-Qadam: Natijalar taqqoslovi
  {
    id: 'slide-18',
    stepNumber: 4,
    stepBadge: '4-QADAM: MONITORING',
    title: 'Monitoring Koʻrsatkichlari: Oldin va Keyin',
    subtitle: 'Amalga oshirilgan chora-tadbirlarning haqiqiy samarasi',
    description: 'Oʻquv yili boshidagi audit natijalari bilan 6 oylik monitoring natijalarini taqqoslash orqali sezilarli yutuqlarga erishilgani isbotlandi.',
    bulletPoints: [
      'Elektr energiyasi: Oylik sarf 3,400 kVt dan 2,450 kVt ga tushdi (-28%)',
      'Suv sarfi: Nosozliklar tuzatilib, kunlik sarf 1,800 L dan 1,200 L ga kamaydi (-33%)',
      'Saralanmagan chiqindi: Poligonga tashlanadigan chiqindi hajmi 65% ga qisqardi',
      'Yashillik darajasi: Maktab hududidagi yashil qoplama 25% dan 42% ga yetdi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_school_hero_1790352940234.jpg',
      caption: 'Kuzatuv natijalari va diagrammalar tahlili',
      alt: 'Oldin va keyin'
    },
    stats: [
      { label: 'Elektr tejamkorligi', value: '-28%', detail: 'aniq hisoblagich boʻyicha' },
      { label: 'Suv isrofi kamayishi', value: '-33%', detail: 'joʻmraklar sozlangach' },
      { label: 'Qayta ishlash darajasi', value: '+65%', detail: 'saralash natijasida' }
    ],
    layout: 'three-col',
    speakerNotes: 'Raqamlar loyihangizning haqiqiy muvaffaqiyatini eng kuchli isbotidir.'
  },

  // 19. 5-Qadam: Dars dasturi bilan integratsiya
  {
    id: 'slide-19',
    stepNumber: 5,
    stepBadge: '5-QADAM: TAʼLIMGA INTEGRATSIYA',
    title: 'Ekologiyaning Oʻquv Dasturlari Bilan Bogʻliqligi',
    subtitle: 'Ekologik mavzular tabiiy, aniq va gumanitar fanlar darslariga kiritildi',
    description: 'Eco-Schools faqat maktab hovlisi bilan cheklanmaydi, u bevosita sinfxona darslarining mazmuniga singdiriladi.',
    bulletPoints: [
      'Biologiya: Oʻsimliklar fotosintezi, biologik xilma-xillik va tuproq tarkibini oʻrganish',
      'Kimyo: Suv sifatini laboratoriyada tahlil qilish, polimerlar va parchalanish muddatlari',
      'Fizika: Muqobil energiya (quyosh, shamol), elektr zanjirlari va issiqlik izolatsiyasi',
      'Matematika: Maktabning energiya va suv auditi maʼlumotlari boʻyicha amaliy masalalar yechish',
      'Ona tili va Adabiyot: Tabiatni ardoqlash mavzusida insholar va bahs-munozaralar'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Laboratoriya darslarida suv va tuproq namunalarini tahlil qilish',
      alt: 'Darslar bilan integratsiya'
    },
    layout: 'three-col',
    speakerNotes: 'Fan oʻqituvchilari oʻz darslarida ekologik amaliyotdan qanday foydalanganini aytib bering.'
  },

  // 20. 5-Qadam: Amaliy tajribalar va ochiq darslar
  {
    id: 'slide-20',
    stepNumber: 5,
    stepBadge: '5-QADAM: AMALIY TAʼLIM',
    title: 'Ochiq Darslar, Amaliy Tajribalar va Eko-Sayrlar',
    subtitle: 'Tabiat qoʻynida oʻrganish — eng samarali taʼlim usuli',
    description: 'Oʻquvchilar darslikdagi quruq qoidalarni yodlamasdan, oʻz qoʻllari bilan tajribalar oʻtkazishdi.',
    bulletPoints: [
      'Maktab hovlisida 12 ta ochiq tabiat darsi va mahorat saboqlari oʻtkazildi',
      'Kompost (organik oʻgʻit) tayyorlash laboratoriyasi tashkil etildi',
      'Shahar botanika bogʻi va suv tozalash inshootiga ekologik ekskursiyalar uyushtirildi',
      'Oddiy maishiy chiqindilardan foydali asboblar yasash (Upcycling) boʻyicha darslar boʻlib oʻtdi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Oʻquvchilar kompostlash tajribasini oʻrganmoqda',
      alt: 'Amaliy tajribalar'
    },
    stats: [
      { label: 'Oʻtkazilgan ochiq darslar', value: '18 ta', detail: 'STEM yoʻnalishida' },
      { label: 'Ekskursiya ishtirokchilari', value: '240 nafar', detail: 'oʻquvchilar' },
      { label: 'Tayyorlangan kompost', value: '150 kg', detail: 'maktab gulzorlariga ishlatildi' }
    ],
    layout: 'split-media',
    speakerNotes: 'Bu slaydda amaliy darslardan olingan videolavha yoki rasmlarni joylashtirish juda mos keladi.'
  },

  // 21. 5-Qadam: O'quvchilarning ilmiy loyihalari
  {
    id: 'slide-21',
    stepNumber: 5,
    stepBadge: '5-QADAM: INNOVATSIYA',
    title: 'Oʻquvchilarning Ekologik Ilmiy Loyihalari va Startaplari',
    subtitle: 'Yosh ixtirochilarning yashil texnologiyalar boʻyicha amaliy ishlanmalari',
    description: 'Eko-toʻgarak aʼzolari turli fan olimpiadalari va tanlovlarda oʻzlarining ekologik ixtirolari bilan qatnashmoqda.',
    bulletPoints: [
      '"Aqlli sugʻorish": Tuproq namligini oʻlchovchi Arduino asosidagi avtomatlashtirilgan tizim',
      '"Mini Biogaz": Oshxona qoldiqlaridan gaz ajratib olish boʻyicha maket loyiha',
      '"Gidroponika": Suvda tuproqsiz koʻkatlar yetishtirish vertikal fermasi',
      'Oʻquvchilarimiz shahar innovatsion tanlovida 1-oʻrinni egalladi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_audit_nature_1790352985613.jpg',
      caption: 'Yosh ixtirochilar oʻzlarining ekologik maketlari bilan',
      alt: 'Ilmiy loyihalar'
    },
    layout: 'standard',
    speakerNotes: 'Oʻquvchilar erishgan aniq gʻalabalarni taʼkidlang.'
  },

  // 22. 6-Qadam: Axborot berish va jalb qilish
  {
    id: 'slide-22',
    stepNumber: 6,
    stepBadge: '6-QADAM: HAMKORLIK',
    title: 'Axborot Berish va Keng Jamiyatni Jalb Qilish',
    subtitle: 'Maktab chegarasidan chiqib, butun mahallani ekologik harakatga undash',
    description: 'Ekologik muvaffaqiyatga faqatgina barcha — ota-onalar, mahalla ahli va jamoatchilik birgalikda harakat qilgandagina erishiladi.',
    bulletPoints: [
      'Ota-onalar yigʻilishlarida ekologik loyihalar taqdimoti oʻtkazildi',
      'Mahalla fuqarolar yigʻini bilan birgalikda tozalik haftaliklari tashkil etildi',
      'Mahalliy xonadonlarga energiya va suvni tejash boʻyicha bukletlar tarqatildi',
      'Ijtimoiy tarmoqlarda maktab eko-kanalida muntazam maslahatlar berildi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_committee_meeting_1790352963730.jpg',
      caption: 'Ota-onalar va mahalla faollari bilan oʻtkazilgan seminar',
      alt: 'Jamiyatni jalb qilish'
    },
    stats: [
      { label: 'Jalb etilgan ota-onalar', value: '400+', detail: 'faol ishtirokchi' },
      { label: 'Tarqatilgan bukletlar', value: '1,000 dona', detail: 'xonadonlarga' },
      { label: 'Mahalla bilan aksiyalar', value: '6 marta', detail: 'hamkorlikda' }
    ],
    layout: 'split-media',
    speakerNotes: 'Ota-onalar bilan hamkorlik qanchalik mustahkam boʻlganini tushuntiring.'
  },

  // 23. 6-Qadam: Eko-aksiyalar va shanbaliklar
  {
    id: 'slide-23',
    stepNumber: 6,
    stepBadge: '6-QADAM: AKSIDALAR',
    title: 'Xalqaro Eko-Sanalar va Qiziqarli Aksiyalar',
    subtitle: 'Yer kuni, Suv kuni, Daraxt ekish haftaligi va flesh-moblar',
    description: 'Biz ekologiyani qiziqarli, quvnoq va har bir bolani oʻziga tortadigan bayramga aylantirdik.',
    bulletPoints: [
      '22-aprel "Xalqaro Yer Kuni" munosabati bilan katta velosiped va piyoda yurish fleshmobi',
      '"Qogʻozni asra — daraxtga hayot ber" aksiyasida 1 tonnadan ziyod makulatura toʻplandi',
      '"Plastik qopqoqchalar orzusi" xayriya loyihasida 25,000 dona qopqoq toʻplandi',
      'Maktab oshxonasida bir martalik plastik idishlar toʻliq bekor qilindi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Maktabimizda oʻtkazilgan koʻtarinki ruhdagi Eko-fleshmob',
      alt: 'Eko aksiyalar'
    },
    layout: 'standard',
    speakerNotes: 'Aksiya jarayonidan olingan yorqin video yoki suratlarni kiritish uchun ajoyib slayd.'
  },

  // 24. 6-Qadam: Eko-burchak va media
  {
    id: 'slide-24',
    stepNumber: 6,
    stepBadge: '6-QADAM: AXBOROT DOSKASI',
    title: 'Maktab Eko-Burchagi va Axborot Maydonchasi',
    subtitle: 'Har bir oʻquvchi koʻrishi mumkin boʻlgan markaziy axborot stendi',
    description: 'Maktabning asosiy foyesida maxsus katta "Eco-Schools Burchagi" tashkil etildi. Unda eng soʻnggi yangiliklar yoritiladi.',
    bulletPoints: [
      'Eko-qoʻmitaning barcha aʼzolari fotosuratlari va kontaktlari',
      'Tasdiqlangan 1 yillik Harakatlar rejasi va bajarilish darajasi grafigi',
      'Haftalik va oylik monitoring koʻrsatkichlari (tejalgan kilovatt va litrlar)',
      'Oʻquvchilarning ekologik rasmlari, sheʼrlari va takliflar qutisi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Maktab foyesidagi rasmiy Eko-Schools axborot stendi',
      alt: 'Eko burchak'
    },
    layout: 'split-media',
    speakerNotes: 'Axborot stendi xalqaro komissiya tekshiruvida muhim oʻrin tutadi.'
  },

  // 25. 7-Qadam: Eko-kod
  {
    id: 'slide-25',
    stepNumber: 7,
    stepBadge: '7-QADAM: EKO-KOD',
    title: 'Bizning Rasmiy Eko-Kodimiz (Eco-Code)',
    subtitle: 'Maktabimizning butun jamoasi rioya qiladigan oltin ekologik qoidalar majmui',
    description: 'Eko-kod — bu bizning ekologik qasamyodimiz. U oʻquvchilar tomonidan taklif qilingan shiorlar orasidan umumiy ovoz berish yoʻli bilan tanlab olindi.',
    bulletPoints: [
      '1. "Har bir tomchi suv — hayot manbai, uni asra!"',
      '2. "Keraksiz chiroqni oʻchir, Yer yuziga nafas ber!"',
      '3. "Chiqindini yerga tashlama, saralab foydali xomashyoga aylantir!"',
      '4. "Bir dona daraxt eksang — kelajakka poydevor qoʻyasan!"',
      '5. "Tabiatni seving, u bizning yagona umumiy uyimizdir!"'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Oʻquvchilar qoʻlida maktabimizning tasdiqlangan Eko-Kodi',
      alt: 'Eko-kod banneri'
    },
    layout: 'quote',
    speakerNotes: 'Eko-kodni taqdimot paytida ifodali va tantanali tarzda oʻqib eshittirish tavsiya etiladi.'
  },

  // 26. 7-Qadam: Eko-kod ijodiy namoyishi
  {
    id: 'slide-26',
    stepNumber: 7,
    stepBadge: '7-QADAM: EKO-KOD',
    title: 'Eko-Kodning Ijodiy Ifodasi va Qoʻshigʻi',
    subtitle: 'Rasmlar, maktab madhiyasi va sahna koʻrinishlarida aks etgan yashil tamoyillar',
    description: 'Eko-kod faqat quruq soʻzlardan iborat emas, balki bolalarning quvnoq ijodi orqali har bir qalbga singib bormoqda.',
    bulletPoints: [
      'Oʻquvchilar tomonidan maktabning "Yashil Madhiya" qoʻshigʻi bastalandi',
      'Eko-kod barcha sinf xonalariga plakat koʻrinishida joylashtirildi',
      'Boshlangʻich sinflar uchun ertak va teatr sahnalashtirildi',
      'Har kuni dars boshlanishida ekologik shiorimiz yodga olinadi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Oʻquvchilar ijodiy plakatlar bilan Eko-kodni namoyish etmoqda',
      alt: 'Eko-kod ijodi'
    },
    stats: [
      { label: 'Eko-kod plakatlari', value: '38 ta', detail: 'har bir xonada' },
      { label: 'Sahna koʻrinishlari', value: '4 ta', detail: 'bayramlarda namoyish etildi' }
    ],
    layout: 'split-media',
    speakerNotes: 'Ushbu joyga oʻquvchilarning Eko-kod qoʻshigʻi yoki ijodiy videosini yuklash mumkin.'
  },

  // 27. Yutuqlar va Yashil Bayroq
  {
    id: 'slide-27',
    stepNumber: 8,
    stepBadge: 'YUTUQLAR VA MUKOFOT',
    title: 'Erishilgan Yutuqlar va "Yashil Bayroq" Sari',
    subtitle: 'Xalqaro "Green Flag" sertifikatini qoʻlga kiritish boʻyicha tayyorgarligimiz',
    description: '7 qadamning har birini toʻlaqonli bajargan maktabimiz eng nufuzli xalqaro ekologik mukofot — Yashil Bayroqqa toʻliq loyiqdir.',
    bulletPoints: [
      'Barcha 7 qadam boʻyicha hujjatlar toʻplami va dalillar (foto/video) tayyorlandi',
      'Maktabimizda ekologik madaniyat yangi bosqichga koʻtarildi',
      'Atrof-muhitga yetkazilayotgan zarar koʻrsatkichlari 30% dan koʻproqqa qisqardi',
      'Maktab jamoasi, oʻquvchilar va ota-onalar birlashib, namunali Eko-Maktabga aylandi'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_code_celebration_1790352998449.jpg',
      caption: 'Biz faxr bilan "Yashil Bayroq" sari olgʻa qadam tashlaymiz!',
      alt: 'Yashil bayroq sari'
    },
    stats: [
      { label: 'Bajarilgan 7 qadam', value: '100%', detail: 'toʻliq amalga oshirildi' },
      { label: 'Umumiy baho', value: 'Aʼlo', detail: 'xalqaro mezonlarga mos' },
      { label: 'Ishtirokchilar faolligi', value: '98%', detail: 'maktab ahli qamrab olindi' }
    ],
    layout: 'three-col',
    speakerNotes: 'Xalqaro darajadagi Yashil Bayroq mezonlariga javob berishimizni ishonch bilan taʼkidlang.'
  },

  // 28. Xulosa va Minnatdorchilik
  {
    id: 'slide-28',
    stepNumber: 8,
    stepBadge: 'YAKUNIY XULOSA',
    title: 'Eʼtiboringiz Uchun Katta Rahmat!',
    subtitle: 'Biz bilan birgalikda yashil va musaffo kelajak quring!',
    description: 'Bizning ekologik sayohatimiz bu yerda toʻxtamaydi. Kelasi yillarda yangi loyihalar, quyosh panellari oʻrnatish va boshqa maktablar bilan tajriba almashishni rejalashtirganmiz.',
    bulletPoints: [
      'Maktabimiz eshiklari barcha yashil tashabbuslar uchun doimo ochiq',
      'Kelgusi reja: Maktab tomini quyosh panellari bilan toʻliq taʼminlash',
      'Shahar maktablari oʻrtasida "Yashil Ligani" yoʻlga qoʻyish',
      'Bizni kuzatib boring va safimizga qoʻshiling!'
    ],
    media: {
      type: 'image',
      url: '/src/assets/images/eco_school_hero_1790352940234.jpg',
      caption: 'Tabiatni birgalikda asraymiz! Yashil Maktab Jamoasi',
      alt: 'Yakuniy minnatdorchilik'
    },
    stats: [
      { label: 'Bogʻlanish', value: 'guliston1-internat@maktab.uz', detail: 'rasmiy aloqa' },
      { label: 'Telegram kanal', value: '@guliston1_maktabinternat_eco', detail: 'soʻnggi yangiliklar' }
    ],
    layout: 'title',
    speakerNotes: 'Savollar va takliflar uchun minnatdorchilik bildirib, taqdimotni yakunlang.'
  }
];

export const defaultPresentation: PresentationData = {
  id: 'main_presentation',
  title: "Eco-Schools O'zbekiston - 7 Qadam Slayd Taqdimoti",
  schoolName: "Guliston shahar 1-son ixtisoslashgan maktab-internati",
  academicYear: "2025 - 2026",
  updatedAt: new Date().toISOString(),
  slides: initialSlides
};
