document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const body = document.body;
    const html = document.documentElement;

    const pageLoader = document.getElementById("pageLoader");
    const header = document.querySelector(".site-header");
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelectorAll(
        ".nav-menu-desktop .nav-link, .nav-menu-dropdown .nav-link"
    );
    const sections = document.querySelectorAll("section[id]");
    const langButtons = document.querySelectorAll(".lang-btn");
    const translatableElements = document.querySelectorAll("[data-i18n]");
    const translatablePlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const pageTitle = document.getElementById("pageTitle");
    const metaDescription = document.getElementById("metaDescription");
    const scrollProgress = document.getElementById("scrollProgress");
    const scrollProgressBar = document.querySelector(".scroll-progress-bar");
    const cursorGlow = document.getElementById("cursorGlow");

    const nameInput = contactForm
        ? (document.getElementById("fullName") ||
            contactForm.querySelector('input[name="fullName"], input[name="name"]'))
        : null;

    const emailInput = contactForm
        ? (document.getElementById("email") ||
            contactForm.querySelector('input[name="email"]'))
        : null;

    const subjectInput = contactForm
        ? (document.getElementById("subject") ||
            contactForm.querySelector('input[name="subject"]'))
        : null;

    const messageInput = contactForm
        ? (document.getElementById("message") ||
            contactForm.querySelector('textarea[name="message"]'))
        : null;

    const honeypotInput = contactForm
        ? (document.getElementById("websiteField") ||
            contactForm.querySelector('input[name="website"]'))
        : null;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator.msMaxTouchPoints !== undefined && navigator.msMaxTouchPoints > 0);

    const isMobile = () => window.innerWidth <= 960;

    const SAFE_LANGUAGE_KEY = "siteLanguage";
    const DEFAULT_LANGUAGE = "en";

    const MAX_NAME_LENGTH = 80;
    const MAX_EMAIL_LENGTH = 120;
    const MAX_SUBJECT_LENGTH = 150;
    const MAX_MESSAGE_LENGTH = 2000;

    const translations = {
        en: {
            pageTitle: "Upcycling Patterns | Erasmus+ KA210-SCH",
            metaDescription: "Upcycling Patterns is an Erasmus+ KA210-SCH project focused on sustainability, environmental awareness, climate responsibility, and upcycling through international school collaboration.",

            skipToContent: "Skip to content",
            loaderText: "Loading Upcycling Patterns",

            navHome: "Home",
            navAbout: "About",
            navGoals: "Goals",
            navTimeline: "Timeline",
            navActivities: "Activities",
            navPartners: "Partners",
            navGallery: "Gallery",
            navNews: "News",
            navOutputs: "Outputs",
            navFaq: "FAQ",
            navContact: "Contact",

            heroEyebrow: "Erasmus+ KA210-SCH Project",
            heroTitleMain: "Upcycling",
            heroTitleAccent: "Patterns",
            heroDescription: "An international school partnership focused on sustainability, environmental awareness, climate responsibility, and upcycling through creativity, collaboration, and active student participation.",
            heroBtnPrimary: "Explore Project",
            heroBtnSecondary: "Meet the Partners",

            statCountries: "Countries",
            statMonths: "Months",
            statProjectEnd: "Project End",

            chip1: "Climate Awareness",
            chip3: "Creative Upcycling",

            aboutTag: "About the Project",
            aboutTitle: "Learning Sustainability Through International Collaboration",
            aboutText: "Upcycling Patterns, also referred to as UpCyc, is an Erasmus+ KA210-SCH project built around the themes of environment, climate change, sustainability, and upcycling. The project aims to help students become environmentally responsible individuals through education, research, and practical activities.",

            aboutCard1Title: "Environmental Awareness",
            aboutCard1Text: "The project promotes ecological responsibility and encourages students to understand the importance of protecting natural resources.",
            aboutCard2Title: "Creative Upcycling",
            aboutCard2Text: "Students are encouraged to reuse materials in creative and meaningful ways, transforming waste into useful and innovative products.",
            aboutCard3Title: "International Partnership",
            aboutCard3Text: "Schools from different countries collaborate to share ideas, educational practices, and sustainable project experiences.",

            mission1Title: "Mission",
            mission1Text: "To raise environmentally conscious students through meaningful international cooperation.",
            mission2Title: "Vision",
            mission2Text: "To build a lasting educational culture centered on sustainability, creativity, and shared responsibility.",
            mission3Title: "Approach",
            mission3Text: "Learning by doing through workshops, research, mobility, teamwork, and digital dissemination.",

            goalsTag: "Project Goals",
            goalsTitle: "What We Aim to Achieve",
            goalsText: "The project supports both educational growth and environmental awareness by connecting sustainability with student creativity, active participation, and European cooperation.",

            goal1Title: "Increase Environmental Awareness",
            goal1Text: "Helping students better understand climate issues, sustainability, and responsible resource use.",
            goal2Title: "Promote Sustainable Development Goals",
            goal2Text: "Integrating sustainability concepts into school-based learning and project practice.",
            goal3Title: "Encourage Active Participation",
            goal3Text: "Enabling students to take part in research, production, workshops, and collaborative project tasks.",
            goal4Title: "Strengthen International Cooperation",
            goal4Text: "Building educational bridges among partner institutions through shared activities and intercultural exchange.",
            goal5Title: "Develop Creativity",
            goal5Text: "Supporting innovative thinking, artistic production, and practical problem-solving through upcycling activities.",
            goal6Title: "Create Long-Term Impact",
            goal6Text: "Establishing sustainable habits and educational resources that can continue beyond the project period.",

            timelineTag: "Project Timeline",
            timelineTitle: "A Two-Year Sustainability Journey",
            timelineText: "The project is planned as a structured international collaboration with preparation, implementation, mobility, dissemination, and evaluation phases.",

            timeline1Title: "Project Launch",
            timeline1Text: "Kick-off meetings, planning, coordination, and role distribution among partners.",
            timeline2Title: "Research & Preparation",
            timeline2Text: "Students and teachers investigate sustainability topics, waste materials, and local practices.",
            timeline3Title: "Workshops & Production",
            timeline3Text: "Hands-on activities, design tasks, upcycling products, and collaborative classroom practices.",
            timeline4Title: "Mobility & Exchange",
            timeline4Text: "Partner visits, intercultural learning, peer interaction, and shared implementation experiences.",
            timeline5Title: "Dissemination",
            timeline5Text: "Sharing project outputs through digital media, school presentations, and public communication.",
            timeline6Title: "Evaluation & Legacy",
            timeline6Text: "Impact review, documentation, reflection, and long-term use of project materials.",

            activitiesTag: "Activities",
            activitiesTitle: "Learning Through Action",
            activitiesText: "The project combines research, design, production, exchange, and dissemination to make sustainability visible and practical.",

            activity1Title: "Student Workshops",
            activity1Text: "Creative workshops focused on reuse, redesign, and transformation of materials.",
            activity2Title: "Teacher Collaboration",
            activity2Text: "Joint planning, pedagogical exchange, and shared classroom implementation.",
            activity3Title: "Mobility Meetings",
            activity3Text: "International visits and project meetings among partner schools.",
            activity4Title: "Digital Dissemination",
            activity4Text: "Online sharing of project outcomes, videos, visual materials, and reports.",

            partnersTag: "Partner Institutions",
            partnersTitle: "Schools Working Together",
            partnersText: "Upcycling Patterns brings together schools from four countries to collaborate on sustainability, student engagement, and innovative learning.",

            partner1Country: "Türkiye",
            labelCoordinator: "Coordinator:",
            partner1School: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            labelCity: "City:",
            partner1City: "Istanbul",
            labelRole: "Role:",
            partner1Role: "Coordinating institution",

            partner2Country: "North Macedonia",
            labelSchool: "School:",
            partner2School: 'OEMUC "SV. NAUM OHRIDSKI"',
            partner2City: "Ohrid",
            partner2Role: "Project partner",

            partner3Country: "Lithuania",
            partner3School: "Vilniaus automechanikos ir verslo mokykla",
            partner3Role: "Project partner",

            partner4Country: "Poland",
            partner4School: "Zespol Szkol Samochodowych im. Tadeusza Tanskiego",
            partner4Role: "Project partner",

            projectTag: "Project Information",
            projectTitle: "Core Project Details",
            projectText: "Upcycling Patterns is a two-year Erasmus+ KA210-SCH small-scale partnership designed to create educational impact through sustainability-focused collaboration.",

            projectCard1Title: "Project Type",
            projectCard1Text: "Erasmus+ KA210-SCH\nSchool Education Small-scale Partnership",
            projectCard2Title: "Project Duration",
            projectCard2Text: "From 01/09/2025 to 31/08/2027\nTotal duration: 24 months",
            projectCard3Title: "Methodology",
            projectCard3Text: "Workshops, research, applied learning, collaboration, mobility, and digital production",
            projectCard4Title: "Focus Areas",
            projectCard4Text: "Sustainability, climate awareness, creativity, reuse culture, intercultural partnership, and student-centred production.",

            galleryTag: "Gallery",
            galleryTitle: "Project Moments",
            galleryText: "A visual archive of workshops, products, meetings, international cooperation, and student creativity.",
            galleryCaption1: "Workshop Activities",
            galleryCaption2: "Student Products",
            galleryCaption3: "Partner Meetings",
            galleryCaption4: "Presentations & Events",
            galleryCaption5: "Creative Displays",
            galleryCaption6: "Team Collaboration",

            newsTag: "News & Updates",
            newsTitle: "Latest Project Highlights",
            newsText: "This section can be updated regularly with meeting summaries, mobility reports, student outcomes, and public announcements.",
            news1Title: "Kick-off Meeting Completed",
            news1Text: "Partner schools met to finalize the work plan, responsibilities, and dissemination goals.",
            news2Title: "Student Workshop Series Started",
            news2Text: "Students began hands-on activities focused on transforming waste materials into creative products.",
            news3Title: "Dissemination Materials Published",
            news3Text: "Digital content and visual project outputs were shared with the wider school community.",
            readMore: "Read More",

            resultsTag: "Expected Results",
            resultsTitle: "Planned Outcomes and Impact",
            resultsText: "The project is expected to produce both educational outputs and long-term awareness related to sustainability and environmental responsibility.",

            result1Title: "Environmentally Aware Students",
            result1Text: "Students will develop stronger awareness of ecological issues and sustainable living practices.",
            result2Title: "Upcycling Products",
            result2Text: "Creative student outputs and project-based products developed through upcycling activities.",
            result3Title: "Educational Materials",
            result3Text: "Learning resources, digital materials, guides, reports, and project documentation.",
            result4Title: "Digital Content",
            result4Text: "Videos, presentations, visual materials, and online project resources.",
            result5Title: "International Experience",
            result5Text: "Students and teachers gain practical experience in European cooperation and intercultural learning.",
            result6Title: "Long-Term Educational Value",
            result6Text: "Project materials and sustainable practices can continue to be used after the official project period ends.",

            outputsTag: "Outputs",
            outputsTitle: "Project Materials & Resources",
            outputsText: "This section is designed for downloadable reports, presentations, posters, guides, and student-created resources.",
            output1Title: "Project Brochure",
            output1Text: "A short introduction to the aims, partners, and activities of the project.",
            output2Title: "Workshop Guide",
            output2Text: "A practical guide containing activity samples and implementation steps.",
            output3Title: "Dissemination Report",
            output3Text: "A summary of project communication, outreach, and visibility activities.",
            downloadBtn: "Download",

            faqTag: "FAQ",
            faqTitle: "Frequently Asked Questions",
            faqText: "Key information for students, teachers, parents, and visitors interested in the project.",
            faq1Question: "What is Upcycling Patterns?",
            faq1Answer: "It is an Erasmus+ KA210-SCH school partnership project focused on sustainability, climate awareness, and creative reuse.",
            faq2Question: "Who are the project partners?",
            faq2Answer: "The project includes partner schools from Türkiye, North Macedonia, Lithuania, and Poland.",
            faq3Question: "What kinds of activities are included?",
            faq3Answer: "Workshops, research, mobility meetings, student production, digital dissemination, and collaborative learning activities.",
            faq4Question: "How long does the project last?",
            faq4Answer: "The project duration is 24 months, from 01 September 2025 to 31 August 2027.",

            contactTag: "Contact",
            contactTitle: "Get in Touch",
            contactText: "For further information about the project, partnership activities, or institutional cooperation, please use the contact details below.",
            contactCard1Title: "Coordinating Institution",
            contactCard1Text: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            contactCard2Title: "Location",
            contactCard2Text: "Istanbul, Türkiye",
            contactCard4Title: "Email",

            socialTitle: "Follow Us",
            socialText: "Visit our official project social media pages.",

            contactFormTitle: "Send a Message",
            formNameLabel: "Full Name",
            formEmailLabel: "Email Address",
            formSubjectLabel: "Subject",
            formMessageLabel: "Message",
            formSubmitBtn: "Send Message",
            formNote: "This form is connected to the project email address.",

            formNamePlaceholder: "Your full name",
            formEmailPlaceholder: "your@email.com",
            formSubjectPlaceholder: "Project inquiry",
            formMessagePlaceholder: "Write your message here...",

            disclaimerText: "Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the Turkish National Agency. Neither the European Union nor the granting authority can be held responsible for them.",

            footerProject: "Erasmus+ KA210-SCH Project",
            footerCoordinatorLabel: "Coordinator:",
            footerCoordinatorValue: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            footerCountriesLabel: "Countries:",
            footerCountriesValue: "Türkiye, North Macedonia, Lithuania, Poland",
            footerCopy: "© 2025–2027 Upcycling Patterns. All rights reserved.",

            formSuccess: "Your message has been prepared successfully.",
            formError: "Please complete all fields correctly.",
            formEmailError: "Please enter a valid email address.",
            formTooShortError: "Please write a slightly more detailed message.",
            formDisabledMessage: "This content will be added soon."
        },

        tr: {
            pageTitle: "Upcycling Patterns | Erasmus+ KA210-SCH",
            metaDescription: "Upcycling Patterns, sürdürülebilirlik, çevre bilinci, iklim sorumluluğu ve ileri dönüşüm temalarına odaklanan Erasmus+ KA210-SCH projesidir.",

            skipToContent: "İçeriğe geç",
            loaderText: "Upcycling Patterns yükleniyor",

            navHome: "Ana Sayfa",
            navAbout: "Hakkında",
            navGoals: "Hedefler",
            navTimeline: "Takvim",
            navActivities: "Faaliyetler",
            navPartners: "Ortaklar",
            navGallery: "Galeri",
            navNews: "Haberler",
            navOutputs: "Çıktılar",
            navFaq: "SSS",
            navContact: "İletişim",

            heroEyebrow: "Erasmus+ KA210-SCH Projesi",
            heroTitleMain: "Upcycling",
            heroTitleAccent: "Patterns",
            heroDescription: "Sürdürülebilirlik, çevre bilinci, iklim sorumluluğu ve ileri dönüşüme odaklanan; yaratıcılık, iş birliği ve aktif öğrenci katılımını temel alan uluslararası okul ortaklığı.",
            heroBtnPrimary: "Projeyi İncele",
            heroBtnSecondary: "Ortakları Gör",

            statCountries: "Ülke",
            statMonths: "Ay",
            statProjectEnd: "Proje Bitişi",

            chip1: "İklim Farkındalığı",
            chip3: "Yaratıcı İleri Dönüşüm",

            aboutTag: "Proje Hakkında",
            aboutTitle: "Uluslararası İş Birliğiyle Sürdürülebilirliği Öğrenmek",
            aboutText: "Upcycling Patterns, diğer adıyla UpCyc, çevre, iklim değişikliği, sürdürülebilirlik ve ileri dönüşüm temaları etrafında şekillenen bir Erasmus+ KA210-SCH projesidir. Proje; öğrencilerin eğitim, araştırma ve uygulamalı etkinlikler yoluyla çevreye duyarlı bireyler olmalarını amaçlamaktadır.",

            aboutCard1Title: "Çevre Bilinci",
            aboutCard1Text: "Proje, ekolojik sorumluluğu destekler ve öğrencileri doğal kaynakları korumanın önemi konusunda bilinçlendirir.",
            aboutCard2Title: "Yaratıcı İleri Dönüşüm",
            aboutCard2Text: "Öğrenciler, atık malzemeleri faydalı ve yenilikçi ürünlere dönüştürerek yaratıcı biçimde yeniden kullanmaya teşvik edilir.",
            aboutCard3Title: "Uluslararası Ortaklık",
            aboutCard3Text: "Farklı ülkelerden okullar; fikir, eğitim uygulamaları ve sürdürülebilir proje deneyimlerini paylaşmak için birlikte çalışır.",

            mission1Title: "Misyon",
            mission1Text: "Anlamlı uluslararası iş birlikleriyle çevreye duyarlı öğrenciler yetiştirmek.",
            mission2Title: "Vizyon",
            mission2Text: "Sürdürülebilirlik, yaratıcılık ve ortak sorumluluk etrafında kalıcı bir eğitim kültürü oluşturmak.",
            mission3Title: "Yaklaşım",
            mission3Text: "Atölye çalışmaları, araştırma, hareketlilik, ekip çalışması ve dijital yaygınlaştırma ile yaparak öğrenme.",

            goalsTag: "Proje Hedefleri",
            goalsTitle: "Neyi Başarmayı Amaçlıyoruz",
            goalsText: "Proje, sürdürülebilirliği öğrenci yaratıcılığı, aktif katılım ve Avrupa iş birliği ile birleştirerek hem eğitimsel gelişimi hem de çevresel farkındalığı destekler.",

            goal1Title: "Çevre Bilincini Artırmak",
            goal1Text: "Öğrencilerin iklim konuları, sürdürülebilirlik ve sorumlu kaynak kullanımı hakkında daha fazla farkındalık geliştirmelerini sağlamak.",
            goal2Title: "Sürdürülebilir Kalkınma Amaçlarını Desteklemek",
            goal2Text: "Sürdürülebilirlik kavramlarını okul temelli öğrenmeye ve proje uygulamalarına entegre etmek.",
            goal3Title: "Aktif Katılımı Teşvik Etmek",
            goal3Text: "Öğrencilerin araştırma, üretim, atölye çalışmaları ve ortak proje görevlerinde yer almasını sağlamak.",
            goal4Title: "Uluslararası İş Birliğini Güçlendirmek",
            goal4Text: "Ortak faaliyetler ve kültürlerarası etkileşim yoluyla kurumlar arasında eğitim köprüleri kurmak.",
            goal5Title: "Yaratıcılığı Geliştirmek",
            goal5Text: "İleri dönüşüm etkinlikleriyle yenilikçi düşünmeyi, sanatsal üretimi ve pratik problem çözmeyi desteklemek.",
            goal6Title: "Uzun Vadeli Etki Oluşturmak",
            goal6Text: "Proje süresi sonrasında da devam edebilecek sürdürülebilir alışkanlıklar ve eğitim kaynakları oluşturmak.",

            timelineTag: "Proje Takvimi",
            timelineTitle: "İki Yıllık Sürdürülebilirlik Yolculuğu",
            timelineText: "Proje; hazırlık, uygulama, hareketlilik, yaygınlaştırma ve değerlendirme aşamalarını içeren planlı bir uluslararası iş birliği olarak tasarlanmıştır.",

            timeline1Title: "Proje Başlangıcı",
            timeline1Text: "Açılış toplantıları, planlama, koordinasyon ve ortaklar arasında görev dağılımı.",
            timeline2Title: "Araştırma ve Hazırlık",
            timeline2Text: "Öğrenci ve öğretmenlerin sürdürülebilirlik konuları, atık malzemeler ve yerel uygulamalar üzerine çalışması.",
            timeline3Title: "Atölyeler ve Üretim",
            timeline3Text: "Uygulamalı etkinlikler, tasarım çalışmaları, ileri dönüşüm ürünleri ve sınıf içi ortak uygulamalar.",
            timeline4Title: "Hareketlilik ve Değişim",
            timeline4Text: "Ortak ziyaretleri, kültürlerarası öğrenme, akran etkileşimi ve paylaşılan uygulama deneyimleri.",
            timeline5Title: "Yaygınlaştırma",
            timeline5Text: "Proje çıktılarının dijital medya, okul sunumları ve kamu iletişimi aracılığıyla paylaşılması.",
            timeline6Title: "Değerlendirme ve Kalıcılık",
            timeline6Text: "Etki analizi, dokümantasyon, yansıtma ve proje materyallerinin uzun vadeli kullanımı.",

            activitiesTag: "Faaliyetler",
            activitiesTitle: "Eylemle Öğrenmek",
            activitiesText: "Proje; sürdürülebilirliği görünür ve uygulanabilir kılmak için araştırma, tasarım, üretim, değişim ve yaygınlaştırmayı bir araya getirir.",

            activity1Title: "Öğrenci Atölyeleri",
            activity1Text: "Malzemelerin yeniden kullanımı, yeniden tasarımı ve dönüştürülmesine odaklanan yaratıcı atölyeler.",
            activity2Title: "Öğretmen İş Birliği",
            activity2Text: "Ortak planlama, pedagojik paylaşım ve sınıf içi ortak uygulamalar.",
            activity3Title: "Hareketlilik Toplantıları",
            activity3Text: "Ortak okullar arasında uluslararası ziyaretler ve proje toplantıları.",
            activity4Title: "Dijital Yaygınlaştırma",
            activity4Text: "Proje çıktılarının, videoların, görsel materyallerin ve raporların çevrim içi paylaşılması.",

            partnersTag: "Ortak Kurumlar",
            partnersTitle: "Birlikte Çalışan Okullar",
            partnersText: "Upcycling Patterns; sürdürülebilirlik, öğrenci katılımı ve yenilikçi öğrenme için dört ülkeden okulu bir araya getirir.",

            partner1Country: "Türkiye",
            labelCoordinator: "Koordinatör:",
            partner1School: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            labelCity: "Şehir:",
            partner1City: "İstanbul",
            labelRole: "Rol:",
            partner1Role: "Koordinatör kurum",

            partner2Country: "Kuzey Makedonya",
            labelSchool: "Okul:",
            partner2School: 'OEMUC "SV. NAUM OHRIDSKI"',
            partner2City: "Ohrid",
            partner2Role: "Proje ortağı",

            partner3Country: "Litvanya",
            partner3School: "Vilniaus automechanikos ir verslo mokykla",
            partner3Role: "Proje ortağı",

            partner4Country: "Polonya",
            partner4School: "Zespol Szkol Samochodowych im. Tadeusza Tanskiego",
            partner4Role: "Proje ortağı",

            projectTag: "Proje Bilgileri",
            projectTitle: "Temel Proje Ayrıntıları",
            projectText: "Upcycling Patterns, sürdürülebilirlik odaklı iş birliği yoluyla eğitimsel etki oluşturmak üzere tasarlanmış iki yıllık Erasmus+ KA210-SCH küçük ölçekli ortaklık projesidir.",

            projectCard1Title: "Proje Türü",
            projectCard1Text: "Erasmus+ KA210-SCH\nOkul Eğitimi Küçük Ölçekli Ortaklık",
            projectCard2Title: "Proje Süresi",
            projectCard2Text: "01/09/2025 - 31/08/2027\nToplam süre: 24 ay",
            projectCard3Title: "Yöntem",
            projectCard3Text: "Atölyeler, araştırma, uygulamalı öğrenme, iş birliği, hareketlilik ve dijital üretim",
            projectCard4Title: "Odak Alanları",
            projectCard4Text: "Sürdürülebilirlik, iklim farkındalığı, yaratıcılık, yeniden kullanım kültürü, kültürlerarası ortaklık ve öğrenci odaklı üretim.",

            galleryTag: "Galeri",
            galleryTitle: "Proje Anları",
            galleryText: "Atölyeler, ürünler, toplantılar, uluslararası iş birliği ve öğrenci yaratıcılığını yansıtan görsel arşiv.",
            galleryCaption1: "Atölye Çalışmaları",
            galleryCaption2: "Öğrenci Ürünleri",
            galleryCaption3: "Ortak Toplantıları",
            galleryCaption4: "Sunumlar ve Etkinlikler",
            galleryCaption5: "Yaratıcı Sergiler",
            galleryCaption6: "Ekip İş Birliği",

            newsTag: "Haberler ve Güncellemeler",
            newsTitle: "Son Proje Gelişmeleri",
            newsText: "Bu bölüm; toplantı özetleri, hareketlilik raporları, öğrenci çıktıları ve duyurularla düzenli olarak güncellenebilir.",
            news1Title: "Açılış Toplantısı Tamamlandı",
            news1Text: "Ortak okullar çalışma planı, sorumluluklar ve yaygınlaştırma hedeflerini netleştirmek için bir araya geldi.",
            news2Title: "Öğrenci Atölye Serisi Başladı",
            news2Text: "Öğrenciler, atık malzemeleri yaratıcı ürünlere dönüştürmeye odaklanan uygulamalı etkinliklere başladı.",
            news3Title: "Yaygınlaştırma Materyalleri Paylaşıldı",
            news3Text: "Dijital içerikler ve görsel proje çıktıları daha geniş okul topluluğuyla paylaşıldı.",
            readMore: "Devamını Oku",

            resultsTag: "Beklenen Sonuçlar",
            resultsTitle: "Planlanan Çıktılar ve Etki",
            resultsText: "Projenin; sürdürülebilirlik ve çevresel sorumluluk konusunda hem eğitimsel çıktılar hem de uzun vadeli farkındalık oluşturması beklenmektedir.",

            result1Title: "Çevre Bilinci Yüksek Öğrenciler",
            result1Text: "Öğrenciler, ekolojik sorunlar ve sürdürülebilir yaşam uygulamaları konusunda daha güçlü farkındalık geliştirecektir.",
            result2Title: "İleri Dönüşüm Ürünleri",
            result2Text: "İleri dönüşüm etkinlikleri yoluyla geliştirilen yaratıcı öğrenci çıktıları ve proje ürünleri.",
            result3Title: "Eğitim Materyalleri",
            result3Text: "Öğrenme kaynakları, dijital materyaller, kılavuzlar, raporlar ve proje dokümantasyonu.",
            result4Title: "Dijital İçerik",
            result4Text: "Videolar, sunumlar, görsel materyaller ve çevrim içi proje kaynakları.",
            result5Title: "Uluslararası Deneyim",
            result5Text: "Öğrenci ve öğretmenler Avrupa iş birliği ve kültürlerarası öğrenme konusunda uygulamalı deneyim kazanır.",
            result6Title: "Uzun Vadeli Eğitsel Değer",
            result6Text: "Proje materyalleri ve sürdürülebilir uygulamalar resmi proje dönemi sonrasında da kullanılabilir.",

            outputsTag: "Çıktılar",
            outputsTitle: "Proje Materyalleri ve Kaynakları",
            outputsText: "Bu bölüm; indirilebilir raporlar, sunumlar, posterler, kılavuzlar ve öğrenci üretimi kaynaklar için tasarlanmıştır.",
            output1Title: "Proje Broşürü",
            output1Text: "Projenin amaçları, ortakları ve faaliyetleri hakkında kısa tanıtım.",
            output2Title: "Atölye Kılavuzu",
            output2Text: "Etkinlik örnekleri ve uygulama adımlarını içeren pratik rehber.",
            output3Title: "Yaygınlaştırma Raporu",
            output3Text: "Proje iletişimi, erişim ve görünürlük faaliyetlerinin özeti.",
            downloadBtn: "İndir",

            faqTag: "SSS",
            faqTitle: "Sık Sorulan Sorular",
            faqText: "Projeyle ilgilenen öğrenciler, öğretmenler, veliler ve ziyaretçiler için temel bilgiler.",
            faq1Question: "Upcycling Patterns nedir?",
            faq1Answer: "Sürdürülebilirlik, iklim farkındalığı ve yaratıcı yeniden kullanıma odaklanan Erasmus+ KA210-SCH okul ortaklığı projesidir.",
            faq2Question: "Proje ortakları kimlerdir?",
            faq2Answer: "Projede Türkiye, Kuzey Makedonya, Litvanya ve Polonya'dan ortak okullar yer almaktadır.",
            faq3Question: "Hangi tür faaliyetler yer alıyor?",
            faq3Answer: "Atölyeler, araştırma, hareketlilik toplantıları, öğrenci üretimi, dijital yaygınlaştırma ve iş birlikçi öğrenme etkinlikleri.",
            faq4Question: "Proje ne kadar sürüyor?",
            faq4Answer: "Proje süresi 24 aydır; 01 Eylül 2025 ile 31 Ağustos 2027 arasındadır.",

            contactTag: "İletişim",
            contactTitle: "İletişime Geçin",
            contactText: "Proje, ortaklık faaliyetleri veya kurumsal iş birliği hakkında daha fazla bilgi için aşağıdaki iletişim bilgilerini kullanabilirsiniz.",
            contactCard1Title: "Koordinatör Kurum",
            contactCard1Text: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            contactCard2Title: "Konum",
            contactCard2Text: "İstanbul, Türkiye",
            contactCard4Title: "E-posta",

            socialTitle: "Bizi Takip Edin",
            socialText: "Resmi proje sosyal medya sayfalarımızı ziyaret edin.",

            contactFormTitle: "Mesaj Gönder",
            formNameLabel: "Ad Soyad",
            formEmailLabel: "E-posta Adresi",
            formSubjectLabel: "Konu",
            formMessageLabel: "Mesaj",
            formSubmitBtn: "Mesaj Gönder",
            formNote: "Bu form proje e-posta adresine bağlıdır.",

            formNamePlaceholder: "Ad Soyad",
            formEmailPlaceholder: "eposta@ornek.com",
            formSubjectPlaceholder: "Proje hakkında bilgi",
            formMessagePlaceholder: "Mesajınızı buraya yazın...",

            disclaimerText: "Avrupa Birliği tarafından finanse edilmektedir. Ancak burada ifade edilen görüş ve düşünceler yalnızca yazar(lar)a aittir ve Avrupa Birliği'nin veya Türkiye Ulusal Ajansı'nın görüşlerini yansıtmak zorunda değildir. Avrupa Birliği ve hibe makamı bunlardan sorumlu tutulamaz.",

            footerProject: "Erasmus+ KA210-SCH Projesi",
            footerCoordinatorLabel: "Koordinatör:",
            footerCoordinatorValue: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            footerCountriesLabel: "Ülkeler:",
            footerCountriesValue: "Türkiye, Kuzey Makedonya, Litvanya, Polonya",
            footerCopy: "© 2025–2027 Upcycling Patterns. Tüm hakları saklıdır.",

            formSuccess: "Mesajınız başarıyla hazırlandı.",
            formError: "Lütfen tüm alanları doğru şekilde doldurun.",
            formEmailError: "Lütfen geçerli bir e-posta adresi girin.",
            formTooShortError: "Lütfen mesajınızı biraz daha ayrıntılı yazın.",
            formDisabledMessage: "Bu içerik yakında eklenecek."
        }
    };

    function safeStorageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    function safeStorageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch {}
    }

    function getCurrentLanguage() {
        const saved = safeStorageGet(SAFE_LANGUAGE_KEY);
        return saved && translations[saved] ? saved : DEFAULT_LANGUAGE;
    }

    function getDictionary(lang) {
        return translations[lang || getCurrentLanguage()] || translations[DEFAULT_LANGUAGE];
    }

    function sanitizeText(value, maxLength) {
        if (typeof value !== "string") return "";

        return value
            .replace(/[\u0000-\u001F\u007F]/g, " ")
            .replace(/[<>]/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, maxLength);
    }

    function sanitizeMultilineText(value, maxLength) {
        if (typeof value !== "string") return "";

        return value
            .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
            .replace(/[<>]/g, "")
            .replace(/\r\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim()
            .slice(0, maxLength);
    }

    function escapeHTML(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function safeCmsUrl(value, fallback) {
        const url = String(value || "").trim();

        if (!url) return fallback || "#";

        if (
            url.startsWith("/") ||
            url.startsWith("https://") ||
            url.startsWith("http://") ||
            url.startsWith("mailto:")
        ) {
            return url;
        }

        return fallback || "#";
    }

    async function fetchCmsJson(path) {
        const response = await fetch(`${path}?v=${Date.now()}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Could not load ${path}`);
        }

        return response.json();
    }

    function applyTranslations(lang) {
        const dict = translations[lang] || translations[DEFAULT_LANGUAGE];

        if (!prefersReducedMotion) {
            body.style.transition = "opacity 0.3s ease";
            body.style.opacity = "0.85";

            setTimeout(() => {
                body.style.opacity = "1";
                setTimeout(() => {
                    body.style.transition = "";
                }, 300);
            }, 150);
        }

        translatableElements.forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (!key || !(key in dict)) return;

            const value = dict[key];
            if (typeof value !== "string") return;

            if (value.includes("\n")) {
                el.innerHTML = value.replace(/\n/g, "<br>");
            } else {
                el.textContent = value;
            }
        });

        translatablePlaceholders.forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (!key || !(key in dict)) return;

            el.setAttribute("placeholder", dict[key]);
        });

        if (pageTitle && dict.pageTitle) {
            pageTitle.textContent = dict.pageTitle;
            document.title = dict.pageTitle;
        }

        if (metaDescription && dict.metaDescription) {
            metaDescription.setAttribute("content", dict.metaDescription);
        }

        html.setAttribute("lang", lang);

        langButtons.forEach((btn) => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        safeStorageSet(SAFE_LANGUAGE_KEY, lang);
    }

    function bindLanguageSwitcher() {
        langButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const next = btn.dataset.lang;
                if (!next || !translations[next]) return;

                applyTranslations(next);
                loadAdminManagedContent();
            });
        });
    }

    function openMenu() {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");

        if (isMobile()) {
            body.style.overflow = "hidden";
        }

        const firstLink = navMenu.querySelector(".nav-link");
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 250);
        }
    }

    function closeMenu() {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
    }

    function toggleMenu() {
        if (!navMenu) return;

        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function bindMenuBehavior() {
        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener("click", toggleMenu);

        document.addEventListener("click", (e) => {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navMenu.classList.contains("open")) {
                closeMenu();
                menuToggle.focus();
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (isMobile()) closeMenu();
            });
        });
    }

    function handleHeaderScroll() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 20);
    }

    function updateActiveNav() {
        let current = "";
        const mid = window.scrollY + window.innerHeight * 0.35;

        sections.forEach((sec) => {
            const top = sec.offsetTop;

            if (mid >= top && mid < top + sec.offsetHeight) {
                current = sec.id || "";
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const active = href === `#${current}` || (!current && href === "#home");

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function updateScrollProgress() {
        if (!scrollProgressBar) return;

        const scrollTop = window.scrollY || window.pageYOffset;

        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        const scrollable = Math.max(docHeight - window.innerHeight, 1);
        const percent = Math.min(Math.max((scrollTop / scrollable) * 100, 0), 100);

        scrollProgressBar.style.width = `${percent}%`;

        if (scrollProgress) {
            scrollProgress.style.opacity = scrollTop > 10 ? "1" : "0.92";
        }
    }

    function animateCounter(el) {
        if (!el || el.dataset.animated === "true") return;

        const target = parseInt(el.getAttribute("data-target") || el.textContent, 10);

        if (!Number.isFinite(target)) return;

        if (prefersReducedMotion) {
            el.textContent = String(target);
            el.dataset.animated = "true";
            return;
        }

        const duration = 1800;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            el.textContent = String(Math.floor(target * eased));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = String(target);
                el.dataset.animated = "true";
            }
        }

        requestAnimationFrame(step);
    }

    function bindRevealAnimations() {
        const revealItems = document.querySelectorAll(".reveal-item");
        const statNumbers = document.querySelectorAll(".stat-number");

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.14,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

            revealItems.forEach((item) => revealObserver.observe(item));

            const counterObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.5
                }
            );

            statNumbers.forEach((number) => counterObserver.observe(number));
        } else {
            revealItems.forEach((item) => item.classList.add("visible"));
            statNumbers.forEach((number) => animateCounter(number));
        }
    }

    function bindAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                const href = anchor.getAttribute("href");

                if (!href || href === "#") return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const offset = header ? header.offsetHeight + 10 : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top,
                    behavior: prefersReducedMotion ? "auto" : "smooth"
                });
            });
        });
    }

    function setStatusMessage(message, isError) {
        if (!formStatus) return;

        formStatus.textContent = message || "";
        formStatus.style.color = isError ? "#b42318" : "";
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateForm() {
        const dict = getDictionary();

        if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput) {
            return true;
        }

        const name = sanitizeText(nameInput.value, MAX_NAME_LENGTH);
        const email = sanitizeText(emailInput.value, MAX_EMAIL_LENGTH);
        const subject = sanitizeText(subjectInput.value, MAX_SUBJECT_LENGTH);
        const message = sanitizeMultilineText(messageInput.value, MAX_MESSAGE_LENGTH);

        nameInput.value = name;
        emailInput.value = email;
        subjectInput.value = subject;
        messageInput.value = message;

        if (honeypotInput && honeypotInput.value.trim() !== "") {
            setStatusMessage(dict.formError, true);
            return false;
        }

        if (!name || !email || !subject || !message) {
            setStatusMessage(dict.formError, true);
            return false;
        }

        if (!isValidEmail(email)) {
            setStatusMessage(dict.formEmailError, true);
            emailInput.focus();
            return false;
        }

        if (message.length < 10) {
            setStatusMessage(dict.formTooShortError, true);
            messageInput.focus();
            return false;
        }

        return true;
    }

    function bindFormValidation() {
        if (!contactForm) return;

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!validateForm()) return;

            const dict = getDictionary();

            const email = contactForm.getAttribute("data-recipient-email") || "upcyclingpatterns@gmail.com";
            const name = encodeURIComponent(nameInput.value);
            const sender = encodeURIComponent(emailInput.value);
            const subject = encodeURIComponent(subjectInput.value);
            const message = encodeURIComponent(messageInput.value);

            const mailtoUrl =
                `mailto:${email}?subject=${subject}&body=Name:%20${name}%0AEmail:%20${sender}%0A%0AMessage:%0A${message}`;

            setStatusMessage(dict.formSuccess, false);

            window.location.href = mailtoUrl;
        });

        [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
            if (!field) return;

            field.addEventListener("input", () => {
                if (formStatus && formStatus.textContent) {
                    setStatusMessage("");
                }
            });
        });
    }

    function setDisabledContentActions() {
        document.querySelectorAll('[aria-disabled="true"]').forEach((el) => {
            if (el.dataset.disabledBound === "true") return;

            el.dataset.disabledBound = "true";

            el.addEventListener("click", (e) => {
                e.preventDefault();
                setStatusMessage(getDictionary().formDisabledMessage, false);
            });
        });
    }

    function setImageFallbacks() {
        document.querySelectorAll("img").forEach((img) => {
            if (img.dataset.fallbackBound === "true") return;

            img.dataset.fallbackBound = "true";

            img.addEventListener(
                "error",
                () => {
                    img.style.opacity = "0.4";
                    img.alt = `${img.alt || "Image"} (failed to load)`;
                },
                { once: true }
            );
        });
    }

    function updateSiteSettingsFromCms(siteData) {
        if (!siteData || typeof siteData !== "object") return;

        const email = String(siteData.projectEmail || "").trim();

        if (email) {
            document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
                link.href = `mailto:${email}`;
                link.textContent = email;
            });

            if (contactForm) {
                contactForm.setAttribute("action", `mailto:${email}`);
                contactForm.setAttribute("data-recipient-email", email);
            }
        }

        const social = siteData.social || {};

        const socialMap = [
            { selector: ".social-link-instagram", url: social.instagram },
            { selector: ".social-link-x", url: social.x },
            { selector: ".social-link-youtube", url: social.youtube },
            { selector: ".social-link-linkedin", url: social.linkedin }
        ];

        socialMap.forEach((item) => {
            if (!item.url) return;

            document.querySelectorAll(item.selector).forEach((link) => {
                link.href = safeCmsUrl(item.url, link.href);
            });
        });
    }

    function renderCmsNews(newsData) {
        const grid = document.querySelector(".news-grid");

        if (!grid || !newsData || !Array.isArray(newsData.items)) return;

        const dict = getDictionary();

        grid.innerHTML = newsData.items
            .map((item) => {
                const year = escapeHTML(item.year || "");
                const title = escapeHTML(item.title || "");
                const description = escapeHTML(item.description || "");

                return `
                    <article class="news-card glass-card reveal-item visible">
                        <span class="news-date">${year}</span>
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <button type="button" class="news-link" aria-disabled="true">
                            ${escapeHTML(dict.readMore || "Read More")}
                        </button>
                    </article>
                `;
            })
            .join("");
    }

    function renderCmsGallery(galleryData) {
        const grid = document.querySelector(".gallery-grid");

        if (!grid || !galleryData || !Array.isArray(galleryData.items)) return;

        grid.innerHTML = galleryData.items
            .map((item) => {
                const image = safeCmsUrl(item.image, "images/gallery-1.jpg");
                const alt = escapeHTML(item.alt || item.caption || "Gallery image");
                const caption = escapeHTML(item.caption || "");

                return `
                    <figure class="gallery-card glass-card reveal-item visible">
                        <img
                            src="${image}"
                            alt="${alt}"
                            width="400"
                            height="300"
                            loading="lazy"
                            decoding="async"
                        />
                        <figcaption>${caption}</figcaption>
                    </figure>
                `;
            })
            .join("");
    }

    function renderCmsOutputs(outputsData) {
        const grid = document.querySelector(".outputs-grid");

        if (!grid || !outputsData || !Array.isArray(outputsData.items)) return;

        const dict = getDictionary();

        grid.innerHTML = outputsData.items
            .map((item) => {
                const title = escapeHTML(item.title || "");
                const description = escapeHTML(item.description || "");
                const file = String(item.file || "").trim();

                const button = file
                    ? `
                        <a
                            class="btn btn-secondary"
                            href="${safeCmsUrl(file, "#")}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHTML(dict.downloadBtn || "Download")}
                        </a>
                    `
                    : `
                        <button type="button" class="btn btn-secondary" aria-disabled="true">
                            ${escapeHTML(dict.downloadBtn || "Download")}
                        </button>
                    `;

                return `
                    <article class="output-card glass-card reveal-item visible">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        ${button}
                    </article>
                `;
            })
            .join("");
    }

    async function loadAdminManagedContent() {
        try {
            const [siteResult, newsResult, galleryResult, outputsResult] = await Promise.allSettled([
                fetchCmsJson("/data/site.json"),
                fetchCmsJson("/data/news.json"),
                fetchCmsJson("/data/gallery.json"),
                fetchCmsJson("/data/outputs.json")
            ]);

            if (siteResult.status === "fulfilled") {
                updateSiteSettingsFromCms(siteResult.value);
            }

            if (newsResult.status === "fulfilled") {
                renderCmsNews(newsResult.value);
            }

            if (galleryResult.status === "fulfilled") {
                renderCmsGallery(galleryResult.value);
            }

            if (outputsResult.status === "fulfilled") {
                renderCmsOutputs(outputsResult.value);
            }

            setDisabledContentActions();
            setImageFallbacks();
        } catch (error) {
            console.warn("CMS data could not be loaded:", error);
        }
    }

    function bindCursorGlow() {
        if (!cursorGlow || prefersReducedMotion || isTouchDevice) {
            if (cursorGlow) cursorGlow.style.display = "none";
            return;
        }

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        function moveGlow() {
            cursorGlow.style.transform = `translate(${x - 140}px, ${y - 140}px)`;
            requestAnimationFrame(moveGlow);
        }

        window.addEventListener("mousemove", (e) => {
            x = e.clientX;
            y = e.clientY;
        });

        moveGlow();
    }

    function bindWindowEvents() {
        let ticking = false;

        function onScrollOptimized() {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {
                handleHeaderScroll();
                updateActiveNav();
                updateScrollProgress();
                ticking = false;
            });
        }

        window.addEventListener("scroll", onScrollOptimized, { passive: true });
        window.addEventListener("resize", onScrollOptimized, { passive: true });

        window.addEventListener(
            "resize",
            () => {
                if (isMobile()) {
                    closeMenu();
                }
            },
            { passive: true }
        );
    }

    function hideLoader() {
        if (!pageLoader) return;

        setTimeout(() => {
            pageLoader.classList.add("hidden");
        }, 400);
    }

    function initialize() {
        applyTranslations(getCurrentLanguage());
        bindLanguageSwitcher();
        bindMenuBehavior();
        bindAnchorScroll();
        bindRevealAnimations();
        bindCursorGlow();
        bindFormValidation();
        bindWindowEvents();
        setDisabledContentActions();
        setImageFallbacks();
        loadAdminManagedContent();

        handleHeaderScroll();
        updateActiveNav();
        updateScrollProgress();
        hideLoader();
    }

    initialize();
});
