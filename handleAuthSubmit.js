let isRegister = false;
let currentRole = 'operator'; // default role

function setAuthRole(role) {
    currentRole = role;
    
    // Update active tab styling
    document.getElementById('tabOperator').classList.toggle('active', role === 'operator');
    document.getElementById('tabCitizen').classList.toggle('active', role === 'citizen');
    
    // Update text based on role
    if (role === 'operator') {
        document.getElementById('authTitle').textContent = "Command Center Portal";
        document.getElementById('authSubtitle').textContent = "Sign in to access National Smart City OS";
        document.getElementById('emailLabel').textContent = "Official Email";
        document.getElementById('authEmail').placeholder = "operator@smartcity.gov.in";
    } else {
        document.getElementById('authTitle').textContent = "Citizen Portal";
        document.getElementById('authSubtitle').textContent = "Log in to report urban infrastructure issues";
        document.getElementById('emailLabel').textContent = "Personal Email";
        document.getElementById('authEmail').placeholder = "citizen@example.com";
    }
}

function toggleAuthMode() {
    isRegister = !isRegister;
    document.getElementById('nameGroup').style.display = isRegister ? "block" : "none";
    document.getElementById('authSubmitBtn').textContent = isRegister ? "Create Account" : "Sign In";
    document.getElementById('authSwitchText').textContent = isRegister ? "Already registered?" : "Need an account?";
    document.getElementById('authSwitchLink').textContent = isRegister ? "Sign in here" : "Register here";
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPassword').value;
    
    if(!email || !pass) {
        showToast("Please enter valid credentials.", "var(--accent-red)");
        return;
    }

    showToast(`✅ Signed in as ${currentRole.toUpperCase()}`, "var(--accent-green)");
    
    setTimeout(() => {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('appWrapper').style.display = 'block';
        
        // Hide/Show UI elements based on role
        const allTabs = document.querySelectorAll('.tab-btn');
        if (currentRole === 'citizen') {
            // Hide admin tabs (Map, Issues, Team, Actions)
            allTabs[0].style.display = 'none'; // Map
            allTabs[1].style.display = 'none'; // Tickets
            allTabs[3].style.display = 'none'; // Team
            allTabs[4].style.display = 'none'; // Actions
            
            // Auto-switch to the Citizen view
            switchView('citizen-view', { currentTarget: allTabs[2] });
            document.querySelector('.ticker-bar').style.display = 'none'; // Hide telemetry ticker
        } else {
            // Show everything for operators
            allTabs.forEach(tab => tab.style.display = 'inline-flex');
            document.querySelector('.ticker-bar').style.display = 'flex';
            
            // Auto-switch to Map view
            switchView('map-view', { currentTarget: allTabs[0] });
        }
        
        if(map) { map.invalidateSize(); }
    }, 600);
}

function logoutSession() {
    document.getElementById('appWrapper').style.display = 'none';
    document.getElementById('authContainer').style.display = 'flex';
    document.getElementById('authForm').reset();
    showToast("Signed out successfully.", "var(--accent-amber)");
}
