import * as THREE from 'three';

// 1. Data Object Array
const plantsData = [
  { name: "Mango Plant", category: "Fruit", price: "₹299", desc: "King of fruits, sweet and juicy summer delight." },
  { name: "Apple Plant", category: "Fruit", price: "₹349", desc: "Crisp and fresh fruit, suitable for temperate weather." },
  { name: "Banana Plant", category: "Fruit", price: "₹199", desc: "Fast-growing tropical plant with nutrient-rich fruit." },
  { name: "Guava Plant", category: "Fruit", price: "₹149", desc: "Rich in Vitamin C with sweet and crunchy taste." },
  { name: "Pomegranate Plant", category: "Fruit", price: "₹249", desc: "Produces ruby-red juicy seeds high in antioxidants." },
  { name: "Papaya Plant", category: "Fruit", price: "₹129", desc: "Fast-yielding plant with healthy digestion-friendly fruit." },
  { name: "Lemon Plant", category: "Fruit", price: "₹149", desc: "Citrus essential for home gardens, blooms frequently." },
  { name: "Monstera Deliciosa", category: "Indoor", price: "₹499", desc: "Iconic indoor plant with large split leaves." },
  { name: "Snake Plant", category: "Indoor", price: "₹299", desc: "Top air-purifying plant, extremely low maintenance." },
  { name: "Areca Palm", category: "Indoor", price: "₹399", desc: "Feathery green fronds that humidify indoor air." },
  { name: "Tulsi (Holy Basil)", category: "Medicinal", price: "₹79", desc: "Sacred Indian herb with immense health benefits." },
  { name: "Neem Plant", category: "Medicinal", price: "₹129", desc: "Natural antibacterial tree essential for gardens." },
  { name: "Rose Plant (Red)", category: "Flowering", price: "₹149", desc: "Classic fragrant red blooms for gardens." },
  { name: "Jasmine (Mogra)", category: "Flowering", price: "₹129", desc: "Sweet intensely scented white flowers." }
];

// 2. Dynamic DOM Injection
window.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('plant-grid');
  if (gridContainer) {
    gridContainer.innerHTML = '';
    plantsData.forEach((plant) => {
      const card = document.createElement('div');
      card.className = 'plant-card';
      card.innerHTML = `
        <span class="category-tag">${plant.category}</span>
        <h3>${plant.name}</h3>
        <p>${plant.desc}</p>
        <div class="card-footer">
          <span class="price">${plant.price}</span>
          <button class="buy-btn">Add to Cart</button>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }
});

// 3. Three.js Engine Setup
const canvas = document.querySelector('#webgl');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(2, 1, 5);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x4ade80, 2);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // 3D Plant Model
  const plantGroup = new THREE.Group();

  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.6, 1.2, 32),
    new THREE.MeshStandardMaterial({ color: 0x805232, roughness: 0.6 })
  );
  pot.position.y = -0.6;
  plantGroup.add(pot);

  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.78, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x2e190e })
  );
  soil.position.y = -0.05;
  plantGroup.add(soil);

  const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3, side: THREE.DoubleSide });
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), leafMat);
    leaf.geometry.scale(1, 0.08, 2);
    const angle = (i / 9) * Math.PI * 2;
    leaf.position.set(Math.cos(angle) * 0.45, 0.3, Math.sin(angle) * 0.45);
    leaf.rotation.y = angle;
    leaf.rotation.x = 0.35;
    plantGroup.add(leaf);
  }

  scene.add(plantGroup);
  plantGroup.position.x = 1.3;

  // Animation Frame Loop
  const animate = () => {
    requestAnimationFrame(animate);
    plantGroup.rotation.y += 0.008;
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}