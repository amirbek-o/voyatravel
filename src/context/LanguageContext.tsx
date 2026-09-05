"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "ru" | "uz";

export const translations = {
  en: {
    nav: {
      tours: "Explore Tours",
      destinations: "Destinations",
      about: "About",
      services: "Services",
      howItWorks: "How it works",
      contacts: "Contacts",
    },
    hero: {
      title: "The World is Waiting!",
      subtitle: "Discover the best destinations",
      slogan: "Your journey, our care",
    },
    tour: {
      from: "FROM",
      nights: "Nights",
      currency: "so'm",
      perPerson: "per person",
      bookNow: "BOOK NOW",
    },
    search: {
      title: "Start your journey with us!",
      destination: "Destination",
      dates: "Dates",
      passengers: "Passengers",
      button: "Search",
      wizard1: "1. Choose Tour",
      wizard2: "2. Leave Request",
      wizard3: "3. We do the rest",
    },
    blueprint: {
      step1: "1. Choose Tour — Price, dates, and hotel rating — all in plain sight.",
      step2: "2. Leave Request — Takes a minute. Name and phone — that's it. No payment upfront.",
      step3: "3. We do the rest — Our nearest office will contact you. Booking, docs, insurance — on us. 25 branches across Uzbekistan.",
    },
    sidebar: {
      callUs: "Call Us",
      callRequest: "Call Request"
    },
    booking: {
      title: "Reserve your spot",
      fullName: "Full Name",
      phone: "Phone Number",
      flightClass: "Flight Class",
      flightType: "Flight Type",
      economy: "Economy",
      business: "Business",
      charter: "Charter",
      scheduled: "Scheduled",
      success: "Request received successfully!",
      error: "Failed to submit. Please try again.",
      submit: "Request a visit",
      submitting: "Sending...",
      commentary: "Commentary",
    },
    footer: {
      licensee: "Licensee",
      license: "License",
      address: "Address",
      hours: "Hours",
    },
    contactsBlock: {
      address: "Address",
      phone: "Phone",
      email: "EMAIL",
      whatsapp: "WHATSAPP",
      telegram: "TELEGRAM",
      hours: "Working hours",
      director: "Director",
      desc: "Travel agency in Uzbekistan. Tours, flights, hotels, and full travel organization."
    }
  },
  ru: {
    nav: {
      tours: "Смотреть Туры",
      destinations: "Направления",
      about: "О нас",
      services: "Услуги",
      howItWorks: "Как это работает",
      contacts: "Контакты",
    },
    hero: {
      title: "Мир ждет вас!",
      subtitle: "Откройте лучшие направления",
      slogan: "Ваше путешествие, наша забота",
    },
    tour: {
      from: "ОТ",
      nights: "Ночей",
      currency: "сум",
      perPerson: "за человека",
      bookNow: "ЗАБРОНИРОВАТЬ",
    },
    search: {
      title: "Начните свое путешествие с нами!",
      destination: "Куда",
      dates: "Туда/Обратно",
      passengers: "Сколько человек",
      button: "Найти",
      wizard1: "1. Выберите тур",
      wizard2: "2. Оставьте заявку",
      wizard3: "3. Остальное за нами",
    },
    blueprint: {
      step1: "1. Выберите тур — Цена, дата и рейтинг отеля — всё перед глазами.",
      step2: "2. Оставьте заявку — Одна минута. Имя и телефон — и всё. Без предоплаты.",
      step3: "3. Остальное за нами — Наш ближайший офис свяжется с вами. Бронь, документы, страховка — на нас. 25 филиалов по Узбекистану.",
    },
    sidebar: {
      callUs: "Позвоните нам",
      callRequest: "Заказать звонок"
    },
    booking: {
      title: "Забронировать место",
      fullName: "ФИО",
      phone: "Номер телефона",
      flightClass: "Класс перелета",
      flightType: "Тип рейса",
      economy: "Эконом",
      business: "Бизнес",
      charter: "Чартер",
      scheduled: "Регулярный",
      success: "Заявка успешно получена!",
      error: "Не удалось отправить. Попробуйте еще раз.",
      submit: "Оставить заявку",
      submitting: "Отправка...",
      commentary: "Комментарий",
    },
    footer: {
      licensee: "Лицензиат",
      license: "Лицензия",
      address: "Адрес",
      hours: "Часы работы",
    },
    contactsBlock: {
      address: "Адрес",
      phone: "Телефон",
      email: "EMAIL",
      whatsapp: "WHATSAPP",
      telegram: "TELEGRAM",
      hours: "Режим работы",
      director: "Директор",
      desc: "Туристическое агентство в Узбекистане. Туры, авиабилеты, отели и полная организация путешествий."
    }
  },
  uz: {
    nav: {
      tours: "Turlarni Ko'rish",
      destinations: "Yo'nalishlar",
      about: "Biz haqimizda",
      services: "Xizmatlar",
      howItWorks: "Qanday ishlaydi",
      contacts: "Aloqa",
    },
    hero: {
      title: "Dunyo sizni kutmoqda!",
      subtitle: "Eng yaxshi yo'nalishlar bilan tanishing",
      slogan: "Sayoheatingiz, bizning g'amxo'rligimizda",
    },
    tour: {
      from: "DAN",
      nights: "Kecha",
      currency: "so'm",
      perPerson: "kishi uchun",
      bookNow: "BAND QILISH",
    },
    search: {
      title: "Sayoheatingizni biz bilan boshlang!",
      destination: "Qayerga",
      dates: "Qachon",
      passengers: "Necha kishi",
      button: "Qidirish",
      wizard1: "1. Turni tanlang",
      wizard2: "2. Ariza qoldiring",
      wizard3: "3. Qolganini biz qilamiz",
    },
    blueprint: {
      step1: "1 Turni tanlang — Narx, sana va otel bahosi — hammasi ko‘z oldingizda.",
      step2: "2 Ariza qoldiring — Bir daqiqa. Ism va telefon — tamom. Hozir to‘lov yo‘q.",
      step3: "3 Qolganini biz qilamiz — Eng yaqin ofisimiz darhol bog‘lanadi. Joy, hujjat, sug‘urta — bizning ishimiz. O‘zbekiston bo‘ylab 25 ta bo‘linma.",
    },
    sidebar: {
      callUs: "Qo'ng'iroq",
      callRequest: "Ariza Qoldirish"
    },
    booking: {
      title: "Joyni band qilish",
      fullName: "F.I.SH",
      phone: "Telefon raqam",
      flightClass: "Parvoz klassi",
      flightType: "Parvoz turi",
      economy: "Ekonom",
      business: "Biznes",
      charter: "Charter",
      scheduled: "Muntazam",
      success: "Arizangiz qabul qilindi!",
      error: "Xatolik yuz berdi. Qaytadan urinib ko'ring.",
      submit: "Yuborish",
      submitting: "Yuborilmoqda...",
      commentary: "Izoh",
    },
    footer: {
      licensee: "Litsenziya egasi",
      license: "Litsenziya",
      address: "Manzil",
      hours: "Ish vaqti",
    },
    contactsBlock: {
      address: "Manzil",
      phone: "Telefon",
      email: "EMAIL",
      whatsapp: "WHATSAPP",
      telegram: "TELEGRAM",
      hours: "Ish vaqti",
      director: "Direktor",
      desc: "Oʻzbekistondagi turizm agentligi. Turlar, aviachiptalar, mehmonxonalar va sayohatni to‘liq tashkil qilish."
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.uz;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz"); // Set to UZ by default based on requested view

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
