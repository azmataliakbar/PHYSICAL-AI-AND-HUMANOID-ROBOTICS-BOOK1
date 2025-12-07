// Book content data for chat search
const bookContent: { [key: string]: string } = {
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
let currentPage = 1;
const totalPages = 25; // Cover page + 24 content pages

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeSearch();
    initializeChat();
    showPage(1);
    startTypingAnimation();
});

// Navigation functions
function initializeNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            showPage(currentPage - 1);
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
}

function showPage(pageNum: number) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show current page
    const currentPageElement = document.querySelector(`[data-page="${pageNum}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
        currentPage = pageNum;
        updateNavigation();
        scrollToTop();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    const pageIndicator = document.getElementById('pageIndicator');

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();

    // Check if it's a page number
    const pageNum = parseInt(query);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        showPage(pageNum);
        searchInput.value = '';
        return;
    }

    // Search by content
    const pages = document.querySelectorAll('.page');
    let found = false;

    pages.forEach((page, index) => {
        const pageNum = index + 1;
        const content = page.textContent?.toLowerCase() || '';
        const title = page.querySelector('.chapter-title')?.textContent?.toLowerCase() || '';

        if (content.includes(query) || title.includes(query)) {
            if (!found) {
                showPage(pageNum);
                found = true;
            }
        }
    });

    if (!found) {
        alert(`No results found for "${query}". Try searching for a page number (1-${totalPages}) or a topic.`);
    } else {
        searchInput.value = '';
    }
}

// Chat functionality
function initializeChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const sendChat = document.getElementById('sendChat');
    const chatInput = document.getElementById('chatInput') as HTMLInputElement;

    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.add('active');
        });
    }

    if (closeChat && chatContainer) {
        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });
    }

    if (sendChat && chatInput) {
        sendChat.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    // Add welcome message
    addChatMessage('bot', 'Hello! I\'m your book assistant. Ask me about any topic in Physical AI & Humanoid Robotics, and I\'ll provide detailed information from the book.');
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput') as HTMLInputElement;
    if (!chatInput || !chatInput.value.trim()) return;

    const query = chatInput.value.trim().toLowerCase();
    addChatMessage('user', query);
    chatInput.value = '';

    // Find relevant content
    setTimeout(() => {
        const response = findChatResponse(query);
        addChatMessage('bot', response);
    }, 500);
}

function findChatResponse(query: string): string {
    // Direct matches
    for (const [key, value] of Object.entries(bookContent)) {
        if (query.includes(key)) {
            return value;
        }
    }

    // Partial matches
    const keywords = query.split(' ');
    for (const keyword of keywords) {
        if (keyword.length > 3) {
            for (const [key, value] of Object.entries(bookContent)) {
                if (key.includes(keyword) || keyword.includes(key)) {
                    return value;
                }
            }
        }
    }

    // Search in page content
    const pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const content = page.textContent?.toLowerCase() || '';
        if (content.includes(query)) {
            const title = page.querySelector('.chapter-title')?.textContent || 'Chapter';
            const relevantText = extractRelevantText(content, query);
            return `From ${title}:\n\n${relevantText}`;
        }
    }

    return `I couldn't find specific information about "${query}" in the book. Try asking about topics like:\n- Physical AI\n- Humanoid robots\n- Sensors\n- Actuators\n- Control systems\n- Reinforcement learning\n- Simulation\n- Or any other topic from the book!`;
}

function extractRelevantText(content: string, query: string): string {
    const index = content.indexOf(query);
    if (index === -1) return '';

    const start = Math.max(0, index - 100);
    const end = Math.min(content.length, index + 300);
    let text = content.substring(start, end);

    // Clean up the text
    text = text.replace(/\s+/g, ' ').trim();
    if (start > 0) text = '...' + text;
    if (end < content.length) text = text + '...';

    return text.substring(0, 500);
}

function addChatMessage(type: 'user' | 'bot', message: string) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing animation
function startTypingAnimation() {
    // The CSS handles the animation, but we can add JavaScript enhancements
    const typingElements = document.querySelectorAll('.typing-text, .typing-text-delay, .typing-text-delay-2');
    typingElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('typing-active');
        }, index * 2000);
    });
}

// Table of Contents links
document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.toc-item a');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href) {
                const pageId = href.replace('#page-', '');
                const pageNum = parseInt(pageId);
                if (!isNaN(pageNum)) {
                    showPage(pageNum);
                }
            }
        });
    });
});

