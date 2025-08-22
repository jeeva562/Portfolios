 let scene, camera, renderer, currentAnimation;
 
 // FIXED: Initialize particles.js

 particlesJS('particles-js',{
    
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value":"#3b82f6"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color":"#3b82f6",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    });


        // Custom cursor
        const cursor = document.getElementById('cursor');
        if (cursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        }

        // FIXED: Enhanced Mobile Menu Toggle
   document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const navItems = document.querySelectorAll('.mobile-nav-item');

    function showMobileMenu() {
        mobileMenu.classList.add('show');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate nav items with stagger
        navItems.forEach((item, index) => {
            item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, index * 100);
        });
    }

    function hideMobileMenu() {
        mobileMenu.classList.remove('show');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Reset nav items for next open
        navItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateX(20px)";
            item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        });
    }

    menuToggle.addEventListener('click', showMobileMenu);
    closeMenu.addEventListener('click', hideMobileMenu);
    menuOverlay.addEventListener('click', hideMobileMenu);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (mobileMenu.classList.contains('show')) {
                hideMobileMenu();
            }

            if (target) {
              const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('show')) {
            hideMobileMenu();
        }
    });
});

            // FIXED: Animate elements on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.skill-bar, .glass-card, .code-line');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                    
                    if (element.classList.contains('skill-bar')) {
                        const width = element.getAttribute('data-width');
                        if (width) {
                            element.style.width = '0';
                            setTimeout(() => {
                                element.style.width = width;
                            }, 100);
                        }
                    }
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on load

        // FIXED: Enhanced 3D Scene with Three.js - Complete Integration
        const initThreeJS = () => {
            const container = document.getElementById('threejs-container');
            if (!container || !window.THREE) return;

            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Enhanced lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0x4361ee, 0.8, 100);
            pointLight.position.set(10, 10, 10);
            scene.add(pointLight);

            // Create diverse 3D objects as background elements
            const geometries = [
                new THREE.IcosahedronGeometry(1.2, 1),
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.TorusGeometry(1.5, 0.6, 16, 32),
                new THREE.ConeGeometry(1.2, 2.5, 8),
                new THREE.SphereGeometry(1.3, 32, 32),
                new THREE.OctahedronGeometry(1.4),
                new THREE.TetrahedronGeometry(1.6),
                new THREE.DodecahedronGeometry(1.1)
            ];

            const materials = [
                new THREE.MeshPhongMaterial({ 
                    color: 0x4361ee, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x111133
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0x3a0ca3, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x330011
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0xf72585, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x330022
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0x4cc9f0, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x002233
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0x7209b7, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x220033
                })
            ];

            const objects = [];
            const numObjects = 20; // Increased for better background coverage

            for (let i = 0; i < numObjects; i++) {
                const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                const material = materials[Math.floor(Math.random() * materials.length)].clone();
                
                // Enhanced color variation
                const hue = Math.random() * 0.3 + 0.4;
                const saturation = Math.random() * 0.5 + 0.5;
                const lightness = Math.random() * 0.4 + 0.4;
                material.color.setHSL(hue, saturation, lightness);
                
                const object = new THREE.Mesh(geometry, material);
                
                // Strategic positioning for background coverage
                const angle = (i / numObjects) * Math.PI * 2;
                const radius = Math.random() * 30 + 20;
                object.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 25;
                object.position.y = Math.sin(angle) * radius + (Math.random() - 0.5) * 25;
                object.position.z = (Math.random() - 0.5) * 40 - 10; // Push objects behind content
                
                // Random rotation
                object.rotation.x = Math.random() * Math.PI;
                object.rotation.y = Math.random() * Math.PI;
                object.rotation.z = Math.random() * Math.PI;
                
                // Varied sizes
                const size = Math.random() * 2.5 + 0.8;
                object.scale.set(size, size, size);
                
                // Store initial values for animation
                object.userData = {
                    initialX: object.position.x,
                    initialY: object.position.y,
                    initialZ: object.position.z,
                    initialScale: size,
                    floatSpeed: Math.random() * 0.02 + 0.01,
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    }
                };
                
                scene.add(object);
                objects.push(object);
            }

            // Camera positioning
            camera.position.set(0, 0, 25);
            camera.lookAt(0, 0, 0);

            // Mouse interaction
            const mouse = new THREE.Vector2();
            const targetCameraPos = new THREE.Vector3(0, 0, 25);

            document.addEventListener('mousemove', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                
                // Smooth camera movement based on mouse
                targetCameraPos.x = mouse.x * 5;
                targetCameraPos.y = mouse.y * 5;
                targetCameraPos.z = 25;
            });

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                // Smooth camera movement
                camera.position.lerp(targetCameraPos, 0.03);
                camera.lookAt(0, 0, 0);
                
                // Animate all 3D objects
                const time = Date.now() * 0.001;
                
                objects.forEach((object, index) => {
                    const userData = object.userData;
                    
                    // Continuous rotation
                    object.rotation.x += userData.rotationSpeed.x;
                    object.rotation.y += userData.rotationSpeed.y;
                    object.rotation.z += userData.rotationSpeed.z;
                    
                    // Floating motion
                    object.position.y = userData.initialY + Math.sin(time * userData.floatSpeed + index) * 2;
                    object.position.x = userData.initialX + Math.cos(time * userData.floatSpeed * 0.7 + index) * 1.5;
                    
                    // Subtle mouse interaction
                    const mouseInfluence = 0.02;
                    object.position.x += mouse.x * mouseInfluence * (2 + index * 0.05);
                    object.position.y += mouse.y * mouseInfluence * (2 + index * 0.05);
                    
                    // Pulsing effect
                    const pulse = 1 + Math.sin(time * 1.5 + index * 0.5) * 0.1;
                    object.scale.setScalar(userData.initialScale * pulse);
                });
                
                renderer.render(scene, camera);
            };

            // Handle window resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);
            animate();
        };

        // Initialize ThreeJS when page loads
        window.addEventListener('load', initThreeJS);

        // FIXED: Code Editor Functionality
        const runCodeBtn = document.getElementById('run-code');
        const codeOutput = document.getElementById('code-output');

        if (runCodeBtn && codeOutput) {
            runCodeBtn.addEventListener('click', function() {
                codeOutput.innerHTML = `
                    <div class="text-center p-4">
                        <div class="inline-block mb-4">
                            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto animate-spin">
                                <i class="fas fa-cog text-white text-2xl"></i>
                            </div>
                        </div>
                        <p class="text-gray-400">Building Flutter App...</p>
                    </div>
                `;
                
                setTimeout(() => {
                    codeOutput.innerHTML = `
                        <div class="p-4 h-full">
                            <div class="bg-white rounded-lg overflow-hidden shadow-md h-full">
                                <div class="bg-gray-100 px-4 py-2 border-b flex items-center">
                                    <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span class="text-xs text-gray-600 ml-2">Temple Finder</span>
                                </div>
                                <div class="p-4">
                                    <div class="flex items-center mb-4">
                                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <i class="fas fa-place-of-worship text-blue-500"></i>
                                        </div>
                                        <h4 class="font-medium text-gray-800">Temple Finder App</h4>
                                    </div>
                                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-blue-50 text-blue-600 text-xs">
                                            <i class="fas fa-place-of-worship mb-1"></i>
                                            <span>Temples</span>
                                        </button>
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-gray-100 text-gray-600 text-xs">
                                            <i class="fas fa-map mb-1"></i>
                                            <span>Map</span>
                                        </button>
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-gray-100 text-gray-600 text-xs">
                                            <i class="fas fa-heart mb-1"></i>
                                            <span>Favorites</span>
                                        </button>
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-gray-100 text-gray-600 text-xs">
                                            <i class="fas fa-user mb-1"></i>
                                            <span>Profile</span>
                                        </button>
                                    </div>
                                    <div class="bg-gray-100 rounded-lg p-3">
                                        <p class="text-sm text-gray-700">Select a temple to view 360° panorama</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }, 2000);
            });
        }

        // Device and source view buttons
        const viewDeviceBtn = document.getElementById('view-device');
        const viewSourceBtn = document.getElementById('view-source');

        if (viewDeviceBtn) {
            viewDeviceBtn.addEventListener('click', function() {
                alert('Connecting to device... This would launch the app on a connected device in a real scenario.');
            });
        }

        if (viewSourceBtn) {
            viewSourceBtn.addEventListener('click', function() {
                alert('Opening GitHub repository... This would link to your actual project source code.');
            });
        }

        
        // --- API Logic ---
const input = document.getElementById("userPrompt");
const button = document.getElementById("generateBtn");
const gif = document.getElementById("placeholderGif");
const loadingText = document.getElementById("loadingText");
const outputArea = document.getElementById("outputArea");

// Use your Render-hosted backend
const API_BASE = "https://portfolios-xfpr.onrender.com/";

function resetUI() {
  gif.classList.add("hidden");
  loadingText.classList.add("hidden");
}

button.addEventListener("click", async () => {
  const prompt = input.value.trim();
  if (!prompt) return;

  // Reset output
  outputArea.innerHTML = "";

  // Show Pikachu + loading
  gif.src = "/public/pikachu.gif"; 
  gif.classList.remove("hidden");
  loadingText.textContent = "⚡ Generating...";
  loadingText.classList.remove("hidden");

  try {
    const response = await fetch(`${API_BASE}/api/generate-effect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, type: "image" }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();

    resetUI();

    if (data.type === "text" && data.result) {
      const p = document.createElement("p");
      p.textContent = data.result;
      p.className = "text-lg text-green-400 mt-4";
      outputArea.appendChild(p);
    } else if (data.type === "image" && data.image) {
      const img = document.createElement("img");
      img.src = data.image;
      img.alt = "AI Generated Visual";
      img.className = "max-h-[300px] rounded-lg shadow-lg mt-4";
      outputArea.appendChild(img);
    } else {
      throw new Error("Invalid AI response");
    }
  } catch (err) {
    console.error("❌ Generation failed:", err);
    resetUI();

    const p = document.createElement("p");
    p.textContent = "⚠️ Failed to generate. Try again.";
    p.className = "text-red-400 mt-4";
    outputArea.appendChild(p);
  }
});

        // FIXED: Contact Form with Proper Error Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formNotification = document.getElementById('form-notification');

   if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!submitBtn || !formNotification) return;
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitBtn.disabled = true;
        formNotification.classList.add('hidden');

        try {
    
            const formData = new FormData(contactForm);
            
            const FORMSPREE_URL = 'https://formspree.io/f/xnnzoraz';
            
            // Send to Formspree
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formNotification.innerHTML = '<i class="fas fa-check-circle mr-2 text-green-400"></i>Message sent successfully! I\'ll get back to you soon.';
                formNotification.className = 'mt-3 text-center text-green-400';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error
            formNotification.innerHTML = '<i class="fas fa-exclamation-circle mr-2 text-red-400"></i>Failed to send message. Please try again or contact directly.';
            formNotification.className = 'mt-3 text-center text-red-400';
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formNotification.classList.remove('hidden');

            // Hide notification after 5 seconds
            setTimeout(() => {
                formNotification.classList.add('hidden');
            }, 5000);
        }
    });
}

        // Initialize skill bar animations
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = '0';
            }
        });

        // Animate code lines sequentially
        const codeLines = document.querySelectorAll('.code-line');
        if (codeLines.length > 0) {
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 200);
            });
        }

        // Global functions for inline event handlers
        window.nextQuestion = nextQuestion;
        window.resetQuiz = resetQuiz;
        window.resetPuzzle = resetPuzzle;
        window.resetMemoryGame = resetMemoryGame;

        console.log('Portfolio loaded successfully with all features working!');
        
  // ========================================
// RIGHT-CLICK PROTECTION & SECURITY
// ========================================

// Disable right-click context menu
