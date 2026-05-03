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
    const revealItems = document.querySelectorAll(".reveal-item");
    const tiltCards = document.querySelectorAll(".tilt-card");
    const magneticButtons = document.querySelectorAll(".magnetic");
    const glassCards = document.querySelectorAll(".glass-card");
    const statNumbers = document.querySelectorAll(".stat-number");
    const heroPanel = document.getElementById("heroPanel");
    const floatingChips = document.querySelectorAll(".floating-chip");
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

    // Linear interpolation — yumuşak geçişler için
    const lerp = (start, end, t) => start + (end - start) * t;

    const translations = {
        en: {
            pageTitle: "Upcycling Patterns | Erasmus+ KA210-SCH",
            metaDescription: "Upcycling Patterns is an Erasmus+ KA210-SCH project focused on sustainability, environmental awareness, climate responsibility, and upcycling through international school collaboration.",
            skipToContent: "Skip to content",
            loaderText: "Loading Upcycling Patterns",
            navHome: "Home", navAbout: "About", navGoals: "Goals", navTimeline: "Timeline",
            navActivities: "Activities", navPartners: "Partners", navGallery: "Gallery",
            navNews: "News", navOutputs: "Outputs", navFaq: "FAQ", navContact: "Contact",
            heroEyebrow: "Erasmus+ KA210-SCH Project",
            heroTitleMain: "Upcycling", heroTitleAccent: "Patterns",
            heroDescription: "An international school partnership focused on sustainability, environmental awareness, climate responsibility, and upcycling through creativity, collaboration, and active student participation.",
            heroBtnPrimary: "Explore Project", heroBtnSecondary: "Meet the Partners",
            statCountries: "Countries", statMonths: "Months", statProjectEnd: "Project End",
            chip1: "Climate Awareness", chip3: "Creative Upcycling",
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
            goalsTag: "Project Goals", goalsTitle: "What We Aim to Achieve",
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
            timelineTag: "Project Timeline", timelineTitle: "A Two-Year Sustainability Journey",
            timelineText: "The project is planned as a structured international collaboration with preparation, implementation, mobility, dissemination, and evaluation phases.",
            timeline1Title: "Project Launch", timeline1Text: "Kick-off meetings, planning, coordination, and role distribution among partners.",
            timeline2Title: "Research & Preparation", timeline2Text: "Students and teachers investigate sustainability topics, waste materials, and local practices.",
            timeline3Title: "Workshops & Production", timeline3Text: "Hands-on activities, design tasks, upcycling products, and collaborative classroom practices.",
            timeline4Title: "Mobility & Exchange", timeline4Text: "Partner visits, intercultural learning, peer interaction, and shared implementation experiences.",
            timeline5Title: "Dissemination", timeline5Text: "Sharing project outputs through digital media, school presentations, and public communication.",
            timeline6Title: "Evaluation & Legacy", timeline6Text: "Impact review, documentation, reflection, and long-term use of project materials.",
            activitiesTag: "Activities", activitiesTitle: "Learning Through Action",
            activitiesText: "The project combines research, design, production, exchange, and dissemination to make sustainability visible and practical.",
            activity1Title: "Student Workshops", activity1Text: "Creative workshops focused on reuse, redesign, and transformation of materials.",
            activity2Title: "Teacher Collaboration", activity2Text: "Joint planning, pedagogical exchange, and shared classroom implementation.",
            activity3Title: "Mobility Meetings", activity3Text: "International visits and project meetings among partner schools.",
            activity4Title: "Digital Dissemination", activity4Text: "Online sharing of project outcomes, videos, visual materials, and reports.",
            partnersTag: "Partner Institutions", partnersTitle: "Schools Working Together",
            partnersText: "Upcycling Patterns brings together schools from four countries to collaborate on sustainability, student engagement, and innovative learning.",
            partner1Country: "Türkiye", labelCoordinator: "Coordinator:",
            partner1School: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            labelCity: "City:", partner1City: "Istanbul", labelRole: "Role:",
            partner1Role: "Coordinating institution",
            partner2Country: "North Macedonia", labelSchool: "School:",
            partner2School: 'OEMUC "SV. NAUM OHRIDSKI"',
            partner2City: "Ohrid", partner2Role: "Project partner",
            partner3Country: "Lithuania",
            partner3School: "Vilniaus automechanikos ir verslo mokykla",
            partner3Role: "Project partner",
            partner4Country: "Poland",
            partner4School: "Zespol Szkol Samochodowych im. Tadeusza Tanskiego",
            partner4Role: "Project partner",
            projectTag: "Project Information", projectTitle: "Core Project Details",
            projectText: "Upcycling Patterns is a two-year Erasmus+ KA210-SCH small-scale partnership designed to create educational impact through sustainability-focused collaboration.",
            projectCard1Title: "Project Type",
            projectCard1Text: "Erasmus+ KA210-SCH\nSchool Education Small-scale Partnership",
            projectCard2Title: "Project Duration",
            projectCard2Text: "From 01/09/2025 to 31/08/2027\nTotal duration: 24 months",
            projectCard3Title: "Methodology",
            projectCard3Text: "Workshops, research, applied learning, collaboration, mobility, and digital production",
            projectCard4Title: "Focus Areas",
            projectCard4Text: "Sustainability, climate awareness, creativity, reuse culture, intercultural partnership, and student-centred production.",
            galleryTag: "Gallery", galleryTitle: "Project Moments",
            galleryText: "A visual archive of workshops, products, meetings, international cooperation, and student creativity.",
            galleryCaption1: "Workshop Activities", galleryCaption2: "Student Products",
            galleryCaption3: "Partner Meetings", galleryCaption4: "Presentations & Events",
            galleryCaption5: "Creative Displays", galleryCaption6: "Team Collaboration",
            newsTag: "News & Updates", newsTitle: "Latest Project Highlights",
            newsText: "This section can be updated regularly with meeting summaries, mobility reports, student outcomes, and public announcements.",
            news1Title: "Kick-off Meeting Completed",
            news1Text: "Partner schools met to finalize the work plan, responsibilities, and dissemination goals.",
            news2Title: "Student Workshop Series Started",
            news2Text: "Students began hands-on activities focused on transforming waste materials into creative products.",
            news3Title: "Dissemination Materials Published",
            news3Text: "Digital content and visual project outputs were shared with the wider school community.",
            readMore: "Read More",
            resultsTag: "Expected Results", resultsTitle: "Planned Outcomes and Impact",
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
            outputsTag: "Outputs", outputsTitle: "Project Materials & Resources",
            outputsText: "This section is designed for downloadable reports, presentations, posters, guides, and student-created resources.",
            output1Title: "Project Brochure",
            output1Text: "A short introduction to the aims, partners, and activities of the project.",
            output2Title: "Workshop Guide",
            output2Text: "A practical guide containing activity samples and implementation steps.",
            output3Title: "Dissemination Report",
            output3Text: "A summary of project communication, outreach, and visibility activities.",
            downloadBtn: "Download",
            faqTag: "FAQ", faqTitle: "Frequently Asked Questions",
            faqText: "Key information for students, teachers, parents, and visitors interested in the project.",
            faq1Question: "What is Upcycling Patterns?",
            faq1Answer: "It is an Erasmus+ KA210-SCH school partnership project focused on sustainability, climate awareness, and creative reuse.",
            faq2Question: "Who are the project partners?",
            faq2Answer: "The project includes partner schools from Türkiye, North Macedonia, Lithuania, and Poland.",
            faq3Question: "What kinds of activities are included?",
            faq3Answer: "Workshops, research, mobility meetings, student production, digital dissemination, and collaborative learning activities.",
            faq4Question: "How long does the project last?",
            faq4Answer: "The project duration is 24 months, from 01 September 2025 to 31 August 2027.",
            contactTag: "Contact", contactTitle: "Get in Touch",
            contactText: "For further information about the project, partnership activities, or institutional cooperation, please use the contact details below.",
            contactCard1Title: "Coordinating Institution",
            contactCard1Text: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            contactCard2Title: "Location", contactCard2Text: "Istanbul, Türkiye",
            contactCard4Title: "Email",
            contactFormTitle: "Send a Message",
            formNameLabel: "Full Name", formEmailLabel: "Email Address",
            formSubjectLabel: "Subject", formMessageLabel: "Message",
            formSubmitBtn: "Send Message",
            formNote: "This form layout is ready. Submission functionality can be connected later with JavaScript or a backend service.",
            formNamePlaceholder: "Your full name", formEmailPlaceholder: "your@email.com",
            formSubjectPlaceholder: "Project inquiry", formMessagePlaceholder: "Write your message here...",
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
            skipToContent: "İçeriğe geç", loaderText: "Upcycling Patterns yükleniyor",
            navHome: "Ana Sayfa", navAbout: "Hakkında", navGoals: "Hedefler", navTimeline: "Takvim",
            navActivities: "Faaliyetler", navPartners: "Ortaklar", navGallery: "Galeri",
            navNews: "Haberler", navOutputs: "Çıktılar", navFaq: "SSS", navContact: "İletişim",
            heroEyebrow: "Erasmus+ KA210-SCH Projesi",
            heroTitleMain: "Upcycling", heroTitleAccent: "Patterns",
            heroDescription: "Sürdürülebilirlik, çevre bilinci, iklim sorumluluğu ve ileri dönüşüme odaklanan; yaratıcılık, iş birliği ve aktif öğrenci katılımını temel alan uluslararası okul ortaklığı.",
            heroBtnPrimary: "Projeyi İncele", heroBtnSecondary: "Ortakları Gör",
            statCountries: "Ülke", statMonths: "Ay", statProjectEnd: "Proje Bitişi",
            chip1: "İklim Farkındalığı", chip3: "Yaratıcı İleri Dönüşüm",
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
            goalsTag: "Proje Hedefleri", goalsTitle: "Neyi Başarmayı Amaçlıyoruz",
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
            timelineTag: "Proje Takvimi", timelineTitle: "İki Yıllık Sürdürülebilirlik Yolculuğu",
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
            activitiesTag: "Faaliyetler", activitiesTitle: "Eylemle Öğrenmek",
            activitiesText: "Proje; sürdürülebilirliği görünür ve uygulanabilir kılmak için araştırma, tasarım, üretim, değişim ve yaygınlaştırmayı bir araya getirir.",
            activity1Title: "Öğrenci Atölyeleri",
            activity1Text: "Malzemelerin yeniden kullanımı, yeniden tasarımı ve dönüştürülmesine odaklanan yaratıcı atölyeler.",
            activity2Title: "Öğretmen İş Birliği",
            activity2Text: "Ortak planlama, pedagojik paylaşım ve sınıf içi ortak uygulamalar.",
            activity3Title: "Hareketlilik Toplantıları",
            activity3Text: "Ortak okullar arasında uluslararası ziyaretler ve proje toplantıları.",
            activity4Title: "Dijital Yaygınlaştırma",
            activity4Text: "Proje çıktılarının, videoların, görsel materyallerin ve raporların çevrim içi paylaşılması.",
            partnersTag: "Ortak Kurumlar", partnersTitle: "Birlikte Çalışan Okullar",
            partnersText: "Upcycling Patterns; sürdürülebilirlik, öğrenci katılımı ve yenilikçi öğrenme için dört ülkeden okulu bir araya getirir.",
            partner1Country: "Türkiye", labelCoordinator: "Koordinatör:",
            partner1School: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            labelCity: "Şehir:", partner1City: "İstanbul", labelRole: "Rol:",
            partner1Role: "Koordinatör kurum",
            partner2Country: "Kuzey Makedonya", labelSchool: "Okul:",
            partner2School: 'OEMUC "SV. NAUM OHRIDSKI"',
            partner2City: "Ohrid", partner2Role: "Proje ortağı",
            partner3Country: "Litvanya",
            partner3School: "Vilniaus automechanikos ir verslo mokykla",
            partner3Role: "Proje ortağı",
            partner4Country: "Polonya",
            partner4School: "Zespol Szkol Samochodowych im. Tadeusza Tanskiego",
            partner4Role: "Proje ortağı",
            projectTag: "Proje Bilgileri", projectTitle: "Temel Proje Ayrıntıları",
            projectText: "Upcycling Patterns, sürdürülebilirlik odaklı iş birliği yoluyla eğitimsel etki oluşturmak üzere tasarlanmış iki yıllık Erasmus+ KA210-SCH küçük ölçekli ortaklık projesidir.",
            projectCard1Title: "Proje Türü",
            projectCard1Text: "Erasmus+ KA210-SCH\nOkul Eğitimi Küçük Ölçekli Ortaklık",
            projectCard2Title: "Proje Süresi",
            projectCard2Text: "01/09/2025 - 31/08/2027\nToplam süre: 24 ay",
            projectCard3Title: "Yöntem",
            projectCard3Text: "Atölyeler, araştırma, uygulamalı öğrenme, iş birliği, hareketlilik ve dijital üretim",
            projectCard4Title: "Odak Alanları",
            projectCard4Text: "Sürdürülebilirlik, iklim farkındalığı, yaratıcılık, yeniden kullanım kültürü, kültürlerarası ortaklık ve öğrenci odaklı üretim.",
            galleryTag: "Galeri", galleryTitle: "Proje Anları",
            galleryText: "Atölyeler, ürünler, toplantılar, uluslararası iş birliği ve öğrenci yaratıcılığını yansıtan görsel arşiv.",
            galleryCaption1: "Atölye Çalışmaları", galleryCaption2: "Öğrenci Ürünleri",
            galleryCaption3: "Ortak Toplantıları", galleryCaption4: "Sunumlar ve Etkinlikler",
            galleryCaption5: "Yaratıcı Sergiler", galleryCaption6: "Ekip İş Birliği",
            newsTag: "Haberler ve Güncellemeler", newsTitle: "Son Proje Gelişmeleri",
            newsText: "Bu bölüm; toplantı özetleri, hareketlilik raporları, öğrenci çıktıları ve duyurularla düzenli olarak güncellenebilir.",
            news1Title: "Açılış Toplantısı Tamamlandı",
            news1Text: "Ortak okullar çalışma planı, sorumluluklar ve yaygınlaştırma hedeflerini netleştirmek için bir araya geldi.",
            news2Title: "Öğrenci Atölye Serisi Başladı",
            news2Text: "Öğrenciler, atık malzemeleri yaratıcı ürünlere dönüştürmeye odaklanan uygulamalı etkinliklere başladı.",
            news3Title: "Yaygınlaştırma Materyalleri Paylaşıldı",
            news3Text: "Dijital içerikler ve görsel proje çıktıları daha geniş okul topluluğuyla paylaşıldı.",
            readMore: "Devamını Oku",
            resultsTag: "Beklenen Sonuçlar", resultsTitle: "Planlanan Çıktılar ve Etki",
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
            outputsTag: "Çıktılar", outputsTitle: "Proje Materyalleri ve Kaynakları",
            outputsText: "Bu bölüm; indirilebilir raporlar, sunumlar, posterler, kılavuzlar ve öğrenci üretimi kaynaklar için tasarlanmıştır.",
            output1Title: "Proje Broşürü",
            output1Text: "Projenin amaçları, ortakları ve faaliyetleri hakkında kısa tanıtım.",
            output2Title: "Atölye Kılavuzu",
            output2Text: "Etkinlik örnekleri ve uygulama adımlarını içeren pratik rehber.",
            output3Title: "Yaygınlaştırma Raporu",
            output3Text: "Proje iletişimi, erişim ve görünürlük faaliyetlerinin özeti.",
            downloadBtn: "İndir",
            faqTag: "SSS", faqTitle: "Sık Sorulan Sorular",
            faqText: "Projeyle ilgilenen öğrenciler, öğretmenler, veliler ve ziyaretçiler için temel bilgiler.",
            faq1Question: "Upcycling Patterns nedir?",
            faq1Answer: "Sürdürülebilirlik, iklim farkındalığı ve yaratıcı yeniden kullanıma odaklanan Erasmus+ KA210-SCH okul ortaklığı projesidir.",
            faq2Question: "Proje ortakları kimlerdir?",
            faq2Answer: "Projede Türkiye, Kuzey Makedonya, Litvanya ve Polonya'dan ortak okullar yer almaktadır.",
            faq3Question: "Hangi tür faaliyetler yer alıyor?",
            faq3Answer: "Atölyeler, araştırma, hareketlilik toplantıları, öğrenci üretimi, dijital yaygınlaştırma ve iş birlikçi öğrenme etkinlikleri.",
            faq4Question: "Proje ne kadar sürüyor?",
            faq4Answer: "Proje süresi 24 aydır; 01 Eylül 2025 ile 31 Ağustos 2027 arasındadır.",
            contactTag: "İletişim", contactTitle: "İletişime Geçin",
            contactText: "Proje, ortaklık faaliyetleri veya kurumsal iş birliği hakkında daha fazla bilgi için aşağıdaki iletişim bilgilerini kullanabilirsiniz.",
            contactCard1Title: "Koordinatör Kurum",
            contactCard1Text: "MEV Koleji Özel Basınköy Anadolu Lisesi",
            contactCard2Title: "Konum", contactCard2Text: "İstanbul, Türkiye",
            contactCard4Title: "E-posta",
            contactFormTitle: "Mesaj Gönder",
            formNameLabel: "Ad Soyad", formEmailLabel: "E-posta Adresi",
            formSubjectLabel: "Konu", formMessageLabel: "Mesaj",
            formSubmitBtn: "Mesaj Gönder",
            formNote: "Bu form altyapı olarak hazırdır. Gönderim işlevi daha sonra JavaScript veya bir backend servisiyle bağlanabilir.",
            formNamePlaceholder: "Ad Soyad", formEmailPlaceholder: "eposta@ornek.com",
            formSubjectPlaceholder: "Proje hakkında bilgi", formMessagePlaceholder: "Mesajınızı buraya yazın...",
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

    // STORAGE

    function safeStorageGet(key) {
        try { return localStorage.getItem(key); } catch { return null; }
    }
    function safeStorageSet(key, value) {
        try { localStorage.setItem(key, value); } catch {}
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
        return value.replace(/[\u0000-\u001F\u007F]/g, " ")
            .replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
    }

    function sanitizeMultilineText(value, maxLength) {
        if (typeof value !== "string") return "";
        return value.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
            .replace(/[<>]/g, "").replace(/\r\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n").trim().slice(0, maxLength);
    }

    function setStatusMessage(message, isError) {
        if (!formStatus) return;
        formStatus.textContent = message || "";
        formStatus.style.color = isError ? "#b42318" : "";
        // YENİ: Mesaj geldiğinde subtle fade-in animation
        if (message) {
            formStatus.style.opacity = "0";
            formStatus.style.transform = "translateY(-4px)";
            requestAnimationFrame(() => {
                formStatus.style.transition = "opacity 0.4s, transform 0.4s";
                formStatus.style.opacity = "1";
                formStatus.style.transform = "translateY(0)";
            });
        }
    }

    // LANGUAGE APPLY — transition sırasında fade efekti

    function applyTranslations(lang) {
        const dict = translations[lang] || translations[DEFAULT_LANGUAGE];

        // YENİ: dil değişimi sırasında kısa fade efekti
        if (!prefersReducedMotion) {
            body.style.transition = "opacity 0.3s ease";
            body.style.opacity = "0.85";
            setTimeout(() => {
                body.style.opacity = "1";
                setTimeout(() => { body.style.transition = ""; }, 300);
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
            });
        });
    }

    // NAV MENU

    function openMenu() {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        if (isMobile()) body.style.overflow = "hidden";
        const firstLink = navMenu.querySelector(".nav-link");
        if (firstLink) setTimeout(() => firstLink.focus(), 350); // CSS animasyonu bitince
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
        navMenu.classList.contains("open") ? closeMenu() : openMenu();
    }

    function bindMenuBehavior() {
        if (!menuToggle || !navMenu) return;
        menuToggle.addEventListener("click", toggleMenu);

        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("open") &&
                !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navMenu.classList.contains("open")) {
                closeMenu();
                menuToggle.focus();
            }
            if (e.key === "Tab" && navMenu.classList.contains("open")) {
                const links = Array.from(navMenu.querySelectorAll(".nav-link"));
                const last = links[links.length - 1];
                if (!e.shiftKey && document.activeElement === last) closeMenu();
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => { if (isMobile()) closeMenu(); });
        });
    }

    // SCROLL

    function handleHeaderScroll() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 20);
    }

    function updateActiveNav() {
        let current = "";
        const mid = window.scrollY + window.innerHeight * 0.35;
        sections.forEach((sec) => {
            const top = sec.offsetTop;
            if (mid >= top && mid < top + sec.offsetHeight) current = sec.id || "";
        });
        navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const active = href === `#${current}` || (!current && href === "#home");
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
    }

    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const scrollTop = window.scrollY || window.pageYOffset;
        const docH = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        const scrollable = Math.max(docH - window.innerHeight, 1);
        const pct = Math.min(Math.max((scrollTop / scrollable) * 100, 0), 100);
        scrollProgressBar.style.width = `${pct}%`;
        if (scrollProgress) scrollProgress.style.opacity = scrollTop > 10 ? "1" : "0.92";
    }

    // COUNTER — ease-out-expo (çok daha yumuşak)

    function animateCounter(el) {
        if (!el || el.dataset.animated === "true") return;
        const target = parseInt(el.getAttribute("data-target") || el.textContent, 10);
        if (!Number.isFinite(target)) return;

        if (prefersReducedMotion) {
            el.textContent = String(target);
            el.dataset.animated = "true";
            return;
        }

        const duration = 2200;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out-expo — daha dramatik, daha premium
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            el.textContent = String(Math.floor(target * eased));
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = String(target);
                el.dataset.animated = "true";
                // YENİ: sayaç tamamlandığında kısa bir "pop" efekti
                el.style.transform = "scale(1.15)";
                el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
                setTimeout(() => { el.style.transform = "scale(1)"; }, 50);
            }
        }
        requestAnimationFrame(step);
    }

    // TRANSFORMS

    function storeBaseTransform(el) {
        if (!el || el.dataset.baseTransformStored === "true") return;
        const inline = el.style.transform?.trim();
        const computed = window.getComputedStyle(el).transform;
        el.dataset.baseTransform =
            inline && inline !== "none" ? inline :
                computed && computed !== "none" ? computed : "";
        el.dataset.baseTransformStored = "true";
    }

    function setTransformWithTranslate(el, x, y, z) {
        if (!el) return;
        storeBaseTransform(el);
        const base = el.dataset.baseTransform || "";
        el.style.transform = `${base} translate3d(${x}px, ${y}px, ${z || 0}px)`.trim();
    }

    function resetInteractiveTransforms() {
        tiltCards.forEach((c) => { c.style.transform = ""; });
        magneticButtons.forEach((b) => { b.style.transform = ""; });
        if (heroPanel) heroPanel.style.transform = heroPanel.dataset.baseTransform || "";
        floatingChips.forEach((chip) => { chip.style.transform = chip.dataset.baseTransform || ""; });
    }

    // FORM

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    function shakeElement(el) {
        if (!el || prefersReducedMotion) return;
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "fieldShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)";
        setTimeout(() => { el.style.animation = ""; }, 500);
    }

    function validateForm() {
        const dict = getDictionary();
        if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput) return true;

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
            // YENİ: Boş alanları shake ile vurgula
            if (!name) shakeElement(nameInput);
            if (!email) shakeElement(emailInput);
            if (!subject) shakeElement(subjectInput);
            if (!message) shakeElement(messageInput);
            return false;
        }

        if (!isValidEmail(email)) {
            setStatusMessage(dict.formEmailError, true);
            shakeElement(emailInput);
            emailInput.focus();
            return false;
        }

        if (message.length < 10) {
            setStatusMessage(dict.formTooShortError, true);
            shakeElement(messageInput);
            messageInput.focus();
            return false;
        }

        return true;
    }

    function bindFormValidation() {
        if (!contactForm) return;

        // YENİ: Shake keyframe runtime'da inject ediliyor
        if (!document.getElementById("fieldShakeStyle")) {
            const style = document.createElement("style");
            style.id = "fieldShakeStyle";
            style.textContent = `
                @keyframes fieldShake {
                    10%, 90% { transform: translateX(-2px); }
                    20%, 80% { transform: translateX(3px); }
                    30%, 50%, 70% { transform: translateX(-5px); }
                    40%, 60% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!validateForm()) return;
            const dict = getDictionary();
            setStatusMessage(dict.formSuccess, false);
            // Gerçek gönderim için Formspree / EmailJS entegrasyonu burada yapılır
        });

        [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
            if (!field) return;
            field.addEventListener("input", () => {
                if (formStatus && formStatus.textContent) setStatusMessage("");
            });
        });
    }

    function setDisabledContentActions() {
        document.querySelectorAll('[aria-disabled="true"]').forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                setStatusMessage(getDictionary().formDisabledMessage, false);
                shakeElement(el);
            });
        });
    }

    function setImageFallbacks() {
        document.querySelectorAll("img").forEach((img) => {
            img.addEventListener("error", () => {
                img.style.opacity = "0.4";
                img.alt = `${img.alt || "Image"} (failed to load)`;
            }, { once: true });
        });
    }

    // ANCHOR SCROLL — enhanced easing

    function bindAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
            a.addEventListener("click", (e) => {
                const href = a.getAttribute("href");
                if (!href || href === "#") return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const offset = header ? header.offsetHeight + 10 : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
            });
        });
    }

    // REVEAL — staggered entrance

    function bindRevealAnimations() {
        if ("IntersectionObserver" in window) {
            const revealObs = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // YENİ: Aynı grid içindeki elementlere stagger delay
                            const parent = entry.target.parentElement;
                            const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains("reveal-item")) : [];
                            const idx = siblings.indexOf(entry.target);
                            const delay = prefersReducedMotion ? 0 : Math.min(idx * 80, 400);

                            setTimeout(() => {
                                entry.target.classList.add("visible");
                            }, delay);
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
            );
            revealItems.forEach((item) => revealObs.observe(item));

            const counterObs = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            statNumbers.forEach((n) => counterObs.observe(n));
        } else {
            revealItems.forEach((item) => item.classList.add("visible"));
            statNumbers.forEach((n) => animateCounter(n));
        }
    }

    // TILT — smooth with RAF + lerp

    function bindTiltAndMagnetic() {
        if (prefersReducedMotion || isTouchDevice) return;

        tiltCards.forEach((card) => {
            let current = { rx: 0, ry: 0, tx: 0, ty: 0 };
            let target = { rx: 0, ry: 0, tx: 0, ty: 0 };
            let raf = null;
            let active = false;

            function render() {
                // YENİ: lerp ile daha yumuşak, "jelly" benzeri hareket
                current.rx = lerp(current.rx, target.rx, 0.12);
                current.ry = lerp(current.ry, target.ry, 0.12);
                current.tx = lerp(current.tx, target.tx, 0.12);
                current.ty = lerp(current.ty, target.ty, 0.12);

                const diff = Math.abs(current.rx - target.rx) +
                    Math.abs(current.ry - target.ry);

                if (active || diff > 0.05) {
                    card.style.transform =
                        `perspective(1200px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg) translate3d(${current.tx.toFixed(1)}px, ${current.ty.toFixed(1)}px, 0) scale(${active ? 1.015 : 1})`;
                    raf = requestAnimationFrame(render);
                } else {
                    card.style.transform = "";
                    raf = null;
                }
            }

            card.addEventListener("mousemove", (e) => {
                if (isMobile()) return;
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                target.rx = py * -10;
                target.ry = px * 10;
                target.tx = px * 6;
                target.ty = py * 6 - 8;
                active = true;
                if (!raf) raf = requestAnimationFrame(render);

                // YENİ: Glass card'lar için mouse takip eden glow
                if (card.classList.contains("glass-card")) {
                    card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
                    card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
                }
            });

            card.addEventListener("mouseenter", () => { active = true; });

            card.addEventListener("mouseleave", () => {
                target.rx = 0; target.ry = 0; target.tx = 0; target.ty = 0;
                active = false;
                if (!raf) raf = requestAnimationFrame(render);
            });
        });

        // MAGNETIC BUTTONS — smooth follow
        magneticButtons.forEach((btn) => {
            let current = { x: 0, y: 0 };
            let target = { x: 0, y: 0 };
            let raf = null;
            let active = false;

            function render() {
                current.x = lerp(current.x, target.x, 0.18);
                current.y = lerp(current.y, target.y, 0.18);
                const diff = Math.abs(current.x - target.x) + Math.abs(current.y - target.y);

                if (active || diff > 0.1) {
                    btn.style.transform = `translate(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px)`;
                    raf = requestAnimationFrame(render);
                } else {
                    btn.style.transform = "";
                    raf = null;
                }
            }

            btn.addEventListener("mousemove", (e) => {
                if (isMobile()) return;
                const r = btn.getBoundingClientRect();
                target.x = (e.clientX - (r.left + r.width / 2)) * 0.18;
                target.y = (e.clientY - (r.top + r.height / 2)) * 0.18;
                active = true;
                if (!raf) raf = requestAnimationFrame(render);
            });

            btn.addEventListener("mouseleave", () => {
                target.x = 0; target.y = 0;
                active = false;
                if (!raf) raf = requestAnimationFrame(render);
            });
        });
    }

    // HERO PARALLAX — smooth lerp

    function bindHeroParallax() {
        if (prefersReducedMotion || isTouchDevice) return;
        if (heroPanel) storeBaseTransform(heroPanel);
        floatingChips.forEach((chip) => storeBaseTransform(chip));

        let current = { x: 0, y: 0 };
        let target = { x: 0, y: 0 };
        let raf = null;

        function render() {
            current.x = lerp(current.x, target.x, 0.08);
            current.y = lerp(current.y, target.y, 0.08);

            if (heroPanel) {
                const base = heroPanel.dataset.baseTransform || "";
                heroPanel.style.transform =
                    `${base} perspective(1400px) rotateX(${(-current.y * 0.18).toFixed(2)}deg) rotateY(${(current.x * 0.18).toFixed(2)}deg) translate3d(${(current.x * 0.32).toFixed(1)}px, ${(current.y * 0.32).toFixed(1)}px, 0)`.trim();
            }

            floatingChips.forEach((chip, i) => {
                const f = 0.28 + i * 0.1;
                setTransformWithTranslate(chip, current.x * f, current.y * f, 0);
            });

            const diff = Math.abs(current.x - target.x) + Math.abs(current.y - target.y);
            if (diff > 0.05) {
                raf = requestAnimationFrame(render);
            } else {
                raf = null;
            }
        }

        window.addEventListener("mousemove", (e) => {
            if (isMobile()) return;
            target.x = (e.clientX / window.innerWidth - 0.5) * 26;
            target.y = (e.clientY / window.innerHeight - 0.5) * 26;
            if (!raf) raf = requestAnimationFrame(render);
        });

        window.addEventListener("mouseleave", () => {
            target.x = 0; target.y = 0;
            if (!raf) raf = requestAnimationFrame(render);
        }, { passive: true });
    }

    // CURSOR GLOW — smooth follow

    function bindCursorGlow() {
        if (!cursorGlow || prefersReducedMotion || isTouchDevice) {
            if (cursorGlow) cursorGlow.style.display = "none";
            return;
        }

        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;
        let tx = cx, ty = cy;
        let raf = null;
        let size = 280;
        let targetSize = 280;

        function animate() {
            cx = lerp(cx, tx, 0.14);
            cy = lerp(cy, ty, 0.14);
            size = lerp(size, targetSize, 0.1);

            cursorGlow.style.transform =
                `translate(${(cx - size / 2).toFixed(1)}px, ${(cy - size / 2).toFixed(1)}px)`;
            cursorGlow.style.width = `${size}px`;
            cursorGlow.style.height = `${size}px`;

            raf = requestAnimationFrame(animate);
        }

        window.addEventListener("mousemove", (e) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!raf) animate();
        });

        document.addEventListener("mouseleave", () => { cursorGlow.style.opacity = "0"; });
        document.addEventListener("mouseenter", () => { cursorGlow.style.opacity = "0.32"; });

        // YENİ: Interaktif elementlere hover edildiğinde glow büyür
        document.querySelectorAll("a, button, .glass-card, input, textarea, summary").forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursorGlow.style.opacity = "0.5";
                targetSize = 360;
            });
            el.addEventListener("mouseleave", () => {
                cursorGlow.style.opacity = "0.32";
                targetSize = 280;
            });
        });

        animate();
    }

    function bindInteractiveStates() {
        magneticButtons.forEach((btn) => {
            btn.addEventListener("mousedown", () => btn.classList.add("is-pressed"));
            btn.addEventListener("mouseup", () => btn.classList.remove("is-pressed"));
            btn.addEventListener("mouseleave", () => btn.classList.remove("is-pressed"));
        });

        // YENİ: Tüm butonlar için subtle ripple efekti
        document.querySelectorAll(".btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                if (prefersReducedMotion) return;
                const r = btn.getBoundingClientRect();
                const ripple = document.createElement("span");
                const size = Math.max(r.width, r.height);
                ripple.style.cssText = `
                    position: absolute;
                    left: ${e.clientX - r.left - size / 2}px;
                    top: ${e.clientY - r.top - size / 2}px;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transform: scale(0);
                    pointer-events: none;
                    animation: rippleExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 0;
                `;
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 700);
            });
        });

        // Ripple keyframe inject
        if (!document.getElementById("rippleStyle")) {
            const style = document.createElement("style");
            style.id = "rippleStyle";
            style.textContent = `
                @keyframes rippleExpand {
                    to { transform: scale(2.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // SECTION DEPTH SCROLL — smoother parallax

    function bindSectionDepthScroll() {
        if (prefersReducedMotion) return;
        const heroOrbs = document.querySelectorAll(".hero-orb");
        const ambients = document.querySelectorAll(".ambient");

        let currentScroll = 0;
        let targetScroll = window.scrollY;
        let raf = null;

        function render() {
            currentScroll = lerp(currentScroll, targetScroll, 0.1);
            const shift = Math.min(currentScroll * 0.1, 60);

            heroOrbs.forEach((o, i) => {
                o.style.transform = `translate3d(0, ${(shift * (i + 1) * 0.3).toFixed(1)}px, 0)`;
            });
            ambients.forEach((a, i) => {
                a.style.transform = `translate3d(0, ${(currentScroll * (i + 1) * 0.08).toFixed(1)}px, 0)`;
            });

            if (Math.abs(currentScroll - targetScroll) > 0.5) {
                raf = requestAnimationFrame(render);
            } else {
                raf = null;
            }
        }

        window.addEventListener("scroll", () => {
            targetScroll = window.scrollY;
            if (!raf) raf = requestAnimationFrame(render);
        }, { passive: true });

        render();
    }

    // LOADER

    function hideLoader() {
        if (!pageLoader) return;
        setTimeout(() => { pageLoader.classList.add("hidden"); }, 400);
    }

    // SCROLL OPTIMIZER

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

    function bindWindowEvents() {
        window.addEventListener("scroll", onScrollOptimized, { passive: true });
        window.addEventListener("resize", onScrollOptimized, { passive: true });
        window.addEventListener("resize", () => {
            if (isMobile()) {
                resetInteractiveTransforms();
                closeMenu();
            }
        }, { passive: true });
    }

    // INIT

    function initialize() {
        applyTranslations(getCurrentLanguage());
        bindLanguageSwitcher();
        bindMenuBehavior();
        bindAnchorScroll();
        bindRevealAnimations();
        bindTiltAndMagnetic();
        bindHeroParallax();
        bindCursorGlow();
        bindInteractiveStates();
        bindSectionDepthScroll();
        bindFormValidation();
        bindWindowEvents();
        setDisabledContentActions();
        setImageFallbacks();

        handleHeaderScroll();
        updateActiveNav();
        updateScrollProgress();
        hideLoader();
    }

    initialize();
});
