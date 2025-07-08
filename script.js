document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const mobileSearchIcon = document.querySelector('.mobile-search-icon');
    const searchContainer = document.querySelector('.search-container');
    const closeIcon = document.querySelector('.close-icon');
    
    // Fonction pour tronquer le placeholder
    function truncatePlaceholder(input, originalText) {
        if (!input || !input.offsetWidth) return;
        
        const containerWidth = input.offsetWidth;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const computedStyle = window.getComputedStyle(input);
        context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
        
        let text = originalText;
        let textWidth = context.measureText(text).width;
        
        if (textWidth > containerWidth - 40) { // -40 pour laisser de l'espace pour l'icône
            while (textWidth > containerWidth - 70 && text.length > 0) { // -70 pour les "..." + icône
                text = text.slice(0, -1);
                textWidth = context.measureText(text + '...').width;
            }
            if (text.length > 0) {
                text += '...';
            }
        }
        
        input.placeholder = text;
    }
    
    
    // Contact section
    const contactSection = document.querySelector('.contact-section');
    
    // Dropdown section
    const dropdownSection = document.querySelector('.dropdown-section');
    const dropdownIcon = document.querySelector('.dropdown-icon');
    
    // Search input focus states
    searchInput.addEventListener('focus', function() {
        searchContainer.classList.add('active');
    });
    
    searchInput.addEventListener('blur', function() {
        searchContainer.classList.remove('active');
        // Si le champ est vide après defocus, s'assurer que has-content est retiré
        if (this.value.trim() === '') {
            searchContainer.classList.remove('has-content');
        }
    });
    
    // Gérer les changements de contenu
    searchInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            searchContainer.classList.add('has-content');
        } else {
            searchContainer.classList.remove('has-content');
        }
    });
    
    // Desktop search functionality
    searchIcon.addEventListener('click', function() {
        performSearch();
    });

    // Mobile search functionality
    const mobileSearchBar = document.querySelector('.mobile-search-bar');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    const mobileSearchContainer = document.querySelector('.mobile-search-container');
    const mobileSearchSubmit = document.querySelector('.mobile-search-submit');
    const mobileSearchClose = document.querySelector('.mobile-search-close');
    
    // Appliquer la troncature aux placeholders
    const originalDesktopPlaceholder = "Search an article, an e-learning, a product...";
    const originalMobilePlaceholder = "Search an article, an e-learning, a product...";
    
    // Fonction pour initialiser les placeholders tronqués
    function initPlaceholders() {
        if (searchInput && searchInput.offsetWidth > 0) {
            truncatePlaceholder(searchInput, originalDesktopPlaceholder);
        }
        if (mobileSearchInput && mobileSearchInput.offsetWidth > 0) {
            truncatePlaceholder(mobileSearchInput, originalMobilePlaceholder);
        }
    }
    
    // Initialiser les placeholders avec plusieurs tentatives
    function tryInitPlaceholders() {
        initPlaceholders();
        // Si les éléments ne sont pas encore rendus, réessayer
        if (searchInput && searchInput.offsetWidth === 0) {
            setTimeout(tryInitPlaceholders, 50);
        }
        if (mobileSearchInput && mobileSearchInput.offsetWidth === 0) {
            setTimeout(tryInitPlaceholders, 50);
        }
    }
    
    // Initialiser les placeholders - DÉSACTIVÉ
    // setTimeout(tryInitPlaceholders, 100);
    
    // Réappliquer lors du redimensionnement - DÉSACTIVÉ
    // window.addEventListener('resize', () => {
    //     setTimeout(initPlaceholders, 100);
    // });

    if (mobileSearchIcon) {
        mobileSearchIcon.addEventListener('click', function() {
            mobileSearchBar.classList.add('active');
            mobileSearchInput.focus();
        });
    }

    // Mobile search input handling
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                mobileSearchContainer.classList.add('has-content');
            } else {
                mobileSearchContainer.classList.remove('has-content');
            }
        });

        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performMobileSearch();
            }
        });
    }

    // Mobile search submit
    if (mobileSearchSubmit) {
        mobileSearchSubmit.addEventListener('click', function() {
            performMobileSearch();
        });
    }

    // Mobile search close
    if (mobileSearchClose) {
        mobileSearchClose.addEventListener('click', function() {
            mobileSearchInput.value = '';
            mobileSearchContainer.classList.remove('has-content');
            mobileSearchInput.focus(); // Garde le focus sur le champ
        });
    }

    function performMobileSearch() {
        const searchTerm = mobileSearchInput.value.trim();
        if (searchTerm) {
            console.log('Mobile searching for:', searchTerm);
            alert(`Mobile search results for: ${searchTerm}`);
        }
    }

    // Close mobile search bar when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileSearchBar && mobileSearchBar.classList.contains('active')) {
            // Check if click is outside the mobile search bar and search icon
            if (!mobileSearchBar.contains(e.target) && !mobileSearchIcon.contains(e.target)) {
                mobileSearchBar.classList.remove('active');
                if (mobileSearchInput) {
                    mobileSearchInput.value = '';
                    mobileSearchContainer.classList.remove('has-content');
                }
            }
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            
            // Show loading state
            searchContainer.classList.add('loading');
            
            // Simulate search API call
            setTimeout(() => {
                // Remove loading state after 3 seconds (simulate API response)
                searchContainer.classList.remove('loading');
                alert(`Search results for: ${searchTerm}`);
            }, 3000);
        }
    }
    
    // Fonctionnalité de l'icône close (utilise mousedown car click ne fonctionne pas)
    closeIcon.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Vider le champ
        searchInput.value = '';
        searchContainer.classList.remove('has-content');
    });
    
    // Contact section click
    contactSection.addEventListener('click', function() {
        console.log('Contact clicked');
        // Add your contact logic here
        alert('Contact feature clicked!');
    });
    
    // Éléments de paramétrage
    const contactLabelInput = document.getElementById('contact-label');
    const userNameInput = document.getElementById('user-name');
    const updateBtn = document.getElementById('update-component');
    const contactText = document.querySelector('.contact-text');
    const userName = document.querySelector('.user-name');
    const resolutionSwitch = document.getElementById('resolution-switch');
    const switchText = document.querySelector('.switch-text');
    const mobileSwitch = document.getElementById('mobile-switch');
    const mobileSwitchText = document.querySelector('.mobile-switch-text');
    const body = document.body;
    
    // Fonction de mise à jour du composant
    updateBtn.addEventListener('click', function() {
        // Mettre à jour le libellé Contact
        const newContactLabel = contactLabelInput.value.trim();
        if (newContactLabel) {
            contactText.textContent = newContactLabel;
        }
        
        // Mettre à jour le nom d'utilisateur
        const newUserName = userNameInput.value.trim();
        if (newUserName) {
            userName.textContent = newUserName;
        }
        
        // Feedback visuel
        updateBtn.textContent = 'Updated!';
        updateBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            updateBtn.textContent = 'Update Component';
            updateBtn.style.backgroundColor = '#24226a';
        }, 2000);
    });
    
    // Gestion du switch de résolution
    resolutionSwitch.addEventListener('change', function() {
        const body = document.body;
        
        if (this.checked) {
            // Activer la résolution 993px
            body.classList.add('resolution-993');
            body.classList.remove('mobile-mode');
            switchText.textContent = 'ON';
            // Désactiver le mode mobile
            mobileSwitch.checked = false;
            mobileSwitchText.textContent = 'OFF';
        } else {
            // Désactiver la résolution (retour normal)
            body.classList.remove('resolution-993');
            switchText.textContent = 'OFF';
        }
    });
    
    // Gestion du switch mobile
    mobileSwitch.addEventListener('change', function() {
        const body = document.body;
        
        if (this.checked) {
            // Activer le mode mobile 375px
            body.classList.add('mobile-mode');
            body.classList.remove('resolution-993');
            mobileSwitchText.textContent = 'ON';
            // Désactiver la résolution 993px
            resolutionSwitch.checked = false;
            switchText.textContent = 'OFF';
        } else {
            // Désactiver le mode mobile (retour normal)
            body.classList.remove('mobile-mode');
            mobileSwitchText.textContent = 'OFF';
        }
    });
    
    // Dropdown functionality
    dropdownSection.addEventListener('click', function() {
        console.log('Dropdown clicked');
        // Add dropdown menu logic here
        toggleDropdown();
    });
    
    function toggleDropdown() {
        // Toggle dropdown icon rotation
        dropdownIcon.classList.toggle('rotated');
        
        // For prototype, we'll just show an alert
        alert('User dropdown menu would open here');
        
        // In a real implementation, you would show/hide a dropdown menu
        // Example:
        // const dropdownMenu = document.querySelector('.dropdown-menu');
        // dropdownMenu.classList.toggle('show');
    }
    
    // Add some interactive states
    function addInteractiveStates() {
        // Add loading state to search
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                searchContainer.classList.add('has-content');
            } else {
                searchContainer.classList.remove('has-content');
            }
        });
        
        // Add hover effects for better UX
        const interactiveElements = [dropdownSection];
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Initialize interactive states
    addInteractiveStates();
    
    // Simulate different states for prototype
    function simulateStates() {
        // Simulate hover state after 2 seconds
        setTimeout(() => {
            searchContainer.classList.add('hover-state');
            console.log('Simulated hover state');
        }, 2000);
        
        // Simulate active state after 4 seconds
        setTimeout(() => {
            searchContainer.classList.remove('hover-state');
            searchContainer.classList.add('active-state');
            searchInput.focus();
            console.log('Simulated active state');
        }, 4000);
        
        // Reset after 6 seconds
        setTimeout(() => {
            searchContainer.classList.remove('active-state');
            searchInput.blur();
            console.log('Reset to default state');
        }, 6000);
    }
    
    // Uncomment the line below to see state simulation
    // simulateStates();
});