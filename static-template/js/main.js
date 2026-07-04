document.addEventListener('DOMContentLoaded', () => {
    const config = typeof siteConfig !== 'undefined' ? siteConfig : {
        settings: { theme: 'blue', isDarkMode: true }
    };

    const setElem = (id, text) => {
        const el = document.getElementById(id);
        if(el && text !== undefined) el.textContent = text;
    };

    const setHref = (id, url) => {
        const el = document.getElementById(id);
        if(el) {
            if(url) {
                el.href = url;
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        }
    };

    // THEME LOGIC
    const themeColors = {
        blue: { primary: '#0ea5e9', hover: '#0284c7', bgDark: '#0b1120', cardDark: '#111827' },
        purple: { primary: '#9333ea', hover: '#7e22ce', bgDark: '#1e1025', cardDark: '#2a1736' },
        emerald: { primary: '#10b981', hover: '#059669', bgDark: '#061e1a', cardDark: '#0d2a25' }
    };

    let isDarkMode = config.settings.isDarkMode !== false;
    const currentTheme = themeColors[config.settings.theme] || themeColors.blue;

    document.documentElement.style.setProperty('--color-primary', currentTheme.primary);
    document.documentElement.style.setProperty('--color-primary-hover', currentTheme.hover);
    document.documentElement.style.setProperty('--color-bg-dark', currentTheme.bgDark);
    document.documentElement.style.setProperty('--color-card-dark', currentTheme.cardDark);

    const applyThemeMode = () => {
        const body = document.getElementById('app-body');
        const navbar = document.getElementById('navbar');
        const heroBadge = document.getElementById('hero-badge-container');
        const heroContact = document.getElementById('hero-contact-container');
        const downloadCard = document.getElementById('download-card');
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const sunContainer = document.getElementById('sun-icon-container');
        const moonContainer = document.getElementById('moon-icon-container');
        const appPreviewCard = document.getElementById('app-preview-card');
        const sliderContainer = document.getElementById('slider-container');
        const videoBadge = document.getElementById('video-badge-container');
        const featuresBadge = document.getElementById('features-badge-container');
        const footer = document.getElementById('footer-social');
        
        if (isDarkMode) {
            body.classList.remove('bg-slate-50', 'text-slate-900');
            body.classList.add('bg-bgDark', 'text-white');
            
            if(navbar) { navbar.classList.remove('bg-white/80', 'border-slate-200'); navbar.classList.add('bg-cardDark/80', 'border-slate-800'); }
            if(themeToggleBtn) { themeToggleBtn.classList.remove('bg-slate-200'); themeToggleBtn.classList.add('bg-[#1e293b]'); }
            
            if(sunContainer) {
                sunContainer.className = 'bg-transparent p-1.5 rounded-full transition-colors';
                sunContainer.querySelector('svg')?.classList.replace('text-white', 'text-slate-500');
            }
            if(moonContainer) {
                moonContainer.className = 'theme-bg p-1.5 rounded-full transition-colors';
                moonContainer.querySelector('svg')?.classList.replace('text-slate-500', 'text-white');
            }
            
            if(heroBadge) { heroBadge.classList.replace('bg-white', 'bg-[#1e293b]'); heroBadge.classList.replace('border-slate-200', 'border-slate-800'); }
            if(heroContact) { heroContact.classList.replace('hover:bg-slate-100', 'hover:bg-[#1e293b]'); heroContact.classList.replace('border-slate-200', 'border-slate-800'); }
            if(downloadCard) { downloadCard.classList.remove('bg-white', 'border-slate-200'); downloadCard.classList.add('bg-cardDark', 'border-slate-800'); }
            if(appPreviewCard) { appPreviewCard.classList.replace('border-white', 'border-cardDark'); }
            if(sliderContainer) { sliderContainer.classList.replace('border-slate-200', 'border-slate-800'); sliderContainer.classList.add('bg-cardDark'); sliderContainer.classList.remove('bg-white'); }
            if(videoBadge) { videoBadge.classList.replace('bg-white', 'bg-[#1e293b]'); videoBadge.classList.replace('border-slate-200', 'border-slate-800'); }
            if(featuresBadge) { featuresBadge.classList.replace('bg-white', 'bg-[#1e293b]'); featuresBadge.classList.replace('border-slate-200', 'border-slate-800'); }
            if(footer) { footer.classList.remove('bg-white', 'border-slate-200'); footer.classList.add('bg-cardDark', 'border-slate-800'); }
            
            document.querySelectorAll('.text-slate-600').forEach(el => el.classList.replace('text-slate-600', 'text-slate-400'));
            renderFeatures();
        } else {
            body.classList.remove('bg-bgDark', 'text-white');
            body.classList.add('bg-slate-50', 'text-slate-900');
            
            if(navbar) { navbar.classList.remove('bg-cardDark/80', 'border-slate-800'); navbar.classList.add('bg-white/80', 'border-slate-200'); }
            if(themeToggleBtn) { themeToggleBtn.classList.remove('bg-[#1e293b]'); themeToggleBtn.classList.add('bg-slate-200'); }
            
            if(sunContainer) {
                sunContainer.className = 'theme-bg p-1.5 rounded-full transition-colors';
                sunContainer.querySelector('svg')?.classList.replace('text-slate-500', 'text-white');
            }
            if(moonContainer) {
                moonContainer.className = 'bg-transparent p-1.5 rounded-full transition-colors';
                moonContainer.querySelector('svg')?.classList.replace('text-white', 'text-slate-500');
            }

            if(heroBadge) { heroBadge.classList.replace('bg-[#1e293b]', 'bg-white'); heroBadge.classList.replace('border-slate-800', 'border-slate-200'); }
            if(heroContact) { heroContact.classList.replace('hover:bg-[#1e293b]', 'hover:bg-slate-100'); heroContact.classList.replace('border-slate-800', 'border-slate-200'); }
            if(downloadCard) { downloadCard.classList.remove('bg-cardDark', 'border-slate-800'); downloadCard.classList.add('bg-white', 'border-slate-200'); }
            if(appPreviewCard) { appPreviewCard.classList.replace('border-cardDark', 'border-white'); }
            if(sliderContainer) { sliderContainer.classList.replace('border-slate-800', 'border-slate-200'); sliderContainer.classList.add('bg-white'); sliderContainer.classList.remove('bg-cardDark'); }
            if(videoBadge) { videoBadge.classList.replace('border-slate-800', 'border-slate-200'); videoBadge.classList.replace('bg-[#1e293b]', 'bg-white'); }
            if(featuresBadge) { featuresBadge.classList.replace('border-slate-800', 'border-slate-200'); featuresBadge.classList.replace('bg-[#1e293b]', 'bg-white'); }
            if(footer) { footer.classList.remove('bg-cardDark', 'border-slate-800'); footer.classList.add('bg-white', 'border-slate-200'); }
            
            document.querySelectorAll('.text-slate-400').forEach(el => el.classList.replace('text-slate-400', 'text-slate-600'));
            renderFeatures();
        }
    };

    document.getElementById('theme-toggle-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        isDarkMode = !isDarkMode;
        applyThemeMode();
    });

    document.title = config.nav.title;

    setElem('nav-title', config.nav.title);
    setElem('nav-subtitle', config.nav.subtitle);
    setElem('nav-join-text', config.nav.joinBtn);
    if(config.nav.logoUrl) {
        const logoCont = document.getElementById('nav-logo-img-container');
        const fallback = document.getElementById('nav-logo-fallback');
        if(logoCont) logoCont.classList.remove('hidden');
        if(fallback) fallback.classList.add('hidden');
        document.getElementById('nav-logo-img').src = config.nav.logoUrl;
    }

    setElem('hero-badge', config.hero.badge);
    setElem('hero-title', config.hero.title);
    setElem('hero-subtitle', config.hero.subtitle);
    setElem('hero-desc', config.hero.description);
    setElem('hero-start-btn', config.hero.startBtn);
    setElem('hero-contact-btn', config.hero.contactBtn);
    if(config.hero.imageUrl) {
        const heroImg = document.getElementById('hero-image');
        if(heroImg) heroImg.src = config.hero.imageUrl;
    }

    setElem('download-android-title', config.download.androidTitle);
    setElem('download-android-sub', config.download.androidSub);
    setElem('download-btn-text', config.download.downloadBtn);
    
    const titleArr = config.download.title ? config.download.title.split(' ') : ['تحميل', 'التطبيق'];
    if(titleArr.length > 0) {
        const titleSpan = document.querySelector('#download-section h2 span');
        if(titleSpan) titleSpan.textContent = titleArr[0];
        setElem('download-title-rest', titleArr.slice(1).join(' '));
    }

    if(config.appPreview) {
        setElem('app-preview-title', config.appPreview.title);
        if(config.appPreview.imageUrl) {
            const previewImg = document.getElementById('app-preview-image');
            if(previewImg) previewImg.src = config.appPreview.imageUrl;
        }
    }

    if(config.videoBanner && config.videoBanner.sliderImages && config.videoBanner.sliderImages.length > 0) {
        setElem('video-badge', config.videoBanner.badge);
        setElem('video-title', config.videoBanner.title);
        setElem('video-subtitle', config.videoBanner.subtitle);
        
        const sliderTrack = document.getElementById('slider-track');
        const sliderDots = document.getElementById('slider-dots');
        if(sliderTrack) {
            config.videoBanner.sliderImages.forEach((src, idx) => {
                const slide = document.createElement('div');
                slide.className = 'w-full h-full flex-shrink-0 relative';
                slide.innerHTML = `<img src="${src}" alt="Slide ${idx+1}" class="w-full h-full object-cover" />`;
                sliderTrack.appendChild(slide);

                if(config.videoBanner.sliderImages.length > 1) {
                    const dot = document.createElement('button');
                    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`;
                    dot.onclick = () => goToSlide(idx);
                    sliderDots.appendChild(dot);
                }
            });

            let currentSlide = 0;
            const totalSlides = config.videoBanner.sliderImages.length;
            const goToSlide = (idx) => {
                currentSlide = idx;
                const direction = document.documentElement.dir === 'rtl' ? 1 : -1;
                sliderTrack.style.transform = `translateX(${currentSlide * 100 * direction}%)`; 
                Array.from(sliderDots.children).forEach((dot, i) => {
                    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`;
                });
            };

            if(totalSlides > 1) {
                setInterval(() => goToSlide((currentSlide + 1) % totalSlides), 4000);
            }
        }
    } else {
        const videoSection = document.getElementById('video-badge')?.closest('section');
        if(videoSection) videoSection.style.display = 'none';
    }

    if(config.features) {
        setElem('features-badge', config.features.badge);
        setElem('features-desc', config.features.description);
    }
    
    function renderFeatures() {
        const grid = document.getElementById('features-grid');
        if(!grid) return;
        grid.innerHTML = '';
        if(config.features && config.features.items) {
            const featureIcons = [
                `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-text"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
                `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
                `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-text"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
            ];
            
            config.features.items.forEach((item, idx) => {
                const card = document.createElement('div');
                const bgClass = isDarkMode ? 'bg-cardDark border-slate-800' : 'bg-white border-slate-200';
                const iconBgClass = isDarkMode ? 'bg-[#1e293b]' : 'bg-slate-100';
                const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600';
                
                card.className = `${bgClass} border rounded-[2rem] p-8 sm:p-10 text-center hover:-translate-y-2 transition-all duration-300 shadow-lg`;
                card.innerHTML = `
                    <div class="w-20 h-20 rounded-2xl ${iconBgClass} flex items-center justify-center mx-auto mb-6 sm:mb-8 transition-colors">
                        ${featureIcons[idx % featureIcons.length]}
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">${item.title}</h3>
                    <p class="${textMutedClass} text-base sm:text-lg leading-relaxed">${item.desc}</p>
                `;
                grid.appendChild(card);
            });
        }
    }

    if(config.footer) {
        setElem('footer-quote', config.footer.quote);
        setElem('footer-developer', config.footer.developer);
        setElem('footer-copyright', config.footer.copyright);
    }

    if(config.social) {
        setHref('social-fb', config.social.facebook);
        setHref('social-wa', config.social.whatsapp ? `https://wa.me/${config.social.whatsapp}` : null);
        setHref('social-ig', config.social.instagram);
    }

    applyThemeMode();

    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = `absolute rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-800'}`;
            const size = Math.random() * 3 + 1;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            p.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
            p.style.setProperty('--opacity', Math.random() * 0.3);
            
            particlesContainer.appendChild(p);
        }
    }

    const apkBtn = document.getElementById('download-apk-btn');
    if(apkBtn) {
        if(config.download.apkUrl && config.download.apkUrl.trim() !== "") {
            apkBtn.href = config.download.apkUrl;
            
            // إضافة خاصية download إذا كان الرابط محلي أو مباشر ولا يبدأ ب http 
            // لضمان التحميل بدلاً من فتح الرابط
            if (!config.download.apkUrl.startsWith('http')) {
                apkBtn.download = config.download.apkUrl.split('/').pop() || 'app.apk';
            } else {
                apkBtn.removeAttribute('download');
            }
        } else {
            apkBtn.href = "#";
            apkBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('عفواً، رابط التحميل غير متوفر حالياً.');
            });
        }
    }

    let clicks = 0;
    let clickTimer = null;
    const navLogoArea = document.getElementById('nav-logo-area');
    if(navLogoArea) {
        navLogoArea.addEventListener('click', () => {
            clicks++;
            if (clicks >= 5) {
                clicks = 0;
                window.location.href = 'admin.html';
            }
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clicks = 0; }, 2000);
        });
    }

});
