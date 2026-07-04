document.addEventListener('DOMContentLoaded', () => {
    // Check password logic
    const adminWrapper = document.getElementById('admin-wrapper');
    const loginWrapper = document.getElementById('login-wrapper');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('admin-password');

    // Default config password
    const ADMIN_PASS = siteConfig.settings.adminPassword || 'admin'; 

    loginBtn.addEventListener('click', () => {
        if(passwordInput.value === ADMIN_PASS) {
            loginWrapper.style.display = 'none';
            adminWrapper.style.display = 'block';
            initAdmin();
        } else {
            alert('كلمة المرور خاطئة');
        }
    });

    // We store our loaded local paths here
    const imageState = {
        logoUrl: siteConfig.nav.logoUrl || '',
        heroImg: siteConfig.hero.imageUrl || '',
        appPreviewImg: siteConfig.appPreview.imageUrl || '',
        sliderImages: [...(siteConfig.videoBanner.sliderImages || [])]
    };

    // Helper to bind standard single-image input to extract filename
    const setupLocalImageUpload = (inputId, stateKey, previewContainerId, previewImgId) => {
        const input = document.getElementById(inputId);
        const container = document.getElementById(previewContainerId);
        const previewImg = document.getElementById(previewImgId);
        
        input.addEventListener('change', (e) => {
            if(e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const filename = 'images/' + file.name;
                imageState[stateKey] = filename;
                
                // Show local preview using object URL so they know it's selected
                previewImg.src = URL.createObjectURL(file);
                container.classList.remove('hidden');
                
                alert(`ممتاز! تم تعيين الصورة. \n\n⚠️ تذكر: لكي تظهر هذه الصورة للطلاب، يجب عليك نسخ ملف الصورة "${file.name}" ولصقه داخل مجلد "images" في ملفات الموقع.`);
            }
        });
    };

    // Helper for slider multiple images to extract filenames
    const setupSliderUpload = () => {
        const sliderInput = document.getElementById('input-slider-files');
        const sliderContainer = document.getElementById('slider-previews-container');
        const clearSliderBtn = document.getElementById('clear-slider-imgs');

        sliderInput.addEventListener('change', (e) => {
            if(e.target.files && e.target.files.length > 0) {
                let names = [];
                for(let i=0; i<e.target.files.length; i++) {
                    const file = e.target.files[i];
                    imageState.sliderImages.push('images/' + file.name);
                    names.push(file.name);
                    
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.className = 'h-24 w-full object-cover rounded-xl shadow-md border';
                    sliderContainer.appendChild(img);
                }
                clearSliderBtn.classList.remove('hidden');
                sliderInput.value = ''; // clear input after load
                alert(`تم تحديد الصور بنجاح! \n\n⚠️ تذكر: انسخ هذه الملفات (${names.join(', ')}) إلى مجلد "images".`);
            }
        });

        clearSliderBtn.addEventListener('click', () => {
            imageState.sliderImages = [];
            sliderContainer.innerHTML = '';
            clearSliderBtn.classList.add('hidden');
        });
    };


    function initAdmin() {
        // Theme
        document.getElementById('input-theme').value = siteConfig.settings.theme;
        document.getElementById('input-dark-mode').checked = siteConfig.settings.isDarkMode !== false;
        
        // APK URL
        document.getElementById('input-apk-url').value = siteConfig.download.apkUrl || '';
        
        // Nav
        document.getElementById('input-nav-title').value = siteConfig.nav.title;
        document.getElementById('input-nav-sub').value = siteConfig.nav.subtitle;
        
        // Hero
        document.getElementById('input-hero-title').value = siteConfig.hero.title;
        document.getElementById('input-hero-sub').value = siteConfig.hero.subtitle;
        document.getElementById('input-hero-desc').value = siteConfig.hero.description;
        
        // Social
        document.getElementById('input-social-fb').value = siteConfig.social.facebook;
        document.getElementById('input-social-wa').value = siteConfig.social.whatsapp;
        document.getElementById('input-social-ig').value = siteConfig.social.instagram;

        // Image bindings
        setupLocalImageUpload('input-nav-logo-file', 'logoUrl', 'preview-nav-logo-container', 'preview-nav-logo');
        setupLocalImageUpload('input-hero-img-file', 'heroImg', 'preview-hero-img-container', 'preview-hero-img');
        setupLocalImageUpload('input-app-preview-file', 'appPreviewImg', 'preview-app-container', 'preview-app-img');
        setupSliderUpload();
    }

    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Rebuild the config object by merging with original
            const updatedConfig = {
                ...siteConfig,
                nav: {
                    ...siteConfig.nav,
                    title: document.getElementById('input-nav-title').value,
                    subtitle: document.getElementById('input-nav-sub').value,
                    logoUrl: imageState.logoUrl
                },
                hero: {
                    ...siteConfig.hero,
                    title: document.getElementById('input-hero-title').value,
                    subtitle: document.getElementById('input-hero-sub').value,
                    description: document.getElementById('input-hero-desc').value,
                    imageUrl: imageState.heroImg
                },
                appPreview: {
                    ...siteConfig.appPreview,
                    imageUrl: imageState.appPreviewImg
                },
                videoBanner: {
                    ...siteConfig.videoBanner,
                    sliderImages: imageState.sliderImages
                },
                download: {
                    ...siteConfig.download,
                    apkUrl: document.getElementById('input-apk-url').value
                },
                social: {
                    ...siteConfig.social,
                    facebook: document.getElementById('input-social-fb').value,
                    whatsapp: document.getElementById('input-social-wa').value,
                    instagram: document.getElementById('input-social-ig').value
                },
                settings: {
                    ...siteConfig.settings,
                    theme: document.getElementById('input-theme').value,
                    isDarkMode: document.getElementById('input-dark-mode').checked
                }
            };

            // Convert to string format identical to config.js
            const configString = `const siteConfig = ${JSON.stringify(updatedConfig, null, 4)};`;

            // Trigger file download
            const blob = new Blob([configString], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert('تم تحميل ملف config.js بنجاح! قم باستبدال الملف القديم في مجلد js بهذا الملف الجديد ثم ارفع المشروع على GitHub.');
        });
    }
});
