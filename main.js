const pongCanvas = document.getElementById('pongCanvas');
const scoreCanvas = document.getElementById('scoreCanvas');
const context = pongCanvas.getContext('2d');
const scoreContext = scoreCanvas.getContext('2d');

window.addEventListener('resize', function() {
	const minWidth = 600; // La largeur minimale souhaitée
	const minHeight = 400; // La hauteur minimale souhaitée
  
	if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
	  // Restaurer la taille minimale si elle est redimensionnée en dessous
	  window.resizeTo(minWidth, minHeight);
	}
  });