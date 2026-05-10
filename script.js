/* =====================================================================
   Upcycling Patterns — Main Script
   Erasmus+ KA210-SCH Project
   ---------------------------------------------------------------------
   - EN/TR language system
   - /tr/ and ?lang=tr ready language detection
   - Accessible tabs
   - Mobile menu
   - Scroll progress
   - Back-to-top button
   - Reveal animations
   - Counter animation
   - Email obfuscation
   - Contact form validation
   - Web3Forms support + mailto fallback
   - Anti-spam cooldown
   - Reduced-motion support
   - Admin/CMS-ready HTML support
   ===================================================================== */

(function () {
    "use strict";

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }

    function boot() {
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

        const contactForm = document.getElementById("contactForm");
        const formStatus = document.getElementById("formStatus");
        const submitBtn = document.getElementById("submitBtn");

        const pageTitle = document.getElementById("pageTitle");
        const metaDescription = document.getElementById("metaDescription");

        const scrollProgress = document.getElementById("scrollProgress");
        const scrollProgressBar = document.querySelector(".scroll-progress-bar");
        const cursorGlow = document.getElementById("cursorGlow");
        const backToTop = document.getElementById("backToTop");

        const nameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");
        const honeypotInput = document.getElementById("websiteField");

        const prefersReducedMotion = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;

        const SAFE_LANGUAGE_KEY = "siteLanguage";
        const DEFAULT_LANGUAGE = "en";
        const SUPPORTED_LANGS = ["en", "tr"];

        const MAX_NAME_LENGTH = 80;
        const MAX_EMAIL_LENGTH = 120;
        const MAX_SUBJECT_LENGTH = 150;
        const MAX_MESSAGE_LENGTH = 2000;

        const SUBMIT_COOLDOWN_MS = 8000;
        const MIN_TIME_ON_PAGE_MS = 2500;

        const pageLoadTime = Date.now();
        let lastSubmitTime = 0;
        let currentLanguage = getCurrentLanguage();

        const translations = {
            en: {
                pageTitle: "Upcycling Patterns | Erasmus+ KA210-SCH",
                metaDescription:
                    "Upcycling Patterns is an Erasmus+ KA210-SCH project focused on sustainability, environmental awareness, climate responsibility, and upcycling through international school collaboration.",

                skipToContent: "Skip to content",
                loaderText: "Loading Upcycling Patterns",

                navHome: "Home",
                navAbout: "About",
                navExplore: "Explore",
                navPartners: "Partners",
                navMedia: "Media",
                navFaq: "FAQ",
                navContact: "Contact",

                heroEyebrow: "Erasmus+ KA210-SCH Project",
                heroTitleMain: "Upcycling",
                heroTitleAccent: "Patterns",
                heroDescription:
                    "An international school partnership focused on sustainability, environmental awareness, climate responsibility, and upcycling through creativity, collaboration, and active student participation.",
                heroBtnPrimary: "Explore Project",
                heroBtnSecondary: "Meet the Partners",

                statCountries: "Countries",
                statMonths: "Months",
                statProjectEnd: "Project End",

                chip1: "Climate Awareness",
                chip3: "Creative Upcycling",

                aboutTag: "About the Project",
                aboutTitle: "Learning Sustainability Through International Collaboration",
                aboutText:
                    "Upcycling Patterns, also referred to as UpCyc, is an Erasmus+ KA210-SCH project built around the themes of environment, climate change, sustainability, and upcycling. The project aims to help students become environmentally responsible individuals through education, research, and practical activities.",

                aboutCard1Title: "Environmental Awareness",
                aboutCard1Text:
                    "The project promotes ecological responsibility and encourages students to understand the importance of protecting natural resources.",
                aboutCard2Title: "Creative Upcycling",
                aboutCard2Text:
                    "Students are encouraged to reuse materials in creative and meaningful ways, transforming waste into useful and innovative products.",
                aboutCard3Title: "International Partnership",
                aboutCard3Text:
                    "Schools from different countries collaborate to share ideas, educational practices, and sustainable project experiences.",

                mission1Title: "Mission",
                mission1Text:
                    "To raise environmentally conscious students through meaningful international cooperation.",
                mission2Title: "Vision",
                mission2Text:
                    "To build a lasting educational culture centered on sustainability, creativity, and shared responsibility.",
                mission3Title: "Approach",
                mission3Text:
                    "Learning by doing through workshops, research, mobility, teamwork, and digital dissemination.",

                exploreTag: "Project Insights",
                exploreTitle: "Everything in One Place",
                exploreText:
                    "Browse goals, timeline, activities, results, and core project details in a clean, tabbed interface — without endless scrolling.",

                tabGoals: "Goals",
                tabTimeline: "Timeline",
                tabActivities: "Activities",
                tabResults: "Results",
                tabDetails: "Details",

                goal1Title: "Increase Environmental Awareness",
                goal1Text:
                    "Helping students better understand climate issues, sustainability, and responsible resource use.",
                goal2Title: "Promote Sustainable Development Goals",
                goal2Text:
                    "Integrating sustainability concepts into school-based learning and project practice.",
                goal3Title: "Encourage Active Participation",
                goal3Text:
                    "Enabling students to take part in research, production, workshops, and collaborative project tasks.",
                goal4Title: "Strengthen International Cooperation",
                goal4Text:
                    "Building educational bridges among partner institutions through shared activities and intercultural exchange.",
                goal5Title: "Develop Creativity",
                goal5Text:
                    "Supporting innovative thinking, artistic production, and practical problem-solving through upcycling activities.",
                goal6Title: "Create Long-Term Impact",
                goal6Text:
                    "Establishing sustainable habits and educational resources that can continue beyond the project period.",

                timeline1Title: "Project Launch",
                timeline1Text:
                    "Kick-off meetings, planning, coordination, and role distribution among partners.",
                timeline2Title: "Research & Preparation",
                timeline2Text:
                    "Students and teachers investigate sustainability topics, waste materials, and local practices.",
                timeline3Title: "Workshops & Production",
                timeline3Text:
                    "Hands-on activities, design tasks, upcycling products, and collaborative classroom practices.",
                timeline4Title: "Mobility & Exchange",
                timeline4Text:
                    "Partner visits, intercultural learning, peer interaction, and shared implementation experiences.",
                timeline5Title: "Dissemination",
                timeline5Text:
                    "Sharing project outputs through digital media, school presentations, and public communication.",
                timeline6Title: "Evaluation & Legacy",
                timeline6Text:
                    "Impact review, documentation, reflection, and long-term use of project materials.",

                activity1Title: "Student Workshops",
                activity1Text:
                    "Creative workshops focused on reuse, redesign, and transformation of materials.",
                activity2Title: "Teacher Collaboration",
                activity2Text:
                    "Joint planning, pedagogical exchange, and shared classroom implementation.",
                activity3Title: "Mobility Meetings",
                activity3Text:
                    "International visits and project meetings among partner schools.",
                activity4Title: "Digital Dissemination",
                activity4Text:
                    "Online sharing of project outcomes, videos, visual materials, and reports.",

                result1Title: "Environmentally Aware Students",
                result1Text:
                    "Students will develop stronger awareness of ecological issues and sustainable living practices.",
                result2Title: "Upcycling Products",
                result2Text:
                    "Creative student outputs and project-based products developed through upcycling activities.",
                result3Title: "Educational Materials",
                result3Text:
                    "Learning resources, digital materials, guides, reports, and project documentation.",
                result4Title: "Digital Content",
                result4Text:
                    "Videos, presentations, visual materials, and online project resources.",
                result5Title: "International Experience",
                result5Text:
                    "Students and teachers gain practical experience in European cooperation and intercultural learning.",
                result6Title: "Long-Term Educational Value",
                result6Text:
                    "Project materials and sustainable practices can continue to be used after the official project period ends.",

                projectCard1Title: "Project Type",
                projectCard1Text:
                    "Erasmus+ KA210-SCH\nSchool Education Small-scale Partnership",
                projectCard2Title: "Project Duration",
                projectCard2Text:
                    "From 01/09/2025 to 31/08/2027\nTotal duration: 24 months",
                projectCard3Title: "Methodology",
                projectCard3Text:
                    "Workshops, research, applied learning, collaboration, mobility, and digital production",
                projectCard4Title: "Focus Areas",
                projectCard4Text:
                    "Sustainability, climate awareness, creativity, reuse culture, intercultural partnership, and student-centred production.",

                partnersTag: "Partner Institutions",
                partnersTitle: "Schools Working Together",
                partnersText:
                    "Upcycling Patterns brings together schools from four countries to collaborate on sustainability, student engagement, and innovative learning.",

                badgeCoord: "Coordinator",
                badgePartner: "Partner",

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
                partner4School:
                    "Zespol Szkol Samochodowych im. Tadeusza Tanskiego",
                partner4Role: "Project partner",

                mediaTag: "Media Hub",
                mediaTitle: "Gallery, News & Resources",
                mediaText:
                    "Explore project visuals, latest updates, and downloadable materials — all in one place.",

                tabGallery: "Gallery",
                tabNews: "News",
                tabOutputs: "Outputs",

                galleryCaption1: "Workshop Activities",
                galleryCaption2: "Student Products",
                galleryCaption3: "Partner Meetings",
                galleryCaption4: "Presentations & Events",
                galleryCaption5: "Creative Displays",
                galleryCaption6: "Team Collaboration",

                news1Title: "Kick-off Meeting Completed",
                news1Text:
                    "Partner schools met to finalize the work plan, responsibilities, and dissemination goals.",
                news2Title: "Student Workshop Series Started",
                news2Text:
                    "Students began hands-on activities focused on transforming waste materials into creative products.",
                news3Title: "Dissemination Materials Published",
                news3Text:
                    "Digital content and visual project outputs were shared with the wider school community.",
                readMore: "Read More",

                output1Title: "Project Brochure",
                output1Text:
                    "A short introduction to the aims, partners, and activities of the project.",
                output2Title: "Workshop Guide",
                output2Text:
                    "A practical guide containing activity samples and implementation steps.",
                output3Title: "Dissemination Report",
                output3Text:
                    "A summary of project communication, outreach, and visibility activities.",
                downloadBtn: "Download",

                faqTag: "FAQ",
                faqTitle: "Frequently Asked Questions",
                faqText:
                    "Key information for students, teachers, parents, and visitors interested in the project.",
                faq1Question: "What is Upcycling Patterns?",
                faq1Answer:
                    "It is an Erasmus+ KA210-SCH school partnership project focused on sustainability, climate awareness, and creative reuse.",
                faq2Question: "Who are the project partners?",
                faq2Answer:
                    "The project includes partner schools from Türkiye, North Macedonia, Lithuania, and Poland.",
                faq3Question: "What kinds of activities are included?",
                faq3Answer:
                    "Workshops, research, mobility meetings, student production, digital dissemination, and collaborative learning activities.",
                faq4Question: "How long does the project last?",
                faq4Answer:
                    "The project duration is 24 months, from 01 September 2025 to 31 August 2027.",

                contactTag: "Contact",
                contactTitle: "Get in Touch",
                contactText:
                    "For further information about the project, partnership activities, or institutional cooperation, please use the contact details below.",
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

                disclaimerText:
                    "Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the Turkish National Agency. Neither the European Union nor the granting authority can be held responsible for them.",

                footerProject: "Erasmus+ KA210-SCH Project",
                footerCoordinatorLabel: "Coordinator:",
                footerCoordinatorValue: "MEV Koleji Özel Basınköy Anadolu Lisesi",
                footerCountriesLabel: "Countries:",
                footerCountriesValue:
                    "Türkiye, North Macedonia, Lithuania, Poland",
                footerCopy:
                    "© 2025–2027 Upcycling Patterns. All rights reserved.",

                formSending: "Sending your message...",
                formSuccess: "Thank you! Your message has been sent successfully.",
                formError: "Please complete all fields correctly.",
                formEmailError: "Please enter a valid email address.",
                formTooShortError:
                    "Please write a slightly more detailed message.",
                formCooldownError:
                    "Please wait a few seconds before submitting again.",
                formNetworkError:
                    "Could not send message. Opening your email app as a fallback...",
                formMissingKey:
                    "The contact form is not fully connected yet. Opening your email app instead...",
                formDisabledMessage: "This content will be added soon.",

                formConsent:
                    "I agree that the information I provide will be used to respond to my message.",
                formConsentRequired:
                    "Please confirm consent before sending your message.",

                themeToggleLabel: "Toggle dark mode",
                themeToLight: "Switch to light mode",
                themeToDark: "Switch to dark mode",

                cookieBannerTitle: "We respect your privacy",
                cookieBannerText:
                    "We use only essential local storage to remember your language and theme preferences. No tracking, no analytics.",
                cookieBannerAccept: "Got it",
                cookieBannerMore: "Learn more",

                lightboxClose: "Close image viewer",
                lightboxPrev: "Previous image",
                lightboxNext: "Next image",
               
                legalTitle: "Legal",
                privacyPolicyLink: "Privacy Policy",
                cookiePolicyLink: "Cookie Policy",
                termsLink: "Terms of Use",
                accessibilityLink: "Accessibility",
                fundingDisclaimerLink: "Funding Disclaimer",
                adminLink: "Admin"
            },

            tr: {
                pageTitle: "Upcycling Patterns | Erasmus+ KA210-SCH",
                metaDescription:
                    "Upcycling Patterns, sürdürülebilirlik, çevre bilinci, iklim sorumluluğu ve ileri dönüşüm temalarına odaklanan Erasmus+ KA210-SCH projesidir.",

                skipToContent: "İçeriğe geç",
                loaderText: "Upcycling Patterns yükleniyor",

                navHome: "Ana Sayfa",
                navAbout: "Hakkında",
                navExplore: "Keşfet",
                navPartners: "Ortaklar",
                navMedia: "Medya",
                navFaq: "SSS",
                navContact: "İletişim",

                heroEyebrow: "Erasmus+ KA210-SCH Projesi",
                heroTitleMain: "Upcycling",
                heroTitleAccent: "Patterns",
                heroDescription:
                    "Sürdürülebilirlik, çevre bilinci, iklim sorumluluğu ve ileri dönüşüme odaklanan; yaratıcılık, iş birliği ve aktif öğrenci katılımını temel alan uluslararası okul ortaklığı.",
                heroBtnPrimary: "Projeyi İncele",
                heroBtnSecondary: "Ortakları Gör",

                statCountries: "Ülke",
                statMonths: "Ay",
                statProjectEnd: "Proje Bitişi",

                chip1: "İklim Farkındalığı",
                chip3: "Yaratıcı İleri Dönüşüm",

                aboutTag: "Proje Hakkında",
                aboutTitle:
                    "Uluslararası İş Birliğiyle Sürdürülebilirliği Öğrenmek",
                aboutText:
                    "Upcycling Patterns, diğer adıyla UpCyc, çevre, iklim değişikliği, sürdürülebilirlik ve ileri dönüşüm temaları etrafında şekillenen bir Erasmus+ KA210-SCH projesidir. Proje; öğrencilerin eğitim, araştırma ve uygulamalı etkinlikler yoluyla çevreye duyarlı bireyler olmalarını amaçlamaktadır.",

                aboutCard1Title: "Çevre Bilinci",
                aboutCard1Text:
                    "Proje, ekolojik sorumluluğu destekler ve öğrencileri doğal kaynakları korumanın önemi konusunda bilinçlendirir.",
                aboutCard2Title: "Yaratıcı İleri Dönüşüm",
                aboutCard2Text:
                    "Öğrenciler, atık malzemeleri faydalı ve yenilikçi ürünlere dönüştürerek yaratıcı biçimde yeniden kullanmaya teşvik edilir.",
                aboutCard3Title: "Uluslararası Ortaklık",
                aboutCard3Text:
                    "Farklı ülkelerden okullar; fikir, eğitim uygulamaları ve sürdürülebilir proje deneyimlerini paylaşmak için birlikte çalışır.",

                mission1Title: "Misyon",
                mission1Text:
                    "Anlamlı uluslararası iş birlikleriyle çevreye duyarlı öğrenciler yetiştirmek.",
                mission2Title: "Vizyon",
                mission2Text:
                    "Sürdürülebilirlik, yaratıcılık ve ortak sorumluluk etrafında kalıcı bir eğitim kültürü oluşturmak.",
                mission3Title: "Yaklaşım",
                mission3Text:
                    "Atölye çalışmaları, araştırma, hareketlilik, ekip çalışması ve dijital yaygınlaştırma ile yaparak öğrenme.",

                exploreTag: "Proje İçeriği",
                exploreTitle: "Her Şey Tek Bir Yerde",
                exploreText:
                    "Hedefler, takvim, faaliyetler, sonuçlar ve temel proje detaylarını sürekli aşağı kaydırmadan, sekmeli bir arayüzle keşfedin.",

                tabGoals: "Hedefler",
                tabTimeline: "Takvim",
                tabActivities: "Faaliyetler",
                tabResults: "Sonuçlar",
                tabDetails: "Detaylar",

                goal1Title: "Çevre Bilincini Artırmak",
                goal1Text:
                    "Öğrencilerin iklim konuları, sürdürülebilirlik ve sorumlu kaynak kullanımı hakkında daha fazla farkındalık geliştirmelerini sağlamak.",
                goal2Title: "Sürdürülebilir Kalkınma Amaçlarını Desteklemek",
                goal2Text:
                    "Sürdürülebilirlik kavramlarını okul temelli öğrenmeye ve proje uygulamalarına entegre etmek.",
                goal3Title: "Aktif Katılımı Teşvik Etmek",
                goal3Text:
                    "Öğrencilerin araştırma, üretim, atölye çalışmaları ve ortak proje görevlerinde yer almasını sağlamak.",
                goal4Title: "Uluslararası İş Birliğini Güçlendirmek",
                goal4Text:
                    "Ortak faaliyetler ve kültürlerarası etkileşim yoluyla kurumlar arasında eğitim köprüleri kurmak.",
                goal5Title: "Yaratıcılığı Geliştirmek",
                goal5Text:
                    "İleri dönüşüm etkinlikleriyle yenilikçi düşünmeyi, sanatsal üretimi ve pratik problem çözmeyi desteklemek.",
                goal6Title: "Uzun Vadeli Etki Oluşturmak",
                goal6Text:
                    "Proje süresi sonrasında da devam edebilecek sürdürülebilir alışkanlıklar ve eğitim kaynakları oluşturmak.",

                timeline1Title: "Proje Başlangıcı",
                timeline1Text:
                    "Açılış toplantıları, planlama, koordinasyon ve ortaklar arasında görev dağılımı.",
                timeline2Title: "Araştırma ve Hazırlık",
                timeline2Text:
                    "Öğrenci ve öğretmenlerin sürdürülebilirlik konuları, atık malzemeler ve yerel uygulamalar üzerine çalışması.",
                timeline3Title: "Atölyeler ve Üretim",
                timeline3Text:
                    "Uygulamalı etkinlikler, tasarım çalışmaları, ileri dönüşüm ürünleri ve sınıf içi ortak uygulamalar.",
                timeline4Title: "Hareketlilik ve Değişim",
                timeline4Text:
                    "Ortak ziyaretleri, kültürlerarası öğrenme, akran etkileşimi ve paylaşılan uygulama deneyimleri.",
                timeline5Title: "Yaygınlaştırma",
                timeline5Text:
                    "Proje çıktılarının dijital medya, okul sunumları ve kamu iletişimi aracılığıyla paylaşılması.",
                timeline6Title: "Değerlendirme ve Kalıcılık",
                timeline6Text:
                    "Etki analizi, dokümantasyon, yansıtma ve proje materyallerinin uzun vadeli kullanımı.",

                activity1Title: "Öğrenci Atölyeleri",
                activity1Text:
                    "Malzemelerin yeniden kullanımı, yeniden tasarımı ve dönüştürülmesine odaklanan yaratıcı atölyeler.",
                activity2Title: "Öğretmen İş Birliği",
                activity2Text:
                    "Ortak planlama, pedagojik paylaşım ve sınıf içi ortak uygulamalar.",
                activity3Title: "Hareketlilik Toplantıları",
                activity3Text:
                    "Ortak okullar arasında uluslararası ziyaretler ve proje toplantıları.",
                activity4Title: "Dijital Yaygınlaştırma",
                activity4Text:
                    "Proje çıktılarının, videoların, görsel materyallerin ve raporların çevrim içi paylaşılması.",

                result1Title: "Çevre Bilinci Yüksek Öğrenciler",
                result1Text:
                    "Öğrenciler, ekolojik sorunlar ve sürdürülebilir yaşam uygulamaları konusunda daha güçlü farkındalık geliştirecektir.",
                result2Title: "İleri Dönüşüm Ürünleri",
                result2Text:
                    "İleri dönüşüm etkinlikleri yoluyla geliştirilen yaratıcı öğrenci çıktıları ve proje ürünleri.",
                result3Title: "Eğitim Materyalleri",
                result3Text:
                    "Öğrenme kaynakları, dijital materyaller, kılavuzlar, raporlar ve proje dokümantasyonu.",
                result4Title: "Dijital İçerik",
                result4Text:
                    "Videolar, sunumlar, görsel materyaller ve çevrim içi proje kaynakları.",
                result5Title: "Uluslararası Deneyim",
                result5Text:
                    "Öğrenci ve öğretmenler Avrupa iş birliği ve kültürlerarası öğrenme konusunda uygulamalı deneyim kazanır.",
                result6Title: "Uzun Vadeli Eğitsel Değer",
                result6Text:
                    "Proje materyalleri ve sürdürülebilir uygulamalar resmi proje dönemi sonrasında da kullanılabilir.",

                projectCard1Title: "Proje Türü",
                projectCard1Text:
                    "Erasmus+ KA210-SCH\nOkul Eğitimi Küçük Ölçekli Ortaklık",
                projectCard2Title: "Proje Süresi",
                projectCard2Text:
                    "01/09/2025 - 31/08/2027\nToplam süre: 24 ay",
                projectCard3Title: "Yöntem",
                projectCard3Text:
                    "Atölyeler, araştırma, uygulamalı öğrenme, iş birliği, hareketlilik ve dijital üretim",
                projectCard4Title: "Odak Alanları",
                projectCard4Text:
                    "Sürdürülebilirlik, iklim farkındalığı, yaratıcılık, yeniden kullanım kültürü, kültürlerarası ortaklık ve öğrenci odaklı üretim.",

                partnersTag: "Ortak Kurumlar",
                partnersTitle: "Birlikte Çalışan Okullar",
                partnersText:
                    "Upcycling Patterns; sürdürülebilirlik, öğrenci katılımı ve yenilikçi öğrenme için dört ülkeden okulu bir araya getirir.",

                badgeCoord: "Koordinatör",
                badgePartner: "Ortak",

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
                partner4School:
                    "Zespol Szkol Samochodowych im. Tadeusza Tanskiego",
                partner4Role: "Proje ortağı",

                mediaTag: "Medya Merkezi",
                mediaTitle: "Galeri, Haberler ve Kaynaklar",
                mediaText:
                    "Proje görselleri, son güncellemeler ve indirilebilir materyalleri tek bir yerde keşfedin.",

                tabGallery: "Galeri",
                tabNews: "Haberler",
                tabOutputs: "Çıktılar",

                galleryCaption1: "Atölye Çalışmaları",
                galleryCaption2: "Öğrenci Ürünleri",
                galleryCaption3: "Ortak Toplantıları",
                galleryCaption4: "Sunumlar ve Etkinlikler",
                galleryCaption5: "Yaratıcı Sergiler",
                galleryCaption6: "Ekip İş Birliği",

                news1Title: "Açılış Toplantısı Tamamlandı",
                news1Text:
                    "Ortak okullar çalışma planı, sorumluluklar ve yaygınlaştırma hedeflerini netleştirmek için bir araya geldi.",
                news2Title: "Öğrenci Atölye Serisi Başladı",
                news2Text:
                    "Öğrenciler, atık malzemeleri yaratıcı ürünlere dönüştürmeye odaklanan uygulamalı etkinliklere başladı.",
                news3Title: "Yaygınlaştırma Materyalleri Paylaşıldı",
                news3Text:
                    "Dijital içerikler ve görsel proje çıktıları daha geniş okul topluluğuyla paylaşıldı.",
                readMore: "Devamını Oku",

                output1Title: "Proje Broşürü",
                output1Text:
                    "Projenin amaçları, ortakları ve faaliyetleri hakkında kısa tanıtım.",
                output2Title: "Atölye Kılavuzu",
                output2Text:
                    "Etkinlik örnekleri ve uygulama adımlarını içeren pratik rehber.",
                output3Title: "Yaygınlaştırma Raporu",
                output3Text:
                    "Proje iletişimi, erişim ve görünürlük faaliyetlerinin özeti.",
                downloadBtn: "İndir",

                faqTag: "SSS",
                faqTitle: "Sık Sorulan Sorular",
                faqText:
                    "Projeyle ilgilenen öğrenciler, öğretmenler, veliler ve ziyaretçiler için temel bilgiler.",
                faq1Question: "Upcycling Patterns nedir?",
                faq1Answer:
                    "Sürdürülebilirlik, iklim farkındalığı ve yaratıcı yeniden kullanıma odaklanan Erasmus+ KA210-SCH okul ortaklığı projesidir.",
                faq2Question: "Proje ortakları kimlerdir?",
                faq2Answer:
                    "Projede Türkiye, Kuzey Makedonya, Litvanya ve Polonya'dan ortak okullar yer almaktadır.",
                faq3Question: "Hangi tür faaliyetler yer alıyor?",
                faq3Answer:
                    "Atölyeler, araştırma, hareketlilik toplantıları, öğrenci üretimi, dijital yaygınlaştırma ve iş birlikçi öğrenme etkinlikleri.",
                faq4Question: "Proje ne kadar sürüyor?",
                faq4Answer:
                    "Proje süresi 24 aydır; 01 Eylül 2025 ile 31 Ağustos 2027 arasındadır.",

                contactTag: "İletişim",
                contactTitle: "İletişime Geçin",
                contactText:
                    "Proje, ortaklık faaliyetleri veya kurumsal iş birliği hakkında daha fazla bilgi için aşağıdaki iletişim bilgilerini kullanabilirsiniz.",
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

                disclaimerText:
                    "Avrupa Birliği tarafından finanse edilmektedir. Ancak burada ifade edilen görüş ve düşünceler yalnızca yazar(lar)a aittir ve Avrupa Birliği'nin veya Türkiye Ulusal Ajansı'nın görüşlerini yansıtmak zorunda değildir. Avrupa Birliği ve hibe makamı bunlardan sorumlu tutulamaz.",

                footerProject: "Erasmus+ KA210-SCH Projesi",
                footerCoordinatorLabel: "Koordinatör:",
                footerCoordinatorValue:
                    "MEV Koleji Özel Basınköy Anadolu Lisesi",
                footerCountriesLabel: "Ülkeler:",
                footerCountriesValue:
                    "Türkiye, Kuzey Makedonya, Litvanya, Polonya",
                footerCopy:
                    "© 2025–2027 Upcycling Patterns. Tüm hakları saklıdır.",

                formSending: "Mesajınız gönderiliyor...",
                formSuccess: "Teşekkürler! Mesajınız başarıyla gönderildi.",
                formError: "Lütfen tüm alanları doğru şekilde doldurun.",
                formEmailError: "Lütfen geçerli bir e-posta adresi girin.",
                formTooShortError:
                    "Lütfen mesajınızı biraz daha ayrıntılı yazın.",
                formCooldownError:
                    "Lütfen tekrar göndermeden önce birkaç saniye bekleyin.",
                formNetworkError:
                    "Mesaj gönderilemedi. Yedek olarak e-posta uygulamanız açılıyor...",
                formMissingKey:
                    "İletişim formu henüz tam bağlanmamış. Yedek olarak e-posta uygulamanız açılıyor...",
                formDisabledMessage: "Bu içerik yakında eklenecek.",

                formConsent:
                    "Verdiğim bilgilerin yalnızca mesajıma yanıt vermek için kullanılmasını kabul ediyorum.",
                formConsentRequired:
                    "Mesajınızı göndermeden önce onay kutusunu işaretleyiniz.",

                themeToggleLabel: "Karanlık modu aç/kapat",
                themeToLight: "Açık moda geç",
                themeToDark: "Karanlık moda geç",

                cookieBannerTitle: "Gizliliğinize saygı duyuyoruz",
                cookieBannerText:
                    "Yalnızca dil ve tema tercihlerinizi hatırlamak için yerel depolama kullanıyoruz. Hiçbir izleme veya analiz yapılmamaktadır.",
                cookieBannerAccept: "Anladım",
                cookieBannerMore: "Daha fazla bilgi",

                lightboxClose: "Görsel görüntüleyiciyi kapat",
                lightboxPrev: "Önceki görsel",
                lightboxNext: "Sonraki görsel",

                legalTitle: "Yasal",
                privacyPolicyLink: "Gizlilik Politikası",
                cookiePolicyLink: "Çerez Politikası",
                adminLink: "Yönetim Paneli"
            }
        };

        function safeStorageGet(key) {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        }

        function safeStorageSet(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                return false;
            }
            return true;
        }

        function getCurrentLanguage() {
            const path = window.location.pathname.toLowerCase();

            if (path === "/tr" || path.startsWith("/tr/")) {
                return "tr";
            }

            try {
                const urlLang = new URLSearchParams(window.location.search).get("lang");
                if (SUPPORTED_LANGS.includes(urlLang)) {
                    return urlLang;
                }
            } catch (error) {
                /* ignore */
            }

            const saved = safeStorageGet(SAFE_LANGUAGE_KEY);
            if (SUPPORTED_LANGS.includes(saved)) {
                return saved;
            }

            const browserLang = (navigator.language || "en").toLowerCase();
            return browserLang.startsWith("tr") ? "tr" : DEFAULT_LANGUAGE;
        }

        function getDictionary(lang) {
            return translations[lang] || translations[DEFAULT_LANGUAGE];
        }

        function updateUrlLanguage(lang) {
            if (!window.history || !window.history.replaceState) {
                return;
            }

            try {
                const url = new URL(window.location.href);
                const path = url.pathname.toLowerCase();

                if (path === "/tr" || path.startsWith("/tr/")) {
                    return;
                }

                if (lang === "tr") {
                    url.searchParams.set("lang", "tr");
                } else {
                    url.searchParams.delete("lang");
                }

                window.history.replaceState({}, "", url.toString());
            } catch (error) {
                /* ignore */
            }
        }

        function setTextSafely(element, value) {
            if (!element || typeof value !== "string") {
                return;
            }

            const btnText = element.querySelector(":scope > .btn-text");

            if (btnText) {
                btnText.textContent = value;
                return;
            }

            if (value.includes("\n")) {
                element.textContent = "";
                value.split("\n").forEach((part, index, arr) => {
                    element.appendChild(document.createTextNode(part));
                    if (index < arr.length - 1) {
                        element.appendChild(document.createElement("br"));
                    }
                });
                return;
            }

            element.textContent = value;
        }

        function updateMetaForLanguage(lang) {
            const dict = getDictionary(lang);

            if (pageTitle && dict.pageTitle) {
                pageTitle.textContent = dict.pageTitle;
            }

            if (dict.pageTitle) {
                document.title = dict.pageTitle;
            }

            if (metaDescription && dict.metaDescription) {
                metaDescription.setAttribute("content", dict.metaDescription);
            }

            const ogTitle = document.querySelector('meta[property="og:title"]');
            const ogDescription = document.querySelector('meta[property="og:description"]');
            const ogLocale = document.querySelector('meta[property="og:locale"]');
            const twitterTitle = document.querySelector('meta[name="twitter:title"]');
            const twitterDescription = document.querySelector('meta[name="twitter:description"]');

            if (ogTitle && dict.pageTitle) {
                ogTitle.setAttribute("content", dict.pageTitle);
            }

            if (ogDescription && dict.metaDescription) {
                ogDescription.setAttribute("content", dict.metaDescription);
            }

            if (twitterTitle && dict.pageTitle) {
                twitterTitle.setAttribute("content", dict.pageTitle);
            }

            if (twitterDescription && dict.metaDescription) {
                twitterDescription.setAttribute("content", dict.metaDescription);
            }

            if (ogLocale) {
                ogLocale.setAttribute("content", lang === "tr" ? "tr_TR" : "en_US");
            }
        }

        function applyTranslations(lang, options = {}) {
            const nextLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANGUAGE;
            const dict = getDictionary(nextLang);

            currentLanguage = nextLang;
            html.setAttribute("lang", nextLang);
            html.setAttribute("dir", "ltr");

            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const key = element.getAttribute("data-i18n");
                if (!key || !(key in dict)) {
                    return;
                }
                setTextSafely(element, dict[key]);
            });

            document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
                const key = element.getAttribute("data-i18n-placeholder");
                if (!key || !(key in dict)) {
                    return;
                }
                element.setAttribute("placeholder", dict[key]);
            });

            langButtons.forEach((button) => {
                const isActive = button.dataset.lang === nextLang;
                button.classList.toggle("active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

            updateMetaForLanguage(nextLang);
            safeStorageSet(SAFE_LANGUAGE_KEY, nextLang);

            if (options.updateUrl) {
                updateUrlLanguage(nextLang);
            }

            if (!prefersReducedMotion && options.animate !== false) {
                body.style.transition = "opacity 0.25s ease";
                body.style.opacity = "0.92";

                window.setTimeout(() => {
                    body.style.opacity = "1";

                    window.setTimeout(() => {
                        body.style.transition = "";
                    }, 260);
                }, 90);
            }
        }

        function bindLanguageSwitcher() {
            langButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const nextLang = button.dataset.lang;

                    if (!SUPPORTED_LANGS.includes(nextLang)) {
                        return;
                    }

                    applyTranslations(nextLang, {
                        updateUrl: true,
                        animate: true
                    });
                });
            });
        }

        function sanitizeText(value, maxLength) {
            if (typeof value !== "string") {
                return "";
            }

            return value
                .replace(/[\u0000-\u001F\u007F]/g, " ")
                .replace(/[<>]/g, "")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, maxLength);
        }

        function sanitizeMultilineText(value, maxLength) {
            if (typeof value !== "string") {
                return "";
            }

            return value
                .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
                .replace(/[<>]/g, "")
                .replace(/\r\n/g, "\n")
                .replace(/\n{3,}/g, "\n\n")
                .trim()
                .slice(0, maxLength);
        }

        function isValidEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) &&
                value.length <= MAX_EMAIL_LENGTH;
        }

        function setStatusMessage(message, isError) {
            if (!formStatus) {
                return;
            }

            formStatus.textContent = message || "";
            formStatus.style.color = isError ? "#b42318" : "#18794e";
        }

        function validateForm() {
            const dict = getDictionary(currentLanguage);

            if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput) {
                return false;
            }

            const name = sanitizeText(nameInput.value, MAX_NAME_LENGTH);
            const email = sanitizeText(emailInput.value, MAX_EMAIL_LENGTH);
            const subject = sanitizeText(subjectInput.value, MAX_SUBJECT_LENGTH);
            const message = sanitizeMultilineText(messageInput.value, MAX_MESSAGE_LENGTH);

            nameInput.value = name;
            emailInput.value = email;
            subjectInput.value = subject;
            messageInput.value = message;

            if (honeypotInput) {
                const botFilled = honeypotInput.type === "checkbox"
                    ? honeypotInput.checked
                    : honeypotInput.value.trim() !== "";

                if (botFilled) {
                    setStatusMessage(dict.formError, true);
                    return false;
                }
            }

            if (!name || !email || !subject || !message) {
                setStatusMessage(dict.formError, true);
                return false;
            }

            if (name.length < 2) {
                setStatusMessage(dict.formError, true);
                nameInput.focus();
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

        function getFormAccessKey() {
            if (!contactForm) {
                return "";
            }

            const hiddenKey = contactForm.querySelector('input[name="access_key"]');
            const keyFromInput = hiddenKey ? hiddenKey.value.trim() : "";
            const keyFromData = contactForm.getAttribute("data-access-key") || "";
            const key = keyFromInput || keyFromData.trim();

            if (!key || key === "YOUR_WEB3FORMS_ACCESS_KEY") {
                return "";
            }

            return key;
        }

        function fallbackToMailto() {
            if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput) {
                return;
            }

            const fallbackEmail =
                contactForm.getAttribute("data-fallback-email") ||
                "upcyclingpatterns@gmail.com";

            const subject = encodeURIComponent(
                subjectInput.value || "Message from Upcycling Patterns website"
            );

            const body = encodeURIComponent(
                "Name: " + nameInput.value + "\n" +
                "Email: " + emailInput.value + "\n\n" +
                "Message:\n" + messageInput.value
            );

            window.location.href = "mailto:" + fallbackEmail + "?subject=" + subject + "&body=" + body;
        }

        function setSubmitState(isSubmitting) {
            if (!submitBtn) {
                return;
            }

            submitBtn.disabled = Boolean(isSubmitting);
            submitBtn.setAttribute("aria-busy", String(Boolean(isSubmitting)));

            const dict = getDictionary(currentLanguage);
            const label = submitBtn.querySelector("[data-i18n]") || submitBtn.querySelector("span");

            if (label) {
                label.textContent = isSubmitting ? dict.formSending : dict.formSubmitBtn;
            }
        }

        async function handleContactSubmit(event) {
            event.preventDefault();

            const dict = getDictionary(currentLanguage);

            if (!validateForm()) {
                return;
            }

            const now = Date.now();

            if (now - pageLoadTime < MIN_TIME_ON_PAGE_MS) {
                setStatusMessage(dict.formCooldownError, true);
                return;
            }

            if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
                setStatusMessage(dict.formCooldownError, true);
                return;
            }

            lastSubmitTime = now;

            const accessKey = getFormAccessKey();

            if (!accessKey) {
                setStatusMessage(dict.formMissingKey, true);
                window.setTimeout(fallbackToMailto, 700);
                return;
            }

            setSubmitState(true);
            setStatusMessage(dict.formSending, false);

            try {
                const formData = new FormData(contactForm);
                formData.set("access_key", accessKey);
                formData.set("name", nameInput.value);
                formData.set("email", emailInput.value);
                formData.set("user_subject", subjectInput.value);
                formData.set("message", messageInput.value);
                formData.set("language", currentLanguage);
                formData.set("page_url", window.location.href);

                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok || result.success === false) {
                    throw new Error(result.message || "Form submission failed");
                }

                setStatusMessage(dict.formSuccess, false);
                contactForm.reset();
            } catch (error) {
                setStatusMessage(dict.formNetworkError, true);
                window.setTimeout(fallbackToMailto, 900);
            } finally {
                setSubmitState(false);
            }
        }

        function bindContactForm() {
            if (!contactForm) {
                return;
            }

            contactForm.addEventListener("submit", handleContactSubmit);
        }

        function bindEmailLinks() {
            document.querySelectorAll("a.email-link").forEach((link) => {
                const user = link.getAttribute("data-user");
                const domain = link.getAttribute("data-domain");

                if (!user || !domain) {
                    return;
                }

                const address = user + "@" + domain;
                link.setAttribute("href", "mailto:" + address);

                const display = link.querySelector(".email-display");
                if (display) {
                    display.textContent = address;
                }
            });
        }

        function isMobile() {
            return window.innerWidth <= 960;
        }

        function openMenu() {
            if (!navMenu || !menuToggle) {
                return;
            }

            navMenu.classList.add("open");
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");

            if (isMobile()) {
                body.style.overflow = "hidden";
            }

            const firstLink = navMenu.querySelector(".nav-link");
            if (firstLink) {
                window.setTimeout(() => firstLink.focus(), 180);
            }
        }

        function closeMenu() {
            if (!navMenu || !menuToggle) {
                return;
            }

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            body.style.overflow = "";
        }

        function toggleMenu() {
            if (!navMenu) {
                return;
            }

            if (navMenu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function bindMenuBehavior() {
            if (!menuToggle || !navMenu) {
                return;
            }

            menuToggle.addEventListener("click", toggleMenu);

            document.addEventListener("click", (event) => {
                if (
                    navMenu.classList.contains("open") &&
                    !navMenu.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeMenu();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && navMenu.classList.contains("open")) {
                    closeMenu();
                    menuToggle.focus();
                }
            });

            navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    if (isMobile()) {
                        closeMenu();
                    }
                });
            });

            window.addEventListener("resize", throttle(() => {
                if (!isMobile()) {
                    body.style.overflow = "";
                }
            }, 150), { passive: true });
        }

        function handleHeaderScroll() {
            if (!header) {
                return;
            }

            header.classList.toggle("scrolled", window.scrollY > 20);
        }

        function updateActiveNav() {
            let current = "";
            const marker = window.scrollY + window.innerHeight * 0.35;

            sections.forEach((section) => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (marker >= top && marker < bottom) {
                    current = section.id || "";
                }
            });

            navLinks.forEach((link) => {
                const href = link.getAttribute("href") || "";
                const isActive = href === "#" + current || (!current && href === "#home");

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        function updateScrollProgress() {
            if (!scrollProgressBar) {
                return;
            }

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

            scrollProgressBar.style.width = percent + "%";

            if (scrollProgress) {
                scrollProgress.setAttribute("aria-valuenow", String(Math.round(percent)));
                scrollProgress.style.opacity = scrollTop > 10 ? "1" : "0.9";
            }
        }

        function bindBackToTop() {
            if (!backToTop) {
                return;
            }

            backToTop.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? "auto" : "smooth"
                });
            });
        }

        function updateBackToTop() {
            if (!backToTop) {
                return;
            }

            backToTop.classList.toggle("visible", window.scrollY > 500);
        }

        function bindAnchorScroll() {
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", (event) => {
                    const href = anchor.getAttribute("href");

                    if (!href || href === "#") {
                        return;
                    }

                    let target = null;

                    try {
                        target = document.querySelector(href);
                    } catch (error) {
                        return;
                    }

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const offset = header ? header.offsetHeight + 18 : 0;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;

                    window.scrollTo({
                        top,
                        behavior: prefersReducedMotion ? "auto" : "smooth"
                    });

                    if (history && history.pushState) {
                        history.pushState(null, "", href);
                    }
                });
            });
        }

        function animateCounter(element) {
            if (!element || element.dataset.animated === "true") {
                return;
            }

            const target = parseInt(
                element.getAttribute("data-target") || element.textContent,
                10
            );

            if (!Number.isFinite(target)) {
                return;
            }

            if (prefersReducedMotion) {
                element.textContent = String(target);
                element.dataset.animated = "true";
                return;
            }

            const duration = 1600;
            const start = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                element.textContent = String(Math.floor(target * eased));

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.textContent = String(target);
                    element.dataset.animated = "true";
                }
            }

            requestAnimationFrame(step);
        }

        function bindRevealAnimations() {
            const revealItems = document.querySelectorAll(".reveal-item");
            const statNumbers = document.querySelectorAll(".stat-number[data-target]");

            if (!("IntersectionObserver" in window)) {
                revealItems.forEach((item) => item.classList.add("visible"));
                statNumbers.forEach((number) => animateCounter(number));
                return;
            }

            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

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
                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.45
                }
            );

            statNumbers.forEach((number) => counterObserver.observe(number));
        }

        function bindTabs() {
            const tabWrappers = document.querySelectorAll(".tabs-wrapper");

            tabWrappers.forEach((wrapper) => {
                const tabButtons = Array.from(wrapper.querySelectorAll(".tab-btn"));
                const panels = Array.from(wrapper.querySelectorAll(".tab-panel"));
                const indicator = wrapper.querySelector(".tab-indicator");
                const tabsNav = wrapper.querySelector(".tabs-nav");

                if (!tabButtons.length || !panels.length) {
                    return;
                }

                function moveIndicator(targetButton) {
                    if (!indicator || !targetButton || !tabsNav) {
                        return;
                    }

                    const navRect = tabsNav.getBoundingClientRect();
                    const buttonRect = targetButton.getBoundingClientRect();
                    const offsetX = buttonRect.left - navRect.left + tabsNav.scrollLeft;

                    indicator.style.width = buttonRect.width + "px";
                    indicator.style.transform = "translateX(" + (offsetX - 8) + "px)";
                }

                function activateTab(targetButton, focusPanel) {
                    if (!targetButton) {
                        return;
                    }

                    const targetTab = targetButton.dataset.tab;
                    const targetPanel = wrapper.querySelector("#panel-" + targetTab);

                    if (!targetTab || !targetPanel) {
                        return;
                    }

                    tabButtons.forEach((button) => {
                        const isActive = button === targetButton;

                        button.classList.toggle("active", isActive);
                        button.setAttribute("aria-selected", String(isActive));
                        button.setAttribute("tabindex", isActive ? "0" : "-1");
                    });

                    panels.forEach((panel) => {
                        const isActive = panel === targetPanel;

                        panel.classList.toggle("active", isActive);
                        panel.hidden = !isActive;
                    });

                    moveIndicator(targetButton);

                    if (focusPanel) {
                        targetPanel.focus({ preventScroll: true });
                    }
                }

                tabButtons.forEach((button) => {
                    button.addEventListener("click", () => {
                        activateTab(button, false);
                    });

                    button.addEventListener("keydown", (event) => {
                        const currentIndex = tabButtons.indexOf(button);
                        let nextButton = null;

                        if (event.key === "ArrowRight") {
                            nextButton = tabButtons[(currentIndex + 1) % tabButtons.length];
                        } else if (event.key === "ArrowLeft") {
                            nextButton =
                                tabButtons[(currentIndex - 1 + tabButtons.length) % tabButtons.length];
                        } else if (event.key === "Home") {
                            nextButton = tabButtons[0];
                        } else if (event.key === "End") {
                            nextButton = tabButtons[tabButtons.length - 1];
                        }

                        if (nextButton) {
                            event.preventDefault();
                            activateTab(nextButton, false);
                            nextButton.focus();
                        }
                    });
                });

                const activeButton = wrapper.querySelector(".tab-btn.active") || tabButtons[0];

                requestAnimationFrame(() => {
                    activateTab(activeButton, false);
                    moveIndicator(activeButton);
                });

                window.addEventListener("resize", debounce(() => {
                    const current = wrapper.querySelector(".tab-btn.active") || activeButton;
                    moveIndicator(current);
                }, 120), { passive: true });

                if (tabsNav) {
                    tabsNav.addEventListener("scroll", throttle(() => {
                        const current = wrapper.querySelector(".tab-btn.active") || activeButton;
                        moveIndicator(current);
                    }, 80), { passive: true });
                }
            });
        }

        function bindMagneticButtons() {
            if (prefersReducedMotion || isTouchDevice) {
                return;
            }

            document.querySelectorAll(".magnetic").forEach((element) => {
                element.addEventListener("mousemove", (event) => {
                    const rect = element.getBoundingClientRect();
                    const x = event.clientX - rect.left - rect.width / 2;
                    const y = event.clientY - rect.top - rect.height / 2;
                    const strength = 0.22;

                    element.style.transform =
                        "translate(" + x * strength + "px, " + y * strength + "px)";
                });

                element.addEventListener("mouseleave", () => {
                    element.style.transform = "";
                });
            });
        }

        function bindTiltCards() {
            if (prefersReducedMotion || isTouchDevice) {
                return;
            }

            document.querySelectorAll(".tilt-card").forEach((card) => {
                card.style.transformStyle = "preserve-3d";
                card.style.willChange = "transform";

                card.addEventListener("mousemove", (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width;
                    const y = (event.clientY - rect.top) / rect.height;
                    const rotateX = (0.5 - y) * 6;
                    const rotateY = (x - 0.5) * 6;

                    card.style.transform =
                        "perspective(1000px) rotateX(" +
                        rotateX +
                        "deg) rotateY(" +
                        rotateY +
                        "deg) translateY(-6px)";
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = "";
                });
            });
        }

        function bindCursorGlow() {
            if (!cursorGlow || prefersReducedMotion || isTouchDevice) {
                if (cursorGlow) {
                    cursorGlow.style.display = "none";
                }
                return;
            }

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let currentX = mouseX;
            let currentY = mouseY;

            window.addEventListener("mousemove", (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;
            }, { passive: true });

            function animateGlow() {
                currentX += (mouseX - currentX) * 0.12;
                currentY += (mouseY - currentY) * 0.12;

                cursorGlow.style.transform =
                    "translate(" + (currentX - 140) + "px, " + (currentY - 140) + "px)";

                requestAnimationFrame(animateGlow);
            }

            animateGlow();
        }

        function bindComingSoonActions() {
            document.querySelectorAll('[data-status="coming-soon"]').forEach((element) => {
                element.addEventListener("click", (event) => {
                    event.preventDefault();

                    const dict = getDictionary(currentLanguage);
                    setStatusMessage(dict.formDisabledMessage, false);
                });
            });
        }

        function bindImageFallbacks() {
            document.querySelectorAll("img").forEach((image) => {
                image.addEventListener("error", () => {
                    image.dataset.missing = "true";
                    image.alt = image.alt || "Image could not be loaded";
                }, { once: true });
            });
        }

        function hideLoader() {
            if (!pageLoader) {
                return;
            }

            pageLoader.classList.add("hidden");

            window.setTimeout(() => {
                if (pageLoader && pageLoader.parentNode) {
                    pageLoader.setAttribute("aria-hidden", "true");
                }
            }, 850);
        }

        function bindLoader() {
            if (!pageLoader) {
                return;
            }

            window.addEventListener("load", hideLoader, { once: true });

            window.setTimeout(() => {
                hideLoader();
            }, 2200);
        }

        function throttle(fn, wait) {
            let lastTime = 0;
            let rafId = null;

            return function throttled(...args) {
                const now = Date.now();

                if (now - lastTime >= wait) {
                    lastTime = now;
                    fn.apply(this, args);
                    return;
                }

                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        rafId = null;
                        lastTime = Date.now();
                        fn.apply(this, args);
                    });
                }
            };
        }

        function debounce(fn, wait) {
            let timeoutId = null;

            return function debounced(...args) {
                window.clearTimeout(timeoutId);
                timeoutId = window.setTimeout(() => {
                    fn.apply(this, args);
                }, wait);
            };
        }

        function handleScroll() {
            handleHeaderScroll();
            updateActiveNav();
            updateScrollProgress();
            updateBackToTop();
        }

        function bindScrollHandlers() {
            const throttledScroll = throttle(handleScroll, 80);

            window.addEventListener("scroll", throttledScroll, { passive: true });
            window.addEventListener("resize", debounce(handleScroll, 120), { passive: true });

            handleScroll();
        }

        /* ============================================================
           NEW: Theme toggle (light / dark)
           Pref order: explicit user choice → system → light fallback.
           Persisted in localStorage under "siteTheme".
           Inline script in index.html sets the initial theme to avoid FOUC.
           ============================================================ */
        function getCurrentTheme() {
            const root = document.documentElement;
            const attr = root.getAttribute("data-theme");
            if (attr === "dark" || attr === "light") return attr;
            const saved = safeStorageGet("siteTheme");
            if (saved === "dark" || saved === "light") return saved;
            return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }

        function applyTheme(theme) {
            const root = document.documentElement;
            root.setAttribute("data-theme", theme);
            try { localStorage.setItem("siteTheme", theme); } catch (e) {}

            // Update meta theme-color so mobile browser chrome adapts
            const meta = document.querySelector('meta[name="theme-color"]:not([media])');
            if (meta) {
                meta.setAttribute("content", theme === "dark" ? "#0f1912" : "#2f7a43");
            }

            // Update toggle button aria-label
            const dict = getDictionary(currentLanguage);
            const btn = document.getElementById("themeToggle");
            if (btn) {
                btn.setAttribute(
                    "aria-label",
                    theme === "dark" ? dict.themeToLight : dict.themeToDark
                );
                btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
            }
        }

        function bindThemeToggle() {
            const btn = document.getElementById("themeToggle");
            if (!btn) return;

            applyTheme(getCurrentTheme());

            btn.addEventListener("click", () => {
                const current = document.documentElement.getAttribute("data-theme");
                applyTheme(current === "dark" ? "light" : "dark");
            });

            // React to OS-level theme changes ONLY if user hasn't explicitly chosen
            if (window.matchMedia) {
                const mq = window.matchMedia("(prefers-color-scheme: dark)");
                const onChange = (event) => {
                    if (!safeStorageGet("siteTheme")) {
                        applyTheme(event.matches ? "dark" : "light");
                    }
                };
                if (typeof mq.addEventListener === "function") {
                    mq.addEventListener("change", onChange);
                } else if (typeof mq.addListener === "function") {
                    mq.addListener(onChange);
                }
            }
        }

        /* ============================================================
           NEW: Cookie consent banner
           Shown once until dismissed.
           ============================================================ */
        function bindCookieBanner() {
            const banner = document.getElementById("cookieBanner");
            if (!banner) return;

            const dismissed = safeStorageGet("cookieConsentDismissed");
            if (dismissed === "true") return;

            // Show banner with a slight delay to avoid clashing with page load
            window.setTimeout(() => {
                banner.hidden = false;
                window.requestAnimationFrame(() => banner.classList.add("is-visible"));
            }, 1400);

            const acceptBtn = document.getElementById("cookieAccept");
            if (acceptBtn) {
                acceptBtn.addEventListener("click", () => {
                    banner.classList.remove("is-visible");
                    try { localStorage.setItem("cookieConsentDismissed", "true"); } catch (e) {}
                    window.setTimeout(() => { banner.hidden = true; }, 600);
                });
            }
        }

        /* ============================================================
           NEW: Lightbox for the gallery
           Opens on .gallery-card click, supports keyboard nav.
           ============================================================ */
        function bindLightbox() {
            const lightbox = document.getElementById("lightbox");
            const lightboxImg = document.getElementById("lightboxImage");
            const lightboxCaption = document.getElementById("lightboxCaption");
            const lightboxCounter = document.getElementById("lightboxCounter");
            const closeBtn = document.getElementById("lightboxClose");
            const prevBtn = document.getElementById("lightboxPrev");
            const nextBtn = document.getElementById("lightboxNext");
            const galleryCards = document.querySelectorAll(
                '.gallery-card[data-lightbox="true"], .gallery-card'
            );

            if (!lightbox || !lightboxImg || !galleryCards.length) return;

            const items = Array.from(galleryCards).map((card) => {
                const img = card.querySelector("img");
                const cap = card.querySelector("figcaption");
                return {
                    src: img ? img.getAttribute("src") : "",
                    alt: img ? img.getAttribute("alt") || "" : "",
                    caption: cap ? cap.textContent.trim() : ""
                };
            }).filter((item) => item.src);

            if (!items.length) return;

            let currentIndex = 0;
            let lastActiveElement = null;

            function showItem(index) {
                if (index < 0) index = items.length - 1;
                if (index >= items.length) index = 0;
                currentIndex = index;

                const item = items[index];
                lightboxImg.setAttribute("src", item.src);
                lightboxImg.setAttribute("alt", item.alt);
                if (lightboxCaption) lightboxCaption.textContent = item.caption || "";
                if (lightboxCounter) {
                    lightboxCounter.textContent = (index + 1) + " / " + items.length;
                }

                if (prevBtn) prevBtn.disabled = items.length <= 1;
                if (nextBtn) nextBtn.disabled = items.length <= 1;
            }

            function openLightbox(index) {
                lastActiveElement = document.activeElement;
                showItem(index);
                lightbox.hidden = false;
                window.requestAnimationFrame(() => lightbox.classList.add("is-visible"));
                document.body.style.overflow = "hidden";
                if (closeBtn) closeBtn.focus();
                document.addEventListener("keydown", handleKey);
            }

            function closeLightbox() {
                lightbox.classList.remove("is-visible");
                document.body.style.overflow = "";
                document.removeEventListener("keydown", handleKey);
                window.setTimeout(() => {
                    lightbox.hidden = true;
                    lightboxImg.setAttribute("src", "");
                    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
                        lastActiveElement.focus();
                    }
                }, 400);
            }

            function handleKey(event) {
                switch (event.key) {
                    case "Escape": closeLightbox(); break;
                    case "ArrowLeft": showItem(currentIndex - 1); break;
                    case "ArrowRight": showItem(currentIndex + 1); break;
                }
            }

            galleryCards.forEach((card, index) => {
                card.style.cursor = "zoom-in";
                card.setAttribute("role", "button");
                card.setAttribute("tabindex", "0");

                card.addEventListener("click", (event) => {
                    event.preventDefault();
                    openLightbox(index);
                });

                card.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openLightbox(index);
                    }
                });
            });

            if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
            if (prevBtn) prevBtn.addEventListener("click", () => showItem(currentIndex - 1));
            if (nextBtn) nextBtn.addEventListener("click", () => showItem(currentIndex + 1));

            lightbox.addEventListener("click", (event) => {
                if (event.target === lightbox) closeLightbox();
            });
        }

        /* ============================================================
           NEW: Form consent enforcement
           If the consent checkbox exists and isn't checked, block submit.
           ============================================================ */
        function bindFormConsent() {
            const form = document.getElementById("contactForm");
            const checkbox = document.getElementById("formConsent");
            const status = document.getElementById("formStatus");
            if (!form || !checkbox) return;

            form.addEventListener("submit", (event) => {
                if (!checkbox.checked) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    const dict = getDictionary(currentLanguage);
                    if (status) {
                        status.textContent = dict.formConsentRequired;
                        status.classList.add("error");
                    }
                    checkbox.focus();
                }
            }, true);
        }

        function init() {
            applyTranslations(currentLanguage, {
                updateUrl: false,
                animate: false
            });

            bindLoader();
            bindThemeToggle();
            bindLanguageSwitcher();
            bindEmailLinks();
            bindMenuBehavior();
            bindAnchorScroll();
            bindTabs();
            bindRevealAnimations();
            bindBackToTop();
            bindScrollHandlers();
            bindFormConsent();
            bindContactForm();
            bindMagneticButtons();
            bindTiltCards();
            bindCursorGlow();
            bindComingSoonActions();
            bindImageFallbacks();
            bindLightbox();
            bindCookieBanner();

            body.classList.add("is-ready");
        }

        init();
    }
})();
/* =========================================================
   FOOTER LEGAL REAL POSITION FIX
   Legal bölümünü footer-content içinden çıkarıp footer'ın
   gerçek en alt sol köşesine taşır.
   script.js EN ALTINA EKLE
   ========================================================= */

(function () {
    "use strict";

    function fixFooterLegalPosition() {
        var footer = document.querySelector(".site-footer");
        if (!footer) return;

        var container = footer.querySelector(":scope > .container") || footer.querySelector(".container");
        if (!container) return;

        var legal = footer.querySelector(".footer-legal");
        if (!legal) return;

        /* Aynı işlem tekrar tekrar yapılmasın */
        if (legal.classList.contains("footer-legal-corner")) return;

        /* Reveal animasyonu üstte takılmasın diye etkisini kaldırıyoruz */
        legal.classList.remove("reveal-item");
        legal.classList.remove("visible");
        legal.classList.remove("revealed");

        /* Sağlam yeni sınıf */
        legal.classList.add("footer-legal-corner");

        /*
          Legal şu an footer-content içinde.
          Onu container'ın en sonuna taşıyoruz.
          Böylece artık Upcycling Patterns başlığının yanında kalamaz.
        */
        container.appendChild(legal);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fixFooterLegalPosition);
    } else {
        fixFooterLegalPosition();
    }

    window.addEventListener("load", fixFooterLegalPosition);
})();

