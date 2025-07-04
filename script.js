document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const closeIcon = document.querySelector('.close-icon');
    
    
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
    
    // Search functionality
    searchIcon.addEventListener('click', function() {
        performSearch();
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
            switchText.textContent = 'ON';
        } else {
            // Désactiver la résolution (retour normal)
            body.classList.remove('resolution-993');
            switchText.textContent = 'OFF';
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
        const interactiveElements = [contactSection, dropdownSection];
        
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