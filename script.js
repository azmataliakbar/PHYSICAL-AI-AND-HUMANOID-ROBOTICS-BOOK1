// Book content data for chat search
var bookContent = {
    "physical ai": "Physical AI refers to artificial intelligence systems that exist and operate in the physical world. Unlike traditional AI that works with data and software, Physical AI involves robots and machines that can perceive, think, and act in real environments.",
    "humanoid robot": "Humanoid robots are robots with human-like appearance and structure, including head, torso, arms, and legs. They can walk, manipulate objects, and interact naturally in human environments. Examples include ASIMO, Atlas, and Tesla Optimus.",
    "sensors": "Sensors are the 'senses' of robots, allowing them to perceive their environment. Types include vision sensors (cameras), proprioceptive sensors (encoders, IMU), and exteroceptive sensors (ultrasonic, touch, microphones).",
    "actuators": "Actuators are the 'muscles' of robots, converting electrical energy into physical movement. Types include electric motors (DC, servo, stepper), hydraulic actuators, pneumatic actuators, and shape memory alloys.",
    "control systems": "Control systems determine how robots move and respond to their environment. Common methods include PID control, motion planning, and real-time control loops running at 100-1000 Hz.",
    "reinforcement learning": "Reinforcement Learning (RL) allows robots to learn optimal behaviors through interaction. The agent learns by taking actions, receiving rewards or penalties, and learning to maximize cumulative reward.",
    "simulation": "Simulation and digital twins enable safe, fast development and testing of robots. Popular platforms include Unity, Gazebo, and NVIDIA Isaac. Sim-to-real transfer bridges the gap between simulation and reality.",
    "computer vision": "Computer vision processes visual information to understand the environment. Applications include object detection, tracking, recognition, and depth estimation using cameras and depth sensors.",
    "mechanical design": "Mechanical design is the foundation of all robotic systems, determining how robots move and interact with the world. Key principles include strength, weight, precision, and durability.",
    "ai": "Artificial Intelligence enables robots to learn, adapt, and make intelligent decisions. Techniques include machine learning (supervised, unsupervised, reinforcement), neural networks, and planning algorithms.",
    "human-robot interaction": "Human-Robot Interaction (HRI) involves effective communication between humans and robots through speech, gestures, touch, and visual cues. Safety, trust, and transparency are crucial for successful HRI.",
    "safety": "Safety in robotics involves ISO standards, risk assessment, safety-rated components, and emergency stop systems. Ethical considerations include autonomy, privacy, bias, job displacement, and weaponization.",
    "asimo": "ASIMO (Advanced Step in Innovative Mobility) was developed by Honda from 2000-2018. It featured dynamic walking, running, stair climbing, and object manipulation, pioneering humanoid locomotion research.",
    "atlas": "Atlas is a humanoid robot developed by Boston Dynamics since 2013. It demonstrates extreme agility including parkour, backflips, advanced mobility, and manipulation capabilities.",
    "tesla optimus": "Tesla Optimus is a consumer-focused humanoid robot announced in 2022. It aims for mass production and integrates advanced AI for general-purpose tasks in human environments.",
    "degrees of freedom": "Degrees of Freedom (DoF) refer to the number of independent ways a robot can move. A typical humanoid has 20-40+ degrees of freedom, allowing complex movements similar to humans.",
    "pid control": "PID (Proportional-Integral-Derivative) control is the most common feedback control method. P responds to current error, I corrects accumulated error, and D predicts future error.",
    "digital twins": "Digital twins are virtual replicas of physical robots that mirror real robot behavior, enable testing without risk, allow parallel development, and support predictive maintenance.",
    "embodied ai": "Embodied AI refers to AI systems that exist in physical bodies and learn through interaction with the environment. It involves embodied cognition, learning through interaction, and physical intelligence.",
    "multimodal ai": "Multimodal AI integrates multiple input types including language (understanding commands), vision (seeing environment), and action (executing tasks). Large Language Models enable natural language understanding for robots.",
    "gazebo": "Gazebo is an open-source physics simulator widely used in robotics research and education. It provides realistic physics simulation for testing robots before real-world deployment.",
    "unity": "Unity is a game engine adapted for robotics simulation with realistic physics and graphics. It's used for training AI agents and testing robot behaviors in virtual environments.",
    "isaac": "NVIDIA Isaac is a high-performance simulation platform with GPU acceleration for fast training of robots. It enables rapid iteration and sim-to-real transfer.",
    "vision-language models": "Vision-Language Models understand both images and text, enabling robots to follow visual-language instructions, describe what they see, and answer questions about scenes.",
    "robot types": "Robots come in many types: Industrial robots for manufacturing, Mobile robots for navigation, Service robots for assistance, Medical robots for healthcare, Educational robots for learning, Military robots for defense, Social robots for interaction, Humanoid robots with human-like form, Companion robots for emotional support, and AI-driven physical robots combining AI with physical capabilities."
};
// Page navigation
var currentPage = 1;
var totalPages = 25; // Cover page + 24 content pages
// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeSearch();
    initializeChat();
    showPage(1);
    startTypingAnimation();
});
// Navigation functions
function initializeNavigation() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var pageIndicator = document.getElementById('pageIndicator');
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });
    }
    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            showPage(currentPage - 1);
        }
        else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
}
function showPage(pageNum) {
    // Hide all pages
    var pages = document.querySelectorAll('.page');
    pages.forEach(function (page) {
        page.classList.remove('active');
    });
    // Show current page
    var currentPageElement = document.querySelector("[data-page=\"".concat(pageNum, "\"]"));
    if (currentPageElement) {
        currentPageElement.classList.add('active');
        currentPage = pageNum;
        updateNavigation();
        scrollToTop();
    }
}
function updateNavigation() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var pageIndicator = document.getElementById('pageIndicator');
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    if (pageIndicator) {
        pageIndicator.textContent = "Page ".concat(currentPage, " of ").concat(totalPages);
    }
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Search functionality
function initializeSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}
function performSearch() {
    var searchInput = document.getElementById('searchInput');
    if (!searchInput)
        return;
    var query = searchInput.value.trim().toLowerCase();
    // Check if it's a page number
    var pageNum = parseInt(query);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        showPage(pageNum);
        searchInput.value = '';
        return;
    }
    // Search by content
    var pages = document.querySelectorAll('.page');
    var found = false;
    pages.forEach(function (page, index) {
        var _a, _b, _c;
        var pageNum = index + 1;
        var content = ((_a = page.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        var title = ((_c = (_b = page.querySelector('.chapter-title')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
        if (content.includes(query) || title.includes(query)) {
            if (!found) {
                showPage(pageNum);
                found = true;
            }
        }
    });
    if (!found) {
        alert("No results found for \"".concat(query, "\". Try searching for a page number (1-").concat(totalPages, ") or a topic."));
    }
    else {
        searchInput.value = '';
    }
}
// Chat functionality
function initializeChat() {
    var chatToggle = document.getElementById('chatToggle');
    var chatContainer = document.getElementById('chatContainer');
    var closeChat = document.getElementById('closeChat');
    var sendChat = document.getElementById('sendChat');
    var chatInput = document.getElementById('chatInput');
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', function () {
            chatContainer.classList.add('active');
        });
    }
    if (closeChat && chatContainer) {
        closeChat.addEventListener('click', function () {
            chatContainer.classList.remove('active');
        });
    }
    if (sendChat && chatInput) {
        sendChat.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    // Add welcome message
    addChatMessage('bot', 'Hello! I\'m your book assistant. Ask me about any topic in Physical AI & Humanoid Robotics, and I\'ll provide detailed information from the book.');
}
function sendChatMessage() {
    var chatInput = document.getElementById('chatInput');
    if (!chatInput || !chatInput.value.trim())
        return;
    var query = chatInput.value.trim().toLowerCase();
    addChatMessage('user', query);
    chatInput.value = '';
    // Find relevant content
    setTimeout(function () {
        var response = findChatResponse(query);
        addChatMessage('bot', response);
    }, 500);
}
function findChatResponse(query) {
    var _a, _b;
    // Direct matches
    for (var _i = 0, _c = Object.entries(bookContent); _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        if (query.includes(key)) {
            return value;
        }
    }
    // Partial matches
    var keywords = query.split(' ');
    for (var _e = 0, keywords_1 = keywords; _e < keywords_1.length; _e++) {
        var keyword = keywords_1[_e];
        if (keyword.length > 3) {
            for (var _f = 0, _g = Object.entries(bookContent); _f < _g.length; _f++) {
                var _h = _g[_f], key = _h[0], value = _h[1];
                if (key.includes(keyword) || keyword.includes(key)) {
                    return value;
                }
            }
        }
    }
    // Search in page content
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var content = ((_a = page.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        if (content.includes(query)) {
            var title = ((_b = page.querySelector('.chapter-title')) === null || _b === void 0 ? void 0 : _b.textContent) || 'Chapter';
            var relevantText = extractRelevantText(content, query);
            return "From ".concat(title, ":\n\n").concat(relevantText);
        }
    }
    return "I couldn't find specific information about \"".concat(query, "\" in the book. Try asking about topics like:\n- Physical AI\n- Humanoid robots\n- Sensors\n- Actuators\n- Control systems\n- Reinforcement learning\n- Simulation\n- Or any other topic from the book!");
}
function extractRelevantText(content, query) {
    var index = content.indexOf(query);
    if (index === -1)
        return '';
    var start = Math.max(0, index - 100);
    var end = Math.min(content.length, index + 300);
    var text = content.substring(start, end);
    // Clean up the text
    text = text.replace(/\s+/g, ' ').trim();
    if (start > 0)
        text = '...' + text;
    if (end < content.length)
        text = text + '...';
    return text.substring(0, 500);
}
function addChatMessage(type, message) {
    var chatMessages = document.getElementById('chatMessages');
    if (!chatMessages)
        return;
    var messageDiv = document.createElement('div');
    messageDiv.className = "chat-message ".concat(type);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
// Typing animation
function startTypingAnimation() {
    // The CSS handles the animation, but we can add JavaScript enhancements
    var typingElements = document.querySelectorAll('.typing-text, .typing-text-delay, .typing-text-delay-2');
    typingElements.forEach(function (el, index) {
        setTimeout(function () {
            el.classList.add('typing-active');
        }, index * 2000);
    });
}
// Table of Contents links
document.addEventListener('DOMContentLoaded', function () {
    var tocLinks = document.querySelectorAll('.toc-item a');
    tocLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var href = link.getAttribute('href');
            if (href) {
                var pageId = href.replace('#page-', '');
                var pageNum = parseInt(pageId);
                if (!isNaN(pageNum)) {
                    showPage(pageNum);
                }
            }
        });
    });
});
